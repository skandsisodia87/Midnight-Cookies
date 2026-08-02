import { FiShoppingBag, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const OrderItems = ({ order, setOrder }) => {
  const updateQuantity = (id, type) => {
    const updatedItems = order.items.map((item) => {
      if (item._id !== id) return item;

      let quantity =
        type === "increase" ? item.quantity + 1 : item.quantity - 1;

      if (quantity < 1) quantity = 1;

      return {
        ...item,
        quantity,
      };
    });

    setOrder({
      ...order,
      items: updatedItems,
    });
  };

  const removeItem = (id) => {
    setOrder({
      ...order,
      items: order.items.filter((item) => item._id !== id),
    });
  };

  const total = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="rounded-2xl border border-[#F3E4D4] bg-white shadow-sm">
      {/* Header */}

      <div className="flex items-center gap-3 border-b border-[#F3E4D4] px-6 py-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF3E6]">
          <FiShoppingBag className="text-[#A15C38]" size={20} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E342E]">Order Items</h2>

          <p className="text-sm text-gray-500">Update ordered products</p>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {order.items.map((item) => (
          <div
            key={item._id}
            className="rounded-xl border border-[#F3E4D4] p-4"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              {/* Image */}

              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 rounded-xl object-cover"
              />

              {/* Details */}

              <div className="flex-1">
                <h3 className="font-semibold text-[#4E342E] text-lg">
                  {item.name}
                </h3>

                <p className="mt-1 text-[#A15C38] font-semibold">
                  ₹{item.price}
                </p>
              </div>

              {/* Quantity */}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item._id, "decrease")}
                  className="rounded-lg border border-[#F3E4D4] p-2 hover:bg-[#FFF8F2]"
                >
                  <FiMinus />
                </button>

                <span className="w-8 text-center font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => updateQuantity(item._id, "increase")}
                  className="rounded-lg border border-[#F3E4D4] p-2 hover:bg-[#FFF8F2]"
                >
                  <FiPlus />
                </button>
              </div>

              {/* Total */}

              <div className="text-right">
                <p className="text-sm text-gray-500">Item Total</p>

                <h3 className="text-lg font-bold text-[#4E342E]">
                  ₹{item.price * item.quantity}
                </h3>
              </div>

              {/* Delete */}

              <button
                onClick={() => removeItem(item._id)}
                className="rounded-lg bg-red-50 p-3 text-red-500 transition hover:bg-red-100"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}

        {/* Footer */}

        <div className="flex items-center justify-between rounded-xl bg-[#FFF8F2] px-5 py-4">
          <span className="text-lg font-semibold text-[#4E342E]">
            Grand Total
          </span>

          <span className="text-2xl font-bold text-[#A15C38]">₹{total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderItems;
