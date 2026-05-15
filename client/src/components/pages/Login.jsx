import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { useState } from "react";
import useAuthStore from "../../store/authStore";
import { loginUser } from "../../services/auth.service";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser({
        email,
        password,
      });

      login({
        user: data.user,
        accessToken: data.accessToken,
      });

      toast.success("Login successful 🍪");

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className='text-4xl font-bold text-[#2B1D16]'>Welcome Back 🍪</h1>

          <p className='mt-3 text-gray-500'>
            Login to continue your cookie journey.
          </p>
        </div>

        {/* Form */}
        <form className='mt-10 space-y-6' onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className='block mb-2 font-medium text-[#2B1D16]'>
              Email
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className='block mb-2 font-medium text-[#2B1D16]'>
              Password
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
              <FiLock className='text-gray-400' />

              <input
                type='password'
                placeholder='Enter your password'
                className='
                  w-full
                  ml-3
                  outline-none
                  bg-transparent
                '
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className='text-right'>
            <Link
              to='/forgot-password'
              className='
                text-sm
                text-[#D98B2B]
                hover:underline
              '
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={loading}
            className='
              w-full
              bg-[#D98B2B]
              hover:bg-[#c97818]
              text-white
              py-4
              rounded-full
              font-semibold
              transition
              disabled:opacity-50
            '
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Bottom */}
        <p className='text-center text-gray-500 mt-8'>
          Don’t have an account?{" "}
          <Link
            to='/register'
            className='
              text-[#D98B2B]
              font-semibold
              hover:underline
            '
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
