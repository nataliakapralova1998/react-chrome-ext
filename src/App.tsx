import React, { useEffect, useState } from 'react';
import MessageList from './ui/MessageList';
import { Message } from './ui/MessageCard';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Fetch messages from Chrome storage
    chrome.storage.local.get('messages', (result) => {
      console.log('Fetched messages:', result.messages);
      const unreadMessages = result.messages?.filter((msg: Message) => !msg.read) || [];
      setMessages(unreadMessages);

      // Update badge text based on unread messages
      const unreadCount = unreadMessages.length;
      chrome.action.setBadgeText({ text: unreadCount > 0 ? String(unreadCount) : '' });
    });
  }, []);

  const markMessageAsRead = (id: string) => {
    const updatedMessages = messages.map(msg => {
      if (msg.id === id) {
        return { ...msg, read: true };
      }
      return msg;
    });

    // Update storage with the updated messages
    chrome.storage.local.set({ messages: updatedMessages }, () => {
      // After saving to storage, filter unread messages
      const unreadMessages = updatedMessages.filter(msg => !msg.read);
      setMessages(unreadMessages);

      // Update badge text based on the updated unread messages
      const unreadCount = unreadMessages.length;
      chrome.action.setBadgeText({ text: unreadCount > 0 ? String(unreadCount) : '' });
    });
  };

  return (
    <div className="p-6 bg-white shadow-lg w-[600px] mx-auto rounded-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Organization Messages</h1>
      <MessageList messages={messages} markMessageAsRead={markMessageAsRead} />
    </div>
  );
};

export default App;
