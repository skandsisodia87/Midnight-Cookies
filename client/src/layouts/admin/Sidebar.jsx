import { NavLink } from "react-router-dom";

import {
  FiGrid,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiTag,
  FiMail,
  FiSettings,
  FiBarChart2,
} from "react-icons/fi";

const menus = [
  {
    name: "Dashboard",
    icon: <FiGrid />,
    path: "/admin",
  },
  {
    name: "Products",
    icon: <FiPackage />,
    path: "/admin/products",
  },
  {
    name: "Orders",
    icon: <FiShoppingBag />,
    path: "/admin/orders",
  },
  {
    name: "Customers",
    icon: <FiUsers />,
    path: "/admin/customers",
  },
  {
    name: "Coupons",
    icon: <FiTag />,
    path: "/admin/coupons",
  },
  {
    name: "Newsletter",
    icon: <FiMail />,
    path: "/admin/newsletter",
  },
  {
    name: "Analytics",
    icon: <FiBarChart2 />,
    path: "/admin/analytics",
  },
  {
    name: "Settings",
    icon: <FiSettings />,
    path: "/admin/settings",
  },
];

const Sidebar = () => {
  return (
    <aside className="flex w-72 flex-col border-r border-[#F3E4D4] bg-[#1F140F] text-[#F8EBDD] shadow-[12px_0_40px_rgba(31,20,15,0.08)]">
      <div className="border-b border-[#34261D] px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center text-2xl">
            🍪
          </div>

          <div>
            <p className="text-lg font-extrabold bg-linear-to-r from-[#D98B2B] via-yellow-400 to-[#D98B2B] bg-clip-text text-transparent">
              Midnight Cookies
            </p>
            <p className="text-sm text-[#E5C79A]">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="mt-4 space-y-1 px-3">
        {menus.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#D98B2B] text-[#1F140F] shadow-lg"
                  : "text-[#F4E7D3] hover:bg-white/10 hover:text-[#F5C16C]"
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-[#34261D] p-4">
        <div className="rounded-2xl bg-[#2A1C15] p-4 text-sm text-[#F4E7D3]">
          <p className="font-semibold">Store status</p>
          <p className="mt-1 text-[#E5C79A]">
            Your bakery is online and ready.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
