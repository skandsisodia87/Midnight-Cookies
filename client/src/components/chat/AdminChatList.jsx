import { FiCheck, FiCheckCircle } from "react-icons/fi";

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
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#D98B2B] to-[#B8691E] flex items-center justify-center shrink-0">
              <span className="text-white font-semibold text-xs">
                {conversation.customerId.name.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="font-semibold text-[#1F140F] text-sm truncate">
                  {conversation.customerId.name}
                </h3>
                <span className="text-xs text-[#9B8974] shrink-0">
                  {formatTime(conversation.lastMessageAt)}
                </span>
              </div>

              <p className={`text-xs truncate ${
                conversation.unreadCount > 0
                  ? "font-semibold text-[#1F140F]"
                  : "text-[#9B8974]"
              }`}>
                {truncateMessage(conversation.lastMessage || "No messages", 40)}
              </p>

              {conversation.unreadCount > 0 && (
                <div className="mt-1">
                  <span className="inline-block bg-[#D98B2B] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {conversation.unreadCount}
                  </span>
                </div>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default AdminChatList;
