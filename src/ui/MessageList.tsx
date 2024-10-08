import React from 'react';
import MessageCard, { Message } from './MessageCard';
import EmptyState from './EmptyState';

interface MessageListProps {
  messages: Message[];
  markMessageAsRead: (id: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, markMessageAsRead }) => {
  return (
    <div className="space-y-4 min-h-80">
      {messages.length === 0 ? (
         <EmptyState />
      ) : (
        messages.map((msg) => (
          <MessageCard 
            key={msg.id} 
            message={msg} 
            markMessageAsRead={markMessageAsRead} 
          />
        ))
      )}
    </div>
  );
}

export default MessageList;
