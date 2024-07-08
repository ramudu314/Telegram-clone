// Message.jsx
import React from 'react';
import './Message.css';

function Message({ message, darkMode }) {
  const formattedTime = new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`message ${message.sender_id === 1 ? 'sent' : 'received'} ${darkMode ? 'dark-mode' : ''}`}>
      <div className="message-content">
        {message.message}
        <div className="message-time">{formattedTime}</div>
      </div>
    </div>
  );
}

export default Message;
