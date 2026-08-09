import React from "react";
import {
  FiSearch,
  FiMail,
  FiUserCheck,
  FiUser,
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiTrash2,
} from "react-icons/fi";

const SubscribersList = ({
  filteredSubscribers,
  subscribers,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  setDeleteSubscriber,
  formatDate,
}) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#F3E4D4] bg-white shadow-sm">
      {/* Toolbar */}

      <div className="flex flex-col gap-4 border-b border-[#F3E4D4] p-4 sm:p-5 xl:flex-row xl:items-center xl:justify-between">
        {/* Search */}

        <div className="relative w-full xl:max-w-sm">
          <FiSearch
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A58D80]"
            size={18}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subscriber email..."
            className="w-full rounded-xl border border-[#EBDDCF] bg-[#FFFDFB] py-2.5 pl-10 pr-4 text-sm text-[#4E342E] outline-none transition placeholder:text-[#B7A49A] focus:border-[#D98B2B] focus:ring-2 focus:ring-[#D98B2B]/10"
          />
        </div>

        {/* Filters */}

        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-[#EBDDCF] bg-[#FFFDFB] px-4 py-2.5 text-sm font-medium text-[#4E342E] outline-none focus:border-[#D98B2B]"
          >
            <option value="all">All Status</option>

            <option value="verified">Verified</option>

            <option value="pending">Pending</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-xl border border-[#EBDDCF] bg-[#FFFDFB] px-4 py-2.5 text-sm font-medium text-[#4E342E] outline-none focus:border-[#D98B2B]"
          >
            <option value="all">All Subscribers</option>

            <option value="user">Registered Users</option>

            <option value="guest">Guest Subscribers</option>
          </select>
        </div>
      </div>

      {/* ==================================
          DESKTOP TABLE
      ================================== */}

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-212.5">
          <thead>
            <tr className="border-b border-[#F3E4D4] bg-[#FFFDFB] text-left">
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#8A7064]">
                Subscriber
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#8A7064]">
                Type
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#8A7064]">
                Verification
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#8A7064]">
                Subscribed
              </th>

              <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#8A7064]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#F3E4D4]">
            {filteredSubscribers.map((subscriber) => (
              <tr
                key={subscriber._id}
                className="transition hover:bg-[#FFFCF9]"
              >
                {/* Email */}

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF3E5] text-[#D98B2B]">
                      <FiMail size={17} />
                    </div>

                    <div>
                      <p className="font-semibold text-[#4E342E]">
                        {subscriber.email}
                      </p>

                      <p className="mt-0.5 text-xs text-[#A58D80]">
                        Newsletter subscriber
                      </p>
                    </div>
                  </div>
                </td>

                {/* Type */}

                <td className="px-5 py-4">
                  {subscriber.isUser ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D6E8CE] bg-[#EEF7EA] px-3 py-1 text-xs font-semibold text-[#5F8D4E]">
                      <FiUserCheck size={13} />
                      Registered User
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EBDDCF] bg-[#FFF8F2] px-3 py-1 text-xs font-semibold text-[#8A7064]">
                      <FiUser size={13} />
                      Guest
                    </span>
                  )}
                </td>

                {/* Verification */}

                <td className="px-5 py-4">
                  {subscriber.isVerified ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D6E8CE] bg-[#EEF7EA] px-3 py-1 text-xs font-semibold text-[#5F8D4E]">
                      <FiCheckCircle size={13} />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F1DFB8] bg-[#FFF7E8] px-3 py-1 text-xs font-semibold text-[#B7791F]">
                      <FiClock size={13} />
                      Pending
                    </span>
                  )}
                </td>

                {/* Date */}

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-sm text-[#5D473D]">
                    <FiCalendar size={14} className="text-[#A58D80]" />

                    {formatDate(subscriber.createdAt)}
                  </div>
                </td>

                {/* Actions */}

                <td className="px-5 py-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setDeleteSubscriber(subscriber)}
                      title="Delete subscriber"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EBDDCF] text-[#6D5549] transition hover:border-[#B85C5C] hover:bg-[#FFF0F0] hover:text-[#B85C5C]"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ==================================
          MOBILE CARDS
      ================================== */}

      <div className="divide-y divide-[#F3E4D4] lg:hidden">
        {filteredSubscribers.map((subscriber) => (
          <div key={subscriber._id} className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF3E5] text-[#D98B2B]">
                  <FiMail size={18} />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold text-[#4E342E]">
                    {subscriber.email}
                  </p>

                  <p className="mt-1 text-xs text-[#A58D80]">
                    {subscriber.isUser ? "Registered User" : "Guest Subscriber"}
                  </p>
                </div>
              </div>

              {subscriber.isVerified ? (
                <span className="shrink-0 rounded-full border border-[#D6E8CE] bg-[#EEF7EA] px-2.5 py-1 text-xs font-semibold text-[#5F8D4E]">
                  Verified
                </span>
              ) : (
                <span className="shrink-0 rounded-full border border-[#F1DFB8] bg-[#FFF7E8] px-2.5 py-1 text-xs font-semibold text-[#B7791F]">
                  Pending
                </span>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[#A58D80]">Subscriber Type</p>

                <p className="mt-1 text-sm font-semibold text-[#4E342E]">
                  {subscriber.isUser ? "Registered User" : "Guest"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#A58D80]">Subscribed On</p>

                <p className="mt-1 text-sm font-semibold text-[#4E342E]">
                  {formatDate(subscriber.createdAt)}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end border-t border-[#F3E4D4] pt-4">
              <button
                type="button"
                onClick={() => setDeleteSubscriber(subscriber)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#EBDDCF] px-3 py-2 text-xs font-semibold text-[#6D5549] transition hover:border-[#B85C5C] hover:bg-[#FFF0F0] hover:text-[#B85C5C]"
              >
                <FiTrash2 size={14} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ==================================
          EMPTY STATE
      ================================== */}

      {filteredSubscribers.length === 0 && (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF3E5] text-[#D98B2B]">
            <FiMail size={24} />
          </div>

          <h3 className="mt-4 text-base font-bold text-[#4E342E]">
            No subscribers found
          </h3>

          <p className="mx-auto mt-1 max-w-sm text-sm text-[#8A7064]">
            Try changing your search or filters to find subscribers.
          </p>
        </div>
      )}

      {/* Footer */}

      {filteredSubscribers.length > 0 && (
        <div className="border-t border-[#F3E4D4] bg-[#FFFDFB] px-5 py-3">
          <p className="text-xs text-[#8A7064]">
            Showing{" "}
            <span className="font-semibold text-[#4E342E]">
              {filteredSubscribers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#4E342E]">
              {subscribers.length}
            </span>{" "}
            subscribers
          </p>
        </div>
      )}
    </div>
  );
};

export default SubscribersList;
