import { FiClock, FiGift, FiHeart } from "react-icons/fi";

const features = [
  {
    icon: <FiHeart size={30} />,
    title: "Made With Love",
    description: "Every cookie is freshly baked using premium ingredients.",
  },
  {
    icon: <FiClock size={30} />,
    title: "Fast Delivery",
    description: "Warm cookies delivered quickly to your doorstep.",
  },
  {
    icon: <FiGift size={30} />,
    title: "Premium Quality",
    description: "Luxury bakery experience with every order.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#1F140F] py-12 sm:py-16 lg:py-24 px-4 sm:px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Why Choose Us
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-6 sm:leading-7">
            We focus on freshness, quality and unforgettable cookie experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                bg-[#2A1C15]
                rounded-3xl
                lg:rounded-[28px]
                p-6
                sm:p-7
                lg:p-8
                text-center
                hover:-translate-y-2
                transition-all
                duration-300
                shadow-lg
                hover:shadow-2xl
              "
            >
              <div
                className="
                  w-14
                  h-14
                  sm:w-16
                  sm:h-16
                  mx-auto
                  bg-[#D98B2B]
                  rounded-full
                  flex
                  items-center
                  justify-center
                  mb-5
                  sm:mb-6
                "
              >
                {feature.icon}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                {feature.title}
              </h3>

              <p className="text-sm sm:text-base text-gray-300 leading-6 sm:leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
