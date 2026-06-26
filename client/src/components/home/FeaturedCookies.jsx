import { useState } from "react";
import CookieCard from "../cookies/CookieCard.jsx";
import { useEffect } from "react";
import { toast } from "sonner";
import CookieCardSkeleton from "../skeletons/CookieCardSkeleton.jsx";
import { getFeaturedCookie } from "../../services/cookie.service.js";

const FeaturedCookies = () => {
  const [cookies, setCookies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCookie = async () => {
      try {
        setLoading(true);
        const data = await getFeaturedCookie();
        setCookies(data.cookies);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCookie();
  }, []);

  return (
    <section
      id="featured-cookies"
      className="bg-[#FFF6EC] lg:pt-24 pt-12 pb-24 px-5 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1D16]">
            Featured Cookies
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-7">
            Discover our freshly baked signature cookies crafted with premium
            ingredients.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <CookieCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cookies.map((cookie) => (
              <CookieCard key={cookie._id} cookie={cookie} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCookies;
