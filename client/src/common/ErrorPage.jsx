import { Link } from "react-router-dom";
import constants from "./constants";

const ErrorPage = ({
  title = constants.ERROR_MSG,
  message = "Unable to process your request right now.",
  buttonText = "Go Back",
  redirectLink = "/",
}) => {
  return (
    <div
      className='
        bg-white
        rounded-4xl
        shadow-lg
        py-24
        px-8
        text-center
      '
    >
      <div className='text-7xl mb-6'>⚠️</div>

      <h2 className='text-4xl font-bold text-[#2B1D16]'>{title}</h2>

      <p className='text-gray-500 mt-5 max-w-xl mx-auto leading-7'>{message}</p>

      <Link
        to={redirectLink}
        className='
          inline-block
          mt-8
          bg-[#D98B2B]
          hover:bg-[#c97818]
          text-white
          px-8
          py-4
          rounded-full
          font-semibold
          transition
        '
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default ErrorPage;
