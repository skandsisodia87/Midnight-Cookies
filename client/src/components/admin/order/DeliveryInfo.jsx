import { useQuery } from "@tanstack/react-query";
import {
  FiCalendar,
  FiClock,
  FiFileText,
  FiHash,
  FiPhone,
  FiTruck,
  FiUser,
} from "react-icons/fi";
import { getDeliveryAgents } from "../../../services/admin.service";

const DeliveryInfo = ({ order, setOrder }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["delivery-agents"],
    queryFn: getDeliveryAgents,
  });

  const allAgents = data?.agents || [];
  const selectedAgent = allAgents.find(
    (agent) => agent._id === order.deliveryAgent,
  );
  const agents = allAgents.filter(
    (agent) => agent.isActive || agent._id === order.deliveryAgent,
  );

  const handleChange = (field, value) => {
    setOrder((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  return (
    <div className="mt-4 rounded-2xl border border-[#F3E4D4] bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-[#F3E4D4] px-6 py-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF3E6]">
          <FiTruck className="text-[#A15C38]" size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#4E342E]">
            Delivery Information
          </h2>
          <p className="text-sm text-gray-500">
            Assign and manage shipment details
          </p>
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#4E342E]">
            <FiUser size={15} /> Delivery Agent
          </label>
          <select
            value={order.deliveryAgent || ""}
            onChange={(event) =>
              handleChange("deliveryAgent", event.target.value || null)
            }
            disabled={isLoading}
            className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 outline-none focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
          >
            <option value="">Unassigned</option>
            {agents.map((agent) => (
              <option key={agent._id} value={agent._id}>
                {agent.name} - {agent.partner}{agent.isActive ? "" : " (Inactive)"}
              </option>
            ))}
          </select>
        </div>

        {selectedAgent && (
          <div className="flex items-center gap-3 rounded-xl border border-[#F3D7BE] bg-[#FFF8F2] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A15C38] text-white">
              <FiTruck />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-[#4E342E]">{selectedAgent.name}</p>
              <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#7A5C4D]">
                <span>{selectedAgent.partner}</span>
                <span className="inline-flex items-center gap-1">
                  <FiPhone size={13} /> {selectedAgent.phone}
                </span>
              </p>
            </div>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-medium text-[#4E342E]">
            <span className="mb-2 flex items-center gap-2">
              <FiHash size={15} /> Tracking Number
            </span>
            <input
              type="text"
              value={order.deliveryTrackingNumber}
              onChange={(event) =>
                handleChange("deliveryTrackingNumber", event.target.value)
              }
              className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 font-normal outline-none focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
            />
          </label>
          <label className="text-sm font-medium text-[#4E342E]">
            <span className="mb-2 flex items-center gap-2">
              <FiCalendar size={15} /> Expected Delivery
            </span>
            <input
              type="date"
              value={order.expectedDeliveryDate}
              onChange={(event) =>
                handleChange("expectedDeliveryDate", event.target.value)
              }
              className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 font-normal outline-none focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
            />
          </label>
        </div>

        <label className="text-sm font-medium text-[#4E342E]">
          <span className="mb-2 flex items-center gap-2">
            <FiClock size={15} /> Delivery Slot
          </span>
          <input
            type="text"
            value={order.deliverySlot}
            onChange={(event) => handleChange("deliverySlot", event.target.value)}
            placeholder="e.g. 6:00 PM - 7:00 PM"
            className="w-full rounded-xl border border-[#E7D8C9] px-4 py-3 font-normal outline-none focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
          />
        </label>

        <label className="text-sm font-medium text-[#4E342E]">
          <span className="mb-2 flex items-center gap-2">
            <FiFileText size={15} /> Delivery Instructions
          </span>
          <textarea
            rows={4}
            value={order.deliveryInstructions}
            onChange={(event) =>
              handleChange("deliveryInstructions", event.target.value)
            }
            placeholder="Special instructions for delivery..."
            className="w-full resize-none rounded-xl border border-[#E7D8C9] px-4 py-3 font-normal outline-none focus:border-[#A15C38] focus:ring-2 focus:ring-[#F5D8C4]"
          />
        </label>
      </div>
    </div>
  );
};

export default DeliveryInfo;
