import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../services/auth.service";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: forgotPassword,

    onSuccess: (data) => {
      console.log(data);
      toast.success("Reset link sent successfully");
    },

    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
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
            Forgot Password 🔐
          </h1>

          <p className='mt-3 text-gray-500 leading-7'>
            Enter your email address and we’ll send you a password reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='mt-10 space-y-6'>
          {/* Email */}
          <div>
            <label className='block mb-2 font-medium text-[#2B1D16]'>
              Email Address
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
                className='
                  w-full
                  ml-3
                  outline-none
                  bg-transparent
                '
                {...register("email")}
              />
            </div>

            {/* Error Message */}
            {errors.email && (
              <p className='text-red-500 text-sm mt-2'>
                {errors.email.message}
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
            {isPending ? "Sending..." : "Send Reset Link"}
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
