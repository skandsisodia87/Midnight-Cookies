// src/pages/Cart.jsx

import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

import { Link } from "react-router-dom";

const cartItems = [
  {
    id: 1,

    name: "Chocolate Blast",

    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",

    quantity: 2,

    originalPrice: 299,

    finalPrice: 199,
  },

  {
    id: 2,

    name: "Oreo Dream",

    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",

    quantity: 1,

    originalPrice: 249,

    finalPrice: 149,
  },
];

const Cart = () => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0,
  );

  const shipping = 49;

  const total = subtotal + shipping;

  return (
    <div className='min-h-screen bg-[#FFF6EC] px-6 py-12'>
      <div className='max-w-7xl mx-auto'>
        {/* Heading */}
        <div className='mb-12'>
          <h1 className='text-5xl font-bold text-[#2B1D16]'>Your Cart 🛒</h1>

          <p className='mt-4 text-gray-600'>
            Review your delicious cookies before checkout.
          </p>
        </div>

        {/* Main Grid */}
        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Left Side */}
          <div className='lg:col-span-2 space-y-6'>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className='
                  bg-white
                  rounded-4xl
                  shadow-lg
                  p-6
                  flex
                  flex-col
                  md:flex-row
                  gap-6
                '
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className='
                    w-full
                    md:w-40
                    h-40
                    object-cover
                    rounded-3xl
                  '
                />

                {/* Details */}
                <div className='flex-1'>
                  <div className='flex justify-between gap-5'>
                    <div>
                      <h2 className='text-2xl font-bold text-[#2B1D16]'>
                        {item.name}
                      </h2>

                      {/* Prices */}
                      <div className='mt-3 flex items-center gap-3'>
                        <span className='text-2xl font-bold text-[#D98B2B]'>
                          ₹{item.finalPrice}
                        </span>

                        <span className='text-gray-400 line-through'>
                          ₹{item.originalPrice}
                        </span>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      className='
                        text-red-500
                        hover:bg-red-50
                        w-12
                        h-12
                        rounded-full
                        flex
                        items-center
                        justify-center
                        transition
                      '
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>

                  {/* Quantity */}
                  <div className='mt-8'>
                    <div
                      className='
                        inline-flex
                        items-center
                        bg-[#FFF6EC]
                        rounded-full
                        p-2
                      '
                    >
                      <button
                        className='
                          w-10
                          h-10
                          rounded-full
                          bg-white
                          flex
                          items-center
                          justify-center
                          shadow
                        '
                      >
                        <FiMinus />
                      </button>

                      <span className='px-6 font-semibold text-lg'>
                        {item.quantity}
                      </span>

                      <button
                        className='
                          w-10
                          h-10
                          rounded-full
                          bg-[#D98B2B]
                          text-white
                          flex
                          items-center
                          justify-center
                        '
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div>
            <div
              className='
                bg-white
                rounded-4xl
                shadow-lg
                p-8
                sticky
                top-6
              '
            >
              <h2 className='text-3xl font-bold text-[#2B1D16] mb-8'>
                Order Summary
              </h2>

              <div className='space-y-5'>
                {/* Subtotal */}
                <div className='flex justify-between text-gray-600'>
                  <span>Subtotal</span>

                  <span>₹{subtotal}</span>
                </div>

                {/* Shipping */}
                <div className='flex justify-between text-gray-600'>
                  <span>Shipping</span>

                  <span>₹{shipping}</span>
                </div>

                {/* Divider */}
                <div className='border-t pt-5 flex justify-between text-2xl font-bold text-[#2B1D16]'>
                  <span>Total</span>

                  <span>₹{total}</span>
                </div>
              </div>

              {/* Checkout */}
              <Link
                to='/checkout'
                className='
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
                '
              >
                Proceed to Checkout
              </Link>

              {/* Continue Shopping */}
              <Link
                to='/cookies'
                className='
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
                '
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
