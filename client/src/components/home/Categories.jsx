const categories = [
  {
    title: "Chocolate",
    image:
      "https://res.cloudinary.com/dvxwaltk8/image/upload/v1778474022/double_choco-chip_nl8ho9.jpg",
  },

  {
    title: "Oreo",
    image:
      "https://res.cloudinary.com/dvxwaltk8/image/upload/v1778477269/oreo-dream_ktf5ba.png",
  },

  {
    title: "Premium",
    image:
      "https://res.cloudinary.com/dvxwaltk8/image/upload/v1778476344/red-velvet-cookie_yupu07.png",
  },
];

const Categories = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1D16]">
            Explore Categories
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-6 sm:leading-7">
            Discover cookies crafted for every craving.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="
                relative
                overflow-hidden
                rounded-3xl
                lg:rounded-4xl
                group
                cursor-pointer
                h-72
                sm:h-80
                lg:h-100
              "
            >
              <img
                src={category.image}
                alt={category.title}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-110
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-black/40
                  flex
                  items-end
                  p-5
                  sm:p-6
                  lg:p-8
                "
              >
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
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
