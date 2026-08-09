const inputClass = (hasError = false) => {
  return `
    w-full
    rounded-xl
    border
    ${
      hasError
        ? "border-[#B85C5C] focus:border-[#B85C5C]"
        : "border-[#EBDDCF] focus:border-[#D98B2B]"
    }
    bg-[#FFFDFB]
    px-3.5
    py-2.5
    text-sm
    text-[#4E342E]
    outline-none
    transition
    placeholder:text-[#B7A49A]
    focus:ring-2
    ${hasError ? "focus:ring-[#B85C5C]/10" : "focus:ring-[#D98B2B]/10"}
  `;
};

export default inputClass;
