import { useQuery } from "@tanstack/react-query";
import { FiArrowLeft, FiMapPin, FiPackage, FiUser } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import ErrorPage from "../../common/ErrorPage";
import OrderStatusBadge from "../../components/admin/order/OrderStatusBadge";
import { getAdminOrder } from "../../services/admin.service";
import constants from "../../common/constants";

const AdminOrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { data, isError, isLoading } = useQuery({
    queryKey: [constants.ADMIN_ORDERS, orderId],
    queryFn: () => getAdminOrder(orderId),
  });

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-32 rounded-3xl bg-white" />
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="h-96 rounded-3xl bg-white" />
          <div className="h-96 rounded-3xl bg-white" />
        </div>
      </div>
    );
  }

  if (isError || !data?.order) {
    return (
      <ErrorPage
        title="Unable to load order"
        message="We could not find the order details requested."
        buttonText="Back To Orders"
        redirectLink={constants.ROUTES.ADMIN.ORDERS}
      />
    );
  }

  const { order } = data;
  const customer = order.userId?.name || order.customer || "Unknown customer";
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6 py-8">
      <header className="rounded-3xl border border-[#F3E4D4] bg-white p-5 shadow-sm sm:p-7">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#A15C38] transition hover:text-[#7A3E22] cursor-pointer"
        >
          <FiArrowLeft /> Back to orders
        </button>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#C77A42]">
              Order overview
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[#4E342E]">
              #{order.orderId}
            </h1>
            <p className="mt-2 text-sm text-[#7A5C4D]">
              Placed{" "}
              {moment(order.createdAt).format("MMMM D, YYYY [at] h:mm A")}
            </p>
          </div>
          <OrderStatusBadge status={order.orderStatus} />
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="rounded-3xl border border-[#F3E4D4] bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center justify-between gap-4 border-b border-[#F3E4D4] pb-5">
            <div>
              <h2 className="text-xl font-bold text-[#4E342E]">Line items</h2>
              <p className="mt-1 text-sm text-[#8B6A56]">
                {order.items.length} products, {itemCount} pieces
              </p>
            </div>
            <FiPackage className="text-2xl text-[#C77A42]" />
          </div>

          <div className="divide-y divide-[#F3E4D4]">
            {order.items.map((item, index) => (
              <div key={item._id || index} className="flex gap-4 py-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-2xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-[#4E342E]">{item.name}</h3>
                  <p className="mt-1 text-xs text-[#8B6A56]">
                    {item.sku || "No SKU"} · {item.weight}
                  </p>
                  <p className="mt-3 text-sm text-[#7A5C4D]">
                    ₹{item.finalPrice} × {item.quantity}
                  </p>
                </div>
                <p className="font-bold text-[#A15C38]">₹{item.finalPrice}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-3xl border border-[#F3E4D4] bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-3 border-b border-[#F3E4D4] pb-5">
              <FiUser className="text-xl text-[#C77A42]" />
              <h2 className="text-xl font-bold text-[#4E342E]">Customer</h2>
            </div>
            <p className="mt-5 font-semibold text-[#4E342E]">{customer}</p>
            <p className="mt-1 text-sm text-[#7A5C4D]">
              {order.shippingAddress?.phone || "No phone number"}
            </p>
          </section>

          <section className="rounded-3xl border border-[#F3E4D4] bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-3 border-b border-[#F3E4D4] pb-5">
              <FiMapPin className="text-xl text-[#C77A42]" />
              <h2 className="text-xl font-bold text-[#4E342E]">Delivery</h2>
            </div>
            <div className="mt-5 space-y-2 text-sm text-[#7A5C4D]">
              <p className="font-semibold text-[#4E342E]">
                {order.shippingAddress?.fullName}
              </p>
              <p>{order.shippingAddress?.address}</p>
              <p>
                {order.shippingAddress?.city}, {order.shippingAddress?.state} -{" "}
                {order.shippingAddress?.pincode}
              </p>
            </div>
          </section>

          <section className="rounded-3xl bg-[#4E342E] p-5 text-white shadow-sm sm:p-7">
            <div className="flex justify-between text-sm text-[#F8E5D2]">
              <span>Payment method</span>
              <span className="font-semibold text-white">
                {order.paymentMethod}
              </span>
            </div>
            <div className="mt-4 flex justify-between border-t border-white/15 pt-4">
              <span className="font-semibold">Order total</span>
              <span className="text-xl font-bold">₹{order.totalAmount}</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
