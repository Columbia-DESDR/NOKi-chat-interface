import React, { useState } from 'react';
import { axiosInstance } from '../config/http';

function Session() {
  const [sessionMessage, setSessionMessage] = useState('');
  const [sessionData, setSessionData] = useState(null);

  // Function to set session
  const setSession = async () => {
    try {
      const response = await axiosInstance.post('/set_session');
      setSessionMessage(response.data.msg);
      console.log('Set Session Response:', response.data);
    } catch (error) {
      console.error('Error setting session:', error);
    }
  };

  // Function to get session
  const getSession = async () => {
    try {
      const response = await axiosInstance.post('/get_session');
      setSessionData(response.data);
      console.log('Get Session Response:', response.data);
    } catch (error) {
      console.error('Error getting session:', error);
    }
  };

  return (
    <div>
      <h1>Flask Session Management with React</h1>
      <button onClick={setSession}>Set Session</button>
      <button onClick={getSession}>Get Session</button>
      <div>
        <h2>Session Message:</h2>
        <p>{sessionMessage}</p>
      </div>
      <div>
        <h2>Session Data:</h2>
        <pre>{sessionData ? JSON.stringify(sessionData, null, 2) : 'No session data found'}</pre>
      </div>
    </div>
  );
}

export default Session;