import { useState } from "react";
import {
  FiCheck,
  FiPaperclip,
  FiSend,
  FiSmile,
  FiMoreVertical,
  FiX,
} from "react-icons/fi";
import constants from "../../common/constants";

const CustomerChat = ({ onClose }) => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "admin",
      message: "Hi! Welcome to Midnight Cookies 🍪 How can I help you today?",
      time: "10:32 AM",
    },
    {
      id: 2,
      sender: "customer",
      message: "Hi! I have a question about my cookie order.",
      time: "10:34 AM",
    },
    {
      id: 3,
      sender: "admin",
      message:
        "Of course! I'd be happy to help. Could you please share your order number?",
      time: "10:35 AM",
    },
    {
      id: 4,
      sender: "customer",
      message: "#MC10245",
      time: "10:36 AM",
    },
    {
      id: 5,
      sender: "admin",
      message:
        "Thanks! I found your order. It's currently being prepared and should be dispatched shortly.",
      time: "10:38 AM",
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "customer",
      message: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className="
        fixed
        bottom-5
        right-5
        z-100
        flex
        h-150
        w-95
        max-w-[calc(100vw-24px)]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-[#E8DED2]
        bg-white
        shadow-[0_15px_50px_rgba(58,33,24,0.20)]
        animate-[chatOpen_0.2s_ease-out]
      "
    >
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

              <span className="text-[11px] text-[#6B9B68]">Online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              text-[#725C51]
              transition
              hover:bg-[#F8EEE8]
              hover:text-[#A15C4D]
            "
          >
            <FiMoreVertical size={17} />
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              text-[#725C51]
              transition
              hover:bg-[#F8EEE8]
              hover:text-[#A15C4D]
            "
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

        <div className="space-y-4">
          {messages.map((item) => {
            const isCustomer = item.sender === "customer";

            return (
              <div
                key={item.id}
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
                    <span>{item.time}</span>

                    {isCustomer && (
                      <FiCheck size={12} className="text-[#A15C4D]" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex items-center gap-2">
          <div
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#A15C4D]/10
              text-xs
            "
          >
            🍪
          </div>

          <div
            className="
              flex
              items-center
              gap-1
              rounded-2xl
              rounded-tl-md
              border
              border-[#E8DED5]
              bg-white
              px-3.5
              py-2.5
            "
          >
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#A15C4D]" />

            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#A15C4D] [animation-delay:150ms]" />

            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#A15C4D] [animation-delay:300ms]" />
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-[#E9E0D7] bg-white p-3">
        <div
          className="
            rounded-xl
            border
            border-[#E3D7CE]
            bg-[#FFFCF9]
            transition
            focus-within:border-[#A15C4D]
            focus-within:ring-2
            focus-within:ring-[#A15C4D]/10
          "
        >
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Write a message..."
            className="
              w-full
              resize-none
              bg-transparent
              px-3.5
              pt-2.5
              text-[13px]
              leading-5
              text-[#3A2118]
              outline-none
              placeholder:text-[#AE9D94]
            "
          />

          <div className="flex items-center justify-between px-2.5 pb-2.5">
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-[#8A7166]
                  transition
                  hover:bg-[#F5EAE3]
                  hover:text-[#A15C4D]
                "
              >
                <FiPaperclip size={17} />
              </button>

              <button
                type="button"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-[#8A7166]
                  transition
                  hover:bg-[#F5EAE3]
                  hover:text-[#A15C4D]
                "
              >
                <FiSmile size={17} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleSendMessage}
              disabled={!message.trim()}
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
              {/* <span>Send</span>  */}
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
