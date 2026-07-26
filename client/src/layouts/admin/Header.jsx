import { FiBell, FiSearch, FiMoon } from "react-icons/fi";

const Header = () => {
  return (
    <header className="bg-white h-16 shadow-sm flex items-center justify-between px-6">
      <div className="relative">
        <FiSearch className="absolute left-3 top-3 text-gray-500" />

        <input
          className="pl-10 w-80 border rounded-lg h-10 outline-none"
          placeholder="Search..."
        />
      </div>

      <div className="flex items-center gap-5">
        <FiMoon size={20} />

        <FiBell size={20} />

        <div className="flex items-center gap-2">
          <img src="https://i.pravatar.cc/40" className="rounded-full" />

          <div>
            <p className="font-semibold">Admin</p>

            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
