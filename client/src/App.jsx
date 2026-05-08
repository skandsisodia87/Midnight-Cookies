import HeroSection from "./components/home/HeroSection";
import Navbar from "./components/layout/Navbar";
import "./index.css";

function App() {
  return (
    <div className='bg-[#FFF6EC] min-h-screen'>
      <Navbar />
      <HeroSection />
    </div>
  );
}

export default App;
