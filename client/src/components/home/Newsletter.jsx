import { useMutation } from "@tanstack/react-query";
import { subscribeNewsletter } from "../../services/newsletter.service";
import { toast } from "sonner";
import { useState } from "react";
import constants from "../../common/constants";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: subscribeNewsletter,
    onSuccess: (data) => {
      toast.success(data.message);
      setEmail("");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || constants.ERROR_MSG);
    },
  });

  return (
    <section className="bg-[#1F140F] py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
      <div
        className="
          max-w-4xl
          mx-auto
          bg-[#2A1C15]
          rounded-3xl
          lg:rounded-[36px]
          p-6
          sm:p-8
          md:p-12
          lg:p-16
          text-center
          text-white
        "
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Get Fresh Cookie Updates 🍪
        </h2>

        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-300 leading-6 sm:leading-7 max-w-2xl mx-auto">
          Subscribe to receive special offers, newly baked cookies and exclusive
          discounts.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="
              flex-1
              w-full
              px-5
              sm:px-6
              py-3.5
              sm:py-4
              rounded-full
              bg-white
              text-black
              text-sm
              sm:text-base
              outline-none
            "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="off"
          />

          <button
            className="
              w-full
              md:w-auto
              bg-[#D98B2B]
              hover:bg-[#c97818]
              px-6
              sm:px-8
              py-3.5
              sm:py-4
              rounded-full
              font-semibold
              transition
              whitespace-nowrap
              cursor-pointer
            "
            disabled={isPending}
            onClick={() => {
              if (!email.trim()) {
                toast.error("Please enter your email address.");
                return;
              }

              mutate(email);
            }}
          >
            {isPending ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
