import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser, FiPhone } from "react-icons/fi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerUser, sendVerificationOtp } from "../../services/auth.service";
import useAuthStore from "../../store/authStore";

export const registrationSchema = z.object({
  name: z.string().trim().min(2, "Name should be at least 2 characters long"),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: z.string().min(6, "Password should be at least 6 characters long"),
  password: z
    .string()
    .min(6, "Password should be at least 6 characters long")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "Password must contain at least one letter and one number",
    ),
});

const Register = () => {
  const navigate = useNavigate();
  const { setRegistering } = useAuthStore.getState();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      number: "",
    },
    resolver: zodResolver(registrationSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: async (data) => {
      reset();
      toast.success("Verification OTP sent successfully");
      await new Promise((res) => setTimeout(res, 1000));
      await toast.promise(
        sendVerificationOtp({
          email: data.user.email,
        }),
        {
          loading: "Sending verification otp...",
          success: () => {
            return "Verification OTP sent successfully";
          },
          error: (error) => error.response?.data?.message || "Logout failed",
        },
      );
      setRegistering(true);
      navigate("/verify-email", {
        state: {
          email: data.user.email,
        },
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while sending verification code",
      );
    },
  });

  const onSubmit = (data) => {
    mutate(data);
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
          <h1 className='text-4xl font-bold text-[#2B1D16]'>
            Create Account 🍪
          </h1>

          <p className='mt-3 text-gray-500'>Join Midnight Cookies today.</p>
        </div>

        {/* Form */}
        <form className='mt-10 space-y-4' onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            <label className='block mb-2 font-medium text-[#2B1D16]'>
              Full Name
            </label>

            <div
              className={`
                flex
                items-center
                border
                rounded-full
                px-5
                py-4
                ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-[#D98B2B]"
                }
              `}
            >
              <FiUser className='text-gray-400' />

              <input
                type='text'
                placeholder='Enter your full name'
                {...register("name")}
                className='
                  w-full
                  ml-3
                  outline-none
                  bg-transparent
                '
              />
            </div>
            {errors.name && (
              <p className='text-red-500 text-sm mt-2'>{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className='block mb-2 font-medium text-[#2B1D16]'>
              Email
            </label>

            <div
              className={`
                flex
                items-center
                border
                rounded-full
                px-5
                py-4
                ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-[#D98B2B]"
                }
              `}
            >
              <FiMail className='text-gray-400' />

              <input
                type='email'
                placeholder='Enter your email'
                {...register("email")}
                className='
                  w-full
                  ml-3
                  outline-none
                  bg-transparent
                '
              />
            </div>
            {errors.email && (
              <p className='text-red-500 text-sm mt-2'>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className='block mb-2 font-medium text-[#2B1D16]'>
              Phone
            </label>

            <div
              className={`
                flex
                items-center
                border
                rounded-full
                px-5
                py-4
                ${
                  errors.number
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-[#D98B2B]"
                }
              `}
            >
              <FiPhone className='text-gray-400' />

              <input
                type='text'
                placeholder='Enter your phone number'
                {...register("number")}
                className='
                  w-full
                  ml-3
                  outline-none
                  bg-transparent
                '
              />
            </div>
            {errors.number && (
              <p className='text-red-500 text-sm mt-2'>
                {errors.number.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className='block mb-2 font-medium text-[#2B1D16]'>
              Password
            </label>

            <div
              className={`
                flex
                items-center
                border
                rounded-full
                px-5
                py-4
                ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-[#D98B2B]"
                }
              `}
            >
              <FiLock className='text-gray-400' />

              <input
                type='password'
                {...register("password")}
                placeholder='Create password'
                className='
                  w-full
                  ml-3
                  outline-none
                  bg-transparent
                '
              />
            </div>
            {errors.password && (
              <p className='text-red-500 text-sm mt-2'>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={isPending}
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
            {isPending ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Bottom */}
        <p className='text-center text-gray-500 mt-8'>
          Already have an account?{" "}
          <Link
            to='/login'
            className='
              text-[#D98B2B]
              font-semibold
              hover:underline
            '
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
