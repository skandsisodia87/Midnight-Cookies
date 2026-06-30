import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import StatusConfig from "../../common/StatusConfig";
import { getSingleOrder } from "../../services/order.service";
import ErrorPage from "../../common/ErrorPage";
import OrderDetailsSkeleton from "../skeletons/OrderDetailsSkeleton";
import { FaRegStar, FaTruckFast } from "react-icons/fa6";
import OrderReview from "../order/OrderReview";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [itemReviews, setItemReviews] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getSingleOrder(orderId);

        if (data?.success) {
          setOrder(data.order);
          setItemReviews(data.itemReviews);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error(error);

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen px-6 py-12 bg-[#FFF6EC]">
        <div className="max-w-6xl mx-auto">
          <OrderDetailsSkeleton />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen px-6 py-12 bg-[#FFF6EC]">
        <div className="max-w-4xl mx-auto">
          <ErrorPage
            title="Order Not Found"
            message="We could not find the order you are looking for."
            buttonText="Back To Orders"
            redirectLink="/orders"
          />
        </div>
      </div>
    );
  }

  const currentStatus = StatusConfig[order.orderStatus] || StatusConfig.placed;
  const orderDate = moment(order.createdAt).format("MMMM D, YYYY, h:mm A");
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FFF6EC] px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="rounded-4xl bg-white p-8 shadow-[0_24px_80px_rgba(43,28,17,0.12)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D98B2B]">
                Order Details
              </p>

              <h1 className="mt-4 text-5xl font-bold text-[#2B1D16]">
                #{order.orderId}
              </h1>

              <p className="mt-3 text-gray-600">Placed on {orderDate}</p>
            </div>

            <div
              className={`inline-flex w-fit items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold ${currentStatus.color}`}
            >
              {currentStatus.icon}
              <span>{currentStatus.text}</span>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-4xl bg-[#FFF4E2] p-5">
              <p className="text-sm text-gray-500">Total Items</p>

              <p className="mt-3 text-3xl font-bold text-[#2B1D16]">
                {totalItems}
              </p>
            </div>

            <div className="rounded-4xl bg-[#EEF5FF] p-5">
              <p className="text-sm text-gray-500">Products</p>

              <p className="mt-3 text-3xl font-bold text-[#2B1D16]">
                {order.items.length}
              </p>
            </div>

            <div className="rounded-4xl bg-[#F7F7F7] p-5">
              <p className="text-sm text-gray-500">Payment</p>

              <p className="mt-3 text-xl font-bold text-[#2B1D16]">
                {order.paymentMethod}
              </p>
            </div>

            <div className="rounded-4xl bg-[#FFF6EE] p-5">
              <p className="text-sm text-gray-500">Order Total</p>

              <p className="mt-3 text-3xl font-bold text-[#D98B2B]">
                ₹
                {order.totalAmount > 999
                  ? order.totalAmount
                  : order.totalAmount + 49}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-4xl bg-white p-8 shadow-lg">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-3xl font-bold text-[#2B1D16]">
                Ordered Items
              </h2>

              <p className="text-sm text-gray-500">
                {order.items.length} products • {totalItems} pieces
              </p>
            </div>

            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 rounded-3xl bg-[#FFF8F2] p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-28 w-28 rounded-3xl object-cover"
                    />

                    <div>
                      <h3 className="text-2xl font-bold text-[#2B1D16]">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">{item.sku}</p>

                      <p className="mt-3 text-sm text-gray-500">
                        Weight: {item.weight}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end">
                    <p className="text-sm text-gray-500">
                      ₹{item.discountPrice} × {item.quantity}
                    </p>

                    <p className="mt-3 text-2xl font-bold text-[#D98B2B]">
                      ₹{item.finalPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="sticky top-24 rounded-4xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-3xl font-bold text-[#2B1D16]">
                Shipping Address
              </h2>

              <div className="space-y-3 rounded-3xl bg-[#FFF8F2] p-6 text-gray-700">
                <p className="text-lg font-semibold text-[#2B1D16]">
                  {order.shippingAddress.fullName}
                </p>

                <p className="text-sm text-gray-500">
                  {order.shippingAddress.phone}
                </p>

                <p>{order.shippingAddress.address}</p>

                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>

                <p>{order.shippingAddress.pincode}</p>
              </div>

              <div className="mt-6 rounded-3xl bg-[#FFF4E2] p-5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping Fee</span>

                  <span className="font-semibold">
                    {order.totalAmount > 999 ? "Free" : "₹49"}
                  </span>
                </div>

                <div className="mt-4 flex justify-between">
                  <span className="text-gray-500">Status</span>

                  <span className="font-semibold">{currentStatus.text}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {order.orderStatus === "delivered" && (
          <OrderReview items={order.items} itemReviews={itemReviews} />
        )}

        <div className="rounded-4xl bg-[#1F140F] p-8 text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Need Help With Your Order?</h2>

              <p className="mt-3 max-w-2xl text-gray-300">
                Questions about delivery, payment, refunds, or your cookies? Our
                support team is ready to help.
              </p>
            </div>

            <Link
              to="/contact"
              className="rounded-full bg-[#D98B2B] px-8 py-4 font-semibold transition hover:bg-[#c97818]"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
