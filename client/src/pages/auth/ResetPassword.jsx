import { useNavigate, useParams } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { useState } from "react";
import { resetPassword } from "../../services/auth.service";
import { toast } from "sonner";
import constants from "../../common/constants";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const data = await resetPassword(
        {
          password,
          confirmPassword,
        },
        token,
      );

      toast.success(data.message || "Password reset successful");

      if (data.success) {
        navigate(constants.ROUTES.LOGIN, {
          replace: true,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || constants.ERROR_MSG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF6EC] flex items-center justify-center px-4 sm:px-6 py-6 sm:py-12">
      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-3xl sm:rounded-4xl
          shadow-xl
          p-6 sm:p-8
        "
      >
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2B1D16]">
            Reset Password 🍪
          </h1>

          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-500 leading-6 sm:leading-7">
            Create a new password for your {constants.APPICATION_NAME} account.
          </p>
        </div>

        <form
          className="mt-8 sm:mt-10 space-y-5 sm:space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block mb-2 font-medium text-[#2B1D16]">
              New Password
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
                transition
              "
            >
              <FiLock className="text-gray-400 text-lg" />

              <input
                type="password"
                placeholder="Enter new password"
                className="
                  w-full
                  ml-3
                  outline-none
                  bg-transparent
                  text-[#2B1D16]
                  text-sm sm:text-base
                "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#2B1D16]">
              Confirm Password
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
                transition
              "
            >
              <FiLock className="text-gray-400 text-lg" />

              <input
                type="password"
                placeholder="Confirm new password"
                className="
                  w-full
                  ml-3
                  outline-none
                  bg-transparent
                  text-[#2B1D16]
                  text-sm sm:text-base
                "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
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
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
