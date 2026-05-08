import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className='bg-[#1F140F] text-white pt-20 pb-10 px-6'>
      <div className='max-w-7xl mx-auto grid md:grid-cols-4 gap-10'>
        {/* Brand */}
        <div>
          <h2 className='text-3xl font-bold text-[#F5C16C]'>
            Midnight Cookies
          </h2>

          <p className='mt-5 text-gray-300 leading-7'>
            Freshly baked premium cookies delivered with love.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className='text-xl font-semibold mb-5'>Quick Links</h3>

          <ul className='space-y-3 text-gray-300'>
            <li className='hover:text-[#D98B2B] cursor-pointer transition'>
              Home
            </li>

            <li className='hover:text-[#D98B2B] cursor-pointer transition'>
              Cookies
            </li>

            <li className='hover:text-[#D98B2B] cursor-pointer transition'>
              Orders
            </li>

            <li className='hover:text-[#D98B2B] cursor-pointer transition'>
              Contact
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className='text-xl font-semibold mb-5'>Contact</h3>

          <ul className='space-y-3 text-gray-300'>
            <li>Ghaziabad, Uttar Pradesh</li>
            <li>fresh.midnight.cookies@gmail.com</li>
            <li>+91 67123387446</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className='text-xl font-semibold mb-5'>Follow Us</h3>

          <div className='flex gap-4'>
            <div
              className='
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
              '
            >
              <FiInstagram size={20} />
            </div>

            <div
              className='
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
              '
            >
              <FiFacebook size={20} />
            </div>

            <div
              className='
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
              '
            >
              <FiTwitter size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        className='
          border-t
          border-[#3b2a22]
          mt-16
          pt-8
          text-center
          text-gray-400
        '
      >
        © 2026 Midnight Cookies. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
