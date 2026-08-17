import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import constants from "../../common/constants";

const Footer = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <footer className="bg-[#1F140F] text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-3xl font-bold bg-linear-to-r from-[#D98B2B] via-yellow-400 to-[#D98B2B] bg-clip-text text-transparent">
            {constants.APPICATION_NAME}
          </h2>

          <p className="mt-5 text-gray-300 leading-7">
            Freshly baked premium cookies delivered with love.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-5">Quick Links</h3>

          <ul className="space-y-3 text-gray-300">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `
                    transition
                    hover:text-[#D98B2B]
                    ${isActive ? "text-[#D98B2B] font-semibold" : ""}
                  `
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/cookies"
                className={({ isActive }) =>
                  `
                    transition
                    hover:text-[#D98B2B]
                    ${isActive ? "text-[#D98B2B] font-semibold" : ""}
                  `
                }
              >
                Cookies
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/orders"
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                  }
                }}
                className={({ isActive }) =>
                  `
                    transition
                    hover:text-[#D98B2B]
                    ${isActive ? "text-[#D98B2B] font-semibold" : ""}
                    ${!isAuthenticated ? "cursor-not-allowed opacity-50" : ""}
                  `
                }
              >
                Orders
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `
                    transition
                    hover:text-[#D98B2B]
                    ${isActive ? "text-[#D98B2B] font-semibold" : ""}
                  `
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-5">Contact</h3>

          <ul className="space-y-3 text-gray-300">
            <li>Ghaziabad, Uttar Pradesh</li>
            <li>fresh.midnight.cookies@gmail.com</li>
            <li>+91 67123387446</li>
          </ul>
        </div>
        {/* Social */}
        <div>
          <h3 className="text-xl font-semibold mb-5">Follow Us</h3>

          <div className="flex gap-4">
            <div
              className="
                w-12
                h-12
                rounded-full
                bg-[#2A1C15]
                flex
                items-center
                justify-center
                hover:bg-[#D98B2B]
                transition
                cursor-pointer
              "
            >
              <FiInstagram size={20} />
            </div>

            <div
              className="
                w-12
                h-12
                rounded-full
                bg-[#2A1C15]
                flex
                items-center
                justify-center
                hover:bg-[#D98B2B]
                transition
                cursor-pointer
              "
            >
              <FiFacebook size={20} />
            </div>

            <div
              className="
                w-12
                h-12
                rounded-full
                bg-[#2A1C15]
                flex
                items-center
                justify-center
                hover:bg-[#D98B2B]
                transition
                cursor-pointer
              "
            >
              <FiTwitter size={20} />
            </div>
          </div>
        </div>
      </div>
      <div
        className="
          border-t
          border-[#3b2a22]
          mt-16
          pt-8
          text-center
          text-gray-400
        "
      >
        © 2026 {constants.APPICATION_NAME}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
