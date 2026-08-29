import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FiX, FiPlus, FiMinus, FiPackage, FiCheck } from "react-icons/fi";
import { toast } from "sonner";
import { updateAdminVariantStock } from "../../../services/admin.service";
import constants from "../../../common/constants";

const QuickStockModal = ({ isOpen, onClose, cookie }) => {
  if (!isOpen || !cookie) return null;

  const queryClient = useQueryClient();
  const [stocks, setStocks] = useState({});
  const variants = cookie.variants || [];

  useEffect(() => {
    if (cookie?.variants) {
      const initial = {};
      cookie.variants.forEach((v) => {
        initial[v._id] = v.stock || 0;
      });
      setStocks(initial);
    }
  }, [cookie]);

  const { mutateAsync: updateStockMutate, isPending } = useMutation({
    mutationFn: updateAdminVariantStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [constants.ADMIN_PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [constants.DASHBOARD_DATA] });
    },
  });

  const handleDelta = (variantId, delta) => {
    setStocks((prev) => ({
      ...prev,
      [variantId]: Math.max(0, (prev[variantId] || 0) + delta),
    }));
  };

  const handleDirectInput = (variantId, value) => {
    const num = Math.max(0, parseInt(value, 10) || 0);
    setStocks((prev) => ({
      ...prev,
      [variantId]: num,
    }));
  };

  const handleSaveAll = async (e) => {
    e.preventDefault();
    try {
      const promises = variants.map((v) => {
        const newStock = stocks[v._id];
        if (newStock !== undefined && newStock !== v.stock) {
          return updateStockMutate({
            variantId: v._id,
            stock: newStock,
          });
        }
        return Promise.resolve();
      });

      await Promise.all(promises);
      toast.success(`Inventory updated for "${cookie.name}"!`);
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to update stock quantity.",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D1B16]/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg overflow-hidden rounded-[32px] bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#F3E4D4] bg-[#FFFDFB] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#F2D8BE] bg-[#FFF8EF]">
              {cookie.images?.[0]?.url ? (
                <img
                  src={cookie.images[0].url}
                  alt={cookie.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xl">🍪</span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#4E342E]">
                Quick Stock Adjustment
              </h2>
              <p className="text-xs text-[#8A7064]">{cookie.name}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#7A5C4D] hover:bg-[#FFF4E6] hover:text-[#4E342E] transition cursor-pointer"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSaveAll} className="p-6 space-y-4">
          <p className="text-xs text-[#7A5C4D]">
            Adjust the stock quantities for each weight/pack variant below:
          </p>

          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
            {variants.map((v) => {
              const currentVal = stocks[v._id] ?? v.stock ?? 0;
              const hasChanged = currentVal !== v.stock;

              return (
                <div
                  key={v._id}
                  className={`rounded-2xl border p-4 transition-all ${
                    hasChanged
                      ? "border-[#D98B2B] bg-[#FFFBF7]"
                      : "border-[#F3E4D4] bg-[#FFFDFB]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#4E342E]">
                        {v.weight}
                      </h4>
                      <p className="text-[11px] text-[#8A7064]">
                        Price: ₹{v.discountPrice || v.price} • SKU: {v.sku || "N/A"}
                      </p>
                    </div>

                    <div className="text-right text-xs">
                      <span className="text-[#8A7064]">Current: </span>
                      <strong className="font-bold text-[#4E342E]">
                        {v.stock}
                      </strong>
                    </div>
                  </div>

                  {/* Stepper and Quick Shortcuts */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#F6EBE0] pt-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleDelta(v._id, -5)}
                        className="rounded-lg border border-[#E4D7C8] bg-white px-2 py-1 text-[11px] font-bold text-[#8A5A36] hover:bg-[#FFF4E6] active:scale-95 cursor-pointer"
                      >
                        -5
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelta(v._id, -1)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E4D7C8] bg-white text-xs font-bold text-[#8A5A36] hover:bg-[#FFF4E6] active:scale-95 cursor-pointer"
                      >
                        <FiMinus size={12} />
                      </button>

                      <input
                        type="number"
                        min="0"
                        value={currentVal}
                        onChange={(e) => handleDirectInput(v._id, e.target.value)}
                        className="h-8 w-16 rounded-xl border border-[#E4D7C8] bg-white text-center text-sm font-extrabold text-[#4E342E] outline-none focus:border-[#D98B2B]"
                      />

                      <button
                        type="button"
                        onClick={() => handleDelta(v._id, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E4D7C8] bg-white text-xs font-bold text-[#8A5A36] hover:bg-[#FFF4E6] active:scale-95 cursor-pointer"
                      >
                        <FiPlus size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelta(v._id, 5)}
                        className="rounded-lg border border-[#E4D7C8] bg-white px-2 py-1 text-[11px] font-bold text-[#8A5A36] hover:bg-[#FFF4E6] active:scale-95 cursor-pointer"
                      >
                        +5
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelta(v._id, 10)}
                        className="rounded-lg border border-[#E4D7C8] bg-white px-2 py-1 text-[11px] font-bold text-[#8A5A36] hover:bg-[#FFF4E6] active:scale-95 cursor-pointer"
                      >
                        +10
                      </button>
                    </div>

                    {hasChanged && (
                      <span className="text-[11px] font-bold text-[#D98B2B]">
                        {currentVal > v.stock
                          ? `+${currentVal - v.stock}`
                          : currentVal - v.stock}{" "}
                        units
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-2.5 border-t border-[#F3E4D4] pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="rounded-2xl border border-[#E4D7C8] px-5 py-2.5 text-xs font-bold text-[#4E342E] hover:bg-[#FFF4E6] transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-[#4E342E] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#3E2723] shadow-xs transition disabled:opacity-50 cursor-pointer"
            >
              <FiCheck size={14} />
              {isPending ? "Saving..." : "Save Stock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickStockModal;
