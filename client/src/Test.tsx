import React, { useEffect, useState } from 'react';

const TestComponent: React.FC = () => {
  const [backendMessage, setBackendMessage] = useState('');
  const [error, setError] = useState('');

  const testBackendConnection = async () => {
    try {
      console.log('API URL:', import.meta.env.VITE_API_URL);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/test`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBackendMessage(data.message);
      setError('');
    } catch (error) {
      console.error("Error connecting to back-end:", error);
      setError('Error connecting to back-end');
    }
  };

  useEffect(() => {
    testBackendConnection();
  }, []);

  return (
    <div>
      <h1>Test Back-end Connection</h1>
      <button onClick={testBackendConnection}>Test Connection</button>
      <div>
        {backendMessage && <p>Response from backend: {backendMessage}</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default TestComponent;