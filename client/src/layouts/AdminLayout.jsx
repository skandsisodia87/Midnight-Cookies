import { Outlet } from "react-router-dom";
import Sidebar from "./admin/Sidebar";
import Header from "./admin/Header";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#FFF6EC] text-[#2B1D16]">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 bg-[radial-gradient(circle_at_top_left,rgba(217,139,43,0.10),transparent_35%),linear-gradient(135deg,#FFF8F2_0%,#FFF6EC_100%)] p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
