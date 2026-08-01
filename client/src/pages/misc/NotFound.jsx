import ErrorPage from "../../common/ErrorPage";

const NotFound = ({ isAdmin = false }) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-linear-to-br from-[#FFF7ED] via-[#FFECCB] to-[#FCEFD7] px-4 py-20">
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#FFD9A8] rounded-full opacity-60 filter blur-3xl transform rotate-12"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#F5CFA0] rounded-full opacity-50 filter blur-3xl"></div>
      <div className="absolute top-8 right-8 w-40 h-40 bg-[#FFE6CC] rounded-full opacity-30 filter blur-xl"></div>

      <div className="z-10 w-full max-w-3xl">
        <ErrorPage
          title="Page Not Found"
          message={
            "The page you're looking for doesn't exist or has been moved. Check the URL or return to the homepage."
          }
          buttonText={isAdmin ? "Back to Dashboard" : "Go Home"}
          redirectLink={isAdmin ? "/admin" : "/"}
        />
      </div>
    </div>
  );
};

export default NotFound;
