import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroCookie from "../../assets/images/hero-cookie.png";

const HeroSection = () => {
  const scrollToFeatured = () => {
    const target = document.getElementById("featured-cookies");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="bg-[#1F140F] text-white min-h-[90vh] flex items-center px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Freshly
            <span className="text-[#D98B2B]"> Baked </span>
            Cookies
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-lg leading-8">
            Warm, soft and delicious cookies delivered straight to your
            doorstep.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={scrollToFeatured}
              className="bg-[#D98B2B] hover:bg-[#c97818] px-6 py-3 rounded-full font-semibold transition cursor-pointer"
            >
              Order Now
            </button>

            <Link
              to={"/cookies"}
              className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
            >
              Explore Menu
            </Link>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src={HeroCookie}
            alt="cookies"
            className="w-full max-w-md rounded-[40px] shadow-2xl object-cover h-150"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
