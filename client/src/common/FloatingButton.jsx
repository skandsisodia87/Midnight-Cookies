import { FiMessageSquare } from "react-icons/fi";

const FloatingButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open customer support chat"
      className="
        fixed bottom-5 right-5 z-50
        flex h-14 w-14 items-center justify-center
        rounded-full
        bg-[#A15C4D]
        text-white
        shadow-[0_8px_25px_rgba(91,55,43,0.28)]
        transition-all duration-300
        hover:scale-105
        hover:bg-[#8F4D40]
        active:scale-95
        sm:bottom-7 sm:right-7
      "
    >
      <FiMessageSquare size={24} strokeWidth={2} />
    </button>
  );
};

export default FloatingButton;
