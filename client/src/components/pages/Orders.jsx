import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import { getMyOrders } from "../../services/order.service";
import OrderSkeleton from "../skeletons/OrderSkeleton";
import StatusConfig from "../../common/StatusConfig";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();

        if (data?.success) {
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className='min-h-screen bg-[#FFF6EC] px-6 py-12'>
      <div className='max-w-6xl mx-auto'>
        <div className='mb-12'>
          <h1 className='text-5xl font-bold text-[#2B1D16]'>My Orders</h1>

          <p className='mt-4 text-gray-600'>
            Track your delicious cookie orders 🍪
          </p>
        </div>

        {loading && <OrderSkeleton />}

        {!loading && orders.length === 0 && (
          <div
            className='
              bg-white
              rounded-4xl
              shadow-lg
              py-24
              px-8
              text-center
            '
          >
            <div className='text-7xl mb-6'>🍪</div>

            <h2 className='text-3xl font-bold text-[#2B1D16]'>
              No Orders Found
            </h2>

            <p className='text-gray-500 mt-4'>
              Looks like you haven’t ordered any cookies yet.
            </p>

            <Link
              to='/cookies'
              className='
                inline-block
                mt-8
                bg-[#D98B2B]
                hover:bg-[#c97818]
                text-white
                px-8
                py-4
                rounded-full
                font-semibold
                transition
              '
            >
              Start Shopping
            </Link>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className='space-y-8'>
            {orders.map((order) => {
              const currentStatus =
                StatusConfig[order.orderStatus] || StatusConfig.placed;

              return (
                <div
                  key={order.orderId}
                  className='bg-white rounded-4xl shadow-lg overflow-hidden'
                >
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
                        {order.orderId}
                      </h2>

                      <p className='text-gray-500 mt-2'>
                        Ordered on {moment(order.createdAt).format("MMMM D, YYYY h:mm A")}
                      </p>
                    </div>

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

                  <div className='p-8 space-y-6'>
                    {order.items.map((item, index) => (
                      <div key={index} className='flex items-center gap-5'>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-24 h-24 rounded-2xl object-cover'
                        />

                        <div className='flex-1'>
                          <h3 className='text-xl font-bold text-[#2B1D16]'>
                            {item.name}
                          </h3>

                          <p className='text-sm text-gray-400 mt-1'>
                            {item.sku}
                          </p>

                          <p className='text-gray-500 mt-2'>
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

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
                      Total: ₹{order.totalAmount}
                    </h3>

                    <Link
                      to={`/orders/${order.orderId}`}
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
        )}
      </div>
    </div>
  );
};

export default Orders;
