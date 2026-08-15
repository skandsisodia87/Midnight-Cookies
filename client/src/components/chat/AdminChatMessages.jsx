import { FiCheck } from "react-icons/fi";

const AdminChatMessages = ({ messages }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isAdminMessage = (senderId) => {
    return senderId._id === "admin1" || senderId.name === "You";
  };

  if (!messages || messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-[#9B8974]">
        <div className="text-center px-4">
          <p className="text-sm mb-1">No messages yet</p>
          <p className="text-xs text-[#B8956F]">Start a conversation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((msg, index) => {
        const isAdmin = isAdminMessage(msg.senderId);
        const showAvatar =
          index === 0 ||
          isAdminMessage(messages[index - 1]?.senderId) !== isAdmin;

        return (
          <div
            key={msg._id}
            className={`flex items-end gap-2 ${isAdmin ? "justify-end" : "justify-start"}`}
          >
            {/* Avatar for customer messages */}
            {!isAdmin && showAvatar && (
              <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#D98B2B] to-[#B8691E] flex items-center justify-center shrink-0">
                <span className="text-white font-semibold text-xs">
                  {msg.senderId.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            {!isAdmin && !showAvatar && <div className="w-7" />}

            {/* Message */}
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg px-3 py-1.5 rounded-md text-sm ${
                isAdmin
                  ? "bg-[#D98B2B] text-white rounded-br-none"
                  : "bg-white text-[#1F140F] rounded-bl-none border border-[#DCC8B5]"
              }`}
            >
              <p className="wrap-break-word">{msg.message}</p>
              <div
                className={`text-xs mt-0.5 flex items-center gap-1 ${
                  isAdmin ? "text-orange-100" : "text-[#9B8974]"
                }`}
              >
                <span>{formatTime(msg.timestamp)}</span>
                {isAdmin && <FiCheck size={12} />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminChatMessages;
