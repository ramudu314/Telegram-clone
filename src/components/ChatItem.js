import React from 'react';
import './ChatItem.css';

function ChatItem({ chat, onSelectChat }) {
  return (
    <div className="chat-item" onClick={() => onSelectChat(chat)}>
      <div className="chat-info">
        <div className="chat-name">
          {chat.creator.name || chat.creator.email}
        </div>
        <div className="chat-last-message">
          {chat.msg_count} message(s)
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
