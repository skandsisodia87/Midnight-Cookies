import { useNavigate, useParams } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { useState } from "react";
import { resetPassword } from "../../services/auth.service";
import { toast } from "sonner";

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
        navigate("/login", {
          replace: true,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
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
          shadow-xl
          p-8
        '
      >
        {/* Heading */}
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-[#2B1D16]'>
            Reset Password 🍪
          </h1>

          <p className='text-gray-500 mt-3 text-sm leading-6'>
            Create a new password for your Midnight Cookies account.
          </p>
        </div>

        {/* Form */}
        <form className='mt-10 space-y-6' onSubmit={handleSubmit}>
          {/* Password */}
          <div>
            <label className='block mb-2 font-medium text-[#2B1D16]'>
              New Password
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
                transition
              '
            >
              <FiLock className='text-gray-400 text-lg' />

              <input
                type='password'
                placeholder='Enter new password'
                className='
                  w-full
                  ml-3
                  outline-none
                  bg-transparent
                  text-[#2B1D16]
                '
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className='block mb-2 font-medium text-[#2B1D16]'>
              Confirm Password
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
                transition
              '
            >
              <FiLock className='text-gray-400 text-lg' />

              <input
                type='password'
                placeholder='Confirm new password'
                className='
                  w-full
                  ml-3
                  outline-none
                  bg-transparent
                  text-[#2B1D16]
                '
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
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
              disabled:cursor-not-allowed
            '
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
