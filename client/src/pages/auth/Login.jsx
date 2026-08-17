import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { useState } from "react";
import useAuthStore from "../../store/authStore";
import { loginUser } from "../../services/auth.service";
import { toast } from "sonner";
import constants from "../../common/constants";

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
      });

      toast.success("Login successful 🍪");

      if (data?.user?.role === constants.ADMIN) {
        navigate(constants.ROUTES.ADMIN.DASHBOARD, {
          replace: true,
        });
      } else {
        navigate(constants.ROUTES.HOME, {
          replace: true,
        });
      }
    } catch (error) {
      let errorMessage = "Login failed";

      if (error.response?.status === 401) {
        errorMessage = "Invalid email or password";
      } else if (error.response?.status === 429) {
        errorMessage = "Too many login attempts. Please try again later.";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (!error.response) {
        errorMessage = "Network error. Please check your connection.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueAsGuest = () => {
    toast.success("Exploring as guest 🍪");
    navigate(constants.ROUTES.HOME, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#FFF6EC] flex items-center justify-center px-4 sm:px-6 py-6 sm:py-12">
      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-3xl sm:rounded-4xl
          shadow-2xl
          p-6 sm:p-8
        "
      >
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2B1D16]">
            Welcome Back 🍪
          </h1>

          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-500">
            Login to continue your cookie journey.
          </p>
        </div>

        <form
          className="mt-8 sm:mt-10 space-y-5 sm:space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block mb-2 font-medium text-[#2B1D16]">
              Email
            </label>

            <div
              className="
                flex
                items-center
                border
                border-gray-300
                rounded-full
                px-4 sm:px-5
                py-3.5 sm:py-4
                focus-within:border-[#D98B2B]
              "
            >
              <FiMail className="text-gray-400 text-lg" />

              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full
                  ml-3
                  outline-none
                  bg-transparent
                  text-sm sm:text-base
                "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#2B1D16]">
              Password
            </label>

            <div
              className="
                flex
                items-center
                border
                border-gray-300
                rounded-full
                px-4 sm:px-5
                py-3.5 sm:py-4
                focus-within:border-[#D98B2B]
              "
            >
              <FiLock className="text-gray-400 text-lg" />

              <input
                type="password"
                placeholder="Enter your password"
                className="
                  w-full
                  ml-3
                  outline-none
                  bg-transparent
                  text-sm sm:text-base
                "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="text-right">
            <Link
              to={constants.ROUTES.FORGOT_PASSWORD}
              className="text-sm text-[#D98B2B] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-[#D98B2B]
              hover:bg-[#c97818]
              text-white
              py-3.5 sm:py-4
              rounded-full
              font-semibold
              transition
              disabled:opacity-50
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={handleContinueAsGuest}
            className="
              w-full
              mt-3
              py-3.5 sm:py-4
              rounded-full
              font-semibold
              transition
              flex
              items-center
              justify-center
              gap-3
              border-2
              border-[#F0C79B]
              bg-white
              text-[#D98B2B]
              hover:shadow-md
              hover:bg-[#FFF3E6]
              cursor-pointer
            "
            aria-label="Continue as guest"
          >
            <FiUser className="text-lg" />
            Continue as Guest
          </button>
        </form>

        <p className="text-center text-sm sm:text-base text-gray-500 mt-6 sm:mt-8">
          Don’t have an account?{" "}
          <Link
            to={constants.ROUTES.REGISTER}
            className="text-[#D98B2B] font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
