import CookieCard from "../cookies/CookieCard.jsx";
import { toast } from "sonner";
import CookieCardSkeleton from "../cookies/CookieCardSkeleton.jsx";
import { getFeaturedCookie } from "../../services/cookie.service.js";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../../common/ErrorPage.jsx";
import constants from "../../common/constants.js";

const FeaturedCookies = () => {
  const {
    data: cookies,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [constants.FEATURED_COOKIE],
    queryFn: getFeaturedCookie,
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  if (isError) {
    return (
      <div className="min-h-screen bg-[#FFF6EC] px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <ErrorPage
            title="Unable To Featured Cookie"
            message={
              error?.response?.data?.message ||
              error?.message ||
              constants.ERROR_MSG
            }
            buttonText="Reload Page"
            redirectLink="/"
          />
        </div>
      </div>
    );
  }

  return (
    <section
      id="featured-cookies"
      className="bg-[#FFF6EC] lg:pt-24 pt-12 pb-24 px-5 sm:px-6"
    >
      <div className="max-w-[90%] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1D16]">
            Featured Cookies
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-7">
            Discover our freshly baked signature cookies crafted with premium
            ingredients.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <CookieCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cookies?.map((cookie) => (
              <CookieCard key={cookie._id} cookie={cookie} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCookies;
