import {
  FiPackage,
  FiCheckCircle,
  FiAlertTriangle,
  FiLayers,
  FiStar,
} from "react-icons/fi";

const ProductStats = ({ stats = {} }) => {
  const statItems = [
    {
      id: "total-products",
      title: "Total Cookies",
      value: stats.totalProducts ?? 0,
      subtext: `${stats.featuredCount ?? 0} featured on homepage`,
      icon: <FiPackage className="text-xl text-[#D98B2B]" />,
      bgIcon: "bg-[#D98B2B]/10",
      borderColor: "border-[#F3E4D4]",
    },
    {
      id: "total-stock",
      title: "Total Inventory Units",
      value: stats.totalStockUnits ?? 0,
      subtext: "Across all cookie variants",
      icon: <FiLayers className="text-xl text-[#8A5A36]" />,
      bgIcon: "bg-[#8A5A36]/10",
      borderColor: "border-[#F3E4D4]",
    },
    {
      id: "active-products",
      title: "Active on Storefront",
      value: stats.activeProducts ?? 0,
      subtext: "Visible to customers",
      icon: <FiCheckCircle className="text-xl text-[#5F8D4E]" />,
      bgIcon: "bg-[#5F8D4E]/10",
      borderColor: "border-[#E1EAD8]",
    },
    {
      id: "stock-alerts",
      title: "Stock Attention Needed",
      value: (stats.lowStockCount ?? 0) + (stats.outOfStockCount ?? 0),
      subtext: `${stats.outOfStockCount ?? 0} out of stock, ${stats.lowStockCount ?? 0} low stock`,
      icon: <FiAlertTriangle className="text-xl text-[#D97706]" />,
      bgIcon: "bg-[#D97706]/10",
      borderColor:
        stats.outOfStockCount > 0 ? "border-[#FBCFE8]" : "border-[#FDE68A]",
      highlight: (stats.lowStockCount ?? 0) + (stats.outOfStockCount ?? 0) > 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => (
        <div
          key={item.id}
          className={`relative overflow-hidden rounded-3xl border ${item.borderColor} bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md`}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8A7064]">
                {item.title}
              </p>
              <h3 className="text-2xl font-bold text-[#4E342E]">
                {Number(item.value).toLocaleString()}
              </h3>
            </div>
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.bgIcon}`}
            >
              {item.icon}
            </div>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-[#7A5C4D]">
            {item.subtext}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductStats;
