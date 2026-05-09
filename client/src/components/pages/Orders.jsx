import { FiPackage, FiTruck, FiCheckCircle, FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";

const orders = [
  {
    id: "MC-XA82KD5521",
    status: "delivered",
    total: 599,
    date: "08 May 2026",

    items: [
      {
        name: "Chocolate Blast",
        quantity: 2,
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
      },

      {
        name: "Oreo Dream",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",
      },
    ],
  },

  {
    id: "MC-QW91PL1182",
    status: "shipped",
    total: 299,
    date: "07 May 2026",

    items: [
      {
        name: "Red Velvet",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e",
      },
    ],
  },
];

// Status UI
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

const Orders = () => {
  return (
    <div className='min-h-screen bg-[#FFF6EC] px-6 py-12'>
      <div className='max-w-6xl mx-auto'>
        {/* Heading */}
        <div className='mb-12'>
          <h1 className='text-5xl font-bold text-[#2B1D16]'>My Orders</h1>

          <p className='mt-4 text-gray-600'>
            Track your delicious cookie orders 🍪
          </p>
        </div>

        {/* Orders */}
        <div className='space-y-8'>
          {orders.map((order) => {
            const currentStatus = statusConfig[order.status];

            return (
              <div
                key={order.id}
                className='
                  bg-white
                  rounded-4xl
                  shadow-lg
                  overflow-hidden
                '
              >
                {/* Header */}
                <div
                  className='
                    border-b
                    px-8
                    py-6
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                  '
                >
                  <div>
                    <h2 className='text-2xl font-bold text-[#2B1D16]'>
                      {order.id}
                    </h2>

                    <p className='text-gray-500 mt-2'>
                      Ordered on {order.date}
                    </p>
                  </div>

                  {/* Status */}
                  <div
                    className={`
                      inline-flex
                      items-center
                      gap-2
                      px-5
                      py-3
                      rounded-full
                      text-sm
                      font-semibold
                      ${currentStatus.color}
                    `}
                  >
                    {currentStatus.icon}

                    {currentStatus.text}
                  </div>
                </div>

                {/* Items */}
                <div className='p-8 space-y-6'>
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className='
                          flex
                          items-center
                          gap-5
                        '
                    >
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className='
                            w-24
                            h-24
                            rounded-2xl
                            object-cover
                          '
                      />

                      {/* Details */}
                      <div className='flex-1'>
                        <h3 className='text-xl font-bold text-[#2B1D16]'>
                          {item.name}
                        </h3>

                        <p className='text-gray-500 mt-2'>
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div
                  className='
                    bg-[#FFF8F1]
                    px-8
                    py-5
                    flex
                    items-center
                    justify-between
                  '
                >
                  <h3 className='text-xl font-bold text-[#2B1D16]'>
                    Total: ₹{order.total}
                  </h3>

                  <Link
                    to={`/orders/${order.id}`}
                    className='
                        bg-[#D98B2B]
                        hover:bg-[#c97818]
                        text-white
                        px-6
                        py-3
                        rounded-full
                        font-semibold
                        transition
                    '
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
