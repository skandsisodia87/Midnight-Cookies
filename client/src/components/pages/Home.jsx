import Categories from "../home/Categories";
import FeaturedCookies from "../home/FeaturedCookies";
import HeroSection from "../home/HeroSection";
import Newsletter from "../home/Newsletter";
import Testimonials from "../home/Testimonials";
import WhyChooseUs from "../home/WhyChooseUs";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

function Home() {
  return (
    <div className='bg-[#FFF6EC] min-h-screen overflow-hidden'>
      <Navbar />
      <HeroSection />
      <FeaturedCookies />
      <Categories />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
