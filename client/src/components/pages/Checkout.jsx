import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getAddresses, createOrder } from "../../services/order.service";
import { getFullAddress } from "../../common/getFullAddress";
import AddressSection from "../address/AddressSection";
import useCartStore from "../../store/cartStore";
import { emptyCart } from "../../services/cart.service";

export default function CheckoutPage() {
  const { cartItems, clearCart, setError } = useCartStore();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const getEffectivePrice = (item) =>
    item.discountPrice ?? item.finalPrice ?? item.originalPrice ?? 0;

  const subtotal = useMemo(
    () =>
      cartItems?.reduce(
        (sum, item) => sum + getEffectivePrice(item) * item.quantity,
        0,
      ) ?? 0,
    [cartItems],
  );

  const originalTotal = useMemo(
    () =>
      cartItems?.reduce(
        (sum, item) =>
          sum + (item.originalPrice ?? getEffectivePrice(item)) * item.quantity,
        0,
      ) ?? 0,
    [cartItems],
  );

  const discountAmount = useMemo(
    () => Math.max(originalTotal - subtotal, 0),
    [originalTotal, subtotal],
  );

  const deliveryFee = useMemo(() => (subtotal > 999 ? 0 : 40), [subtotal]);
  const total = useMemo(() => subtotal + deliveryFee, [subtotal, deliveryFee]);
  const hasItems = useMemo(() => cartItems?.length > 0, [cartItems]);

  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const [ordering, setOrdering] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderResponse, setOrderResponse] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [notes, setNotes] = useState("");

  const handlePlaceOrder = async () => {
    if (!hasItems) {
      toast.error("Your cart is empty");
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    try {
      setOrdering(true);
      setError(null);

      const items = cartItems.map((it) => ({
        cookieId: it.cookieId,
        variantId: it.variantId,
        quantity: it.quantity,
      }));

      const body = {
        items,
        shippingAddress: selectedAddress,
        paymentMethod,
        notes,
      };

      const res = await createOrder(body);

      if (res?.success) {
        setOrderResponse(res.order ?? res.data ?? null);
        setOrderPlaced(true);
        toast.success(res.message || "Order placed successfully");

        timeoutRef.current = setTimeout(() => {
          navigate("/orders");
        }, 5000);

        clearCart();
        await emptyCart();
      } else {
        toast.error(res?.message || "Failed to place order");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to place order");
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setOrdering(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const fetchAddresses = async () => {
    try {
      const data = await getAddresses();

      if (data.success) {
        const allAddresses = data.addresses ?? [];

        setAddresses(allAddresses);
        setSelectedAddress(allAddresses?.[0] ?? null);

        return allAddresses;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Please refresh the page");
    }

    return [];
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF6EC] py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-[#2B1D16]">Checkout 🍪</h1>

            <p className="mt-2 text-gray-500">
              Complete your order and enjoy freshly baked cookies.
            </p>
          </div>

          <AddressSection
            addresses={addresses}
            fetchAddresses={fetchAddresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />

          <div className="bg-white rounded-4xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-[#2B1D16]">
              Payment Method
            </h2>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setPaymentMethod("COD")}
                className={`border-2 rounded-3xl p-5 cursor-pointer ${paymentMethod === "COD" ? "border-[#D98B2B] bg-[#fffaf4]" : "border-gray-200"}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-[#2B1D16]">
                      Cash on Delivery
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Pay when your order arrives.
                    </p>
                  </div>

                  <input
                    type="radio"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="w-5 h-5 accent-[#D98B2B]"
                  />
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod("ONLINE")}
                className={`border rounded-3xl p-5 cursor-pointer transition ${paymentMethod === "online" ? "border-[#D98B2B]" : "border-gray-200 hover:border-[#D98B2B]"}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-[#2B1D16]">
                      Online Payment
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      UPI, Cards, Wallets & Net Banking.
                    </p>
                  </div>

                  <input
                    type="radio"
                    checked={paymentMethod === "ONLINE"}
                    onChange={() => setPaymentMethod("online")}
                    className="w-5 h-5 accent-[#D98B2B]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-4xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-[#2B1D16]">
              Order Notes
            </h2>

            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add delivery instructions or notes..."
              className="
                w-full
                mt-5
                border
                border-gray-300
                rounded-3xl
                p-5
                outline-none
                resize-none
                focus:border-[#D98B2B]
                transition
              "
            />
          </div>
        </div>

        <div>
          <div className="bg-white rounded-4xl shadow-lg p-6 sticky top-8">
            <h2 className="text-2xl font-semibold text-[#2B1D16]">
              Order Summary
            </h2>

            <div className="mt-6 space-y-5">
              {cartItems?.map((item) => (
                <div key={item.cookieId} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt="cookie"
                    className="w-20 h-20 object-cover rounded-2xl"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-[#2B1D16]">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-[#2B1D16]">
                    ₹{item.discountPrice}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <label className="block mb-3 font-medium text-[#2B1D16]">
                Apply Coupon
              </label>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="
                    flex-1
                    border
                    border-gray-300
                    rounded-full
                    px-5
                    py-3
                    outline-none
                    focus:border-[#D98B2B]
                    transition
                  "
                />

                <button
                  className="
                    bg-[#2B1D16]
                    hover:bg-[#1e140f]
                    text-white
                    px-6
                    rounded-full
                    font-medium
                    transition
                  "
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center justify-between text-gray-600">
                <p>Listing Price</p>
                <p>₹{originalTotal?.toFixed(2) ?? "0.00"}</p>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <p>Selling Price</p>
                <p>₹{subtotal?.toFixed(2) ?? "0.00"}</p>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <p>Delivery Fee</p>
                <p>
                  {deliveryFee === 0 ? "Free" : `₹${deliveryFee.toFixed(2)}`}
                </p>
              </div>

              <div className="flex items-center justify-between text-green-600">
                <p>Discount</p>
                <p>- ₹{discountAmount.toFixed(2)}</p>
              </div>

              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#2B1D16]">Total</h3>

                <h3 className="text-2xl font-bold text-[#D98B2B]">
                  ₹{total.toFixed(2)}
                </h3>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={ordering}
              className={`w-full mt-8 bg-[#D98B2B] hover:bg-[#c97818] text-white py-4 rounded-full font-semibold text-lg transition flex items-center justify-center gap-3 ${ordering ? "opacity-80 cursor-not-allowed" : ""}`}
            >
              {ordering ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span>Placing order...</span>
                </>
              ) : (
                "Place Order 🍪"
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4 leading-6">
              By placing this order, you agree to our Terms & Conditions.
            </p>
          </div>
        </div>
      </div>
      {orderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md text-center shadow-xl">
            <div className="mx-auto w-24 h-24 rounded-full bg-[#D98B2B]/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-12 h-12 text-[#D98B2B]"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-semibold text-[#2B1D16] mb-2">
              Order placed!
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Thanks for your purchase. Redirecting to Orders...
            </p>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-2 bg-[#D98B2B] rounded-full"
                style={{ width: "100%", transition: "width 5s linear" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
