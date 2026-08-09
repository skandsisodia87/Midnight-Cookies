const StatCard = ({ title, value, icon }) => {
  return (
    <div className="rounded-[20px] border border-[#F3E4D4] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[#8A7064]">{title}</p>

          <p className="mt-2 text-2xl font-bold text-[#4E342E]">
            {value.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF3E5] text-[#D98B2B]">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
