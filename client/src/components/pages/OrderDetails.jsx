import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StatusConfig from "../../common/StatusConfig";
import { getSingleOrder } from "../../services/order.service";
import ErrorPage from "../../common/ErrorPage";
import OrderDetailsSkeleton from "../skeletons/OrderDetailsSkeleton";

const OrderDetails = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getSingleOrder(orderId);

        if (data?.success) {
          setOrder(data.order);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error(error);

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className='min-h-screen px-6 py-12 bg-[#FFF6EC]'>
        <div className='max-w-6xl mx-auto'>
          <OrderDetailsSkeleton />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className='min-h-screen px-6 py-12 bg-[#FFF6EC]'>
        <div className='max-w-4xl mx-auto'>
          <ErrorPage
            title='Order Not Found'
            message='We could not find the order you are looking for.'
            buttonText='Back To Orders'
            redirectLink='/orders'
          />
        </div>
      </div>
    );
  }

  const currentStatus = StatusConfig[order.orderStatus] || StatusConfig.placed;

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

            <p className='mt-4 text-gray-600'>Order ID: {orderId}</p>
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

        <div className='grid lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-8'>
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

                    <div className='flex-1'>
                      <div
                        className='
                          flex
                          flex-col
                          md:flex-row
                          md:items-start
                          md:justify-between
                          gap-4
                        '
                      >
                        {/* Left */}
                        <div>
                          <h3 className='text-2xl font-bold text-[#2B1D16]'>
                            {item.name}
                          </h3>

                          <p className='mt-2 text-sm text-gray-400'>
                            {item.sku}
                          </p>

                          <p className='mt-1 text-sm text-gray-500'>
                            Weight: {item.weight}
                          </p>

                          <p className='mt-1 text-sm text-gray-500'>
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        {/* Right */}
                        <div className='text-right'>
                          <p className='text-sm text-gray-500'>
                            ₹{item.discountPrice} × {item.quantity}
                          </p>

                          <p className='mt-2 text-2xl font-bold text-[#D98B2B]'>
                            ₹{item.finalPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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

          <div className='space-y-8'>
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
