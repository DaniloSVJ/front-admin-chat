import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [clientId, setClientId] = useState('');
  const [supportId, setSupportId] = useState('' );


  useEffect(() => {
    socket.emit('joinRoom', { room: 'client', projectId: '20buscar' });

    socket.on('clientMessage', (data) => {
      console.log(data)
      setSupportId(data.supportId)
      setMessages((prevMessages) => [...prevMessages, `Support: ${data.messages}`]);
    });

    return () => {
      socket.off('clientMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit('clientMessage', {
        userType: 'contacts',
        socketId: clientId,
        projectId: clientId,
        supportId: supportId,
        messageType: 'message',
        messages: message,
        orige: 'monitor'
      }
      );


    }
  };

  const sendNameCli = () => {
    if (message) {
      socket.emit('joinRoom', { room: 'client', projectId: clientId });

    }
  };


  return (
    <div>
      <h1>Chat Client</h1>
      <div id="messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div style={{ flexDirection: 'column' }}>
        <div style={{ marginBottom: '15px' }}>

          <input
            id="message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div>

          <input
            id="client"
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="nome do cliente"
          />
          <button onClick={sendNameCli}>Send</button>

        </div>

      </div>
    </div>
  );
}

export default App;
