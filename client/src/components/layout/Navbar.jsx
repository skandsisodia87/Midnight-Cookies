import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiPackage,
  FiPhone,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";
import { RxCookie } from "react-icons/rx";
import { IoMdCart } from "react-icons/io";
import useAuthStore from "../../store/authStore";
import { logoutUser } from "../../services/auth.service";
import { toast } from "sonner";
import useCartStore from "../../store/cartStore";

const Navbar = () => {
  const { clearCart } = useCartStore();
  const { isAuthenticated, logout } = useAuthStore();
  const [btnDisable, setBtnDisable] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const count = useCartStore((state) => state.cartItems.length);

  const logoutHandler = async () => {
    try {
      setBtnDisable(true);

      await toast.promise(logoutUser(), {
        loading: "Logging out...",
        success: () => {
          logout();
          clearCart();
          return "Logout successful 🍪";
        },
        error: (error) => error.response?.data?.message || "Logout failed",
      });
    } finally {
      setBtnDisable(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${
      isActive
        ? "bg-[#D98B2B]/20 text-[#F5C16C]"
        : "text-[#F4E7D3] hover:bg-white/10 hover:text-[#F5C16C]"
    }`;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#1F140F] px-6 py-4 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="rounded-full border border-white/20 p-2.5 transition hover:bg-white/10 md:hidden"
              aria-label="Open navigation menu"
            >
              <FiMenu size={20} />
            </button>

            <Link
              to="/"
              className="text-2xl font-bold tracking-wide bg-linear-to-r from-[#D98B2B] via-yellow-400 to-[#D98B2B] bg-clip-text text-transparent"
              onClick={closeMenu}
            >
              Midnight Cookies
            </Link>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/cookies" className={navLinkClass}>
              Cookies
            </NavLink>

            <NavLink
              to="/orders"
              onClick={(e) => {
                if (!isAuthenticated) {
                  e.preventDefault();
                }
              }}
              className={({ isActive }) =>
                `${navLinkClass({ isActive })} ${
                  !isAuthenticated ? "cursor-not-allowed opacity-50" : ""
                }`
              }
            >
              Orders
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                className="hidden rounded-full border border-[#D98B2B] px-4 py-2 transition hover:bg-[#D98B2B] md:block"
                onClick={logoutHandler}
                disabled={btnDisable}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden rounded-full border border-[#D98B2B] px-4 py-2 transition hover:bg-[#D98B2B] md:block"
                onClick={closeMenu}
              >
                Login
              </Link>
            )}

            {isAuthenticated && (
              <Link to="/cart" className="relative" onClick={closeMenu}>
                <IoMdCart size={24} />
                {count > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#D98B2B] text-xs">
                    {count}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-black/60 transition duration-300 ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-[#D98B2B]/20 bg-[#24130D] p-5 shadow-2xl transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#F5C16C]">
              Explore
            </p>
            <h2 className="text-xl font-semibold text-white">
              Midnight Cookies
            </h2>
          </div>
          <button
            type="button"
            onClick={closeMenu}
            className="rounded-full border border-white/15 p-2 text-[#F4E7D3] transition hover:bg-white/10"
            aria-label="Close navigation menu"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="space-y-2">
          <NavLink to="/" onClick={closeMenu} className={navLinkClass}>
            <FiHome size={18} />
            <span>Home</span>
          </NavLink>

          <NavLink to="/cookies" onClick={closeMenu} className={navLinkClass}>
            <RxCookie size={18} />
            <span>Cookies</span>
          </NavLink>

          <NavLink
            to="/orders"
            onClick={(e) => {
              if (!isAuthenticated) {
                e.preventDefault();
              }
              closeMenu();
            }}
            className={({ isActive }) =>
              `${navLinkClass({ isActive })} ${
                !isAuthenticated ? "cursor-not-allowed opacity-50" : ""
              }`
            }
          >
            <FiPackage size={18} />
            <span>Orders</span>
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu} className={navLinkClass}>
            <FiPhone size={18} />
            <span>Contact</span>
          </NavLink>
        </div>

        <div className="mt-auto space-y-3 border-t border-white/10 pt-4">
          {isAuthenticated ? (
            <button
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D98B2B] px-4 py-2.5 text-sm font-medium text-[#F5C16C] transition hover:bg-[#D98B2B] hover:text-white"
              onClick={() => {
                closeMenu();
                logoutHandler();
              }}
              disabled={btnDisable}
            >
              <FiLogOut size={16} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D98B2B] px-4 py-2.5 text-sm font-medium text-[#F5C16C] transition hover:bg-[#D98B2B] hover:text-white"
            >
              <FiLogIn size={16} />
              Login
            </Link>
          )}

          <Link
            to="/cart"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 rounded-full bg-[#D98B2B] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#bf7120]"
          >
            <IoMdCart size={16} />
            View Cart
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
