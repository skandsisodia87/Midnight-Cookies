import CookieCard from "../cookies/CookieCard";

const cookies = [
  {
    _id: 1,
    name: "Chocolate Blast",
    description: "Soft chocolate cookies with molten chocolate filling.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    category: "Chocolate",
    price: 299,
    discountPrice: 199,
    slug: "chocolate-blast",
  },

  {
    _id: 2,
    name: "Oreo Dream",
    description: "Loaded with crunchy Oreo pieces and creamy texture.",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",
    category: "Oreo",
    price: 249,
    discountPrice: 179,
    slug: "oreo-dream",
  },

  {
    _id: 3,
    name: "Red Velvet",
    description: "Premium red velvet cookies with white chocolate chunks.",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c",
    category: "Premium",
    price: 349,
    discountPrice: 279,
    slug: "red-velvet",
  },

  {
    _id: 4,
    name: "Nutella Lava",
    description: "Rich Nutella-filled cookies with gooey center.",
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e",
    category: "Nutella",
    price: 329,
    discountPrice: 249,
    slug: "nutella-lava",
  },

  {
    _id: 5,
    name: "Peanut Butter Crunch",
    description: "Creamy peanut butter cookies with crunchy peanuts.",
    image: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0",
    category: "Peanut Butter",
    price: 289,
    discountPrice: 219,
    slug: "peanut-butter-crunch",
  },

  {
    _id: 6,
    name: "Caramel Delight",
    description: "Golden caramel cookies with buttery texture.",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd",
    category: "Caramel",
    price: 309,
    discountPrice: 239,
    slug: "caramel-delight",
  },

  {
    _id: 7,
    name: "Double Choco Chip",
    description: "Loaded with double chocolate chips for extra indulgence.",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
    category: "Chocolate",
    price: 279,
    discountPrice: 209,
    slug: "double-choco-chip",
  },

  {
    _id: 8,
    name: "Coffee Mocha",
    description: "Coffee infused cookies with mocha flavor.",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d",
    category: "Coffee",
    price: 319,
    discountPrice: 249,
    slug: "coffee-mocha",
  },

  {
    _id: 9,
    name: "White Choco Almond",
    description: "White chocolate cookies topped with roasted almonds.",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    category: "Almond",
    price: 339,
    discountPrice: 269,
    slug: "white-choco-almond",
  },

  {
    _id: 10,
    name: "Classic Choco Chip",
    description: "The timeless classic chocolate chip cookie everyone loves.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    category: "Classic",
    price: 199,
    discountPrice: 149,
    slug: "classic-choco-chip",
  },
];

const Cookies = () => {
  return (
    <div className='min-h-screen bg-[#FFF6EC] px-6 py-12'>
      <div className='max-w-7xl mx-auto'>
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

        {/* Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {cookies.map((cookie) => (
            <CookieCard key={cookie._id} cookie={cookie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cookies;
