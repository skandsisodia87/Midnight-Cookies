import React from "react";

const FormField = ({ label, required, error, hint, children }) => {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-sm font-semibold text-[#4E342E]">
          {label}

          {required && <span className="ml-1 text-[#B85C5C]">*</span>}
        </label>

        {hint && <span className="text-xs text-[#A58D80]">{hint}</span>}
      </div>

      {children}

      {error && (
        <p className="mt-1 text-xs font-medium text-[#B85C5C]">{error}</p>
      )}
    </div>
  );
};

export default FormField;
