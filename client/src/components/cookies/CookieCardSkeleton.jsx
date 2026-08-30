const CookieCardSkeleton = () => {
  return (
    <div className="bg-white rounded-[28px] overflow-hidden shadow-lg animate-pulse">
      <div className="h-64 bg-gray-200" />

      <div className="p-5">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="mt-4 space-y-2">
          <div className=" h-4 bg-gray-200 rounded" />
          <div className=" h-4 bg-gray-200 rounded w-5/6" />
        </div>

        <div className="h-6 bg-gray-200 rounded w-1/3 mt-5" />
        <div className="flex gap-3 mt-6">
          <div className="flex-1 h-12 bg-gray-200 rounded-full" />
          <div className=" w-20 h-12 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CookieCardSkeleton;
