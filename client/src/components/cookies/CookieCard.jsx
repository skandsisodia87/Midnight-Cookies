import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import placeholderCookie from "../../assets/images/placeholder-cookie.png";
import { addToCart, getCart } from "../../services/cart.service";
import { useState } from "react";
import { toast } from "sonner";
import useCartStore from "../../store/cartStore";
import useCartSync from "../../common/useCartSync";
import useAuthStore from "../../store/authStore";

const CookieCard = ({ cookie }) => {
  const { increase, decrease } = useCartSync();
  const [loading, setLoading] = useState(false);
  const { setCartItems, cartItems = [], setError } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const cartItem = cartItems.find(
    (item) => item.cookieId.toString() === cookie._id.toString(),
  );

  const quantity = cartItem?.quantity ?? 0;

  const addToCartHandler = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to your cart");
      return;
    }

    setLoading(true);
    setError(null);

    const body = {
      cookieId: cookie._id,
      quantity: 1,
      variantId: cookie.defaultVariant._id,
    };
    try {
      const data = await addToCart(body);

      if (data.success) {
        const cartData = await getCart();
        if (cartData.success) {
          setCartItems(cartData.cart);
        }
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to add item to the cart",
      );
      toast.error(
        error.response?.data?.message || "Failed to add item to the cart",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="
        bg-white
        rounded-2xl sm:rounded-[28px]
        overflow-hidden
        shadow-lg
        hover:shadow-2xl
        transition
        duration-300
        flex
        flex-col
        h-full
      "
    >
      <div className="overflow-hidden h-48 sm:h-56 lg:h-64">
        <img
          src={cookie.images?.[0]?.url || placeholderCookie}
          alt={cookie.name}
          className="
            w-full
            h-full
            object-cover
            hover:scale-110
            transition
            duration-500
          "
        />
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3
              className="
                text-lg
                sm:text-xl
                font-bold
                text-[#2B1D16]
                leading-snug
              "
            >
              {cookie.name}
            </h3>

            <span
              className="
                bg-[#FFF1DD]
                text-[#D98B2B]
                px-2.5
                sm:px-3
                py-1
                rounded-full
                text-xs
                sm:text-sm
                font-semibold
                whitespace-nowrap
              "
            >
              {cookie.category}
            </span>
          </div>

          <p
            className="
              text-gray-600
              mt-2 sm:mt-3
              text-sm
              leading-5 sm:leading-6
              line-clamp-2
              min-h-10 sm:min-h-12
            "
          >
            {cookie.description}
          </p>

          <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl font-bold text-[#D98B2B]">
              ₹{cookie.defaultVariant?.discountPrice}
            </span>

            <div className="flex items-center text-gray-400 text-xs sm:text-sm">
              <span className="line-through">
                ₹{cookie.defaultVariant?.price}
              </span>

              <span className="ml-1">/{cookie.defaultVariant?.weight}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-5 sm:pt-6 flex gap-2 sm:gap-3">
          {quantity > 0 ? (
            <div className="inline-flex items-center bg-white rounded-full p-1.5 sm:p-2 shadow">
              <button
                disabled={quantity <= 1}
                onClick={() => decrease(cookie.defaultVariant._id)}
                className="
                  w-8 h-8
                  sm:w-10 sm:h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  hover:bg-[#FFF6EC]
                "
              >
                <FiMinus />
              </button>

              <span className="px-4 sm:px-6 text-lg sm:text-xl font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => increase(cookie.defaultVariant._id)}
                className="
                  w-8 h-8
                  sm:w-10 sm:h-10
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
          ) : (
            <button
              className="
                flex-1
                bg-[#D98B2B]
                hover:bg-[#c97818]
                text-white
                py-2.5 sm:py-3
                rounded-full
                font-semibold
                text-sm sm:text-base
                flex
                items-center
                justify-center
                gap-2
                transition
                cursor-pointer
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
              onClick={addToCartHandler}
              disabled={loading || !isAuthenticated}
            >
              <FiShoppingCart />
              {loading
                ? "Adding..."
                : isAuthenticated
                  ? "Add to Cart"
                  : "Login to Buy"}
            </button>
          )}

          <Link
            to={`/cookies/${cookie.slug}`}
            className="
              border
              border-[#D98B2B]
              px-4 sm:px-5
              py-2.5 sm:py-3
              rounded-full
              text-sm sm:text-base
              hover:bg-[#D98B2B]
              hover:text-white
              transition
              flex
              items-center
              justify-center
            "
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CookieCard;
