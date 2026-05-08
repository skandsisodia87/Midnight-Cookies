import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
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

          <Link to='/orders' className='hover:text-[#F5C16C] transition'>
            Orders
          </Link>
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-4'>
          <Link
            to='/login'
            className='hidden md:block border border-[#D98B2B] px-4 py-2 rounded-full hover:bg-[#D98B2B] transition'
          >
            Login
          </Link>

          <Link to='/cart' className='relative'>
            <FiShoppingCart size={24} />

            <span className='absolute -top-2 -right-2 bg-[#D98B2B] text-xs w-5 h-5 flex items-center justify-center rounded-full'>
              2
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
