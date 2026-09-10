import { useEffect, useRef, useState } from "react";
import { FiDownload, FiEye, FiEdit } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import OrderStatusBadge from "./OrderStatusBadge";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import constants from "../../../common/constants";
import { getAdminOrder } from "../../../services/admin.service";
import BillDocument from "./Billdocument";

export default function OrdersTable({ orders }) {
  const navigate = useNavigate();
  const [exportingOrderId, setExportingOrderId] = useState(null);
  const [printOrder, setPrintOrder] = useState(null);
  const billContentRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: billContentRef,
    documentTitle: printOrder
      ? `Bill-${printOrder.orderId}`
      : "Midnight-Cookies-Bill",
    pageStyle:
      "@page { margin: 16mm; } @media print { body * { visibility: hidden; } .bill-print-root, .bill-print-root * { visibility: visible; } .bill-print-root { position: absolute; left: 0; top: 0; width: 100%; } }",
    onAfterPrint: () => setPrintOrder(null),
    onPrintError: () => {
      setPrintOrder(null);
      toast.error("Unable to print the bill");
    },
  });

  useEffect(() => {
    if (printOrder) handlePrint();
  }, [printOrder, handlePrint]);

  const handleExport = async (orderId) => {
    setExportingOrderId(orderId);
    try {
      const response = await getAdminOrder(orderId);
      setPrintOrder(response.order);
    } catch (error) {
      toast.error(error.message || "Unable to export the bill");
    } finally {
      setExportingOrderId(null);
    }
  };

  return (
    <>
      {printOrder && (
        <div
          style={{
            position: "fixed",
            left: "-10000px",
            top: 0,
            width: "210mm",
          }}
        >
          <BillDocument order={printOrder} contentRef={billContentRef} />
        </div>
      )}
      <div className="overflow-hidden rounded-3xl border border-[#F3E4D4] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-190 w-full">
            <thead className="bg-[#FFF8F2] text-sm text-[#7A5C4D]">
              <tr>
                <th className="px-4 py-4 text-left font-semibold">Order</th>
                <th className="px-4 py-4 text-center font-semibold">
                  Customer
                </th>
                <th className="px-4 py-4 text-center font-semibold">Items</th>
                <th className="px-4 py-4 text-center font-semibold">Total</th>
                <th className="px-4 py-4 text-center font-semibold">Status</th>
                <th className="px-4 py-4 text-center font-semibold">Date</th>
                <th className="px-4 py-4 text-right font-semibold">Action</th>
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
                  <td className="px-4 py-4 text-center">{order.customer}</td>
                  <td className="px-4 py-4 text-center">{order.items}</td>
                  <td className="px-4 py-4 text-center">{order.totalAmount}</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center">
                      <OrderStatusBadge status={order.orderStatus} />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {moment(order.createdAt).format("MMMM D, YYYY, h:mm A")}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <button
                        type="button"
                        aria-label={`View order ${order.orderId}`}
                        onClick={() =>
                          navigate(
                            constants.ROUTES.ADMIN.ORDER_DETAILS.replace(
                              ":orderId",
                              order._id,
                            ),
                          )
                        }
                        className="cursor-pointer rounded-full bg-[#FFF4E6] p-2 text-[#A15C38] transition hover:bg-[#FDE8CF] hover:text-[#7A3E22]"
                      >
                        <FiEye size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Edit order ${order.orderId}`}
                        onClick={() =>
                          navigate(
                            constants.ROUTES.ADMIN.EDIT_ORDER.replace(
                              ":orderId",
                              order._id,
                            ),
                          )
                        }
                        className="rounded-full bg-[#FFF4E6] p-2 text-[#A15C38] transition hover:bg-[#FDE8CF] hover:text-[#7A3E22]"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleExport(order._id)}
                        disabled={exportingOrderId === order._id}
                        className="inline-flex items-center gap-2 rounded-full bg-[#4E342E] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#34221B] disabled:cursor-wait disabled:opacity-60"
                      >
                        <FiDownload size={15} />
                        {exportingOrderId === order._id
                          ? "Preparing..."
                          : "Export Bill"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
