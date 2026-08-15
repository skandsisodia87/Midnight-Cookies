import { useState, useEffect, useCallback } from "react";
import {
  FiSearch,
  FiPlus,
  FiPhone,
  FiVideo,
  FiMoreVertical,
} from "react-icons/fi";
import AdminChatList from "./AdminChatList";
import AdminChatWindow from "./AdminChatWindow";

const AdminChat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([
    {
      _id: "conv1",
      customerId: {
        _id: "cust1",
        name: "Sarah Johnson",
        email: "sarah@example.com",
      },
      adminId: null,
      status: "open",
      lastMessage: "Thanks for the help!",
      lastMessageAt: new Date(Date.now() - 3600000),
      unreadCount: 0,
      messages: [
        {
          _id: "msg1",
          senderId: { _id: "cust1", name: "Sarah Johnson" },
          message: "Hi, I have a question about my order",
          timestamp: new Date(Date.now() - 7200000),
        },
        {
          _id: "msg2",
          senderId: { _id: "admin1", name: "Admin" },
          message: "Hi Sarah! I'd be happy to help. What's your order number?",
          timestamp: new Date(Date.now() - 6600000),
        },
        {
          _id: "msg3",
          senderId: { _id: "cust1", name: "Sarah Johnson" },
          message: "It's #MC10245",
          timestamp: new Date(Date.now() - 5400000),
        },
        {
          _id: "msg4",
          senderId: { _id: "admin1", name: "Admin" },
          message:
            "Found it! Your order is being prepared and will ship tomorrow.",
          timestamp: new Date(Date.now() - 4200000),
        },
        {
          _id: "msg5",
          senderId: { _id: "cust1", name: "Sarah Johnson" },
          message: "Thanks for the help!",
          timestamp: new Date(Date.now() - 3600000),
        },
      ],
    },
    {
      _id: "conv2",
      customerId: {
        _id: "cust2",
        name: "Mike Chen",
        email: "mike@example.com",
      },
      adminId: null,
      status: "open",
      lastMessage: "That sounds perfect!",
      lastMessageAt: new Date(Date.now() - 1800000),
      unreadCount: 2,
      messages: [
        {
          _id: "msg6",
          senderId: { _id: "cust2", name: "Mike Chen" },
          message: "Do you have sugar-free options?",
          timestamp: new Date(Date.now() - 1800000),
        },
        {
          _id: "msg7",
          senderId: { _id: "cust2", name: "Mike Chen" },
          message: "That sounds perfect!",
          timestamp: new Date(Date.now() - 1200000),
        },
      ],
    },
    {
      _id: "conv3",
      customerId: {
        _id: "cust3",
        name: "Emily Rodriguez",
        email: "emily@example.com",
      },
      adminId: null,
      status: "open",
      lastMessage: "Can you deliver by Friday?",
      lastMessageAt: new Date(Date.now() - 300000),
      unreadCount: 3,
      messages: [
        {
          _id: "msg8",
          senderId: { _id: "cust3", name: "Emily Rodriguez" },
          message: "Can you deliver by Friday?",
          timestamp: new Date(Date.now() - 300000),
        },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);

  // Filter conversations based on search term
  const filteredConversations = conversations.filter(
    (conv) =>
      conv.customerId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.customerId.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Sort conversations by last message date
  const sortedConversations = [...filteredConversations].sort((a, b) => {
    const dateA = new Date(a.lastMessageAt || 0);
    const dateB = new Date(b.lastMessageAt || 0);
    return dateB - dateA;
  });

  const handleSelectConversation = useCallback((conversation) => {
    setSelectedConversation(conversation);
  }, []);

  const handleSendMessage = (message) => {
    if (!selectedConversation || !message.trim()) return;

    const updatedConversations = conversations.map((conv) => {
      if (conv._id === selectedConversation._id) {
        const newMessage = {
          _id: `msg_${Date.now()}`,
          senderId: { _id: "admin1", name: "You" },
          message: message.trim(),
          timestamp: new Date(),
        };

        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: message.trim(),
          lastMessageAt: new Date(),
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    const updatedSelected = updatedConversations.find(
      (conv) => conv._id === selectedConversation._id,
    );
    setSelectedConversation(updatedSelected);
  };

  const handleStartNewChat = (customerEmail) => {
    // Check if conversation already exists
    const existingConv = conversations.find(
      (conv) => conv.customerId.email === customerEmail,
    );

    if (existingConv) {
      handleSelectConversation(existingConv);
      setShowNewChatDialog(false);
      return;
    }

    // Create new conversation
    const newConversation = {
      _id: `conv_${Date.now()}`,
      customerId: {
        _id: `cust_${Date.now()}`,
        name: customerEmail.split("@")[0],
        email: customerEmail,
      },
      adminId: null,
      status: "open",
      lastMessage: "",
      lastMessageAt: new Date(),
      unreadCount: 0,
      messages: [],
    };

    setConversations([newConversation, ...conversations]);
    handleSelectConversation(newConversation);
    setShowNewChatDialog(false);
  };

  return (
    <div className="flex h-full w-full bg-[#FFF6EC]">
      <div className="w-80 flex flex-col border-r border-[#DCC8B5] bg-[#FFF6EC] shrink-0">
        <div className="p-4 border-b border-[#DCC8B5] bg-[#FFF6EC]">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-[#1F140F]">Messages</h1>
            <button
              onClick={() => setShowNewChatDialog(true)}
              className="p-2 hover:bg-[#F5E6D3] rounded-full transition"
              title="Start new chat"
            >
              <FiPlus size={20} className="text-[#D98B2B]" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <FiSearch
              className="absolute left-3 top-3 text-[#9B8974]"
              size={16}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#DCC8B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D98B2B] text-sm"
            />
          </div>
        </div>

        {/* Conversations List */}
        <AdminChatList
          conversations={sortedConversations}
          selectedConversation={selectedConversation}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      {/* Right Side - Chat Window */}
      <div className="flex-1 flex flex-col bg-[#FFF6EC] min-w-0">
        {selectedConversation ? (
          <AdminChatWindow
            conversation={selectedConversation}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[#FFF6EC]">
            <div className="text-center px-6">
              <div className="text-5xl mb-3">💬</div>
              <h2 className="text-lg font-bold text-[#1F140F] mb-2">
                No conversation selected
              </h2>
              <p className="text-sm text-[#7B5C4F] mb-4">
                Choose a conversation or start a new one
              </p>
              <button
                onClick={() => setShowNewChatDialog(true)}
                className="bg-[#D98B2B] hover:bg-[#c97818] text-white px-4 py-2 rounded-md text-sm font-medium transition"
              >
                New Chat
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New Chat Dialog */}
      {showNewChatDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#FFF6EC] rounded-lg p-6 max-w-sm w-full mx-4 border border-[#DCC8B5] shadow-lg">
            <h2 className="text-lg font-bold text-[#1F140F] mb-4">
              Start New Chat
            </h2>
            <input
              type="email"
              placeholder="customer@example.com"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  handleStartNewChat(e.target.value.trim());
                }
              }}
              className="w-full px-3 py-2 border border-[#DCC8B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D98B2B] mb-4 bg-white text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowNewChatDialog(false)}
                className="flex-1 px-3 py-2 border border-[#DCC8B5] rounded-lg text-[#7B5C4F] hover:bg-[#F5E6D3] transition text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const email = document.querySelector(
                    'input[type="email"]',
                  )?.value;
                  if (email?.trim()) {
                    handleStartNewChat(email.trim());
                  }
                }}
                className="flex-1 px-3 py-2 bg-[#D98B2B] hover:bg-[#c97818] text-white rounded-lg transition text-sm font-medium"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminChat;
