import CookieCard from "../cookies/CookieCard.jsx";

const cookies = [
  {
    _id: 1,
    name: "Chocolate Blast",
    description: "Soft chocolate cookies with molten chocolate filling.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    category: "Chocolate",
    price: 299,
    discountPrice: 229,
    slug: "chocolate-blast",
  },
  {
    _id: 2,
    name: "Oreo Dream",
    description: "Loaded with crunchy Oreo pieces and creamy texture.",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",
    category: "Oreo",
    price: 249,
    discountPrice: 199,
    slug: "oreo-dream",
  },
  {
    _id: 3,
    name: "Red Velvet",
    description: "Premium red velvet cookies with white chocolate chunks.",
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e",
    category: "Premium",
    price: 349,
    discountPrice: 299,
    slug: "red-velvet",
  },
];

const FeaturedCookies = () => {
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
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {cookies.map((cookie) => (
            <CookieCard key={cookie._id} cookie={cookie} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCookies;
