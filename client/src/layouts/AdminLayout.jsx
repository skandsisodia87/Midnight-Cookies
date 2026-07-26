import { Outlet } from "react-router-dom";
import Sidebar from "./admin/Sidebar";
import Header from "./admin/Header";

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
