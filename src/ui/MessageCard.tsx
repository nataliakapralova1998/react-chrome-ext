import React, { useState } from "react";

export interface Message {
  id: string;
  content: string;
  priority: "high" | "medium" | "low";
  timestamp: string;
  read: boolean;
}

interface MessageCardProps {
  message: Message;
  markMessageAsRead: (id: string) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  markMessageAsRead,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMarkAsRead = () => {
    setIsAnimating(true);
    setTimeout(() => {
      markMessageAsRead(message.id);
    }, 300); // Match this duration with the CSS transition duration
  };

  return (
    <div
      className={`p-4 mb-4 transition-transform duration-300 ${
        isAnimating ? "translate-x-full opacity-0" : "translate-x-0"
      } border-l-4 ${
        message.priority === "high"
          ? "border-red-600"
          : message.priority === "medium"
          ? "border-yellow-600"
          : "border-green-600"
      } bg-white shadow-sm`}
    >
      <strong
        className={`block text-lg font-bold ${
          message.priority === "high"
            ? "text-red-600"
            : message.priority === "medium"
            ? "text-yellow-600"
            : "text-green-600"
        }`}
      >
        {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)}
      </strong>
      <span className="block text-xs text-gray-500">
        {new Date(message.timestamp).toLocaleString()}
      </span>
      <p className="text-gray-800 text-sm">{message.content}</p>
      {!message.read && (
        <button
          className="mt-2 bg-gray-800 text-white py-1 px-4 rounded-md hover:bg-gray-700 transition duration-200"
          onClick={handleMarkAsRead}
        >
          Mark as Read
        </button>
      )}
    </div>
  );
};

export default MessageCard;
