import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export default function DeleteDialog({
  open,
  onClose,
  onConfirm,
  message,
  title = "Delete Item",
  confirmLabel = "Delete",
  loading = false,
}) {
  return (
    <Dialog open={open} onClose={onClose} className='relative z-50'>
      {/* Backdrop */}
      <DialogBackdrop
        transition
        className='
          fixed inset-0 bg-black/40 backdrop-blur-sm
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
            max-w-md
            rounded-4xl
            bg-white
            p-7
            shadow-2xl
            transition-all duration-300
            data-closed:scale-95
            data-closed:opacity-0
          '
        >
          {/* Icon */}
          <div
            className='
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-red-100
            '
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.8}
              stroke='currentColor'
              className='h-8 w-8 text-red-600'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
              />
            </svg>
          </div>

          {/* Content */}
          <div className='mt-5 text-center'>
            <DialogTitle className='text-2xl font-semibold text-[#2B1D16]'>
              {title}
            </DialogTitle>

            <p className='mt-3 text-gray-500 leading-7'>{message}</p>
          </div>

          {/* Actions */}
          <div className='mt-8 flex gap-3'>
            <button
              type='button'
              onClick={onClose}
              disabled={loading}
              className='
                flex-1
                rounded-full
                border
                border-gray-300
                py-3
                font-medium
                text-gray-700
                transition
                hover:bg-gray-100
                disabled:opacity-60
                cursor-pointer
              '
            >
              Cancel
            </button>

            <button
              type='button'
              onClick={onConfirm}
              disabled={loading}
              className='
                flex-1
                rounded-full
                bg-red-600
                py-3
                font-medium
                text-white
                transition
                hover:bg-red-700
                disabled:opacity-70
                disabled:cursor-not-allowed
                cursor-pointer
              '
            >
              {loading ? "Deleting..." : confirmLabel}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
