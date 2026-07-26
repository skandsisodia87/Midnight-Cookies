import { Outlet } from "react-router-dom";
import Navbar from "../layouts/user/Navbar";
import Footer from "../layouts/user/Footer";

const MainLayout = () => {
  return (
    <div className='min-h-screen bg-[#FFF6EC]'>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
