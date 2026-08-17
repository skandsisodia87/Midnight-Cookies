import constants from "../../common/constants";

const LandingPageLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#1b0f0b] via-[#2c1810] to-[#140c08]">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="animate-bounce text-7xl drop-shadow-xl">🍪</div>
        </div>

        <h1 className="p-2 bg-linear-to-r from-[#D98B2B] via-yellow-400 to-[#D98B2B] bg-clip-text text-5xl font-extrabold text-transparent">
          {constants.APPICATION_NAME}
        </h1>

        <p className="mt-2 text-sm tracking-[0.4em] text-[#D98B2B] uppercase">
          Freshly Baking...
        </p>

        <div className="mx-auto mt-8 flex items-center justify-center gap-2">
          <span className="h-3 w-3 animate-bounce rounded-full bg-[#D98B2B] [animation-delay:-0.3s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-[#D98B2B] [animation-delay:-0.15s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-[#D98B2B]" />
        </div>
        <div className="relative mx-auto mt-8 h-2 w-60 overflow-hidden rounded-full bg-white/10">
          <div className="absolute inset-y-0 w-1/3 animate-loading rounded-full bg-linear-to-r from-amber-300 via-yellow-400 to-[#D98B2B]" />
        </div>
      </div>
    </div>
  );
};

export default LandingPageLoader;
