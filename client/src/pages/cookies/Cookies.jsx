import { useEffect, useState } from "react";
import { toast } from "sonner";
import CookieCard from "../../components/cookies/CookieCard";
import { getAllCookies } from "../../services/cookie.service";
import CookieCardSkeleton from "../../components/cookies/CookieCardSkeleton";

const Cookies = () => {
  const [cookies, setCookies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        setLoading(true);

        const data = await getAllCookies();

        setCookies(data.cookies ?? []);
      } catch (error) {
        setCookies([]);

        toast.error(error.response?.data?.message || "Failed to fetch cookies");
      } finally {
        setLoading(false);
      }
    };

    fetchCookies();
  }, []);

  return (
    <div className='min-h-screen bg-[#FFF6EC] px-6 py-12'>
      <div className='max-w-[90%] mx-auto'>
        {/* Heading */}
        <div className='text-center mb-16'>
          <h1 className='text-5xl md:text-6xl font-bold text-[#2B1D16]'>
            Our Cookies 🍪
          </h1>

          <p className='mt-5 text-gray-600 max-w-2xl mx-auto leading-8'>
            Explore our handcrafted premium cookies baked fresh with love and
            delicious ingredients.
          </p>
        </div>

        {loading ? (
          <div
            className='
              grid
              md:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-8
            '
          >
            {Array.from({
              length: 8,
            }).map((_, index) => (
              <CookieCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {cookies.map((cookie) => (
              <CookieCard key={cookie._id} cookie={cookie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cookies;
