import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const FullScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #f0f0f0;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
  box-sizing: border-box;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 0; /* Remove border-radius for a full-screen look */
  box-shadow: none; /* Remove shadow for a flat, full-screen fit */
  overflow: hidden;
`;


export const LogoContainer = styled.div`
  display: flex;
  flex-direction: row; /* Align logos in a row */
  align-items: center;
  justify-content: space-between; /* Space out logos evenly */
  gap: 20px; /* Adjust gap between logos */
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 16px;

  img {
    width: 80px;
    filter: grayscale(0.8);
  }
`;


export const ChatBody = styled.div`
  flex-grow: 1;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  scrollbar-width: thin;
  scrollbar-color: #c9c9c9 transparent;
`;

export const ChatBubble = styled.div`
  padding: 12px;
  max-width: 70%;
  border-radius: 8px;
  background-color: ${(props) => (props.sender === 'user' ? '#e0ffe0' : '#f0f0f0')};
  align-self: ${(props) => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
`;

export const Timestamp = styled.span`
  color: #a8a8a8;
  font-size: 0.75em;
  margin-top: 4px;
`;

export const ChatInput = styled.div`
  display: flex;
  padding: 16px;
  background-color: #fafafa;
  border-top: 1px solid #e0e0e0;
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
`;

export const SendButton = styled.button`
  padding: 12px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

export const globalStyles = css`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
`;
