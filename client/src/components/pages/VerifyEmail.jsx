import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { verifyEmailOtp } from "../../services/auth.service";
import useAuthStore from "../../store/authStore";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setRegistering } = useAuthStore.getState();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const email = location.state?.email;

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) {
      return;
    }

    const updatedCode = [...code];

    updatedCode[index] = value;

    setCode(updatedCode);

    // Auto focus next input
    if (value && index < code.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const otp = code.join("");
      if (otp.length !== 6) {
        toast.error("Please enter complete OTP");
        return;
      }

      const response = await verifyEmailOtp(email, otp);

      if (response.success) {
        setCode(["", "", "", "", "", ""]);

        toast.success("Email verified successfully");
        setRegistering(false);
        navigate("/login", {
          replace: true,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify email");
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
          <div
            className='
              w-20
              h-20
              mx-auto
              rounded-full
              bg-[#FFF1DD]
              flex
              items-center
              justify-center
              text-4xl
            '
          >
            📩
          </div>

          <h1 className='text-4xl font-bold text-[#2B1D16] mt-6'>
            Verify Email
          </h1>

          <p className='mt-4 text-gray-500 leading-7'>
            Enter the 6-digit verification code sent to your email.
          </p>
        </div>

        {/* OTP Inputs */}
        <div className='flex justify-center gap-3 mt-10'>
          {code.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type='text'
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className='
                w-14
                h-14
                rounded-2xl
                border
                border-gray-300
                text-center
                text-2xl
                font-bold
                outline-none
                focus:border-[#D98B2B]
              '
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className='
            w-full
            mt-10
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
          {loading ? "Verifying..." : "Verify Email"}
        </button>

        {/* Resend */}
        <div className='text-center mt-8'>
          <p className='text-gray-500'>Didn’t receive the code?</p>

          <button
            className='
              mt-2
              text-[#D98B2B]
              font-semibold
              hover:underline
            '
          >
            Resend Code
          </button>
        </div>

        {/* Back */}
        <p className='text-center text-gray-500 mt-8'>
          <button
            onClick={() =>
              navigate("/login", {
                replace: true,
              })
            }
            className='
                text-[#D98B2B]
                font-semibold
                hover:underline
            '
          >
            Back to Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
