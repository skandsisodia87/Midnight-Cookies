export default function SettingToggle({
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#F0DCCB] bg-[#FFFCF9] p-5">
      <div className="min-w-0">
        <h3 className="font-semibold text-[#4E342E]">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-[#8D6E63]">{description}</p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          enabled ? "bg-[#A15C38]" : "bg-[#D7C8BF]"
        }`}
        aria-label={enabled ? `Disable ${title}` : `Enable ${title}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
