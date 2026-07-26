const CookieDetailsSkeleton = () => {
  return (
    <div
      className='
          min-h-screen
          bg-[#FFF6EC]
          px-6
          py-12
          animate-pulse
        '
    >
      <div
        className='
            max-w-7xl
            mx-auto
          '
      >
        <div
          className='
              grid
              lg:grid-cols-2
              gap-12
            '
        >
          {/* Image */}
          <div
            className='
                bg-gray-200
                rounded-[40px]
                h-137.5
              '
          />

          {/* Content */}
          <div>
            <div
              className='
                  h-8
                  w-32
                  bg-gray-200
                  rounded-full
                '
            />

            <div
              className='
                  h-14
                  w-3/4
                  bg-gray-200
                  rounded
                  mt-6
                '
            />

            <div
              className='
                  h-6
                  w-40
                  bg-gray-200
                  rounded
                  mt-5
                '
            />

            <div className='mt-8 space-y-3'>
              <div
                className='
                    h-4
                    bg-gray-200
                    rounded
                  '
              />

              <div
                className='
                    h-4
                    bg-gray-200
                    rounded
                    w-5/6
                  '
              />

              <div
                className='
                    h-4
                    bg-gray-200
                    rounded
                    w-4/6
                  '
              />
            </div>

            <div
              className='
                  h-12
                  w-52
                  bg-gray-200
                  rounded
                  mt-8
                '
            />

            <div
              className='
                  flex
                  gap-5
                  mt-10
                '
            >
              <div
                className='
                    flex-1
                    h-14
                    bg-gray-200
                    rounded-full
                  '
              />

              <div
                className='
                    flex-1
                    h-14
                    bg-gray-200
                    rounded-full
                  '
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieDetailsSkeleton;
