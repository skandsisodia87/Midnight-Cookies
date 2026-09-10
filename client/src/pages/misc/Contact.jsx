import { FiMail, FiMapPin, FiPhone, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import constants from "../../common/constants";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { constactUS } from "../../services/contact.service";
import { toast } from "sonner";

export default function Contact() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = await constactUS(formData);

      if (data.success) {
        toast.success(data.message);
        reset();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF6EC] py-16 px-4 md:px-8">
      <div className="max-w-[90%] mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#2B1D16]">Contact Us 🍪</h1>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto leading-8 text-lg">
            Have questions, feedback, or craving support? We'd love to hear from
            you. Reach out to our team anytime.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-4xl shadow-xl p-8">
            <h2 className="text-3xl font-semibold text-[#2B1D16]">
              Send a Message
            </h2>

            <p className="mt-3 text-gray-500">
              Fill out the form below and we'll get back to you shortly.
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block mb-2 font-medium text-[#2B1D16]">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className={`
                    w-full
                    border
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    transition
                    ${
                      errors.fullName
                        ? "border-red-400"
                        : "border-gray-300 focus:border-[#D98B2B]"
                    }
                  `}
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />

                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium text-[#2B1D16]">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`
                    w-full
                    border
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    transition
                    ${
                      errors.email
                        ? "border-red-400"
                        : "border-gray-300 focus:border-[#D98B2B]"
                    }
                  `}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email",
                    },
                  })}
                />

                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium text-[#2B1D16]">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Enter subject"
                  className={`
                    w-full
                    border
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    transition
                    ${
                      errors.subject
                        ? "border-red-400"
                        : "border-gray-300 focus:border-[#D98B2B]"
                    }
                  `}
                  {...register("subject", {
                    required: "Subject is required",
                    minLength: {
                      value: 3,
                      message: "Subject must be at least 3 characters",
                    },
                  })}
                />

                {errors.subject && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium text-[#2B1D16]">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message here..."
                  className={`
                    w-full
                    border
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    resize-none
                    transition
                    ${
                      errors.message
                        ? "border-red-400"
                        : "border-gray-300 focus:border-[#D98B2B]"
                    }
                  `}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                />

                {errors.message && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
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
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                "
              >
                {loading ? "Sending..." : "Send Message ✨"}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-4xl shadow-xl p-8">
              <h2 className="text-3xl font-semibold text-[#2B1D16]">
                Get in Touch
              </h2>

              <p className="mt-3 text-gray-500 leading-7">
                We'd love to help you with your orders, support, or any
                questions about our freshly baked cookies.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-[#FFF3E2] flex items-center justify-center shrink-0">
                    <FiMail className="text-[#D98B2B] text-2xl" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#2B1D16]">Email</h3>

                    <p className="mt-1 text-gray-600">
                      {constants.CONTACT_EMAIL}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-[#FFF3E2] flex items-center justify-center shrink-0">
                    <FiPhone className="text-[#D98B2B] text-2xl" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#2B1D16]">Phone</h3>

                    <p className="mt-1 text-gray-600">
                      {constants.CONTACT_PHONE}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-[#FFF3E2] flex items-center justify-center shrink-0">
                    <FiMapPin className="text-[#D98B2B] text-2xl" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#2B1D16]">Location</h3>

                    <p className="mt-1 text-gray-600 leading-7">
                      {constants.LOCATION}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-[#FFF3E2] flex items-center justify-center shrink-0">
                    <FiClock className="text-[#D98B2B] text-2xl" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#2B1D16]">
                      Working Hours
                    </h3>

                    <p className="mt-1 text-gray-600 leading-7">
                      Monday - Sunday <br />
                      9:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-[#D98B2B] to-[#B76A12] rounded-4xl p-8 text-white overflow-hidden relative">
              <div className="relative z-10">
                <h2 className="text-3xl font-semibold">
                  Freshly Baked Daily 🍪
                </h2>

                <p className="mt-4 text-white/90 leading-7 max-w-md">
                  Our cookies are made fresh every day with premium ingredients
                  and lots of love.
                </p>

                <button
                  onClick={() => navigate(constants.ROUTES.COOKIES)}
                  className="mt-6 bg-white text-[#D98B2B] px-6 py-3 rounded-full font-semibold hover:bg-[#FFF3E2] transition cursor-pointer"
                >
                  Explore Cookies
                </button>
              </div>

              <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-white/10" />

              <div className="absolute top-10 right-16 h-20 w-20 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
