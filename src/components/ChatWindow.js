import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';
import MessageInput from './MessageInput';
import './ChatWindow.css';

function ChatWindow({ selectedChat, darkMode }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedChat) {
      const API_URL = `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${selectedChat.id}`;
      axios.get(API_URL)
        .then(response => {
          setMessages(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    }
  }, [selectedChat]);

  const formatDate = (dateString) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  let lastDate = '';

  return (
    <div className={`chat-window ${darkMode ? 'dark-mode' : ''}`}>
      <div className="messages">
        {messages.map((message, index) => {
          const messageDate = formatDate(message.created_at);
          const showDate = messageDate !== lastDate;
          lastDate = messageDate;
          return (
            <React.Fragment key={message.id}>
              {showDate && <div className="date-separator">{messageDate}</div>}
              <Message message={message} isSent={message.isSent} />
            </React.Fragment>
          );
        })}
      </div>
      <div className="message-input-container">
        <MessageInput selectedChat={selectedChat} />
      </div>
    </div>
  );
}

export default ChatWindow;
