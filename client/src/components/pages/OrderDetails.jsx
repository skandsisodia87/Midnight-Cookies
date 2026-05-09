import { FiCheckCircle, FiClock, FiTruck, FiPackage } from "react-icons/fi";

import { useParams } from "react-router-dom";

const order = {
  id: "MC-XA82KD5521",

  status: "shipped",

  createdAt: "08 May 2026",

  totalAmount: 599,

  paymentMethod: "COD",

  shippingAddress: {
    fullName: "Skand Sisodia",
    phone: "+91 9999999999",
    address: "Sector 62",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201309",
  },

  items: [
    {
      name: "Chocolate Blast",
      quantity: 2,
      finalPrice: 199,
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    },

    {
      name: "Oreo Dream",
      quantity: 1,
      finalPrice: 149,
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",
    },
  ],
};

// Status Config
const statusConfig = {
  placed: {
    icon: <FiClock />,
    color: "bg-yellow-100 text-yellow-700",
    text: "Placed",
  },

  shipped: {
    icon: <FiTruck />,
    color: "bg-blue-100 text-blue-700",
    text: "Shipped",
  },

  delivered: {
    icon: <FiCheckCircle />,
    color: "bg-green-100 text-green-700",
    text: "Delivered",
  },

  cancelled: {
    icon: <FiPackage />,
    color: "bg-red-100 text-red-700",
    text: "Cancelled",
  },
};

const OrderDetails = () => {
  const { id } = useParams();

  const currentStatus = statusConfig[order.status];

  return (
    <div className='min-h-screen px-6 py-12 bg-[#FFF6EC]'>
      <div className='max-w-6xl mx-auto'>
        {/* Heading */}
        <div
          className='
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-5
            mb-10
          '
        >
          <div>
            <h1 className='text-5xl font-bold text-[#2B1D16]'>Order Details</h1>

            <p className='mt-4 text-gray-600'>Order ID: {order.id}</p>
          </div>

          {/* Status */}
          <div
            className={`
              inline-flex
              items-center
              gap-2
              px-6
              py-3
              rounded-full
              text-sm
              font-semibold
              w-fit
              ${currentStatus.color}
            `}
          >
            {currentStatus.icon}

            {currentStatus.text}
          </div>
        </div>

        {/* Main Grid */}
        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Left */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Ordered Items */}
            <div
              className='
                bg-white
                rounded-4xl
                shadow-lg
                p-8
              '
            >
              <h2 className='text-3xl font-bold text-[#2B1D16] mb-8'>
                Ordered Items
              </h2>

              <div className='space-y-6'>
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className='
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        gap-5
                        border-b
                        pb-6
                      '
                  >
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className='
                          w-28
                          h-28
                          rounded-2xl
                          object-cover
                        '
                    />

                    {/* Details */}
                    <div className='flex-1'>
                      <h3 className='text-2xl font-bold text-[#2B1D16]'>
                        {item.name}
                      </h3>

                      <p className='mt-2 text-gray-500'>
                        Quantity: {item.quantity}
                      </p>

                      <p className='mt-2 text-[#D98B2B] font-bold text-xl'>
                        ₹{item.finalPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div
              className='
                bg-white
                rounded-4xl
                shadow-lg
                p-8
              '
            >
              <h2 className='text-3xl font-bold text-[#2B1D16] mb-8'>
                Shipping Address
              </h2>

              <div className='space-y-3 text-gray-700 leading-7'>
                <p>
                  <strong>{order.shippingAddress.fullName}</strong>
                </p>

                <p>{order.shippingAddress.phone}</p>

                <p>{order.shippingAddress.address}</p>

                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>

                <p>{order.shippingAddress.pincode}</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className='space-y-8'>
            {/* Order Summary */}
            <div
              className='
                bg-white
                rounded-4xl
                shadow-lg
                p-8
              '
            >
              <h2 className='text-3xl font-bold text-[#2B1D16] mb-8'>
                Summary
              </h2>

              <div className='space-y-5 text-gray-700'>
                <div className='flex justify-between'>
                  <span>Order Date</span>

                  <span>{order.createdAt}</span>
                </div>

                <div className='flex justify-between'>
                  <span>Payment Method</span>

                  <span>{order.paymentMethod}</span>
                </div>

                <div className='border-t pt-5 flex justify-between text-2xl font-bold text-[#2B1D16]'>
                  <span>Total</span>

                  <span>₹{order.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div
              className='
                bg-[#1F140F]
                text-white
                rounded-4xl
                p-8
              '
            >
              <h2 className='text-2xl font-bold'>Need Help?</h2>

              <p className='mt-4 text-gray-300 leading-7'>
                Contact our support team for order assistance.
              </p>

              <button
                className='
                  mt-6
                  w-full
                  bg-[#D98B2B]
                  hover:bg-[#c97818]
                  py-4
                  rounded-full
                  font-semibold
                  transition
                '
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
