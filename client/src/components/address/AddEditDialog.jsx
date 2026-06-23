import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export default function AddEditDialog({
  open,
  onClose,
  address = null,
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  // Prefill data in edit mode
  useEffect(() => {
    if (address) {
      setFormData({
        fullName: address.fullName || "",
        phone: address.phone || "",
        address: address.address || "",
        city: address.city || "",
        state: address.state || "",
        pincode: address.pincode || "",
        isDefault: address.isDefault || false,
      });
    } else {
      setFormData({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        isDefault: false,
      });
    }
  }, [address, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit?.(formData);
  };

  return (
    <Dialog open={open} onClose={()=>{}} className='relative z-50'>
      <DialogBackdrop
        transition
        className='
          fixed inset-0 bg-black/40
          transition-opacity duration-300
          data-closed:opacity-0
        '
      />

      {/* Container */}
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <DialogPanel
          transition
          className='
              w-full
              max-w-2xl
              max-h-[calc(100vh-64px)]
              overflow-y-auto
              rounded-4xl
              bg-white
              p-6
              shadow-xl
              transition-all duration-300
              data-closed:scale-95
              data-closed:opacity-0
            '
        >
          {/* Header */}
          <div className='flex items-center justify-between'>
            <DialogTitle className='text-2xl font-semibold text-[#2B1D16]'>
              {address ? "Edit Address" : "Add Address"}
            </DialogTitle>

            <button
              onClick={onClose}
              className='
                  text-2xl
                  text-gray-500
                  hover:text-black
                  transition
                '
            >
              ×
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='mt-6 space-y-5'>
            {/* Full Name */}
            <div>
              <label className='block mb-2 font-medium text-[#2B1D16]'>
                Full Name
              </label>

              <input
                type='text'
                name='fullName'
                value={formData.fullName}
                onChange={handleChange}
                placeholder='Enter full name'
                className='
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-4
                    py-3
                    outline-none
                    focus:border-[#D98B2B]
                  '
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className='block mb-2 font-medium text-[#2B1D16]'>
                Phone Number
              </label>

              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                placeholder='Enter phone number'
                pattern='[0-9]{10}'
                maxLength={10}
                className='
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-4
                    py-3
                    outline-none
                    focus:border-[#D98B2B]
                '
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className='block mb-2 font-medium text-[#2B1D16]'>
                Full Address
              </label>

              <textarea
                rows={4}
                name='address'
                value={formData.address}
                onChange={handleChange}
                placeholder='House no, apartment, street...'
                className='
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-4
                    py-3
                    outline-none
                    resize-none
                    focus:border-[#D98B2B]
                  '
                required
              />
            </div>

            {/* City + State */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* City */}
              <div>
                <label className='block mb-2 font-medium text-[#2B1D16]'>
                  City
                </label>

                <input
                  type='text'
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
                  placeholder='Enter city'
                  className='
                      w-full
                      border
                      border-gray-300
                      rounded-2xl
                      px-4
                      py-3
                      outline-none
                      focus:border-[#D98B2B]
                    '
                  required
                />
              </div>

              {/* State */}
              <div>
                <label className='block mb-2 font-medium text-[#2B1D16]'>
                  State
                </label>

                <input
                  type='text'
                  name='state'
                  value={formData.state}
                  onChange={handleChange}
                  placeholder='Enter state'
                  className='
                      w-full
                      border
                      border-gray-300
                      rounded-2xl
                      px-4
                      py-3
                      outline-none
                      focus:border-[#D98B2B]
                    '
                  required
                />
              </div>
            </div>

            {/* Pincode */}
            <div>
              <label className='block mb-2 font-medium text-[#2B1D16]'>
                Pincode
              </label>

              <input
                type='text'
                name='pincode'
                value={formData.pincode}
                onChange={handleChange}
                placeholder='Enter pincode'
                className='
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-4
                    py-3
                    outline-none
                    focus:border-[#D98B2B]
                  '
                required
              />
            </div>

            {/* Default Address */}
            <label className='flex items-center gap-3 cursor-pointer'>
              <input
                type='checkbox'
                name='isDefault'
                checked={formData.isDefault}
                onChange={handleChange}
                className='w-5 h-5 accent-[#D98B2B]'
              />

              <span className='text-[#2B1D16] font-medium'>
                Set as default address
              </span>
            </label>

            {/* Footer */}
            <div className='flex gap-4 pt-2'>
              <button
                type='button'
                onClick={onClose}
                className='
                    flex-1
                    border
                    border-gray-300
                    text-gray-700
                    py-3
                    rounded-full
                    font-medium
                    hover:bg-gray-100
                    transition
                  '
              >
                Cancel
              </button>

              <button
                type='submit'
                disabled={loading}
                className='
                    flex-1
                    bg-[#D98B2B]
                    hover:bg-[#c97818]
                    text-white
                    py-3
                    rounded-full
                    font-medium
                    transition
                    disabled:opacity-60
                  '
              >
                {loading
                  ? "Saving..."
                  : address
                    ? "Update Address"
                    : "Add Address"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
