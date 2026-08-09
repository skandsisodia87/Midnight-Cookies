import React from "react";
import { FiSend, FiX, FiUsers } from "react-icons/fi";
import FormField from "./FormField";
import inputClass from "./inputClass";

const NewsletterModal = ({
  isOpen,
  close,
  onSubmit,
  newsletter,
  onChange,
  errors,
  subscribers,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D1B16]/50 p-4 backdrop-blur-sm">
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Modal Header */}

        <div className="flex items-center justify-between border-b border-[#F3E4D4] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF3E5] text-[#D98B2B]">
              <FiSend size={18} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#4E342E] sm:text-xl">
                Send Newsletter
              </h2>

              <p className="mt-0.5 text-xs text-[#8A7064] sm:text-sm">
                Send an update to your subscribers.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={close}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#8A7064] transition hover:bg-[#FFF5E9] hover:text-[#4E342E]"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={onSubmit} className="overflow-y-auto p-5 sm:p-6">
          {/* Audience */}

          <FormField label="Send To">
            <select
              name="audience"
              value={newsletter.audience}
              onChange={onChange}
              className={inputClass()}
            >
              <option value="all">All Verified Subscribers</option>

              <option value="users">Registered Users</option>

              <option value="guests">Guest Subscribers</option>
            </select>
          </FormField>

          {/* Subject */}

          <div className="mt-5">
            <FormField label="Subject" required error={errors.subject}>
              <input
                type="text"
                name="subject"
                value={newsletter.subject}
                onChange={onChange}
                placeholder="Something sweet is waiting for you 🍪"
                className={inputClass(errors.subject)}
              />
            </FormField>
          </div>

          {/* Preview */}

          <div className="mt-5">
            <FormField label="Preview Text" hint="Optional">
              <input
                type="text"
                name="previewText"
                value={newsletter.previewText}
                onChange={onChange}
                placeholder="A short preview shown in the inbox."
                className={inputClass()}
              />
            </FormField>
          </div>

          {/* Content */}

          <div className="mt-5">
            <FormField
              label="Newsletter Content"
              required
              error={errors.content}
            >
              <textarea
                name="content"
                value={newsletter.content}
                onChange={onChange}
                rows={8}
                placeholder={`Write your newsletter content here...\n\nExample:\n\nHey Cookie Lover!\n\nWe've baked something special for you.\n\nEnjoy 20% OFF your next order with code SWEET20.\n\nHappy munching! 🍪`}
                className={`${inputClass(errors.content)} resize-none leading-6`}
              />
            </FormField>
          </div>

          {/* Audience Info */}

          <div className="mt-5 rounded-xl border border-[#F3E4D4] bg-[#FFF8F2] p-4">
            <div className="flex gap-3">
              <FiUsers className="mt-0.5 shrink-0 text-[#D98B2B]" size={18} />

              <div>
                <p className="text-sm font-semibold text-[#4E342E]">
                  Estimated recipients
                </p>

                <p className="mt-1 text-sm text-[#8A7064]">
                  {newsletter.audience === "users" &&
                    subscribers.filter((item) => item.isUser && item.isVerified)
                      .length}
                  {newsletter.audience === "guests" &&
                    subscribers.filter(
                      (item) => !item.isUser && item.isVerified,
                    ).length}
                  {newsletter.audience === "all" &&
                    subscribers.filter((item) => item.isVerified).length}{" "}
                  verified subscriber
                  {(newsletter.audience === "users"
                    ? subscribers.filter(
                        (item) => item.isUser && item.isVerified,
                      ).length
                    : newsletter.audience === "guests"
                      ? subscribers.filter(
                          (item) => !item.isUser && item.isVerified,
                        ).length
                      : subscribers.filter((item) => item.isVerified)
                          .length) !== 1
                    ? "s"
                    : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}

          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#F3E4D4] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={close}
              className="rounded-xl border border-[#EBDDCF] px-5 py-2.5 text-sm font-semibold text-[#6D5549] transition hover:bg-[#FFF8F2]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4E342E] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3E2723]"
            >
              <FiSend size={16} />
              Send Newsletter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterModal;
