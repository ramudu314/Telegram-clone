import React, { useState } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import './App.css';

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="chat-list-container">
        <ChatList onSelectChat={setSelectedChat} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      </div>
      <div className="chat-window-container">
        {selectedChat ? (
          <ChatWindow selectedChat={selectedChat} darkMode={darkMode} />
        ) : (
          <div className="no-chat-selected">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
}

export default App;
