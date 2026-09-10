import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import CustomerInfo from "../../components/admin/order/CustomerInfo";
import DeliveryAddress from "../../components/admin/order/DeliveryAddress";
import OrderItems from "../../components/admin/order/OrderItems";
import StatusSelector from "../../components/admin/order/StatusSelector";
import DeliveryInfo from "../../components/admin/order/DeliveryInfo";
import OrderSummary from "../../components/admin/order/OrderSummary";
import ErrorPage from "../../common/ErrorPage";
import constants from "../../common/constants";
import { getAdminOrder, updateAdminOrder } from "../../services/admin.service";

const EditOrder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { orderId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: [constants.ADMIN_ORDERS, orderId],
    queryFn: () => getAdminOrder(orderId),
    enabled: Boolean(orderId),
  });

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!data?.order) return;
    
    setOrder({
      _id: data.order._id,
      customer: {
        name: data.order.userId?.name || "",
        email: data.order.userId?.email || "",
        phone:
          data.order.userId?.phone || data.order.shippingAddress?.phone || "",
      },
      address: {
        house: "",
        street: data.order.shippingAddress?.address || "",
        city: data.order.shippingAddress?.city || "",
        state: data.order.shippingAddress?.state || "",
        pincode: data.order.shippingAddress?.pincode || "",
      },
      deliveryAgent:
        typeof data.order.deliveryAgent === "object"
          ? data.order.deliveryAgent?._id
          : data.order.deliveryAgent || "",
      paymentStatus: data.order.paymentStatus,
      paymentMethod: data.order.paymentMethod,
      deliveryTrackingNumber: data.order.deliveryTrackingNumber || "",
      expectedDeliveryDate: data.order.expectedDeliveryDate || "",
      deliverySlot: data.order.deliverySlot || "",
      deliveryInstructions: data.order.deliveryInstructions || "",
      status: data.order.orderStatus,
      notes: data.order.notes || "",
      items: (data.order.items || []).map((item) => ({
        ...item,
        price: item.quantity
          ? item.finalPrice / item.quantity
          : item.finalPrice,
      })),
      totalAmount: data.order.totalAmount,
    });
  }, [data]);

  const { mutate: saveOrder, isPending: isSaving } = useMutation({
    mutationFn: (payload) => updateAdminOrder({ orderId, payload }),
    onSuccess: (response) => {
      setOrder((current) => ({
        ...current,
        ...response.order,
        status: response.order.orderStatus,
      }));
      queryClient.invalidateQueries({ queryKey: [constants.ADMIN_ORDERS] });
      toast.success(response.message || "Order updated successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update order");
    },
  });

  const handleSave = () => {
    const address = [order.address.house, order.address.street]
      .filter(Boolean)
      .join(", ");

    saveOrder({
      shippingAddress: {
        fullName: order.customer.name,
        phone: order.customer.phone,
        address,
        city: order.address.city,
        state: order.address.state,
        pincode: order.address.pincode,
      },
      deliveryAgent: order.deliveryAgent || null,
      deliveryTrackingNumber: order.deliveryTrackingNumber,
      expectedDeliveryDate: order.expectedDeliveryDate,
      deliverySlot: order.deliverySlot,
      deliveryInstructions: order.deliveryInstructions,
      notes: order.notes,
      orderStatus: order.status,
    });
  };

  if (isError) {
    return (
      <ErrorPage
        title="Unable to load order"
        message="We could not find this order."
        buttonText="Back To Orders"
        redirectLink={constants.ROUTES.ADMIN.ORDERS}
      />
    );
  }

  if (isLoading || !order) {
    return (
      <div className="mx-auto w-full max-w-[1700px] py-8">
        <div className="h-40 animate-pulse rounded-3xl bg-white" />
      </div>
    );
  }

  const editableOrder = order;

  return (
    <div className="mx-auto w-full max-w-[1700px] py-8">
      <div className="mb-8 rounded-3xl border border-[#F3E4D4] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)]  bg-white">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F3E4D4] text-[#A15C38] transition hover:bg-[#FFF3E6] cursor-pointer"
            >
              <FiArrowLeft size={20} />
            </button>

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-[#8B6A56]">
                <span>Dashboard</span>

                <span>/</span>

                <span>Orders</span>

                <span>/</span>

                <span className="font-semibold text-[#A15C38]">Edit Order</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-[#4E342E]">
                  Edit Order
                </h1>

                <span className="rounded-full bg-[#FFF3E6] px-4 py-1 text-sm font-semibold text-[#A15C38]">
                  #{data.order.orderId}
                </span>
              </div>

              <p className="mt-2 text-[#7A5C4D]">
                Manage customer, payment, delivery and order details.
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#A15C38] to-[#C77A42] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <FiSave />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_420px]">
        <div className="space-y-6">
          <CustomerInfo order={editableOrder} setOrder={setOrder} />

          <DeliveryAddress order={editableOrder} setOrder={setOrder} />

          <OrderItems order={editableOrder} setOrder={setOrder} />
        </div>

        <div className="h-fit space-y-6">
          <StatusSelector order={editableOrder} setOrder={setOrder} />

          <OrderSummary order={editableOrder} />
        </div>
      </div>
      <DeliveryInfo order={editableOrder} setOrder={setOrder} />
    </div>
  );
};

export default EditOrder;
