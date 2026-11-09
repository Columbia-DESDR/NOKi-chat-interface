import React, { useState, useEffect, useRef } from 'react';
import {
  ChatContainer,
  LogoContainer,
  ChatBody,
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import iriLogo from "../../assests/IRI_logo.jpg";
import columbiaLogo from "../../assests/columbia_logo.png";

// Returns a stable per-browser id, creating one on first visit.
const getUserId = () => {
  const newId = () =>
    'user_' + (window.crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(36).slice(2)}`);
  try {
    let id = localStorage.getItem('userId');
    if (!id) {
      id = newId();
      localStorage.setItem('userId', id);
    }
    return id;
  } catch (e) {
    // Storage blocked (e.g. private mode): fall back to a per-tab id.
    return newId();
  }
};

const ChatUI = ({ chat }) => {
  const [messages, setMessages] = useState(chat || []);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  // Lazy initializer so the id exists on the very first render.
  const [userId] = useState(getUserId);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || sending) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text, sender: 'user', timestamp: new Date().toLocaleTimeString() },
    ]);
    setInput('');
    setSending(true);

    try {
      const response = await axiosInstance.get('/chat', {
        params: { message: text, user_id: userId },
      });

      if (response.data && response.data.response != null) {
        // The backend may reply with a single string or an array of them;
        // give each string its own bubble.
        const replies = [].concat(response.data.response);
        const timestamp = new Date().toLocaleTimeString();
        setMessages((prevMessages) => [
          ...prevMessages,
          ...replies.map((reply) => ({ text: reply, sender: 'ai', timestamp })),
        ]);
      } else {
        toast.error("Failed to get a response.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

    return (
      <FullScreenWrapper>
        <ChatContainer>
          <Global styles={globalStyles} />
          <ToastContainer position="top-center" />
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
              onKeyDown={(e) => {
                // Ignore Enter while an IME is composing (e.g. CJK input).
                if (e.key === 'Enter' && !e.nativeEvent.isComposing) sendMessage();
              }}
            />
            <SendButton onClick={sendMessage} disabled={sending}>
              {sending ? 'Sending…' : 'Send'}
            </SendButton>
          </ChatInput>
        </ChatContainer>
      </FullScreenWrapper>
    );
  };

export default ChatUI;
