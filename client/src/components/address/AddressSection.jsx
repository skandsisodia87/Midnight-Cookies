import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { FiTrash2 } from "react-icons/fi";
import { MdLocationOff } from "react-icons/md";
import AddEditDialog from "./AddEditDialog";
import DeleteDialog from "../../common/DeleteDialog";
import {
  addAddress,
  updateAddress,
  deleteAddress,
} from "../../services/order.service";
import { toast } from "sonner";
import { IoIosAddCircle } from "react-icons/io";

export default function AddressSection({
  addresses = [],
  fetchAddresses,
  selectedAddress,
  setSelectedAddress,
}) {
  const [enableEditing, setEnableEditing] = useState(false);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [showAddAddressPopup, setShowAddAddressPopup] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAddress = async () => {
    if (!addressToDelete) {
      return;
    }

    try {
      setDeleting(true);

      const res = await deleteAddress(addressToDelete._id);

      if (res.success) {
        toast.success(res.message);

        const updatedAddresses = await fetchAddresses();

        if (selectedAddress?._id === addressToDelete._id) {
          setSelectedAddress(updatedAddresses?.[0] ?? null);
        }

        setShowDeleteDialog(false);
        setAddressToDelete(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete address");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* Main Address Card */}
      <div className="bg-white rounded-4xl shadow-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-[#2B1D16]">
            Delivery Address
          </h2>
          <IoIosAddCircle
            size={24}
            className="cursor-pointer text-[#D98B2B]"
            onClick={() => {
              setShowAddressDialog(false);
              setShowAddAddressPopup(true);
            }}
          />
        </div>

        {selectedAddress && (
          <div
            className="
              mt-6
              border-2
              border-[#D98B2B]
              rounded-3xl
              p-5
              bg-[#fffaf4]
            "
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-[#2B1D16] text-lg">
                    {selectedAddress.fullName}
                  </h3>

                  {selectedAddress.isDefault && (
                    <span
                      className="
                        text-xs
                        bg-[#D98B2B]
                        text-white
                        px-2
                        py-1
                        rounded-full
                      "
                    >
                      Default
                    </span>
                  )}
                </div>

                <p className="mt-2 text-gray-600 leading-7">
                  {selectedAddress.address}, {selectedAddress.city},{" "}
                  {selectedAddress.state} - {selectedAddress.pincode}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-5 mt-4">
                  <button
                    onClick={() => setShowAddressDialog(true)}
                    className="
                      text-[#D98B2B]
                      font-medium
                      hover:underline
                      cursor-pointer
                    "
                  >
                    Change Address
                  </button>

                  <button
                    onClick={() => {
                      setEnableEditing(true);
                      setShowAddAddressPopup(true);
                    }}
                    className="
                      text-gray-600
                      font-medium
                      hover:underline
                      cursor-pointer
                    "
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
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="
            fixed inset-0 bg-black/40
            transition-opacity duration-300
            data-closed:opacity-0
          "
        />

        {/* Dialog Container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="
              w-full
              max-w-2xl
              rounded-4xl
              bg-white
              p-6
              shadow-xl
              transition-all duration-300
              data-closed:scale-95
              data-closed:opacity-0
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-semibold text-[#2B1D16]">
                Select Address
              </DialogTitle>

              <button
                onClick={() => setShowAddressDialog(false)}
                className="
                  text-2xl
                  text-gray-500
                  hover:text-black
                  transition
                "
              >
                ×
              </button>
            </div>

            {/* Address List */}
            <div className="mt-6 space-y-4 max-h-112.5 overflow-y-auto">
              {addresses.length > 0 ? (
                addresses.map((address) => (
                <div
                  key={address._id}
                  className={`
                    border
                    rounded-3xl
                    p-5
                    transition
                    ${
                      selectedAddress?._id === address._id
                        ? "border-[#D98B2B] bg-[#fffaf4]"
                        : "border-gray-200 hover:border-[#D98B2B]"
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAddress(address);
                        setShowAddressDialog(false);
                      }}
                      className="flex-1 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#2B1D16]">
                          {address.fullName}
                        </h3>

                        {address.isDefault && (
                          <span
                            className="
                              text-xs
                              bg-[#D98B2B]
                              text-white
                              px-2
                              py-1
                              rounded-full
                            "
                          >
                            Default
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-gray-600 leading-7">
                        {address.address}, {address.city}, {address.state} -{" "}
                        {address.pincode}
                      </p>
                    </button>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setAddressToDelete(address);
                          setShowDeleteDialog(true);
                        }}
                        className="
                          p-2
                          rounded-full
                          text-gray-500
                          hover:text-red-600
                          hover:bg-red-50
                          transition
                          cursor-pointer
                        "
                        aria-label={`Delete ${address.fullName} address`}
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>

                      <div
                        className={`
                          w-5
                          h-5
                          rounded-full
                          border-2
                          flex
                          items-center
                          justify-center
                          transition
                          ${
                            selectedAddress?._id === address._id
                              ? "border-[#D98B2B]"
                              : "border-gray-300"
                          }
                        `}
                      >
                        {selectedAddress?._id === address._id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#D98B2B]" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
              ) : (
                <div className="text-center py-12">
                  <MdLocationOff className="h-12 w-12 mx-auto mb-4 text-[#D98B2B] opacity-60" />
                  <p className="text-lg font-semibold text-[#2B1D16] mb-2">
                    No addresses found
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <button
              onClick={() => {
                setShowAddressDialog(false);
                setShowAddAddressPopup(true);
              }}
              className="
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
              "
            >
              Add New Address
            </button>
          </DialogPanel>
        </div>
      </Dialog>
      <DeleteDialog
        open={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setAddressToDelete(null);
        }}
        onConfirm={handleDeleteAddress}
        title="Delete Address"
        message={`Are you sure you want to delete ${
          addressToDelete?.fullName || "this address"
        }? This action cannot be undone.`}
        confirmLabel="Delete Address"
        loading={deleting}
      />
      <AddEditDialog
        open={showAddAddressPopup}
        onClose={() => {
          setShowAddAddressPopup(false);
          if (enableEditing) {
            setEnableEditing(false);
          }
        }}
        address={enableEditing ? selectedAddress : null}
        onSubmit={async (formData) => {
          try {
            let res;
            if (enableEditing && selectedAddress) {
              res = await updateAddress(selectedAddress._id, formData);
            } else {
              res = await addAddress(formData);
            }

            if (res.success) {
              toast.success(res.message);

              const updatedAddresses = await fetchAddresses();
              if (updatedAddresses?.length > 0) {
                const latestAddress = updatedAddresses[0];
                setSelectedAddress(latestAddress);
              }

              setShowAddAddressPopup(false);

              if (enableEditing) {
                setEnableEditing(false);
              }
            }
          } catch (error) {
            toast.error(
              error.response?.data?.message || "Failed to add address",
            );
          }
        }}
        loading={false}
      />
    </>
  );
}
