import { useEffect, useRef } from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import useCartStore from "../../store/cartStore";
import ErrorPage from "../../common/ErrorPage";
import NoCartFound from "../../assets/images/no-cart-found.png";
import {
  removeCartItem,
  updateCartItemsQuantity,
} from "../../services/cart.service";

const Cart = () => {
  const {
    cartItems,
    error,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    setError,
  } = useCartStore();

  const pendingQuantityUpdatesRef = useRef(new Map());
  const quantitySyncTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (quantitySyncTimeoutRef.current) {
        clearTimeout(quantitySyncTimeoutRef.current);
      }
    };
  }, []);

  const flushQuantityUpdates = async () => {
    const pendingUpdates = Array.from(pendingQuantityUpdatesRef.current.entries())
      .filter(([, quantity]) => quantity > 0)
      .map(([cookieId, quantity]) => ({ cookieId, quantity }));

    pendingQuantityUpdatesRef.current.clear();

    if (!pendingUpdates.length) {
      return;
    }

    try {
      await updateCartItemsQuantity(pendingUpdates);
      setError(null);
    } catch (error) {
      setError("Failed to update cart quantity.");
    }
  };

  const scheduleQuantitySync = () => {
    if (quantitySyncTimeoutRef.current) {
      clearTimeout(quantitySyncTimeoutRef.current);
    }

    quantitySyncTimeoutRef.current = setTimeout(() => {
      void flushQuantityUpdates();
    }, 500);
  };

  const handleQuantityChange = (item, delta) => {
    const currentPendingQuantity = pendingQuantityUpdatesRef.current.get(
      item.cookieId,
    );
    const baseQuantity = currentPendingQuantity ?? item.quantity;
    const nextQuantity = Math.max(0, baseQuantity + delta);

    pendingQuantityUpdatesRef.current.set(item.cookieId, nextQuantity);

    if (delta > 0) {
      increaseQuantity(item.variantId);
    } else {
      decreaseQuantity(item.variantId);
    }

    scheduleQuantitySync();
  };

  const handleRemoveItem = async (item) => {
    try {
      setError(null);
      await removeCartItem(item.cookieId);
      removeFromCart(item.variantId);
    } catch (error) {
      setError("Failed to remove item from cart.");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#FFF6EC] px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <ErrorPage
            title="Unable To Load Cart"
            message="Something went wrong while fetching your cart."
            buttonText="Continue Shopping"
            redirectLink="/cookies"
          />
        </div>
      </div>
    );
  }

  if (!cartItems?.length) {
    return (
      <div
        className="
          min-h-screen
          bg-[#FFF6EC]
          px-6
          py-12
          flex
          items-center
          justify-center
        "
      >
        <div className="text-center max-w-2xl">
          <img
            src={NoCartFound}
            alt="Empty Cart"
            className="
              w-full
              max-w-125
              mx-auto
              object-contain
            "
          />

          <h2 className="mt-8 text-5xl font-bold text-[#2B1D16]">
            Your Cart Is Empty
          </h2>

          <p className="mt-5 text-lg text-gray-500 leading-8">
            Looks like your cookie cart is feeling lonely 🍪
            <br />
            Add some delicious treats before checkout.
          </p>

          <Link
            to="/cookies"
            className="
              inline-flex
              items-center
              justify-center
              mt-10
              bg-[#D98B2B]
              hover:bg-[#c97818]
              text-white
              px-10
              py-4
              rounded-full
              font-semibold
              transition
            "
          >
            Explore Cookies
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0,
  );

  const shipping = subtotal > 999 ? 0 : 49;

  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#FFF6EC] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-[#2B1D16]">Your Cart 🛒</h1>

          <p className="mt-4 text-gray-600">
            Review your delicious cookies before checkout.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.cookieId}
                className="
                  bg-white
                  rounded-4xl
                  shadow-lg
                  p-6
                  flex
                  flex-col
                  md:flex-row
                  gap-6
                "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    w-full
                    md:w-40
                    h-40
                    object-cover
                    rounded-3xl
                  "
                />
                <div className="flex-1">
                  <div className="flex justify-between gap-5">
                    <div>
                      <h2 className="text-2xl font-bold text-[#2B1D16]">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        Weight: {item.weight}
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <span className="text-2xl font-bold text-[#D98B2B]">
                          ₹{item.finalPrice}
                        </span>

                        {item.originalPrice > item.finalPrice && (
                          <span className="text-gray-400 line-through">
                            ₹{item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="
                        text-red-500
                        hover:bg-red-50
                        w-12
                        h-12
                        rounded-full
                        flex
                        items-center
                        justify-center
                        transition
                        cursor-pointer
                      "
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>

                  <div className="mt-8">
                    <div
                      className="
                        inline-flex
                        items-center
                        bg-[#FFF6EC]
                        rounded-full
                        p-2
                      "
                    >
                      <button
                        onClick={() => handleQuantityChange(item, -1)}
                        className="
                          w-10
                          h-10
                          rounded-full
                          bg-white
                          flex
                          items-center
                          justify-center
                          shadow
                        "
                      >
                        <FiMinus />
                      </button>

                      <span className="px-6 font-semibold text-lg">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => handleQuantityChange(item, 1)}
                        className="
                          w-10
                          h-10
                          rounded-full
                          bg-[#D98B2B]
                          text-white
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div
              className="
                bg-white
                rounded-4xl
                shadow-lg
                p-8
                sticky
                top-6
              "
            >
              <h2 className="text-3xl font-bold text-[#2B1D16] mb-8">
                Order Summary
              </h2>

              <div className="space-y-5">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>

                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>

                  <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>

                <div className="border-t pt-5 flex justify-between text-2xl font-bold text-[#2B1D16]">
                  <span>Total</span>

                  <span>₹{total}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="
                  mt-10
                  w-full
                  bg-[#D98B2B]
                  hover:bg-[#c97818]
                  text-white
                  py-4
                  rounded-full
                  font-semibold
                  transition
                  flex
                  items-center
                  justify-center
                "
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/cookies"
                className="
                  mt-4
                  w-full
                  border
                  border-[#D98B2B]
                  text-[#D98B2B]
                  py-4
                  rounded-full
                  font-semibold
                  transition
                  flex
                  items-center
                  justify-center
                  hover:bg-[#D98B2B]
                  hover:text-white
                "
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
