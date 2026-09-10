import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroCookie from "../../assets/images/hero-cookie.png";
import constants from "../../common/constants";

const HeroSection = () => {
  const scrollToFeatured = () => {
    const target = document.getElementById("featured-cookies");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative bg-[#1F140F] text-white py-16 lg:py-20 px-5 sm:px-6 overflow-visible">
      <div className="max-w-[90%] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
            Freshly
            <span className="text-[#D98B2B]"> Baked </span>
            Cookies
          </h1>

          <p className="mt-5 text-base sm:text-lg text-gray-300 max-w-lg leading-7 sm:leading-8">
            Warm, soft and delicious cookies delivered straight to your
            doorstep.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={scrollToFeatured}
              className="
                bg-[#D98B2B]
                hover:bg-[#c97818]
                px-5 sm:px-6
                py-3
                rounded-full
                font-semibold
                text-sm sm:text-base
                transition
                cursor-pointer
              "
            >
              Order Now
            </button>

            <Link
              to={constants.ROUTES.COOKIES}
              className="
                border
                border-white
                px-5 sm:px-6
                py-3
                rounded-full
                text-sm sm:text-base
                hover:bg-white
                hover:text-black
                transition
              "
            >
              Explore Menu
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="
            flex
            justify-center
            lg:justify-end
            relative
            z-20
            mt-10
            lg:mt-0
            lg:translate-y-10
          "
        >
          <img
            src={HeroCookie}
            alt="cookies"
            className="
              w-full
              max-w-70
              sm:max-w-85
              md:max-w-95
              lg:max-w-105
              xl:max-w-115
              h-auto
              max-h-138
              lg:max-h-162
              rounded-3xl
              lg:rounded-4xl
              shadow-2xl
              object-cover
            "
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
