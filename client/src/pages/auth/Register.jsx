import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser, FiPhone } from "react-icons/fi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerUser, sendVerificationOtp } from "../../services/auth.service";
import useAuthStore from "../../store/authStore";
import constants from "../../common/constants";

export const registrationSchema = z.object({
  name: z.string().trim().min(2, "Name should be at least 2 characters long"),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
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
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    resolver: zodResolver(registrationSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: async (data) => {
      reset();
      await toast.promise(
        sendVerificationOtp({
          email: data.user.email,
        }),
        {
          loading: "Sending verification OTP...",
          success: "Verification OTP sent successfully!",
          error: (error) =>
            error.response?.data?.message || "Failed to send OTP",
        },
      );
      setTimeout(() => {
        useAuthStore.getState().setRegistering(true);
        navigate(constants.ROUTES.VERIFY_EMAIL, {
          state: {
            email: data.user.email,
          },
        });
      }, 1000);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while creating your account",
      );
    },
  });

  const onSubmit = (data) => {
    mutate(data);
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
            Create Account 🍪
          </h1>

          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-500">
            Join {constants.APPICATION_NAME} today.
          </p>
        </div>

        <form
          className="mt-8 sm:mt-10 space-y-5 sm:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="block mb-2 font-medium text-[#2B1D16]">
              Full Name
            </label>

            <div
              className={`
                flex
                items-center
                border
                rounded-full
                px-4 sm:px-5
                py-3.5 sm:py-4
                ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-[#D98B2B]"
                }
              `}
            >
              <FiUser className="text-gray-400 text-lg" />

              <input
                type="text"
                placeholder="Enter your full name"
                {...register("name")}
                className="
                  w-full
                  ml-3
                  outline-none
                  bg-transparent
                  text-sm sm:text-base
                "
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs sm:text-sm mt-2">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#2B1D16]">
              Email
            </label>

            <div
              className={`
                flex
                items-center
                border
                rounded-full
                px-4 sm:px-5
                py-3.5 sm:py-4
                ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-[#D98B2B]"
                }
              `}
            >
              <FiMail className="text-gray-400 text-lg" />

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="
                  w-full
                  ml-3
                  outline-none
                  bg-transparent
                  text-sm sm:text-base
                "
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#2B1D16]">
              Phone
            </label>

            <div
              className={`
                flex
                items-center
                border
                rounded-full
                px-4 sm:px-5
                py-3.5 sm:py-4
                ${
                  errors.phone
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-[#D98B2B]"
                }
              `}
            >
              <FiPhone className="text-gray-400 text-lg" />

              <input
                type="tel"
                placeholder="Enter your 10-digit phone number"
                {...register("phone")}
                className="
                  w-full
                  ml-3
                  outline-none
                  bg-transparent
                  text-sm sm:text-base
                "
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs sm:text-sm mt-2">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#2B1D16]">
              Password
            </label>

            <div
              className={`
                flex
                items-center
                border
                rounded-full
                px-4 sm:px-5
                py-3.5 sm:py-4
                ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-[#D98B2B]"
                }
              `}
            >
              <FiLock className="text-gray-400 text-lg" />

              <input
                type="password"
                {...register("password")}
                placeholder="Create password"
                className="
                  w-full
                  ml-3
                  outline-none
                  bg-transparent
                  text-sm sm:text-base
                "
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs sm:text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
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
            {isPending ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm sm:text-base text-gray-500 mt-6 sm:mt-8">
          Already have an account?{" "}
          <Link
            to={constants.ROUTES.LOGIN}
            className="text-[#D98B2B] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
