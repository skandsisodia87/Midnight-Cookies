const testimonials = [
  {
    name: "Aarav Sharma",
    review:
      "The best cookies I’ve ever had. Fresh, warm and absolutely delicious!",
  },

  {
    name: "Priya Verma",
    review:
      "Midnight Cookies feels like a luxury dessert brand. Loved every bite.",
  },

  {
    name: "Rohan Gupta",
    review: "Super fast delivery and amazing quality cookies.",
  },
];

const Testimonials = () => {
  return (
    <section className='bg-[#FFF6EC] py-24 px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Heading */}
        <div className='text-center mb-16'>
          <h2 className='text-5xl font-bold text-[#2B1D16]'>
            What Our Customers Say
          </h2>

          <p className='mt-4 text-gray-600 max-w-2xl mx-auto leading-7'>
            Loved by cookie lovers across the city.
          </p>
        </div>

        {/* Cards */}
        <div className='grid md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className='
                bg-white
                rounded-[28px]
                p-8
                shadow-lg
                hover:shadow-2xl
                transition
              '
            >
              <div className='flex mb-5 text-[#D98B2B] text-2xl'>★★★★★</div>

              <p className='text-gray-600 leading-8'>“{testimonial.review}”</p>

              <div className='mt-6'>
                <h4 className='font-bold text-[#2B1D16]'>{testimonial.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
