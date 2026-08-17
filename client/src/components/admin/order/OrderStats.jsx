import { FiPackage, FiTruck, FiClock, FiCheckCircle } from "react-icons/fi";
import constants from "../../../common/constants";

const cards = [
  {
    key: "totalOrders",
    title: "Total Orders",
    icon: FiPackage,
    color: "bg-[#FFF4E6]",
  },
  {
    key: constants.PENDING,
    title: "Pending",
    icon: FiClock,
    color: "bg-[#FFF8E7]",
  },
  {
    key: constants.SHIPPED,
    title: "Shipped",
    icon: FiTruck,
    color: "bg-[#E8F4FD]",
  },
  {
    key: constants.DELIVERED,
    title: "Delivered",
    icon: FiCheckCircle,
    color: "bg-[#E8F8EE]",
  },
];

export default function OrderStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-[#F3E4D4] bg-linear-to-br from-white to-[#FFF8F2] p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#7A5C4D]">
                  {card.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#4E342E] sm:text-3xl">
                  {stats[card.key]}
                </h2>
              </div>

              <div
                className={`${card.color} flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl`}
              >
                <Icon size={22} className="text-[#A15C38]" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
