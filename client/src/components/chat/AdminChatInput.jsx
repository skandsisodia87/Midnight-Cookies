import { useState } from "react";
import { FiPaperclip, FiSmile, FiSend, FiX } from "react-icons/fi";

const AdminChatInput = ({
  message,
  setMessage,
  onSendMessage,
  handleMessageChange,
}) => {
  const [attachments, setAttachments] = useState([]);

  const handleSendMessage = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message);
      setMessage("");
      setAttachments([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      setAttachments((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
        },
      ]);
    });
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="border-t border-[#DCC8B5] p-3 bg-[#FFF6EC]">
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="mb-2 space-y-1.5">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center justify-between bg-white border border-[#DCC8B5] p-2 rounded text-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                <FiPaperclip size={14} className="text-[#D98B2B] shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#1F140F] truncate">
                    {attachment.name}
                  </p>
                  <p className="text-xs text-[#9B8974]">
                    {formatFileSize(attachment.size)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeAttachment(attachment.id)}
                className="p-1 hover:bg-[#F5E6D3] rounded transition shrink-0"
              >
                <FiX size={14} className="text-[#D98B2B]" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-3">
        {/* Emoji Button */}
        <button
          className="p-2 hover:bg-[#F0E6D2] rounded-full transition shrink-0"
          title="Add emoji"
        >
          <FiSmile size={20} className="text-[#D98B2B]" />
        </button>

        {/* Attachment Button */}
        <div className="relative">
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept="image/*,.pdf,.doc,.docx"
          />
          <button
            className="p-2 hover:bg-[#F0E6D2] rounded-full transition shrink-0"
            title="Add attachment"
          >
            <FiPaperclip size={20} className="text-[#D98B2B]" />
          </button>
        </div>

        {/* Text Input */}
        <div className="flex-1 bg-white border border-[#E5C79A] rounded-full px-4 py-2 flex items-center">
          <input
            type="text"
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full bg-transparent focus:outline-none text-[#1F140F] placeholder-[#B8956F]"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendMessage}
          disabled={!message.trim() && attachments.length === 0}
          className={`p-2 rounded-full transition shrink-0 ${
            message.trim() || attachments.length > 0
              ? "bg-[#D98B2B] hover:bg-[#c97818] text-white"
              : "text-[#E5C79A] cursor-not-allowed"
          }`}
          title="Send message"
        >
          <FiSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default AdminChatInput;
