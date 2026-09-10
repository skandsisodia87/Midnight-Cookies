import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FiEdit2, FiPhone, FiPlus, FiTrash2, FiTruck, FiUser } from "react-icons/fi";
import { toast } from "sonner";
import constants from "../../../common/constants";
import {
  createDeliveryAgent,
  deleteDeliveryAgent,
  getDeliveryAgents,
  updateDeliveryAgent,
} from "../../../services/admin.service";

const emptyForm = { name: "", phone: "", partner: "", isActive: true };

const DeliveryAgents = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["delivery-agents"],
    queryFn: getDeliveryAgents,
  });

  const saveMutation = useMutation({
    mutationFn: () =>
      editingId
        ? updateDeliveryAgent({ agentId: editingId, payload: form })
        : createDeliveryAgent(form),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["delivery-agents"] });
      toast.success(response.message);
      setForm(emptyForm);
      setEditingId(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Unable to save delivery agent");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDeliveryAgent,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["delivery-agents"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Unable to delete delivery agent");
    },
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const startEditing = (agent) => {
    setEditingId(agent._id);
    setForm({
      name: agent.name,
      phone: agent.phone,
      partner: agent.partner,
      isActive: agent.isActive,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const agents = data?.agents || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#4E342E]">Delivery Agents</h2>
        <p className="mt-1 text-sm text-[#7A5C4D]">
          Manage the delivery partners available for order assignment.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          saveMutation.mutate();
        }}
        className="rounded-2xl border border-[#F3E4D4] bg-[#FFFDFB] p-5"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Agent name"
            required
            className={constants.INPUT_CLASS}
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone number"
            required
            className={constants.INPUT_CLASS}
          />
          <input
            name="partner"
            value={form.partner}
            onChange={handleChange}
            placeholder="Delivery partner"
            required
            className={constants.INPUT_CLASS}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm font-medium text-[#6D4C41]">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="h-4 w-4 accent-[#A15C38]"
            />
            Available for assignment
          </label>

          <div className="flex gap-2">
            {editingId && (
              <button
                type="button"
                onClick={cancelEditing}
                className="rounded-xl border border-[#E7D8C9] px-4 py-2 text-sm font-semibold text-[#7A5C4D]"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={saveMutation.isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-[#A15C38] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              <FiPlus size={16} />
              {editingId ? "Update Agent" : "Add Agent"}
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-3">
        {isLoading && <p className="text-sm text-[#7A5C4D]">Loading agents...</p>}
        {!isLoading && agents.length === 0 && (
          <p className="rounded-2xl border border-dashed border-[#E7D8C9] p-6 text-center text-sm text-[#7A5C4D]">
            No delivery agents have been added yet.
          </p>
        )}
        {agents.map((agent) => (
          <div
            key={agent._id}
            className="flex flex-col gap-4 rounded-2xl border border-[#F3E4D4] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF0E4] text-[#A15C38]">
                <FiUser />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-[#4E342E]">{agent.name}</p>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${agent.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {agent.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="mt-1 flex flex-wrap items-center gap-3 text-sm text-[#7A5C4D]">
                  <span className="inline-flex items-center gap-1"><FiTruck size={14} />{agent.partner}</span>
                  <span className="inline-flex items-center gap-1"><FiPhone size={14} />{agent.phone}</span>
                </p>
              </div>
            </div>
            <div className="flex gap-2 self-end sm:self-auto">
              <button type="button" onClick={() => startEditing(agent)} aria-label={`Edit ${agent.name}`} className="rounded-lg border border-[#E7D8C9] p-2 text-[#A15C38] hover:bg-[#FFF8F2]"><FiEdit2 /></button>
              <button type="button" onClick={() => deleteMutation.mutate(agent._id)} aria-label={`Delete ${agent.name}`} className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryAgents;
