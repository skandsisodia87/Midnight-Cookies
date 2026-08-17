import { HiSparkles } from "react-icons/hi";
import {
  FaArrowUp,
  FaBoxOpen,
  FaPersonBooth,
  FaShoppingCart,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import constants from "../../../common/constants";

export default function WelcomeCard({ stats }) {
  return (
    <div className="rounded-[2.5rem] bg-linear-to-r from-amber-700 to-orange-500 p-6 sm:p-8 text-white shadow-xl">
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr] items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-100/90">
            Good morning, Admin
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
            Sweet analytics for {constants.APPICATION_NAME}
          </h2>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-amber-100/90">
            Your bakery is performing great. Review the latest revenue, orders,
            and stock insights all in one place.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-4">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-100/80">
              Today's sales
            </p>
            <p className="mt-4 text-2xl font-semibold">{stats.sales}</p>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-4">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-100/80">
              New customers
            </p>
            <p className="mt-4 text-2xl font-semibold">
              {stats.usersEnrolledToday}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-3xl bg-white/10 border border-white/15 p-4 text-sm sm:text-base text-amber-100">
        <div className="flex items-center gap-3">
          <HiSparkles size={28} />
          <span>New sales are up 18% this month.</span>
        </div>
        <span className="rounded-full bg-white/20 px-3 py-1">View report</span>
      </div>
    </div>
  );
}
