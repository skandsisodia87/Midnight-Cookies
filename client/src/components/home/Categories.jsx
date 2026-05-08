const categories = [
  {
    title: "Chocolate",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
  },

  {
    title: "Oreo",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",
  },

  {
    title: "Premium",
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e",
  },
];

const Categories = () => {
  return (
    <section className='py-24 px-6 bg-white'>
      <div className='max-w-7xl mx-auto'>
        {/* Heading */}
        <div className='text-center mb-16'>
          <h2 className='text-5xl font-bold text-[#2B1D16]'>
            Explore Categories
          </h2>

          <p className='mt-4 text-gray-600 max-w-2xl mx-auto leading-7'>
            Discover cookies crafted for every craving.
          </p>
        </div>

        {/* Grid */}
        <div className='grid md:grid-cols-3 gap-8'>
          {categories.map((category, index) => (
            <div
              key={index}
              className='
                relative
                overflow-hidden
                rounded-4xl
                group
                cursor-pointer
                h-100
              '
            >
              <img
                src={category.image}
                alt={category.title}
                className='
                  w-full
                  h-full
                  object-cover
                  group-hover:scale-110
                  transition
                  duration-700
                '
              />

              <div
                className='
                  absolute
                  inset-0
                  bg-black/40
                  flex
                  items-end
                  p-8
                '
              >
                <h3 className='text-4xl font-bold text-white'>
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
