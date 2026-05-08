import { FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CookieCard = ({ cookie }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className='bg-white rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl transition duration-300'
    >
      {/* Image */}
      <div className='overflow-hidden h-64'>
        <img
          src={cookie.image}
          alt={cookie.name}
          className='w-full h-full object-cover hover:scale-110 transition duration-500'
        />
      </div>

      {/* Content */}
      <div className='p-5'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-bold text-[#2B1D16]'>{cookie.name}</h3>

          <span className='bg-[#FFF1DD] text-[#D98B2B] px-3 py-1 rounded-full text-sm font-semibold'>
            {cookie.category}
          </span>
        </div>

        <p className='text-gray-600 mt-3 text-sm leading-6 line-clamp-2'>
          {cookie.description}
        </p>

        {/* Price */}
        <div className='mt-4 flex items-center gap-3'>
          <span className='text-2xl font-bold text-[#D98B2B]'>
            ₹{cookie.discountPrice}
          </span>

          <span className='text-gray-400 line-through'>₹{cookie.price}</span>
        </div>

        {/* Buttons */}
        <div className='mt-5 flex gap-3'>
          <button className='flex-1 bg-[#D98B2B] hover:bg-[#c97818] text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition'>
            <FiShoppingCart />
            Add to Cart
          </button>

          <Link
            to={`/cookies/${cookie.slug}`}
            className='border border-[#D98B2B] px-5 py-3 rounded-full hover:bg-[#D98B2B] hover:text-white transition'
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CookieCard;
