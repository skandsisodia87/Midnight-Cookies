import { useState, useEffect, useRef } from "react";
import {
  FiSearch,
  FiPhone,
  FiVideo,
  FiMoreVertical,
  FiPaperclip,
  FiSmile,
  FiSend,
} from "react-icons/fi";
import AdminChatMessages from "./AdminChatMessages";
import AdminChatInput from "./AdminChatInput";
import { getConversationMessages } from "../../services/chat.service";
import { toast } from "sonner";
import constants from "../../common/constants";

const AdminChatWindow = ({
  conversation,
  onSendMessage,
  socket,
  typingTimeoutRef,
}) => {
  const isTypingRef = useRef(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages]);

  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    if (!socket || !conversation?._id || !conversationReady) {
      return;
    }

    const conversationId = conversation._id;

    if (!value.trim()) {
      clearTimeout(typingTimeoutRef.current);

      if (isTypingRef.current) {
        socket.emit(constants.STOP_TYPING, {
          conversationId,
        });

        isTypingRef.current = false;
      }
      return;
    }

    if (!isTypingRef.current) {
      socket.emit(constants.TYPING, {
        conversationId,
      });
      isTypingRef.current = true;
    }
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit(constants.STOP_TYPING, {
        conversationId,
      });

      isTypingRef.current = false;
    }, 1500);
  };

  const handleSendMessage = (msg) => {
    onSendMessage(msg);
    setMessage("");
  };

  const formatCustomerEmail = (email) => {
    return email.substring(0, email.indexOf("@"));
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (conversation?._id) {
        try {
          const response = await getConversationMessages(conversation._id);

          setMessages(response.data ?? []);
        } catch (error) {
          console.error("Failed to fetch conversation messages:", error);
          toast.error("Failed to fetch conversation messages");
        }
      }
    };

    fetchMessages();
  }, [conversation?._id]);

  return (
    <div className="flex flex-col h-full bg-[#FFF6EC]">
      <div className="border-b border-[#DCC8B5] p-3 flex items-center justify-between bg-[#FFF6EC]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#D98B2B] to-[#B8691E] flex items-center justify-center">
            <span className="text-white font-semibold text-xs">
              {conversation.customerId.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-[#1F140F] text-sm">
              {conversation.customerId.name}
            </h2>
            <p className="text-xs text-[#9B8974]\">
              {formatCustomerEmail(conversation.customerId.email)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="p-2 hover:bg-[#F5E6D3] rounded-full transition"
            title="Voice call"
          >
            <FiPhone size={18} className="text-[#D98B2B]" />
          </button>
          <button
            className="p-2 hover:bg-[#F5E6D3] rounded-full transition"
            title="Video call"
          >
            <FiVideo size={18} className="text-[#D98B2B]" />
          </button>
          <button
            className="p-2 hover:bg-[#F5E6D3] rounded-full transition"
            title="More options"
          >
            <FiMoreVertical size={18} className="text-[#D98B2B]" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-[#FFF6EC] space-y-4">
        <AdminChatMessages messages={messages} />
        <div ref={messagesEndRef} />
      </div>

      <AdminChatInput
        message={message}
        setMessage={setMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default AdminChatWindow;
