import React from "react";

export default function OrderSkeleton() {
  return (
    <div className='space-y-8'>
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className='bg-white rounded-4xl shadow-lg overflow-hidden animate-pulse'
        >
          <div className='border-b px-8 py-6 flex justify-between items-center'>
            <div className='space-y-3'>
              <div className='h-6 w-48 bg-gray-200 rounded'></div>

              <div className='h-4 w-32 bg-gray-200 rounded'></div>
            </div>

            <div className='h-10 w-28 bg-gray-200 rounded-full'></div>
          </div>

          <div className='p-8 space-y-6'>
            {[1, 2].map((sub) => (
              <div key={sub} className='flex items-center gap-5'>
                <div className='w-24 h-24 bg-gray-200 rounded-2xl'></div>

                <div className='flex-1 space-y-3'>
                  <div className='h-5 w-40 bg-gray-200 rounded'></div>

                  <div className='h-4 w-24 bg-gray-200 rounded'></div>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-[#FFF8F1] px-8 py-5 flex justify-between items-center'>
            <div className='h-6 w-32 bg-gray-200 rounded'></div>

            <div className='h-12 w-32 bg-gray-200 rounded-full'></div>
          </div>
        </div>
      ))}
    </div>
  );
}
