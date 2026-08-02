import { useState } from "react";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CustomerInfo from "../../components/admin/order/CustomerInfo";
import DeliveryAddress from "../../components/admin/order/DeliveryAddress";
import OrderItems from "../../components/admin/order/OrderItems";
import StatusSelector from "../../components/admin/order/StatusSelector";
import DeliveryInfo from "../../components/admin/order/DeliveryInfo";
import OrderSummary from "../../components/admin/order/OrderSummary";

const EditOrder = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    _id: "MC1024",

    customer: {
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "+91 9876543210",
    },

    address: {
      house: "A-201",
      street: "Sector 62",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
    },

    payment: {
      method: "UPI",
      paymentStatus: "Paid",
      transactionId: "TXN987654321",
    },

    delivery: {
      partner: "Shadowfax",
      trackingNumber: "SF23456789",
      expectedDate: "2026-08-03",
    },

    status: "Confirmed",

    notes: "Customer requested extra chocolate chips.",

    items: [
      {
        _id: 1,
        name: "Chocolate Chip Cookie",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
        quantity: 2,
        price: 180,
      },
      {
        _id: 2,
        name: "Red Velvet Cookie",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",
        quantity: 1,
        price: 220,
      },
    ],
  });

  const handleSave = () => {
    console.log(order);

    // API Integration Later
  };

  return (
    <div className="mx-auto w-full max-w-[1700px]">
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
                  #{order._id}
                </span>
              </div>

              <p className="mt-2 text-[#7A5C4D]">
                Manage customer, payment, delivery and order details.
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#A15C38] to-[#C77A42] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <FiSave />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_420px]">
        <div className="space-y-6">
          <CustomerInfo order={order} setOrder={setOrder} />

          <DeliveryAddress order={order} setOrder={setOrder} />

          <OrderItems order={order} setOrder={setOrder} />
        </div>

        <div className="h-fit space-y-6">
          <StatusSelector order={order} setOrder={setOrder} />

          <OrderSummary order={order} />
        </div>
      </div>
      <DeliveryInfo order={order} setOrder={setOrder} />
    </div>
  );
};

export default EditOrder;
