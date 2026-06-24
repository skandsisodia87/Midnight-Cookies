const OrderDetailsSkeleton = () => {
  return (
    <div className='animate-pulse'>
      <div className='rounded-4xl bg-white p-8 shadow-[0_24px_80px_rgba(43,28,17,0.12)] mb-8'>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
          <div className='space-y-4'>
            <div className='h-5 w-32 bg-gray-200 rounded-full'></div>
            <div className='h-10 w-64 bg-gray-200 rounded'></div>
            <div className='h-4 w-40 bg-gray-200 rounded'></div>
          </div>

          <div className='h-12 w-32 rounded-full bg-gray-200'></div>
        </div>

        <div className='mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          {[...Array(4)].map((_, index) => (
            <div key={index} className='h-24 rounded-4xl bg-gray-200'></div>
          ))}
        </div>
      </div>

      <div className='grid lg:grid-cols-[1.9fr_1fr] gap-8'>
        <div className='space-y-8'>
          <div className='rounded-4xl bg-white shadow-lg p-8'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8'>
              <div className='space-y-3'>
                <div className='h-8 w-48 rounded bg-gray-200'></div>
                <div className='h-4 w-32 rounded bg-gray-200'></div>
              </div>
              <div className='h-5 w-32 rounded-full bg-gray-200'></div>
            </div>

            <div className='space-y-4'>
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className='flex flex-col gap-4 rounded-3xl bg-[#fff8f2] p-5 sm:flex-row sm:items-center sm:justify-between'
                >
                  <div className='flex items-center gap-4'>
                    <div className='h-28 w-28 rounded-3xl bg-gray-200'></div>
                    <div className='space-y-3'>
                      <div className='h-5 w-40 rounded bg-gray-200'></div>
                      <div className='h-4 w-36 rounded bg-gray-200'></div>
                      <div className='h-4 w-24 rounded bg-gray-200'></div>
                    </div>
                  </div>
                  <div className='space-y-3 text-right'>
                    <div className='h-4 w-24 rounded bg-gray-200 mx-auto sm:mx-0'></div>
                    <div className='h-6 w-32 rounded bg-gray-200 mx-auto sm:mx-0'></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-4xl bg-white shadow-lg p-8'>
            <div className='h-8 w-56 rounded bg-gray-200 mb-8'></div>
            <div className='space-y-4'>
              {[...Array(5)].map((_, index) => (
                <div key={index} className='h-5 w-full rounded bg-gray-200'></div>
              ))}
            </div>
          </div>
        </div>

        <div className='space-y-8'>
          <div className='rounded-4xl bg-white shadow-lg p-8'>
            <div className='h-8 w-40 rounded bg-gray-200 mb-8'></div>
            <div className='space-y-4'>
              {[...Array(4)].map((_, index) => (
                <div key={index} className='h-5 w-full rounded bg-gray-200'></div>
              ))}
            </div>
          </div>

          <div className='rounded-4xl bg-[#1F140F] p-8 shadow-lg'>
            <div className='h-8 w-48 rounded bg-gray-700 mb-6'></div>
            <div className='space-y-4'>
              <div className='h-4 w-full rounded bg-gray-700'></div>
              <div className='h-4 w-5/6 rounded bg-gray-700'></div>
              <div className='h-12 w-full rounded-full bg-gray-700'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;
