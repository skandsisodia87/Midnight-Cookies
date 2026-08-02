import {
  FiShoppingBag,
  FiPercent,
  FiTruck,
  FiCreditCard,
  FiTag,
} from "react-icons/fi";

const OrderSummary = ({ order }) => {
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const discount = order.discount || 50;
  const deliveryCharge = order.deliveryCharge || 40;
  const gst = Math.round((subtotal - discount) * 0.05);

  const total = subtotal - discount + deliveryCharge + gst;

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="rounded-2xl border border-[#F3E4D4] bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-[#F3E4D4] px-6 py-4">
        <h2 className="text-lg font-semibold text-[#4E342E]">Order Summary</h2>

        <p className="text-sm text-gray-500">Billing Details</p>
      </div>

      <div className="space-y-4 p-6">
        {/* Items */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiShoppingBag className="text-[#A15C38]" />
            <span>Total Items</span>
          </div>

          <span className="font-semibold">{totalItems}</span>
        </div>

        {/* Subtotal */}

        <div className="flex items-center justify-between">
          <span>Subtotal</span>

          <span className="font-medium">₹{subtotal}</span>
        </div>

        {/* Discount */}

        <div className="flex items-center justify-between text-green-600">
          <div className="flex items-center gap-2">
            <FiPercent />
            Discount
          </div>

          <span>- ₹{discount}</span>
        </div>

        {/* Delivery */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiTruck />
            Delivery
          </div>

          <span>₹{deliveryCharge}</span>
        </div>

        {/* GST */}

        <div className="flex items-center justify-between">
          <span>GST (5%)</span>

          <span>₹{gst}</span>
        </div>

        {/* Coupon */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiTag />
            Coupon
          </div>

          <span>{order.couponCode || "Not Applied"}</span>
        </div>

        <hr className="border-[#F3E4D4]" />

        {/* Grand Total */}

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-[#4E342E]">
            Grand Total
          </span>

          <span className="text-2xl font-bold text-[#A15C38]">₹{total}</span>
        </div>

        {/* Payment */}

        <div className="rounded-xl bg-[#FFF8F2] p-4">
          <div className="flex items-center gap-2">
            <FiCreditCard className="text-[#A15C38]" />

            <span className="font-medium">{order.payment.method}</span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Status :
            <span className="ml-1 font-medium text-green-600">
              {order.payment.paymentStatus}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
