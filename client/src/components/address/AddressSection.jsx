import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import AddEditDialog from "./AddEditDialog";

export default function AddressSection({ addresses = [] }) {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressDialog, setShowAddressDialog] = useState(false);

  const [showAddAddressPopup, setShowAddAddressPopup] = useState(false);

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];

      setSelectedAddress(defaultAddress);
    }
  }, [addresses]);

  return (
    <>
      {/* Main Address Card */}
      <div className='bg-white rounded-4xl shadow-lg p-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-semibold text-[#2B1D16]'>
            Delivery Address
          </h2>

          <button
            onClick={() => setShowAddAddressPopup(true)}
            className='
              bg-[#D98B2B]
              hover:bg-[#c97818]
              text-white
              px-5
              py-2.5
              rounded-full
              font-medium
              transition
            '
          >
            Add New
          </button>
        </div>

        {/* Show Only Selected Address */}
        {selectedAddress && (
          <div
            className='
              mt-6
              border-2
              border-[#D98B2B]
              rounded-3xl
              p-5
              bg-[#fffaf4]
            '
          >
            <div className='flex items-start justify-between gap-4'>
              <div>
                <div className='flex items-center gap-3'>
                  <h3 className='font-semibold text-[#2B1D16] text-lg'>Home</h3>

                  {selectedAddress.isDefault && (
                    <span
                      className='
                        text-xs
                        bg-[#D98B2B]
                        text-white
                        px-2
                        py-1
                        rounded-full
                      '
                    >
                      Default
                    </span>
                  )}
                </div>

                <p className='mt-2 text-gray-600 leading-7'>
                  {selectedAddress.fullAddress}, {selectedAddress.city},{" "}
                  {selectedAddress.state} - {selectedAddress.pincode}
                </p>

                {/* Actions */}
                <div className='flex items-center gap-5 mt-4'>
                  <button
                    onClick={() => setShowAddressDialog(true)}
                    className='
                      text-[#D98B2B]
                      font-medium
                      hover:underline
                      cursor-pointer
                    '
                  >
                    Change Address
                  </button>

                  <button
                    className='
                      text-gray-600
                      font-medium
                      hover:underline
                    '
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog
        open={showAddressDialog}
        onClose={setShowAddressDialog}
        className='relative z-50'
      >
        <DialogBackdrop
          transition
          className='
            fixed inset-0 bg-black/40
            transition-opacity duration-300
            data-closed:opacity-0
          '
        />

        {/* Dialog Container */}
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <DialogPanel
            transition
            className='
              w-full
              max-w-2xl
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
                Select Address
              </DialogTitle>

              <button
                onClick={() => setShowAddressDialog(false)}
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

            {/* Address List */}
            <div className='mt-6 space-y-4 max-h-112.5 overflow-y-auto'>
              {addresses.map((address) => (
                <div
                  key={address._id}
                  onClick={() => {
                    setSelectedAddress(address);
                    setShowAddressDialog(false);
                  }}
                  className={`
                    border
                    rounded-3xl
                    p-5
                    cursor-pointer
                    transition
                    ${
                      selectedAddress?._id === address._id
                        ? "border-[#D98B2B] bg-[#fffaf4]"
                        : "border-gray-200 hover:border-[#D98B2B]"
                    }
                  `}
                >
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <div className='flex items-center gap-2'>
                        <h3 className='font-semibold text-[#2B1D16]'>Home</h3>

                        {address.isDefault && (
                          <span
                            className='
                              text-xs
                              bg-[#D98B2B]
                              text-white
                              px-2
                              py-1
                              rounded-full
                            '
                          >
                            Default
                          </span>
                        )}
                      </div>

                      <p className='mt-2 text-gray-600 leading-7'>
                        {address.fullAddress}, {address.city}, {address.state} -{" "}
                        {address.pincode}
                      </p>
                    </div>

                    <input
                      type='radio'
                      checked={selectedAddress?._id === address._id}
                      readOnly
                      className='w-5 h-5 accent-[#D98B2B]'
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <button
              onClick={() => {
                setShowAddressDialog(false);
                setShowAddAddressPopup(true);
              }}
              className='
                mt-6
                w-full
                bg-[#D98B2B]
                hover:bg-[#c97818]
                text-white
                py-3
                rounded-full
                font-medium
                transition
                cursor-pointer
              '
            >
              Add New Address
            </button>
          </DialogPanel>
        </div>
      </Dialog>
      <AddEditDialog
        open={showAddAddressPopup}
        onClose={() => setShowAddAddressPopup(false)}
        address={selectedAddress} // remove this line for Add mode
        onSubmit={(formData) => {
          console.log(formData);

          // call add/update api here
        }}
        loading={false}
      />
    </>
  );
}
