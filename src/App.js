import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Main_menu/main-menu';
import ChatUI from './components/Chat_UI/chat-ui';
import Session from './components/session'
const App = () => {
  return (
    <Router basename="/NOKi-chat-interface">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatUI />} />
        <Route path="/session" element={<Session />} />

      </Routes>
    </Router>
  );
};

export default App;
