const LandingPageLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#24140f]">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-amber-400">
          Midnight Cookies
        </h1>

        <div className="relative mx-auto mt-6 h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <div className="absolute inset-y-0 w-1/2 animate-loading rounded-full bg-amber-400" />
        </div>

        <p className="mt-4 text-sm uppercase tracking-widest text-gray-400">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LandingPageLoader;