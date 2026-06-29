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
    <section className="bg-[#FFF6EC] py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1D16]">
            What Our Customers Say
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-6 sm:leading-7">
            Loved by cookie lovers across the city.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-3xl
                lg:rounded-[28px]
                p-6
                sm:p-7
                lg:p-8
                shadow-lg
                hover:shadow-2xl
                transition-shadow
                duration-300
              "
            >
              <div className="flex mb-4 sm:mb-5 text-[#D98B2B] text-xl sm:text-2xl">
                ★★★★★
              </div>

              <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-8">
                “{testimonial.review}”
              </p>

              <div className="mt-5 sm:mt-6">
                <h4 className="text-base sm:text-lg font-bold text-[#2B1D16]">
                  {testimonial.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
