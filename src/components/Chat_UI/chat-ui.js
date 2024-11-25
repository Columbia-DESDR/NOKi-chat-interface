import React, { useState, useEffect, useRef } from 'react';
import {
  ChatContainer,
  LogoContainer,
  ChatBody,
  ChatHeader,
  ChatBubble,
  Timestamp,
  ChatInput,
  Input,
  SendButton,
  FullScreenWrapper
} from './styles';
import { Global } from '@emotion/react';
import { globalStyles } from './styles';
import { axiosInstance } from '../../config/http';
import { toast } from 'react-toastify';
import iriLogo from "../../assests/IRI_logo.jpg";
import columbiaLogo from "../../assests/columbia_logo.png";
import { ToastContainer } from 'react-toastify';
import { Outlet} from "react-router-dom";


const ChatUI = ({ onBack, chat }) => {
  const [messages, setMessages] = useState(chat || []);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState('');
  const chatBodyRef = useRef(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = `user_${Date.now()}`;
      localStorage.setItem('userId', newUserId);
      setUserId(newUserId);
    }
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);

    try {
      const response = await axiosInstance.get('/chat', {
        params: { message: input, user_id: userId },
      });

      if (response.data && response.data.response) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: response.data.response,
            sender: 'ai',
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      } else {
        toast.error("Failed to get a response.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }

    setInput('');
  };

    return (
      <FullScreenWrapper>
        <ChatContainer>
          <Global styles={globalStyles} />
          <LogoContainer>
            <img src={iriLogo} alt="IRI Logo" />
            <h3>Chat Interface</h3>
            <img src={columbiaLogo} alt="Columbia Logo" />
          </LogoContainer>
          <ChatBody ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <ChatBubble key={index} sender={msg.sender}>
                <p>{msg.text}</p>
                <Timestamp>{msg.timestamp}</Timestamp>
              </ChatBubble>
            ))}
          </ChatBody>
          <ChatInput>
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <SendButton onClick={sendMessage}>Send</SendButton>
          </ChatInput>
        </ChatContainer>
      </FullScreenWrapper>
    );
  };

export default ChatUI;
