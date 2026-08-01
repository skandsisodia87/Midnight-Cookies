import {
  FaCookieBite,
  FaShoppingBag,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";

const cards = [
  {
    key: "revenue",
    title: "Revenue",
    value: "₹1,24,300",
    icon: <FaRupeeSign />,
    bg: "bg-amber-100",
    text: "text-amber-700",
    accent: "bg-amber-50",
  },
  {
    key: "orders",
    title: "Orders",
    value: "348",
    icon: <FaShoppingBag />,
    bg: "bg-sky-100",
    text: "text-sky-700",
    accent: "bg-sky-50",
  },
  {
    key: "products",
    title: "Products",
    value: "64",
    icon: <FaCookieBite />,
    bg: "bg-orange-100",
    text: "text-orange-700",
    accent: "bg-orange-50",
  },
  {
    key: "customers",
    title: "Customers",
    icon: <FaUsers />,
    bg: "bg-violet-100",
    text: "text-violet-700",
    accent: "bg-violet-50",
  },
];

export default function DashboardStats({ stats }) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-6 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[#8C6A4B] uppercase tracking-[0.18em] text-xs font-semibold">
                {card.title}
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold mt-3 text-slate-900">
                {stats[card.key]}
              </h3>
              {/* <p className="mt-2 text-sm text-slate-500">
                Compared to last week
              </p> */}
            </div>
            <div
              className={`${card.accent} ${card.text} w-14 h-14 rounded-3xl grid place-items-center text-2xl`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
