import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import moment from "moment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FiCheck,
  FiClock,
  FiMessageCircle,
  FiRefreshCcw,
  FiSearch,
  FiUser,
  FiX,
} from "react-icons/fi";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import {
  assignConversation,
  getUnassignConversation,
} from "../../services/chat.service";

function ConversationSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-[#F3E4D4] bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-[#F3E4D4]" />

        <div className="min-w-0 flex-1">
          <div className="h-4 w-32 rounded bg-[#F3E4D4]" />
          <div className="mt-2 h-3 w-44 rounded bg-[#F8EDE2]" />
        </div>

        <div className="h-9 w-20 rounded-xl bg-[#F3E4D4]" />
      </div>
    </div>
  );
}

function ConversationItem({ conversation, onAssign }) {
  const customer = conversation?.customerId;

  const customerName = customer?.name || "Unknown Customer";
  const customerEmail = customer?.email || "";

  const initials = customerName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const formattedDate = conversation?.lastMessageAt
    ? moment(conversation.lastMessageAt).format("DD MMM, hh:mm A")
    : "No messages";

  return (
    <div className="group rounded-2xl border border-[#F1E1D0] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E8C8A7] hover:shadow-[0_8px_25px_rgba(78,52,46,0.08)]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF0DF] text-sm font-bold text-[#A15C38]">
          {initials || <FiUser size={18} />}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-[#3E2922]">
              {customerName}
            </h3>

            {conversation.unreadCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D98B2B] px-1.5 text-[10px] font-bold text-white">
                {conversation.unreadCount > 99
                  ? "99+"
                  : conversation.unreadCount}
              </span>
            )}
          </div>

          <p className="mt-0.5 truncate text-xs text-[#8B7568]">
            {customerEmail}
          </p>

          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#A18D80]">
            <FiClock size={12} />
            <span>{formattedDate}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onAssign(conversation)}
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-[#E8C8A7] bg-[#FFF8F2] px-3 py-2 text-xs font-semibold text-[#8F4E2E] transition hover:border-[#D98B2B] hover:bg-[#D98B2B] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D98B2B]/30"
          title="Assign conversation to me"
        >
          <FiCheck size={14} />
          <span>Assign</span>
        </button>
      </div>
    </div>
  );
}

function EmptyState({ search }) {
  return (
    <div className="flex min-h-70 flex-col items-center justify-center px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0DF] text-[#A15C38]">
        <FiMessageCircle size={25} strokeWidth={1.8} />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-[#3E2922]">
        {search ? "No conversations found" : "No unassigned conversations"}
      </h3>

      <p className="mt-1.5 max-w-xs text-xs leading-5 text-[#927C6D]">
        {search
          ? "Try searching with a different customer name or email."
          : "All conversations are currently assigned to an admin."}
      </p>
    </div>
  );
}

function ErrorState({ onRetry }) {
  return (
    <div className="flex min-h-75 flex-col items-center justify-center px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0DF] text-[#A15C38]">
        <FiRefreshCcw size={24} strokeWidth={1.8} />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-[#3E2922]">
        Unable to load conversations
      </h3>

      <p className="mt-1.5 max-w-xs text-xs leading-5 text-[#927C6D]">
        Something went wrong while loading unassigned conversations. Please try
        again.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className=" mt-5 inline-flex items-center gap-2 rounded-xl bg-[#4E342E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3E2922] focus:outline-none focus:ring-2 focus:ring-[#4E342E]/30"
      >
        <FiRefreshCcw size={15} />
        Refresh List
      </button>
    </div>
  );
}

function NewChatDialog({ open, onClose }) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const {
    data = [],
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["newchats"],
    queryFn: getUnassignConversation,
    enabled: open,
  });

  const filteredConversations = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return data;
    }

    return data.filter((conversation) => {
      const name = conversation?.customerId?.name?.toLowerCase() || "";
      const email = conversation?.customerId?.email?.toLowerCase() || "";

      return name.includes(searchValue) || email.includes(searchValue);
    });
  }, [data, search]);

  const handleAssign = async (conversation) => {
    if (!conversation?._id) {
      toast.error("Conversation not found");
      return;
    }

    try {
      await assignConversation(conversation._id);
      toast.success("Conversation assigned successfully");
      queryClient.invalidateQueries({
        queryKey: ["newchats"],
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to assign conversation",
      );
    }
  };

  const handleClose = () => {
    setSearch("");
    onClose?.();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <DialogBackdrop
        transition
        className=" fixed inset-0 bg-[#2B1D16]/40 backdrop-blur-sm transition-opacity duration-300 data-closed:opacity-0"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
        <DialogPanel
          transition
          className="flex min-h-100 sm:min-h-120 max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-[28px] border border-[#F1E1D0] bg-[#FFF9F4] shadow-[0_25px_70px_rgba(43,29,22,0.20)] transition-all duration-300 data-closed:scale-95 data-closed:opacity-0"
        >
          <div className="border-b border-[#F1E1D0] bg-white px-5 py-5 sm:px-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0DF] text-[#A15C38]">
                    <FiMessageCircle size={19} strokeWidth={1.8} />
                  </div>

                  <div>
                    <DialogTitle className="text-lg font-bold text-[#2B1D16] sm:text-xl">
                      Unassigned Conversations
                    </DialogTitle>

                    <p className="mt-0.5 text-xs text-[#927C6D] sm:text-sm">
                      Pick a conversation and start helping the customer.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#806B5E] transition hover:bg-[#FFF0DF] hover:text-[#4E342E] focus:outline-none focus:ring-2 focus:ring-[#D98B2B]/30"
                aria-label="Close dialog"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="relative mt-5">
              <FiSearch
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A18D80]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customer name or email..."
                className="h-11 w-full rounded-xl border border-[#EBD9C7] bg-[#FFF9F4] pl-10 pr-4 text-sm text-[#3E2922] outline-none placeholder:text-[#B09C8E] transition focus:border-[#D98B2B] focus:bg-white focus:ring-4 focus:ring-[#D98B2B]/10"
              />
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
            {isError && <ErrorState onRetry={refetch} />}

            {!isError && isLoading && (
              <div className="space-y-3">
                <ConversationSkeleton />
                <ConversationSkeleton />
                <ConversationSkeleton />
              </div>
            )}

            {!isError && !isLoading && filteredConversations.length > 0 && (
              <div className="space-y-3">
                {filteredConversations.map((conversation) => (
                  <ConversationItem
                    key={conversation._id}
                    conversation={conversation}
                    onAssign={handleAssign}
                  />
                ))}
              </div>
            )}

            {!isError && !isLoading && filteredConversations.length === 0 && (
              <EmptyState search={Boolean(search.trim())} />
            )}
          </div>

          {!isError && !isLoading && data.length > 0 && (
            <div className="flex items-center justify-between border-t border-[#F1E1D0] bg-white px-5 py-3.5">
              <p className="text-xs text-[#927C6D]">
                {filteredConversations.length} conversation
                {filteredConversations.length !== 1 ? "s" : ""}
              </p>

              {isFetching && (
                <div className="flex items-center gap-1.5 text-xs text-[#A15C38]">
                  <FiRefreshCcw size={13} className="animate-spin" />
                  Updating...
                </div>
              )}
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default NewChatDialog;
