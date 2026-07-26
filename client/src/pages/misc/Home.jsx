import Categories from "../../components/home/Categories";
import FeaturedCookies from "../../components/home/FeaturedCookies";
import HeroSection from "../../components/home/HeroSection";
import Newsletter from "../../components/home/Newsletter";
import Testimonials from "../../components/home/Testimonials";
import WhyChooseUs from "../../components/home/WhyChooseUs";

function Home() {
  return (
    <div className='bg-[#FFF6EC] min-h-screen overflow-hidden'>
      <HeroSection />
      <FeaturedCookies />
      <Categories />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </div>
  );
}

export default Home;
