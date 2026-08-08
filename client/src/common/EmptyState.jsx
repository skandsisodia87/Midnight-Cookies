import { Link } from "react-router-dom";

const EmptyState = ({
  title = "No data available",
  message = "There is nothing to display right now.",
  icon = "📭",
  buttonText,
  redirectLink,
  onButtonClick,
  className = "",
}) => {
  const showButton = buttonText && (redirectLink || onButtonClick);

  return (
    <div
      className={`bg-white rounded-4xl shadow-lg py-16 px-8 text-center ${className}`}
    >
      <div className="text-6xl mb-6">{icon}</div>
      <h2 className="text-3xl font-bold text-[#4E342E]">{title}</h2>
      <p className="text-[#7A5C4D] mt-4 max-w-xl mx-auto leading-7">
        {message}
      </p>

      {showButton ? (
        redirectLink ? (
          <Link
            to={redirectLink}
            className="inline-block mt-8 bg-[#D98B2B] hover:bg-[#c97818] text-white px-8 py-3 rounded-full font-semibold transition"
          >
            {buttonText}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onButtonClick}
            className="inline-flex mt-8 items-center justify-center bg-[#D98B2B] hover:bg-[#c97818] text-white px-8 py-3 rounded-full font-semibold transition"
          >
            {buttonText}
          </button>
        )
      ) : null}
    </div>
  );
};

export default EmptyState;
