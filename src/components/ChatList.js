import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ChatItem from './ChatItem';
import './ChatList.css';

function ChatList({ onSelectChat, toggleDarkMode, darkMode }) {
  const [chats, setChats] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = 'https://devapi.beyondchats.com/api/get_all_chats?page=1';
    axios.get(API_URL)
      .then(response => {
        if (response.data.status === 'success') {
          setChats(response.data.data.data || []);
        } else {
          console.error('Failed to fetch chats:', response.data.message);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching chats:', error);
        setLoading(false);
      });
  }, []);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`chat-list ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <AppBar position="static" className={darkMode ? 'dark-mode' : 'light-mode'}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <div style={{ flex: 1 }}>
            <h2 style={{ textAlign: 'center', color: darkMode ? '#fff' : '#fff' }}>Telegram</h2>
          </div>
          <IconButton edge="end" color="inherit" onClick={() => {}}>
            <SearchIcon style={{ color: darkMode ? '#fff' : '#fff' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="chats">
        {chats.map(chat => (
          <ChatItem key={chat.id} chat={chat} onSelectChat={onSelectChat} />
        ))}
      </div>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className={`drawer-content ${darkMode ? 'dark-mode' : 'light-mode'}`}>
          <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: darkMode ? '#fff' : '#333', backgroundColor: darkMode ? '#333' : '#f0f4f8', padding: '10px' }}>
            <span>Ramudu</span>
            <IconButton onClick={toggleDarkMode}>
              {darkMode ? <WbSunnyIcon style={{ color: '#FFD700' }} /> : <NightsStayIcon style={{ color: '#4CAF50' }} />}
            </IconButton>
          </h2>
          <List>
            <ListItem button style={{ backgroundColor: darkMode ? '#333' : '#fff', padding: '10px' }}>
              <AccountCircleIcon style={{ marginRight: '10px', color: darkMode ? '#ddd' : '#333' }} />
              <ListItemText primary="My Profile" secondary="Ramudu" style={{ color: darkMode ? '#ddd' : '#333' }} />
            </ListItem>
            <ListItem button style={{ backgroundColor: darkMode ? '#333' : '#fff', padding: '10px' }}>
              <PhoneIcon style={{ marginRight: '10px', color: darkMode ? '#ddd' : '#333' }} />
              <ListItemText primary="Calls" secondary="9542492126" style={{ color: darkMode ? '#ddd' : '#333' }} />
            </ListItem>
            <ListItem button style={{ backgroundColor: darkMode ? '#333' : '#fff', padding: '10px' }}>
              <EmailIcon style={{ marginRight: '10px', color: darkMode ? '#ddd' : '#333' }} />
              <ListItemText primary="Email" secondary="vkambagiriramudu314@gmail.com" style={{ color: darkMode ? '#ddd' : '#333' }} />
            </ListItem>
            <ListItem button style={{ backgroundColor: darkMode ? '#333' : '#fff', padding: '10px' }}>
              <PeopleAltIcon style={{ marginRight: '10px', color: darkMode ? '#ddd' : '#333' }} />
              <ListItemText primary="People Nearby" style={{ color: darkMode ? '#ddd' : '#333' }} />
            </ListItem>
            <ListItem button style={{ backgroundColor: darkMode ? '#333' : '#fff', padding: '10px' }}>
              <BookmarkIcon style={{ marginRight: '10px', color: darkMode ? '#ddd' : '#333' }} />
              <ListItemText primary="Saved Messages" style={{ color: darkMode ? '#ddd' : '#333' }} />
            </ListItem>
            <ListItem button style={{ backgroundColor: darkMode ? '#333' : '#fff', padding: '10px' }}>
              <SettingsIcon style={{ marginRight: '10px', color: darkMode ? '#ddd' : '#333' }} />
              <ListItemText primary="Settings" style={{ color: darkMode ? '#ddd' : '#333' }} />
            </ListItem>
            <ListItem button style={{ backgroundColor: darkMode ? '#333' : '#fff', padding: '10px' }}>
              <PeopleOutlineIcon style={{ marginRight: '10px', color: darkMode ? '#ddd' : '#333' }} />
              <ListItemText primary="Invite Friends" style={{ color: darkMode ? '#ddd' : '#333' }} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default ChatList;
