import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { toast } from "sonner";
import { createReview } from "../../services/review.service";

export default function OrderReview({ items = [], itemReviews = [] }) {
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    if (!items?.length) return;
    const initialState = {};

    items.forEach((item) => {
      const key = `${item.cookieId}-${item.variantId}`;

      const reviewData = itemReviews?.find(
        (review) => review.cookieId === item.cookieId,
      );

      initialState[key] = {
        rating: reviewData?.rating || 0,
        review: reviewData?.review || "",
        loading: false,
        submitted: !!reviewData,
      };
    });

    setReviews(initialState);
  }, [items, itemReviews]);

  const handleRatingChange = (key, value) => {
    setReviews((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        rating: value,
      },
    }));
  };

  const handleReviewChange = (key, value) => {
    setReviews((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        review: value,
      },
    }));
  };

  const handleSubmit = async (item) => {
    const key = `${item.cookieId}-${item.variantId}`;
    const current = reviews[key] || {};
    const text = current.review?.trim() || "";

    if (!current.rating) {
      toast.error("Please select a rating before submitting.");
      return;
    }

    if (!text) {
      toast.error("Please add a comment before submitting.");
      return;
    }

    setReviews((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        loading: true,
      },
    }));

    try {
      const data = await createReview({
        cookieId: item.cookieId,
        rating: current.rating,
        review: text,
      });

      if (data.success) {
        toast.success(data.message || "Review submitted successfully.");

        setReviews((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            loading: false,
            submitted: true,
          },
        }));
      } else {
        throw new Error(data.message || "Failed to submit review.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit review",
      );

      setReviews((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          loading: false,
        },
      }));
    }
  };

  return (
    <div className="space-y-6 rounded-4xl bg-white p-8 shadow-lg">
      <div>
        <h2 className="text-3xl font-bold text-[#2B1D16]">Leave a Review</h2>
        <p className="mt-2 text-gray-500">
          Share your experience for each cookie in this order.
        </p>
      </div>

      <div className="space-y-6">
        {items.map((item, index) => {
          const key = `${item.cookieId}-${item.variantId}`;
          const current = reviews[key] || {};

          return (
            <div
              key={key + index}
              className="rounded-4xl border border-[#F3E4D4] bg-[#FFF8F2] p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-3xl object-cover"
                  />

                  <h3 className="text-2xl font-bold text-[#2B1D16]">
                    {item.name}
                  </h3>
                </div>

                <div className="text-right text-sm text-gray-500">
                  <p>
                    {current.submitted
                      ? "Review submitted"
                      : "Review this cookie"}
                  </p>
                  <p className="mt-1 text-[#D98B2B]">₹{item.finalPrice}</p>
                </div>
              </div>

              {current.submitted ? (
                <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-[#D98B2B]">
                    {[1, 2, 3, 4, 5].map((star) =>
                      star <= current.rating ? (
                        <FaStar key={star} className="h-8 w-8" />
                      ) : (
                        <FaRegStar
                          key={star}
                          className="h-8 w-8 text-gray-300"
                        />
                      ),
                    )}
                  </div>

                  <p className="mt-3 text-gray-600 leading-7">
                    {current.review}
                  </p>
                </div>
              ) : (
                <div className="mt-8 space-y-6">
                  <div>
                    <label className="mb-3 block font-medium text-[#2B1D16]">
                      Rating
                    </label>

                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(key, star)}
                          className="transition hover:scale-110"
                        >
                          {star <= current.rating ? (
                            <FaStar className="h-9 w-9 text-[#D98B2B]" />
                          ) : (
                            <FaRegStar className="h-9 w-9 text-gray-300 hover:text-[#D98B2B]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block font-medium text-[#2B1D16]">
                      Comment
                    </label>
                    <textarea
                      rows={4}
                      value={current.review || ""}
                      onChange={(event) =>
                        handleReviewChange(key, event.target.value)
                      }
                      placeholder="Share your experience..."
                      className="w-full rounded-3xl border border-gray-200 p-4 outline-none focus:border-[#D98B2B]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSubmit(item)}
                    disabled={current.loading}
                    className={`mt-2 inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold text-white transition ${
                      current.loading
                        ? "cursor-not-allowed bg-[#a54f27]"
                        : "bg-[#D98B2B] hover:bg-[#c97818]"
                    }`}
                  >
                    {current.loading ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
