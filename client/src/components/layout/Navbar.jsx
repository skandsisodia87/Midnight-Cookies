import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import useAuthStore from "../../store/authStore";
import { logoutUser } from "../../services/auth.service";
import { toast } from "sonner";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const [btnDisable, setBtnDisable] = useState(false);

  const logoutHandler = async () => {
    try {
      setBtnDisable(true);

      await toast.promise(
        logoutUser(),

        {
          loading: "Logging out...",

          success: () => {
            logout();
            return "Logout successful 🍪";
          },

          error: (error) => error.response?.data?.message || "Logout failed",
        },
      );
    } finally {
      setBtnDisable(false);
    }
  };

  return (
    <nav className='bg-[#1F140F] text-white px-6 py-4 sticky top-0 z-50 shadow-lg'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        {/* Logo */}
        <Link
          to='/'
          className='text-2xl font-bold tracking-wide text-[#F5C16C]'
        >
          Midnight Cookies
        </Link>

        {/* Nav Links */}
        <div className='hidden md:flex items-center gap-8 text-sm font-medium'>
          <Link to='/' className='hover:text-[#F5C16C] transition'>
            Home
          </Link>

          <Link to='/cookies' className='hover:text-[#F5C16C] transition'>
            Cookies
          </Link>

          {isAuthenticated && (
            <Link to='/orders' className='hover:text-[#F5C16C] transition'>
              Orders
            </Link>
          )}
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-4'>
          {isAuthenticated ? (
            <button
              className='hidden md:block border border-[#D98B2B] px-4 py-2 rounded-full hover:bg-[#D98B2B] transition'
              onClick={logoutHandler}
              disabled={btnDisable}
            >
              Logout
            </button>
          ) : (
            <Link
              to='/login'
              className='hidden md:block border border-[#D98B2B] px-4 py-2 rounded-full hover:bg-[#D98B2B] transition'
            >
              Login
            </Link>
          )}

          <Link to='/cart' className='relative'>
            <FiShoppingCart size={24} />
            {isAuthenticated && (
              <span className='absolute -top-2 -right-2 bg-[#D98B2B] text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                2
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
