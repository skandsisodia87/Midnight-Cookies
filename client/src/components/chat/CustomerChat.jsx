import { useEffect, useRef, useState } from "react";
import {
  FiCheck,
  FiPaperclip,
  FiSend,
  FiSmile,
  FiMoreVertical,
  FiX,
} from "react-icons/fi";
import { toast } from "sonner";
import constants from "../../common/constants";
import {
  createConversation,
  getConversationMessages,
} from "../../services/chat.service";
import useConversationSocket from "../../hooks/useConversationSocket";
import useSocket from "../../hooks/useSocket";
import useAuthStore from "../../store/authStore";

const CustomerChat = ({ onClose }) => {
  const { user } = useAuthStore();
  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [conversationReady, setConversationReady] = useState(false);

  const messageIds = useRef(new Set());
  const { socket, status } = useSocket();

  useConversationSocket(socket, conversation?._id, setMessages, messageIds);

  useEffect(() => {
    let isMounted = true;

    const initializeConversation = async () => {
      try {
        setIsCreatingConversation(true);
        const response = await createConversation();
        if (!isMounted) {
          return;
        }

        const conversationData = response?.data;
        if (!conversationData?._id) {
          toast.error("Failed to create conversation");
          return;
        }

        setConversation(conversationData);
      } catch (error) {
        console.error("Create conversation error:", error);
        if (isMounted) {
          toast.error(
            error?.response?.data?.message || "Failed to create conversation",
          );
        }
      } finally {
        if (isMounted) {
          setIsCreatingConversation(false);
        }
      }
    };

    initializeConversation();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!conversation?._id) {
      return;
    }

    let isMounted = true;
    const loadMessages = async () => {
      try {
        if (!messagesLoading) setMessagesLoading(true);
        setConversationReady(false);
        const response = await getConversationMessages(conversation._id);
        if (!isMounted) {
          return;
        }
        const conversationMessages = response?.data || [];
        // Set initial messages
        setMessages(conversationMessages);
        // Store message IDs
        messageIds.current.clear();
        conversationMessages.forEach((item) => {
          const id = item?._id;

          if (id) {
            messageIds.current.add(id);
          }
        });

        setConversationReady(true);
      } catch (error) {
        console.error("Get conversation messages error:", error);

        if (isMounted) {
          toast.error(
            error?.response?.data?.message || "Failed to load messages",
          );
        }
      } finally {
        if (isMounted) {
          setMessagesLoading(false);
        }
      }
    };
    loadMessages();
    return () => {
      isMounted = false;
    };
  }, [conversation?._id]);

  // --------------------------------------------------
  // JOIN CONVERSATION ROOM
  // --------------------------------------------------

  useEffect(() => {
    if (!socket || !conversation?._id || !conversationReady) {
      return;
    }
    socket.emit(constants.JOIN_CONVERSATION, conversation._id);

    return () => {
      socket.emit(constants.LEAVE_CONVERSATION, conversation._id);
    };
  }, [socket, conversation?._id, conversationReady]);

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
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
    if (!conversationReady) {
      toast.error("Please wait for the conversation to load");
      return;
    }

    clearTimeout(typingTimeoutRef.current);
    socket.emit(constants.STOP_TYPING, {
      conversationId: conversation._id,
    });
    socket.emit(constants.SEND_MESSAGE, {
      conversationId: conversation._id,
      message: trimmedMessage,
      messageType: constants.TEXT,
      attachments: [],
    });

    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      handleSendMessage();
    }
  };

  const handleClose = () => {
    if (socket && conversation?._id) {
      socket.emit(constants.LEAVE_CONVERSATION, conversation._id);
    }

    // Clear local state
    setMessages([]);
    setConversation(null);
    setMessage("");
    setConversationReady(false);

    // Clear duplicate tracking
    messageIds.current.clear();

    onClose?.();
  };

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

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeoutRef.current);

      if (socket && conversation?._id) {
        socket.emit(constants.STOP_TYPING, {
          conversationId: conversation._id,
        });
      }
    };
  }, [socket, conversation?._id]);

  useEffect(() => {
    return () => {
      messageIds.current.clear();
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-100 flex h-150 w-95 max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-2xl border border-[#E8DED2] bg-white shadow-[0_15px_50px_rgba(58,33,24,0.20)] animate-[chatOpen_0.2s_ease-out]">
      <header className="flex h-17.5 shrink-0 items-center justify-between border-b border-[#E9E0D7] bg-white px-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A15C4D] text-lg">
              🍪
            </div>

            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#6B9B68]" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold text-[#3A2118]">
              {constants.APPICATION_NAME}
            </h1>

            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="text-[11px] text-[#8E7A70]">
                Customer Support
              </span>

              <span className="text-[#C2B1A7]">·</span>

              <span className="text-[11px] text-[#6B9B68]">
                {status || "Connecting..."}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="More options"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#725C51] transition hover:bg-[#F8EEE8] hover:text-[#A15C4D]"
          >
            <FiMoreVertical size={17} />
          </button>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close chat"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#725C51] transition hover:bg-[#F8EEE8] hover:text-[#A15C4D]"
          >
            <FiX size={18} />
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto bg-[#FCFAF7] px-4 py-5">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#EDE4DC]" />

          <span className="rounded-full bg-[#F1E8E1] px-2.5 py-1 text-[10px] font-medium text-[#8B756A]">
            Today
          </span>

          <div className="h-px flex-1 bg-[#EDE4DC]" />
        </div>

        {isCreatingConversation || messagesLoading ? (
          <div className="flex justify-center py-10">
            <span className="text-xs text-[#8E7A70]">
              {isCreatingConversation
                ? "Starting chat..."
                : "Loading messages..."}
            </span>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F1E8E1] text-xl">
              🍪
            </div>

            <p className="text-sm font-medium text-[#4B352B]">
              Start a conversation
            </p>

            <p className="mt-1 text-xs text-[#9A877D]">
              Send us a message and our support team will get back to you.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((item, index) => {
              const isCustomer =
                item.senderId?._id?.toString() === user?._id?.toString();

              const messageTime = item.createdAt
                ? new Date(item.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : item.time || "";

              return (
                <div
                  key={item._id || item.id || index}
                  className={`flex ${
                    isCustomer ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[82%] ${
                      isCustomer ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`
                        rounded-2xl
                        px-3.5
                        py-2.5
                        text-[13px]
                        leading-5
                        ${
                          isCustomer
                            ? "rounded-tr-md bg-[#A15C4D] text-white shadow-sm"
                            : "rounded-tl-md border border-[#E8DED5] bg-white text-[#4B352B] shadow-sm"
                        }
                      `}
                    >
                      {item.message}
                    </div>

                    <div
                      className={`
                        mt-1
                        flex
                        items-center
                        gap-1
                        text-[9px]
                        text-[#A28E84]
                        ${isCustomer ? "justify-end" : "justify-start"}
                      `}
                    >
                      <span>{messageTime}</span>

                      {isCustomer && (
                        <FiCheck size={12} className="text-[#A15C4D]" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TYPING INDICATOR */}
        {/*<div className="mt-5 flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#A15C4D]/10 text-xs">
            🍪
          </div>

          <div className="flex items-center gap-1 rounded-2xl rounded-tl-md border border-[#E8DED5] bg-white px-3.5 py-2.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#A15C4D]" />

            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#A15C4D] [animation-delay:150ms]" />

            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#A15C4D] [animation-delay:300ms]" />
          </div>
        </div> */}
      </div>

      <div className="shrink-0 border-t border-[#E9E0D7] bg-white p-3">
        <div className="rounded-xl border border-[#E3D7CE] bg-[#FFFCF9] transition focus-within:border-[#A15C4D] focus-within:ring-2 focus-within:ring-[#A15C4D]/10">
          <textarea
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Write a message..."
            disabled={
              isCreatingConversation ||
              messagesLoading ||
              !conversation?._id ||
              !conversationReady
            }
            className="w-full resize-none bg-transparent px-3.5 pt-2.5 text-[13px] leading-5 text-[#3A2118] outline-none placeholder:text-[#AE9D94] disabled:cursor-not-allowed disabled:opacity-50"
          />

          <div className="flex items-center justify-between px-2.5 pb-2.5">
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#8A7166] transition hover:bg-[#F5EAE3] hover:text-[#A15C4D]"
              >
                <FiPaperclip size={17} />
              </button>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#8A7166] transition hover:bg-[#F5EAE3] hover:text-[#A15C4D]"
              >
                <FiSmile size={17} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleSendMessage}
              disabled={
                !message.trim() ||
                isCreatingConversation ||
                messagesLoading ||
                !socket ||
                !conversation?._id ||
                !conversationReady
              }
              className="flex h-9 items-center gap-1.5 rounded-lg bg-[#A15C4D] px-3.5 text-xs font-semibold text-white transition hover:bg-[#8F4D40] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiSend size={14} />
            </button>
          </div>
        </div>

        <p className="mt-1.5 text-center text-[9px] text-[#B0A097]">
          Press Enter to send
        </p>
      </div>
    </div>
  );
};

export default CustomerChat;
