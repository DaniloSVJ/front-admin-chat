import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', { room: 'client' });

    socket.on('clientMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, `Support: ${data.message}`]);
    });

    return () => {
      socket.off('clientMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      // Adiciona a mensagem do cliente à lista de mensagens
      setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);

      // Emite a mensagem para o servidor
      socket.emit('clientMessage', { message });

      // Limpa o campo de mensagem
      setMessage('');
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
      <input
        id="message"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
