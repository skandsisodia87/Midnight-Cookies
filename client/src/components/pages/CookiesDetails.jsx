// src/pages/CookieDetails.jsx

import { FiShoppingCart, FiMinus, FiPlus, FiStar } from "react-icons/fi";

import { useState } from "react";
import { useParams } from "react-router-dom";

const cookie = {
  name: "Oreo Dream",

  slug: "oreo-dream",

  description:
    "Loaded with crunchy Oreo pieces, creamy texture and rich chocolate flavor. Freshly baked every day for the perfect cookie experience.",

  image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",

  category: "Oreo",

  price: 249,

  discountPrice: 179,

  stock: 12,

  weight: "250g",

  rating: 4.8,

  totalReviews: 124,

  ingredients: [
    "Oreo Crumbs",
    "Dark Chocolate",
    "Butter",
    "Vanilla",
    "Premium Flour",
  ],

  reviews: [
    {
      name: "Aarav Sharma",
      rating: 5,
      comment: "Absolutely delicious and super soft cookies!",
    },

    {
      name: "Priya Verma",
      rating: 4,
      comment: "Loved the Oreo crunch and chocolate flavor.",
    },
  ],
};

const CookieDetails = () => {
  const { slug } = useParams();

  const [quantity, setQuantity] = useState(1);

  return (
    <div className='min-h-screen bg-[#FFF6EC] px-6 py-12'>
      <div className='max-w-7xl mx-auto'>
        {/* Main Section */}
        <div className='grid lg:grid-cols-2 gap-12 items-start'>
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
                src={cookie.image}
                alt={cookie.name}
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
              {cookie.category}
            </span>

            {/* Title */}
            <h1 className='text-5xl font-bold text-[#2B1D16] mt-6 leading-tight'>
              {cookie.name}
            </h1>

            {/* Rating */}
            <div className='flex items-center gap-3 mt-5'>
              <div className='flex items-center text-[#D98B2B]'>
                <FiStar fill='#D98B2B' />

                <span className='ml-2 font-semibold'>{cookie.rating}</span>
              </div>

              <span className='text-gray-500'>
                ({cookie.totalReviews} reviews)
              </span>
            </div>

            {/* Description */}
            <p className='mt-8 text-gray-600 leading-8 text-lg'>
              {cookie.description}
            </p>

            {/* Price */}
            <div className='mt-8 flex items-center gap-4'>
              <span className='text-5xl font-bold text-[#D98B2B]'>
                ₹{cookie.discountPrice}
              </span>

              <span className='text-2xl text-gray-400 line-through'>
                ₹{cookie.price}
              </span>
            </div>

            {/* Weight */}
            <div className='mt-8'>
              <h3 className='font-bold text-[#2B1D16] mb-3'>Weight</h3>

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
                {cookie.weight}
              </div>
            </div>

            {/* Ingredients */}
            <div className='mt-8'>
              <h3 className='font-bold text-[#2B1D16] mb-4'>Ingredients</h3>

              <div className='flex flex-wrap gap-3'>
                {cookie.ingredients.map((ingredient, index) => (
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
              <h3 className='font-bold text-[#2B1D16] mb-4'>Quantity</h3>

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
                  className='
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    hover:bg-[#FFF6EC]
                  '
                >
                  <FiMinus />
                </button>

                <span className='px-6 text-xl font-semibold'>{quantity}</span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
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

            {/* Buttons */}
            <div className='mt-10 flex flex-col sm:flex-row gap-5'>
              <button
                className='
                  flex-1
                  bg-[#D98B2B]
                  hover:bg-[#c97818]
                  text-white
                  py-5
                  rounded-full
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-3
                  transition
                  text-lg
                '
              >
                <FiShoppingCart size={22} />
                Add To Cart
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

            {/* Stock */}
            <p className='mt-6 text-green-600 font-semibold'>
              {cookie.stock} items available
            </p>
          </div>
        </div>

        {/* Reviews */}
        <div className='mt-24'>
          <h2 className='text-4xl font-bold text-[#2B1D16] mb-10'>
            Customer Reviews
          </h2>

          <div className='grid md:grid-cols-2 gap-8'>
            {cookie.reviews.map((review, index) => (
              <div
                key={index}
                className='
                    bg-white
                    rounded-[28px]
                    shadow-lg
                    p-8
                  '
              >
                <div className='flex items-center justify-between'>
                  <h3 className='text-xl font-bold text-[#2B1D16]'>
                    {review.name}
                  </h3>

                  <div className='flex items-center text-[#D98B2B]'>
                    <FiStar fill='#D98B2B' />

                    <span className='ml-2'>{review.rating}</span>
                  </div>
                </div>

                <p className='mt-5 text-gray-600 leading-8'>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieDetails;
