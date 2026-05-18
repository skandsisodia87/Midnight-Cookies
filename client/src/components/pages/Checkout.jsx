import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAddresses } from "../../services/order.service";
import { getFullAddress } from "../../common/getFullAddress";
import AddressSection from "../address/AddressSection";

export default function CheckoutPage() {
  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [showAddressPopup, setShowAddressPopup] = useState(false);

  const [showAddAddressPopup, setShowAddAddressPopup] = useState(false);

  const [showEditAddressPopup, setShowEditAddressPopup] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAddresses();

        if (data.success) {
          const allAddresses = data.addresses ?? [];

          setAddresses(allAddresses);

          const defaultAddress =
            allAddresses.find((a) => a.isDefault) || allAddresses[0];

          setSelectedAddress(defaultAddress || null);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Please refresh the page");
      }
    };

    fetchAddresses();
  }, []);

  return (
    <div className='min-h-screen bg-[#FFF6EC] py-10 px-4 md:px-8'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left Section */}
        <div className='lg:col-span-2 space-y-8'>
          {/* Heading */}
          <div>
            <h1 className='text-4xl font-bold text-[#2B1D16]'>Checkout 🍪</h1>

            <p className='mt-2 text-gray-500'>
              Complete your order and enjoy freshly baked cookies.
            </p>
          </div>

          <AddressSection addresses={addresses} />

          {/* Payment Method */}
          <div className='bg-white rounded-4xl shadow-lg p-6'>
            <h2 className='text-2xl font-semibold text-[#2B1D16]'>
              Payment Method
            </h2>

            <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* COD */}
              <div
                className='
                  border-2
                  border-[#D98B2B]
                  rounded-3xl
                  p-5
                  bg-[#fffaf4]
                  cursor-pointer
                '
              >
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='font-semibold text-[#2B1D16]'>
                      Cash on Delivery
                    </h3>

                    <p className='text-sm text-gray-500 mt-1'>
                      Pay when your order arrives.
                    </p>
                  </div>

                  <input
                    type='radio'
                    checked
                    readOnly
                    className='w-5 h-5 accent-[#D98B2B]'
                  />
                </div>
              </div>

              {/* Online Payment */}
              <div
                className='
                  border
                  border-gray-200
                  rounded-3xl
                  p-5
                  hover:border-[#D98B2B]
                  cursor-pointer
                  transition
                '
              >
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='font-semibold text-[#2B1D16]'>
                      Online Payment
                    </h3>

                    <p className='text-sm text-gray-500 mt-1'>
                      UPI, Cards, Wallets & Net Banking.
                    </p>
                  </div>

                  <input
                    type='radio'
                    readOnly
                    className='w-5 h-5 accent-[#D98B2B]'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className='bg-white rounded-4xl shadow-lg p-6'>
            <h2 className='text-2xl font-semibold text-[#2B1D16]'>
              Order Notes
            </h2>

            <textarea
              rows={5}
              placeholder='Add delivery instructions or notes...'
              className='
                w-full
                mt-5
                border
                border-gray-300
                rounded-3xl
                p-5
                outline-none
                resize-none
                focus:border-[#D98B2B]
                transition
              '
            />
          </div>
        </div>

        {/* Right Section */}
        <div>
          <div className='bg-white rounded-4xl shadow-lg p-6 sticky top-8'>
            <h2 className='text-2xl font-semibold text-[#2B1D16]'>
              Order Summary
            </h2>

            {/* Items */}
            <div className='mt-6 space-y-5'>
              <div className='flex items-center gap-4'>
                <img
                  src='https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=500&auto=format&fit=crop'
                  alt='cookie'
                  className='w-20 h-20 object-cover rounded-2xl'
                />

                <div className='flex-1'>
                  <h3 className='font-semibold text-[#2B1D16]'>
                    Choco Lava Cookie
                  </h3>

                  <p className='text-sm text-gray-500 mt-1'>Qty: 2</p>
                </div>

                <p className='font-semibold text-[#2B1D16]'>₹240</p>
              </div>

              <div className='flex items-center gap-4'>
                <img
                  src='https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=500&auto=format&fit=crop'
                  alt='cookie'
                  className='w-20 h-20 object-cover rounded-2xl'
                />

                <div className='flex-1'>
                  <h3 className='font-semibold text-[#2B1D16]'>
                    Red Velvet Cookie
                  </h3>

                  <p className='text-sm text-gray-500 mt-1'>Qty: 1</p>
                </div>

                <p className='font-semibold text-[#2B1D16]'>₹140</p>
              </div>
            </div>

            {/* Coupon */}
            <div className='mt-8'>
              <label className='block mb-3 font-medium text-[#2B1D16]'>
                Apply Coupon
              </label>

              <div className='flex gap-3'>
                <input
                  type='text'
                  placeholder='Enter coupon code'
                  className='
                    flex-1
                    border
                    border-gray-300
                    rounded-full
                    px-5
                    py-3
                    outline-none
                    focus:border-[#D98B2B]
                    transition
                  '
                />

                <button
                  className='
                    bg-[#2B1D16]
                    hover:bg-[#1e140f]
                    text-white
                    px-6
                    rounded-full
                    font-medium
                    transition
                  '
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Price Details */}
            <div className='mt-8 border-t border-gray-200 pt-6 space-y-4'>
              <div className='flex items-center justify-between text-gray-600'>
                <p>Subtotal</p>
                <p>₹380</p>
              </div>

              <div className='flex items-center justify-between text-gray-600'>
                <p>Delivery Fee</p>
                <p>₹40</p>
              </div>

              <div className='flex items-center justify-between text-green-600'>
                <p>Discount</p>
                <p>- ₹50</p>
              </div>

              <div className='border-t border-gray-200 pt-4 flex items-center justify-between'>
                <h3 className='text-xl font-bold text-[#2B1D16]'>Total</h3>

                <h3 className='text-2xl font-bold text-[#D98B2B]'>₹370</h3>
              </div>
            </div>

            {/* Place Order */}
            <button
              className='
                w-full
                mt-8
                bg-[#D98B2B]
                hover:bg-[#c97818]
                text-white
                py-4
                rounded-full
                font-semibold
                text-lg
                transition
              '
            >
              Place Order 🍪
            </button>

            <p className='text-center text-sm text-gray-500 mt-4 leading-6'>
              By placing this order, you agree to our Terms & Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
