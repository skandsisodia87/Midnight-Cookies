import { toast } from "sonner";
import constants from "../../common/constants";
import { useState, useEffect, useRef } from "react";
import { FiPhone, FiVideo, FiMoreVertical } from "react-icons/fi";
import AdminChatMessages from "./AdminChatMessages";
import AdminChatInput from "./AdminChatInput";
import useConversationSocket from "../../hooks/useConversationSocket";
import {
  getConversationMessages,
  markMessagesAsRead,
} from "../../services/chat.service";

const AdminChatWindow = ({ conversation, socket }) => {
  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);
  const messageIds = useRef(new Set());
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const { isOtherUserTyping } = useConversationSocket(
    socket,
    conversation?._id,
    setMessages,
    messageIds,
  );

  // Auto-scroll to bottom when new messages arrive or typing status changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOtherUserTyping]);

  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    if (!socket || !conversation?._id) {
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

  const handleSendMessage = (textToSend) => {
    const msgToSend = typeof textToSend === "string" ? textToSend : message;
    if (!conversation || !msgToSend.trim()) return;

    const trimmedMessage = msgToSend.trim();
    if (!trimmedMessage) {
      return;
    }
    if (!conversation?._id) {
      toast.error("Conversation is not ready");
      return;
    }
    if (!socket) {
      toast.error("Chat connection is not ready");
      return;
    }

    clearTimeout(typingTimeoutRef.current);
    if (isTypingRef.current) {
      socket.emit(constants.STOP_TYPING, {
        conversationId: conversation._id,
      });
      isTypingRef.current = false;
    }

    socket.emit(constants.SEND_MESSAGE, {
      conversationId: conversation._id,
      message: trimmedMessage,
      messageType: constants.TEXT,
      attachments: [],
    });

    setMessage("");
  };

  const formatCustomerEmail = (email) => {
    if (!email) return "";
    const atIndex = email.indexOf("@");
    return atIndex !== -1 ? email.substring(0, atIndex) : email;
  };

  useEffect(() => {
    if (!conversation?._id) {
      setMessages([]);
      messageIds.current.clear();
      return;
    }

    let isMounted = true;
    const fetchMessages = async () => {
      try {
        const response = await getConversationMessages(conversation._id);
        if (!isMounted) return;

        const conversationMessages = response?.data || [];
        await markMessagesAsRead(conversation._id);

        setMessages((prevMessages) => {
          const fetchedIds = new Set(conversationMessages.map((m) => m._id));
          const newSocketMessages = prevMessages.filter(
            (m) => m._id && !fetchedIds.has(m._id),
          );
          const merged = [...conversationMessages, ...newSocketMessages];

          messageIds.current.clear();
          merged.forEach((item) => {
            if (item?._id) {
              messageIds.current.add(item._id);
            }
          });

          return merged;
        });
      } catch (error) {
        console.error("Failed to fetch conversation messages:", error);
        if (isMounted) {
          toast.error("Failed to fetch conversation messages");
        }
      }
    };

    fetchMessages();

    return () => {
      isMounted = false;
    };
  }, [conversation?._id]);

  const customerName = conversation?.customerId?.name || "Customer";
  const customerInitial = customerName.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col h-full bg-[#FFF6EC]">
      <div className="border-b border-[#DCC8B5] p-3 flex items-center justify-between bg-[#FFF6EC]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#D98B2B] to-[#B8691E] flex items-center justify-center">
            <span className="text-white font-semibold text-xs">
              {customerInitial}
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-[#1F140F] text-sm">
              {customerName}
            </h2>
            <p className="text-xs text-[#9B8974]">
              {formatCustomerEmail(conversation?.customerId?.email)}
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

        {isOtherUserTyping && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#D98B2B] to-[#B8691E] flex items-center justify-center shrink-0">
              <span className="text-white font-semibold text-xs">
                {customerInitial}
              </span>
            </div>
            <div className="bg-white border border-[#DCC8B5] px-3 py-2 rounded-md rounded-bl-none flex items-center gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D98B2B]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D98B2B] [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D98B2B] [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <AdminChatInput
        message={message}
        setMessage={setMessage}
        onSendMessage={handleSendMessage}
        handleMessageChange={handleMessageChange}
      />
    </div>
  );
};

export default AdminChatWindow;
