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
  FiX,
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

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-all duration-300 lg:hidden ${
          sidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      <aside
        className={`
          flex h-full w-72 shrink-0 flex-col
          bg-[#1F140F]
          lg:relative
          fixed left-0 top-0 z-50
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between border-b border-[#34261D] px-6 py-5 lg:hidden">
          <p className="text-lg font-bold text-[#F5C16C]">Menu</p>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 transition hover:bg-white/10"
          >
            <FiX size={22} color="white"/>
          </button>
        </div>

        <div className="border-b border-[#34261D] px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center text-2xl">
              🍪
            </div>

            <div>
              <p className="bg-linear-to-r from-[#D98B2B] via-yellow-400 to-[#D98B2B] bg-clip-text text-lg font-extrabold text-transparent">
                Midnight Cookies
              </p>

              <p className="text-sm text-[#E5C79A]">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-3">
          {menus.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#D98B2B] text-[#1F140F] shadow-lg"
                    : "text-[#F4E7D3] hover:bg-white/10 hover:text-[#F5C16C]"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-[#34261D] p-4">
          <div className="rounded-2xl bg-[#2A1C15] p-4 text-sm text-[#F4E7D3]">
            <p className="font-semibold">Store Status</p>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
              <span className="text-[#E5C79A]">
                Your bakery is online and ready.
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
