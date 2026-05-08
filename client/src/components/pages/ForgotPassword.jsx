import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";

const ForgotPassword = () => {
  return (
    <div className='min-h-screen bg-[#FFF6EC] flex items-center justify-center px-6 py-12'>
      <div
        className='
          w-full
          max-w-md
          bg-white
          rounded-4xl
          shadow-2xl
          p-8
        '
      >
        {/* Heading */}
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-[#2B1D16]'>
            Forgot Password 🔐
          </h1>

          <p className='mt-3 text-gray-500 leading-7'>
            Enter your email address and we’ll send you a password reset link.
          </p>
        </div>

        {/* Form */}
        <form className='mt-10 space-y-6'>
          {/* Email */}
          <div>
            <label className='block mb-2 font-medium text-[#2B1D16]'>
              Email Address
            </label>

            <div
              className='
                flex
                items-center
                border
                border-gray-300
                rounded-full
                px-5
                py-4
                focus-within:border-[#D98B2B]
              '
            >
              <FiMail className='text-gray-400' />

              <input
                type='email'
                placeholder='Enter your email'
                className='
                  w-full
                  ml-3
                  outline-none
                  bg-transparent
                '
              />
            </div>
          </div>

          {/* Submit */}
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
              transition
            '
          >
            Send Reset Link
          </button>
        </form>

        {/* Bottom */}
        <p className='text-center text-gray-500 mt-8'>
          Remember your password?{" "}
          <Link
            to='/login'
            className='
              text-[#D98B2B]
              font-semibold
              hover:underline
            '
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
