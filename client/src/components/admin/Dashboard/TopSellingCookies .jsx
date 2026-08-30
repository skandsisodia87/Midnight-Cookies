import React from "react";
import { FiTrendingUp, FiShoppingBag, FiArrowUpRight } from "react-icons/fi";

const TopSellingCookies = ({ topSellingCookies = [] }) => {
  const maxSold = Math.max(
    ...topSellingCookies.map((cookie) => cookie.totalSold),
  );

  return (
    <section className="rounded-2xl border border-[#F3E4D4] bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF8F2] text-[#D98B2B]">
            <FiTrendingUp size={21} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#4E342E]">
              Top Selling Cookies
            </h2>

            <p className="mt-0.5 text-sm text-[#8B7169]">
              Best performing cookies
            </p>
          </div>
        </div>

        <button className="flex items-center gap-1.5 text-sm font-medium text-[#D98B2B] transition hover:text-[#4E342E]">
          View All
          <FiArrowUpRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {topSellingCookies.map((cookie, index) => {
          const percentage = (cookie.totalSold / maxSold) * 100;

          return (
            <div
              key={cookie._id}
              className="group flex items-center gap-4 rounded-xl p-3 transition hover:bg-[#FFF8F2]"
            >
              <div className="flex w-7 shrink-0 justify-center">
                <span className="text-sm font-semibold text-[#9A827A]">
                  #{index + 1}
                </span>
              </div>

              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#FFF8F2]">
                <img
                  src={cookie.image?.[0]?.url}
                  alt={cookie.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="truncate text-sm font-semibold text-[#4E342E]">
                    {cookie.name}
                  </h3>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <FiShoppingBag size={14} className="text-[#D98B2B]" />

                    <span className="text-sm font-semibold text-[#4E342E]">
                      {cookie.totalSold}
                    </span>

                    <span className="hidden text-xs text-[#9A827A] sm:inline">
                      sold
                    </span>
                  </div>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-[#F3E4D4]">
                  <div
                    className="h-full rounded-full bg-[#D98B2B] transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 border-t border-[#F3E4D4] pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#8B7169]">Total cookies sold</span>

          <span className="font-semibold text-[#4E342E]">
            {topSellingCookies.reduce(
              (total, cookie) => total + cookie.totalSold,
              0,
            )}{" "}
            cookies
          </span>
        </div>
      </div>
    </section>
  );
};

export default TopSellingCookies;
