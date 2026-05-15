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
    <section className='py-24 px-6 bg-[#FFF6EC]'>
      <div className='max-w-7xl mx-auto'>
        {/* Heading */}
        <div className='text-center mb-16'>
          <h2 className='text-5xl font-bold text-[#2B1D16]'>
            Featured Cookies
          </h2>

          <p className='mt-4 text-gray-600 max-w-2xl mx-auto leading-7'>
            Discover our freshly baked signature cookies crafted with premium
            ingredients.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div
            className='
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
            '
          >
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <CookieCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
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
