import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Main_menu/main-menu';
import ChatUI from './components/Chat_UI/chat-ui';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatUI />} />
      </Routes>
    </Router>
  );
};

export default App;
