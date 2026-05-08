const Newsletter = () => {
  return (
    <section className='bg-[#1F140F] py-24 px-6'>
      <div
        className='
          max-w-4xl
          mx-auto
          bg-[#2A1C15]
          rounded-[36px]
          p-10
          md:p-16
          text-center
          text-white
        '
      >
        <h2 className='text-4xl md:text-5xl font-bold leading-tight'>
          Get Fresh Cookie Updates 🍪
        </h2>

        <p className='mt-5 text-gray-300 leading-7 max-w-2xl mx-auto'>
          Subscribe to receive special offers, newly baked cookies and exclusive
          discounts.
        </p>

        {/* Form */}
        <div className='mt-10 flex flex-col md:flex-row gap-4'>
          <input
            type='email'
            placeholder='Enter your email'
            className='
              flex-1
              px-6
              py-4
              rounded-full
              bg-white
              text-black
              outline-none
            '
          />

          <button
            className='
              bg-[#D98B2B]
              hover:bg-[#c97818]
              px-8
              py-4
              rounded-full
              font-semibold
              transition
            '
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
