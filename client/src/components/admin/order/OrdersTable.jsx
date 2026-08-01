import { FiEye, FiEdit } from "react-icons/fi";
import OrderStatusBadge from "./OrderStatusBadge";
import moment from "moment";

export default function OrdersTable({ orders }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#F3E4D4] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-190 w-full">
          <thead className="bg-[#FFF8F2] text-left text-sm text-[#7A5C4D]">
            <tr>
              <th className="px-4 py-4 font-semibold">Order</th>

              <th className="px-4 py-4 font-semibold">Customer</th>

              <th className="px-4 py-4 font-semibold">Items</th>

              <th className="px-4 py-4 font-semibold">Total</th>

              <th className="px-4 py-4 font-semibold">Status</th>

              <th className="px-4 py-4 font-semibold">Date</th>

              <th className="px-4 py-4 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm text-[#4E342E]">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t border-[#F3E4D4] bg-white transition-colors hover:bg-[#FFFDFB]"
              >
                <td className="px-4 py-4 font-semibold text-[#A15C38]">
                  {order.orderId}
                </td>

                <td className="px-4 py-4">{order.customer}</td>

                <td className="px-4 py-4">{order.items}</td>

                <td className="px-4 py-4">{order.totalAmount}</td>

                <td className="px-4 py-4">
                  <OrderStatusBadge status={order.orderStatus} />
                </td>

                <td className="px-4 py-4">
                  {moment(order.createdAt).format("MMMM D, YYYY, h:mm A")}
                </td>

                <td className="px-4 py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button className="rounded-full bg-[#FFF4E6] p-2 text-[#A15C38] transition hover:bg-[#FDE8CF] hover:text-[#7A3E22]">
                      <FiEye size={16} />
                    </button>

                    <button className="rounded-full bg-[#FFF4E6] p-2 text-[#A15C38] transition hover:bg-[#FDE8CF] hover:text-[#7A3E22]">
                      <FiEdit size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
