import { FiShoppingCart, FiMinus, FiPlus, FiStar } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { getSingleCookie } from "../../services/cookie.service";
import CookieDetailsSkeleton from "../skeletons/CookieDetailsSkeleton";
import placeholderCookie from "../../assets/images/placeholder-cookie.png";
import { addToCart, getCart } from "../../services/cart.service";
import useCartStore from "../../store/cartStore";

const CookieDetails = () => {
  const { slug } = useParams();
  const { setCartItems, setError } = useCartStore();
  const [cookie, setCookie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [variantIdx, setVariantIdx] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);

  const addToCartHandler = async () => {
    try {
      setCartLoading(true);
      setError(null);

      const body = {
        cookieId: cookie._id,
        quantity,
        variantId: selectedVariant._id,
      };

      const data = await addToCart(body);

      if (data.success) {
        const cartData = await getCart();

        if (cartData.success) {
          setCartItems(cartData.cart || []);

          toast.success("Added to cart 🍪");
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add item to cart");
      toast.error(
        error.response?.data?.message || "Failed to add item to cart",
      );
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    const fetchCookie = async () => {
      try {
        setLoading(true);
        const data = await getSingleCookie(slug);
        setCookie(data.cookie);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCookie();
  }, [slug]);

  useEffect(() => {
    setVariantIdx(0);
  }, [cookie]);

  useEffect(() => {
    setQuantity(1);
  }, [variantIdx]);

  if (loading) {
    return <CookieDetailsSkeleton />;
  }

  if (!cookie) {
    return (
      <div
        className='
          min-h-screen
          bg-[#FFF6EC]
          flex
          items-center
          justify-center
        '
      >
        <h2
          className='
            text-3xl
            font-bold
            text-[#2B1D16]
          '
        >
          Cookie not found 🍪
        </h2>
      </div>
    );
  }

  const selectedVariant = cookie?.variants?.[variantIdx];

  return (
    <div
      className='
        min-h-screen
        bg-[#FFF6EC]
        px-6
        py-12
      '
    >
      <div
        className='
          max-w-7xl
          mx-auto
        '
      >
        {/* Main Section */}
        <div
          className='
            grid
            lg:grid-cols-2
            gap-12
            items-start
          '
        >
          {/* Left */}
          <div>
            <div
              className='
                bg-white
                rounded-[40px]
                overflow-hidden
                shadow-xl
              '
            >
              <img
                src={cookie?.images?.[0] || placeholderCookie}
                alt={cookie?.name}
                className='
                  w-full
                  h-137.5
                  object-cover
                '
              />
            </div>
          </div>

          {/* Right */}
          <div>
            {/* Category */}
            <span
              className='
                bg-[#FFF1DD]
                text-[#D98B2B]
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
              '
            >
              {cookie?.category}
            </span>

            {/* Title */}
            <h1
              className='
                text-5xl
                font-bold
                text-[#2B1D16]
                mt-6
                leading-tight
              '
            >
              {cookie?.name}
            </h1>

            {/* Rating */}
            <div
              className='
                flex
                items-center
                gap-3
                mt-5
              '
            >
              <div
                className='
                  flex
                  items-center
                  text-[#D98B2B]
                '
              >
                <FiStar fill='#D98B2B' />

                <span
                  className='
                    ml-2
                    font-semibold
                  '
                >
                  {cookie?.ratings}
                </span>
              </div>

              <span
                className='
                  text-gray-500
                '
              >
                ({cookie?.totalReviews} reviews)
              </span>
            </div>

            {/* Description */}
            <p
              className='
                mt-8
                text-gray-600
                leading-8
                text-lg
              '
            >
              {cookie?.description}
            </p>

            {/* Price */}
            <div
              className='
                mt-8
                flex
                items-center
                gap-4
              '
            >
              <span
                className='
                  text-5xl
                  font-bold
                  text-[#D98B2B]
                '
              >
                ₹{selectedVariant?.discountPrice}
              </span>

              <span
                className='
                  text-2xl
                  text-gray-400
                  line-through
                '
              >
                ₹{selectedVariant?.price}
              </span>
            </div>

            {/* Weight */}
            <div className='mt-8'>
              <h3
                className='
                  font-bold
                  text-[#2B1D16]
                  mb-3
                '
              >
                Weight
              </h3>
              {!cookie.variants || cookie.variants.length === 0 ? (
                <div
                  className='
                    inline-flex
                    items-center
                    bg-white
                    px-5
                    py-3
                    rounded-full
                    shadow
                  '
                >
                  500g
                </div>
              ) : (
                <div className='flex gap-3 items-center flex-wrap'>
                  {cookie.variants.map((variant, index) => (
                    <div
                      key={variant._id}
                      onClick={() => setVariantIdx(index)}
                      className={`
                        inline-flex
                        items-center
                        px-5
                        py-3
                        rounded-full
                        shadow
                        cursor-pointer
                        ${
                          index === variantIdx
                            ? `
                              bg-[#D98B2B]
                              text-white
                              ring-4
                              ring-[#F5D2A0]
                              scale-105
                            `
                            : `
                              bg-white
                              hover:bg-[#FFF6EC]
                            `
                        }
                      `}
                    >
                      {variant.weight}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ingredients */}
            <div className='mt-8'>
              <h3
                className='
                  font-bold
                  text-[#2B1D16]
                  mb-4
                '
              >
                Ingredients
              </h3>

              <div
                className='
                  flex
                  flex-wrap
                  gap-3
                '
              >
                {cookie?.ingredients?.map((ingredient, index) => (
                  <span
                    key={index}
                    className='
                        bg-white
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        shadow
                      '
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className='mt-10'>
              <h3
                className='
                  font-bold
                  text-[#2B1D16]
                  mb-4
                '
              >
                Quantity
              </h3>

              <div
                className='
                  inline-flex
                  items-center
                  bg-white
                  rounded-full
                  p-2
                  shadow
                '
              >
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                  className={`
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    transition
                    ${
                      quantity <= 1
                        ? `
                          bg-gray-100
                          text-gray-400
                          cursor-not-allowed
                        `
                        : `
                          hover:bg-[#FFF6EC]
                        `
                    }
                  `}
                >
                  <FiMinus />
                </button>

                <span
                  className='
                    px-6
                    text-xl
                    font-semibold
                  '
                >
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= selectedVariant?.stock}
                  className={`
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    transition
                    ${
                      quantity >= selectedVariant?.stock
                        ? `
                          bg-gray-300
                          cursor-not-allowed
                          text-gray-500
                        `
                        : `
                          bg-[#D98B2B]
                          text-white
                        `
                    }
                  `}
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div
              className='
                mt-10
                flex
                flex-col
                sm:flex-row
                gap-5
              '
            >
              <button
                onClick={addToCartHandler}
                disabled={cartLoading || selectedVariant?.stock <= 0}
                className={`
                  flex-1
                  py-5
                  rounded-full
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-3
                  transition
                  text-lg
                  ${
                    cartLoading || selectedVariant?.stock <= 0
                      ? `
                        bg-gray-300
                        cursor-not-allowed
                        text-gray-500
                      `
                      : `
                        bg-[#D98B2B]
                        hover:bg-[#c97818]
                        text-white
                      `
                  }
                `}
              >
                <FiShoppingCart size={22} />

                {cartLoading
                  ? "Adding..."
                  : selectedVariant?.stock <= 0
                    ? "Out Of Stock"
                    : "Add To Cart"}
              </button>

              <button
                className='
                  flex-1
                  border
                  border-[#D98B2B]
                  text-[#D98B2B]
                  py-5
                  rounded-full
                  font-semibold
                  transition
                  hover:bg-[#D98B2B]
                  hover:text-white
                  text-lg
                '
              >
                Buy Now
              </button>
            </div>

            {selectedVariant?.stock > 0 && selectedVariant?.stock <= 5 ? (
              <p className='mt-3 text-orange-500 font-medium'>
                Only {selectedVariant.stock} left in stock
              </p>
            ) : (
              <p
                className='
                mt-6
                text-green-600
                font-semibold
              '
              >
                {selectedVariant?.stock} items available
              </p>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className='mt-24'>
          <h2
            className='
              text-4xl
              font-bold
              text-[#2B1D16]
              mb-10
            '
          >
            Customer Reviews
          </h2>

          {cookie?.reviews?.length > 0 ? (
            <div
              className='
                grid
                md:grid-cols-2
                gap-8
              '
            >
              {cookie?.reviews?.map((review, index) => (
                <div
                  key={index}
                  className='
                      bg-white
                      rounded-[28px]
                      shadow-lg
                      p-8
                    '
                >
                  <div
                    className='
                        flex
                        items-center
                        justify-between
                      '
                  >
                    <h3
                      className='
                          text-xl
                          font-bold
                          text-[#2B1D16]
                        '
                    >
                      {review.name}
                    </h3>

                    <div
                      className='
                          flex
                          items-center
                          text-[#D98B2B]
                        '
                    >
                      <FiStar fill='#D98B2B' />

                      <span
                        className='
                            ml-2
                          '
                      >
                        {review.rating}
                      </span>
                    </div>
                  </div>

                  <p
                    className='
                        mt-5
                        text-gray-600
                        leading-8
                      '
                  >
                    {review?.review}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p
              className='
                text-gray-500
                text-lg
              '
            >
              No reviews yet 🍪
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieDetails;
