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
    <aside className="w-64 bg-white border-r shadow-sm">
      <div className="text-2xl font-bold text-center py-6 border-b">
        🍪 Midnight Cookies
      </div>

      <nav className="mt-4">
        {menus.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 transition

              ${
                isActive
                  ? "bg-amber-100 text-amber-600 border-r-4 border-amber-500"
                  : "hover:bg-gray-100"
              }`
            }
          >
            {item.icon}

            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
