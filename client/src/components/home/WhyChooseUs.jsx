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
    <section className='bg-[#1F140F] py-24 px-6 text-white'>
      <div className='max-w-7xl mx-auto'>
        {/* Heading */}
        <div className='text-center mb-16'>
          <h2 className='text-5xl font-bold'>Why Choose Us</h2>

          <p className='mt-4 text-gray-300 max-w-2xl mx-auto leading-7'>
            We focus on freshness, quality and unforgettable cookie experiences.
          </p>
        </div>

        {/* Cards */}
        <div className='grid md:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='
                bg-[#2A1C15]
                rounded-[28px]
                p-8
                text-center
                hover:-translate-y-2
                transition
                duration-300
                shadow-lg
                hover:shadow-2xl
              '
            >
              {/* Icon */}
              <div
                className='
                  w-16
                  h-16
                  mx-auto
                  bg-[#D98B2B]
                  rounded-full
                  flex
                  items-center
                  justify-center
                  mb-6
                '
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className='text-2xl font-bold mb-4'>{feature.title}</h3>

              {/* Description */}
              <p className='text-gray-300 leading-7'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
