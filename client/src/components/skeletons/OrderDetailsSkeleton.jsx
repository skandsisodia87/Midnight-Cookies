const OrderDetailsSkeleton = () => {
  return (
    <div className='animate-pulse'>
      <div className='flex justify-between items-center mb-10'>
        <div className='space-y-4'>
          <div className='h-10 w-64 bg-gray-200 rounded'></div>

          <div className='h-5 w-40 bg-gray-200 rounded'></div>
        </div>

        <div className='h-12 w-32 bg-gray-200 rounded-full'></div>
      </div>

      <div className='grid lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 space-y-8'>
          <div className='bg-white rounded-4xl shadow-lg p-8'>
            <div className='h-8 w-56 bg-gray-200 rounded mb-8'></div>

            {[1, 2].map((item) => (
              <div key={item} className='flex gap-5 border-b pb-6 mb-6'>
                <div className='w-28 h-28 bg-gray-200 rounded-2xl'></div>

                <div className='flex-1 space-y-4'>
                  <div className='h-6 w-52 bg-gray-200 rounded'></div>

                  <div className='h-4 w-28 bg-gray-200 rounded'></div>

                  <div className='h-5 w-20 bg-gray-200 rounded'></div>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-white rounded-4xl shadow-lg p-8'>
            <div className='h-8 w-64 bg-gray-200 rounded mb-8'></div>

            <div className='space-y-4'>
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className='h-5 bg-gray-200 rounded'></div>
              ))}
            </div>
          </div>
        </div>

        <div className='space-y-8'>
          <div className='bg-white rounded-4xl shadow-lg p-8'>
            <div className='h-8 w-40 bg-gray-200 rounded mb-8'></div>

            <div className='space-y-5'>
              {[1, 2, 3].map((item) => (
                <div key={item} className='h-5 bg-gray-200 rounded'></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;
