import { FiBell, FiSearch, FiMoon } from "react-icons/fi";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-[#F3E4D4] bg-[#FFF8F2]/95 px-6 py-4 backdrop-blur shadow-[0_10px_35px_rgba(43,29,22,0.06)]">
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#D98B2B]" />

          <input
            className="h-11 w-full rounded-full border border-[#F1DCC7] bg-white pl-11 pr-4 text-sm text-[#2B1D16] outline-none placeholder:text-gray-400 focus:border-[#D98B2B]"
            placeholder="Search orders, customers..."
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF3E2] text-[#D98B2B] transition hover:bg-[#FFE2BF]">
            <FiMoon size={18} />
          </button>

          <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF3E2] text-[#D98B2B] transition hover:bg-[#FFE2BF]">
            <FiBell size={18} />
            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-[#D98B2B]" />
          </button>

          <div className="flex items-center gap-3 rounded-full border border-[#F3E4D4] bg-white px-3 py-2 shadow-sm">
            <img
              src="https://i.pravatar.cc/40"
              alt="Admin avatar"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div className="leading-tight">
              <p className="text-sm font-semibold text-[#2B1D16]">Admin</p>
              <p className="text-xs text-[#8C6A4B]">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
