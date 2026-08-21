import { useEffect, useRef, useState } from "react";
import {
  FiCheck,
  FiPaperclip,
  FiSend,
  FiSmile,
  FiMoreVertical,
  FiX,
} from "react-icons/fi";
import constants from "../../common/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createConversation,
  createMessage,
  getConversationById,
} from "../../services/chat.service";

import { toast } from "sonner";
import useConversationSocket from "../../hooks/useConversationSocket";
import useSocket from "../../hooks/useSocket";

const CustomerChat = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  const pendingMessages = useRef([]);
  const saveMessageTimeout = useRef(null);

  // Prevent duplicate messages from socket
  const messageIds = useRef(new Set());

  // --------------------------------------------------
  // SOCKET
  // --------------------------------------------------

  const { socket, status, socketId } = useSocket();

  // Conversation-related socket listeners
  useConversationSocket(socket, setMessages);

  // --------------------------------------------------
  // CREATE CONVERSATION
  // --------------------------------------------------

  const { mutate: conversationMutate, isPending: isCreatingConversation } =
    useMutation({
      mutationFn: createConversation,

      onSuccess: (res) => {
        if (res?.data) {
          setConversation(res.data);
          return;
        }

        toast.error("Failed to create conversation");
      },

      onError: (error) => {
        console.error("Create conversation error:", error);

        toast.error(
          error?.response?.data?.message || "Failed to create conversation",
        );
      },
    });

  // --------------------------------------------------
  // GET CONVERSATION / OLD MESSAGES
  // --------------------------------------------------

  const { data: conversationData, isLoading: messagesLoading } = useQuery({
    queryKey: ["conversation", conversation?._id],

    queryFn: () => getConversationById(conversation._id),

    enabled: Boolean(conversation?._id),
  });

  // --------------------------------------------------
  // LOAD EXISTING MESSAGES
  // --------------------------------------------------

  useEffect(() => {
    if (!conversationData?.messages) {
      return;
    }

    setMessages(conversationData.messages);

    // Keep track of existing message IDs
    conversationData.messages.forEach((item) => {
      if (item.id || item._id) {
        messageIds.current.add(item.id || item._id);
      }
    });
  }, [conversationData]);

  // --------------------------------------------------
  // CREATE CONVERSATION WHEN CHAT OPENS
  // --------------------------------------------------

  useEffect(() => {
    conversationMutate();
  }, []);

  // --------------------------------------------------
  // JOIN CONVERSATION ROOM
  // --------------------------------------------------

  useEffect(() => {
    if (!socket) {
      return;
    }

    if (!conversation?._id) {
      return;
    }

    console.log("Joining conversation:", conversation._id);

    socket.emit("join_conversation", conversation._id);
  }, [socket, conversation?._id]);

  // --------------------------------------------------
  // RECEIVE NEW MESSAGE FROM SOCKET
  // --------------------------------------------------

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleNewMessage = (incomingMessage) => {
      console.log("New message received:", incomingMessage);

      const incomingId = incomingMessage?.id || incomingMessage?._id;

      // Prevent duplicate message
      if (incomingId && messageIds.current.has(incomingId)) {
        return;
      }

      if (incomingId) {
        messageIds.current.add(incomingId);
      }

      setMessages((prev) => [...prev, incomingMessage]);
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [socket]);

  // --------------------------------------------------
  // SAVE PENDING MESSAGES
  // --------------------------------------------------

  const persistPendingMessages = () => {
    // Nothing to save
    if (pendingMessages.current.length === 0) {
      return;
    }

    if (!conversation?._id) {
      return;
    }

    // Take current queue
    const messagesToSave = [...pendingMessages.current];

    // Clear queue immediately
    pendingMessages.current = [];

    console.log("Saving messages:", messagesToSave);

    createMessage({
      conversationId: conversation._id,

      messages: messagesToSave,
    }).catch((error) => {
      console.error("Failed to save messages:", error);

      // Put messages back into queue
      pendingMessages.current = [...messagesToSave, ...pendingMessages.current];
    });
  };

  // --------------------------------------------------
  // DEBOUNCE MESSAGE PERSISTENCE
  // --------------------------------------------------

  const queueMessageForPersistence = (newMessage) => {
    // Add message to queue
    pendingMessages.current.push(newMessage);

    // Clear existing timer
    if (saveMessageTimeout.current) {
      clearTimeout(saveMessageTimeout.current);
    }

    // Start new timer
    saveMessageTimeout.current = setTimeout(() => {
      persistPendingMessages();
    }, 1000);
  };

  // --------------------------------------------------
  // SEND MESSAGE
  // --------------------------------------------------

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

    // Create temporary client-side ID
    const messageId = `client-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    const newMessage = {
      id: messageId,

      conversationId: conversation._id,

      sender: "customer",

      message: trimmedMessage,

      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Remember message ID
    messageIds.current.add(messageId);

    // ------------------------------------------
    // 1. UPDATE UI IMMEDIATELY
    // ------------------------------------------

    setMessages((prev) => [...prev, newMessage]);

    // ------------------------------------------
    // 2. SEND THROUGH SOCKET IMMEDIATELY
    // ------------------------------------------

    socket.emit("send_message", newMessage);

    // ------------------------------------------
    // 3. ADD TO DB PERSISTENCE QUEUE
    // ------------------------------------------

    queueMessageForPersistence(newMessage);

    // ------------------------------------------
    // 4. CLEAR INPUT
    // ------------------------------------------

    setMessage("");
  };

  // --------------------------------------------------
  // ENTER KEY
  // --------------------------------------------------

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      handleSendMessage();
    }
  };

  // --------------------------------------------------
  // FLUSH PENDING MESSAGES WHEN COMPONENT CLOSES
  // --------------------------------------------------

  useEffect(() => {
    return () => {
      // Clear debounce timer
      if (saveMessageTimeout.current) {
        clearTimeout(saveMessageTimeout.current);
      }

      // Save anything still waiting
      if (pendingMessages.current.length > 0 && conversation?._id) {
        const messagesToSave = [...pendingMessages.current];

        createMessage({
          conversationId: conversation._id,

          messages: messagesToSave,
        }).catch((error) => {
          console.error("Failed to save pending messages:", error);
        });

        pendingMessages.current = [];
      }
    };
  }, [conversation?._id]);

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="fixed bottom-5 right-5 z-100 flex h-150 w-95 max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-2xl border border-[#E8DED2] bg-white shadow-[0_15px_50px_rgba(58,33,24,0.20)] animate-[chatOpen_0.2s_ease-out]">
      {/* HEADER */}
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
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#725C51] transition hover:bg-[#F8EEE8] hover:text-[#A15C4D]"
          >
            <FiMoreVertical size={17} />
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#725C51] transition hover:bg-[#F8EEE8] hover:text-[#A15C4D]"
          >
            <FiX size={18} />
          </button>
        </div>
      </header>

      {/* MESSAGES */}
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#FCFAF7] px-4 py-5">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#EDE4DC]" />

          <span className="rounded-full bg-[#F1E8E1] px-2.5 py-1 text-[10px] font-medium text-[#8B756A]">
            Today
          </span>

          <div className="h-px flex-1 bg-[#EDE4DC]" />
        </div>

        {messagesLoading ? (
          <div className="flex justify-center py-10">
            <span className="text-xs text-[#8E7A70]">Loading messages...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((item, index) => {
              const isCustomer = item.sender === "customer";

              return (
                <div
                  key={item.id || item._id || index}
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
                      <span>
                        {item.time ||
                          new Date(item.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </span>

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
        <div className="mt-5 flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#A15C4D]/10 text-xs">
            🍪
          </div>

          <div className="flex items-center gap-1 rounded-2xl rounded-tl-md border border-[#E8DED5] bg-white px-3.5 py-2.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#A15C4D]" />

            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#A15C4D] [animation-delay:150ms]" />

            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#A15C4D] [animation-delay:300ms]" />
          </div>
        </div>
      </div>

      {/* INPUT */}
      <div className="shrink-0 border-t border-[#E9E0D7] bg-white p-3">
        <div className="rounded-xl border border-[#E3D7CE] bg-[#FFFCF9] transition focus-within:border-[#A15C4D] focus-within:ring-2 focus-within:ring-[#A15C4D]/10">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Write a message..."
            className="w-full resize-none bg-transparent px-3.5 pt-2.5 text-[13px] leading-5 text-[#3A2118] outline-none placeholder:text-[#AE9D94]"
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
                !socket ||
                !conversation?._id
              }
              className="
                flex
                h-9
                items-center
                gap-1.5
                rounded-lg
                bg-[#A15C4D]
                px-3.5
                text-xs
                font-semibold
                text-white
                transition
                hover:bg-[#8F4D40]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
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
