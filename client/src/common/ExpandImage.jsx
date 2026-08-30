<AnimatePresence>
    {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition cursor-pointer"
            >
                <FiX size={24} />
            </button>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-4xl w-full max-h-[85vh] flex items-center justify-center p-2"
            >
                <img
                    src={images[activeImageIdx] || placeholderCookie}
                    alt={cookie.name}
                    className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                />
            </motion.div>
        </div>
    )}
</AnimatePresence>