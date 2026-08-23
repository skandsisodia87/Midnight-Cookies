const AdminChatList = ({
  conversations,
  selectedConversation,
  onSelectConversation,
}) => {
  const formatTime = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffMs = now - messageDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Now";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;

    return messageDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const truncateMessage = (message, length = 50) => {
    return message.length > length
      ? message.substring(0, length) + "..."
      : message;
  };

  if (conversations.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#7B5C4F]">
        <div className="text-center">
          <p className="text-lg mb-2">No conversations yet</p>
          <p className="text-sm">Start a new chat to begin messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {conversations.map((conversation) => (
        <button
          key={conversation._id}
          onClick={() => onSelectConversation(conversation)}
          className={`w-full px-3 py-2.5 border-b border-[#EDE3D5] hover:bg-[#F9F5F0] transition text-left ${
            selectedConversation?._id === conversation._id ? "bg-[#F5E6D3]" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#D98B2B] to-[#B8691E]">
              <span className="text-xs font-semibold text-white">
                {conversation?.customerId?.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold leading-5 text-[#1F140F]">
                {conversation?.customerId?.name || "Unknown Customer"}
              </h3>

              <p
                className={`mt-1 truncate text-sm leading-5 ${
                  conversation?.unreadCount > 0
                    ? "font-semibold text-[#1F140F]"
                    : "font-normal text-[#9B8974]"
                }`}
              >
                {truncateMessage(
                  conversation?.lastMessage || "No messages",
                  40,
                )}
              </p>
            </div>

            <div className="flex w-10 shrink-0 flex-col items-end justify-between gap-2 self-stretch">
              <span className="text-xs leading-5 text-[#9B8974]">
                {formatTime(conversation?.lastMessageAt)}
              </span>

              {conversation?.unreadCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D98B2B] px-1 text-[10px] font-bold leading-none text-white">
                  {conversation.unreadCount > 99
                    ? "99+"
                    : conversation.unreadCount}
                </span>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default AdminChatList;
