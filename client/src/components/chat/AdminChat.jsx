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
import NewChatDialog from "./NewChatDialog";
import { useQuery } from "@tanstack/react-query";
import { getAllConversations } from "../../services/chat.service";

const AdminChat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const {
    data: conversations = [],
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: getAllConversations,
  });

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

    // setConversations(updatedConversations);
    const updatedSelected = updatedConversations.find(
      (conv) => conv._id === selectedConversation._id,
    );
    setSelectedConversation(updatedSelected);
  };

  const handleClose = () => {
    setShowNewChatDialog(false);
    refetch();
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

        <AdminChatList
          conversations={sortedConversations}
          selectedConversation={selectedConversation}
          onSelectConversation={handleSelectConversation}
        />
      </div>

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

      {showNewChatDialog && (
        <NewChatDialog open={showNewChatDialog} onClose={handleClose} />
      )}
    </div>
  );
};

export default AdminChat;
