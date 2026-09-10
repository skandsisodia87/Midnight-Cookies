import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "../../services/review.service";

const Testimonials = () => {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  if (!isLoading && testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#FFF6EC] py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
      <div className="max-w-[90%] mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1D16]">
            What Our Customers Say
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-6 sm:leading-7">
            Loved by cookie lovers across the city.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl lg:rounded-[28px] p-6 sm:p-7 lg:p-8 shadow-lg animate-pulse h-52"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
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
                {"★".repeat(testimonial.rating || 5)}
              </div>

              <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-8">
                “{testimonial.review}”
              </p>

              <div className="mt-5 sm:mt-6">
                <h4 className="text-base sm:text-lg font-bold text-[#2B1D16]">
                  {testimonial.userId?.name || "Cookie lover"}
                </h4>
                {testimonial.cookieId?.name ? (
                  <p className="text-sm text-gray-500 mt-1">
                    Reviewed {testimonial.cookieId.name}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
