import { FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import placeholderCookie from "../../assets/images/placeholder-cookie.png";

const CookieCard = ({ cookie }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className='
        bg-white
        rounded-[28px]
        overflow-hidden
        shadow-lg
        hover:shadow-2xl
        transition
        duration-300
        flex
        flex-col
        h-full
      '
    >
      {/* Image */}
      <div className='overflow-hidden h-64'>
        <img
          src={cookie.images?.[0] || placeholderCookie}
          alt={cookie.name}
          className='
            w-full
            h-full
            object-cover
            hover:scale-110
            transition
            duration-500
          '
        />
      </div>

      {/* Content */}
      <div className='p-5 flex flex-col flex-1'>
        {/* Top */}
        <div>
          {/* Name + Category */}
          <div className='flex items-start justify-between gap-3'>
            <h3
              className='
                text-xl
                font-bold
                text-[#2B1D16]
                leading-snug
              '
            >
              {cookie.name}
            </h3>

            <span
              className='
                bg-[#FFF1DD]
                text-[#D98B2B]
                px-3
                py-1
                rounded-full
                text-sm
                font-semibold
                whitespace-nowrap
              '
            >
              {cookie.category}
            </span>
          </div>

          {/* Description */}
          <p
            className='
              text-gray-600
              mt-3
              text-sm
              leading-6
              line-clamp-2
              min-h-12
            '
          >
            {cookie.description}
          </p>

          {/* Price */}
          <div className='mt-4 flex items-center gap-3'>
            <span className='text-2xl font-bold text-[#D98B2B]'>
              ₹{cookie.discountPrice}
            </span>

            <span className='text-gray-400 line-through'>₹{cookie.price}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className='mt-auto pt-6 flex gap-3'>
          <button
            className='
              flex-1
              bg-[#D98B2B]
              hover:bg-[#c97818]
              text-white
              py-3
              rounded-full
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              transition
            '
          >
            <FiShoppingCart />
            Add to Cart
          </button>

          <Link
            to={`/cookies/${cookie.slug}`}
            className='
              border
              border-[#D98B2B]
              px-5
              py-3
              rounded-full
              hover:bg-[#D98B2B]
              hover:text-white
              transition
              flex
              items-center
              justify-center
            '
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CookieCard;
