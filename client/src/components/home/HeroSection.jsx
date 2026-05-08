import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className='bg-[#1F140F] text-white min-h-[90vh] flex items-center px-6'>
      <div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center'>
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='text-5xl md:text-7xl font-bold leading-tight'>
            Freshly
            <span className='text-[#D98B2B]'> Baked </span>
            Cookies
          </h1>

          <p className='mt-6 text-lg text-gray-300 max-w-lg leading-8'>
            Warm, soft and delicious cookies delivered straight to your
            doorstep.
          </p>

          <div className='mt-8 flex gap-4'>
            <button className='bg-[#D98B2B] hover:bg-[#c97818] px-6 py-3 rounded-full font-semibold transition'>
              Order Now
            </button>

            <button className='border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition'>
              Explore Menu
            </button>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className='flex justify-center'
        >
          <img
            src='https://images.unsplash.com/photo-1499636136210-6f4ee915583e'
            alt='cookies'
            className='w-full max-w-md rounded-[40px] shadow-2xl object-cover'
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
