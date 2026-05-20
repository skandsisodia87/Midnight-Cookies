import { FiMail, FiMapPin, FiPhone, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import constants from "../../common/constants";

export default function Contact() {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen bg-[#FFF6EC] py-16 px-4 md:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center'>
          <h1 className='text-5xl font-bold text-[#2B1D16]'>Contact Us 🍪</h1>

          <p className='mt-5 text-gray-600 max-w-2xl mx-auto leading-8 text-lg'>
            Have questions, feedback, or craving support? We'd love to hear from
            you. Reach out to our team anytime.
          </p>
        </div>

        <div className='mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='bg-white rounded-4xl shadow-xl p-8'>
            <h2 className='text-3xl font-semibold text-[#2B1D16]'>
              Send a Message
            </h2>

            <p className='mt-3 text-gray-500'>
              Fill out the form below and we'll get back to you shortly.
            </p>

            <form className='mt-8 space-y-6'>
              <div>
                <label className='block mb-2 font-medium text-[#2B1D16]'>
                  Full Name
                </label>

                <input
                  type='text'
                  placeholder='Enter your full name'
                  className='
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    focus:border-[#D98B2B]
                    transition
                  '
                />
              </div>

              <div>
                <label className='block mb-2 font-medium text-[#2B1D16]'>
                  Email Address
                </label>

                <input
                  type='email'
                  placeholder='Enter your email'
                  className='
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    focus:border-[#D98B2B]
                    transition
                  '
                />
              </div>

              <div>
                <label className='block mb-2 font-medium text-[#2B1D16]'>
                  Subject
                </label>

                <input
                  type='text'
                  placeholder='Enter subject'
                  className='
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    focus:border-[#D98B2B]
                    transition
                  '
                />
              </div>

              <div>
                <label className='block mb-2 font-medium text-[#2B1D16]'>
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder='Write your message here...'
                  className='
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    resize-none
                    focus:border-[#D98B2B]
                    transition
                  '
                />
              </div>

              <button
                type='submit'
                className='
                  w-full
                  bg-[#D98B2B]
                  hover:bg-[#c97818]
                  text-white
                  py-4
                  rounded-full
                  font-semibold
                  text-lg
                  transition
                  cursor-pointer
                '
              >
                Send Message ✨
              </button>
            </form>
          </div>

          <div className='space-y-6'>
            <div className='bg-white rounded-4xl shadow-xl p-8'>
              <h2 className='text-3xl font-semibold text-[#2B1D16]'>
                Get in Touch
              </h2>

              <p className='mt-3 text-gray-500 leading-7'>
                We'd love to help you with your orders, support, or any
                questions about our freshly baked cookies.
              </p>

              <div className='mt-8 space-y-6'>
                <div className='flex items-start gap-4'>
                  <div
                    className='
                      h-14
                      w-14
                      rounded-2xl
                      bg-[#FFF3E2]
                      flex
                      items-center
                      justify-center
                      shrink-0
                    '
                  >
                    <FiMail className='text-[#D98B2B] text-2xl' />
                  </div>

                  <div>
                    <h3 className='font-semibold text-[#2B1D16]'>Email</h3>

                    <p className='mt-1 text-gray-600'>
                      {constants.CONTACT_EMAIL}
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div
                    className='
                      h-14
                      w-14
                      rounded-2xl
                      bg-[#FFF3E2]
                      flex
                      items-center
                      justify-center
                      shrink-0
                    '
                  >
                    <FiPhone className='text-[#D98B2B] text-2xl' />
                  </div>

                  <div>
                    <h3 className='font-semibold text-[#2B1D16]'>Phone</h3>

                    <p className='mt-1 text-gray-600'>
                      {constants.CONTACT_PHONE}
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div
                    className='
                      h-14
                      w-14
                      rounded-2xl
                      bg-[#FFF3E2]
                      flex
                      items-center
                      justify-center
                      shrink-0
                    '
                  >
                    <FiMapPin className='text-[#D98B2B] text-2xl' />
                  </div>

                  <div>
                    <h3 className='font-semibold text-[#2B1D16]'>Location</h3>

                    <p className='mt-1 text-gray-600 leading-7'>
                      {constants.LOCATION}
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div
                    className='
                      h-14
                      w-14
                      rounded-2xl
                      bg-[#FFF3E2]
                      flex
                      items-center
                      justify-center
                      shrink-0
                    '
                  >
                    <FiClock className='text-[#D98B2B] text-2xl' />
                  </div>

                  <div>
                    <h3 className='font-semibold text-[#2B1D16]'>
                      Working Hours
                    </h3>

                    <p className='mt-1 text-gray-600 leading-7'>
                      Monday - Sunday <br />
                      9:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className='
                bg-linear-to-br
                from-[#D98B2B]
                to-[#B76A12]
                rounded-4xl
                p-8
                text-white
                overflow-hidden
                relative
              '
            >
              <div className='relative z-10'>
                <h2 className='text-3xl font-semibold'>
                  Freshly Baked Daily 🍪
                </h2>

                <p className='mt-4 text-white/90 leading-7 max-w-md'>
                  Our cookies are made fresh every day with premium ingredients
                  and lots of love.
                </p>

                <button
                  onClick={() => navigate("/cookies")}
                  className='
                    mt-6
                    bg-white
                    text-[#D98B2B]
                    px-6
                    py-3
                    rounded-full
                    font-semibold
                    hover:bg-[#FFF3E2]
                    transition
                    cursor-pointer
                  '
                >
                  Explore Cookies
                </button>
              </div>

              <div
                className='
                  absolute
                  -bottom-10
                  -right-10
                  h-48
                  w-48
                  rounded-full
                  bg-white/10
                '
              />

              <div
                className='
                  absolute
                  top-10
                  right-16
                  h-20
                  w-20
                  rounded-full
                  bg-white/10
                '
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
