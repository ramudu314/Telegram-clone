import React, { useState } from 'react';
import axios from 'axios';
import './MessageInput.css';

function MessageInput({ selectedChat }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && selectedChat) {
      const API_URL = 'https://devapi.beyondchats.com/api/send_message';
      axios.post(API_URL, { chat_id: selectedChat.id, message })
        .then(response => {
          // Handle successful message send
          setMessage('');
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default MessageInput;
