import React, { useState } from 'react';
import { FaCommentAlt, FaTimes } from 'react-icons/fa';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleUserMessage = (message) => {
    const response = generateResponse(message);
    setMessages([...messages, { text: message, sender: "user" }]);
    setTimeout(() => {
      setMessages([...messages, { text: response, sender: "bot" }]);
    }, 500);
  };

  const generateResponse = (message) => {
    message = message.toLowerCase();
    let response = "";
    if (message.includes("hello") || message.includes("hi")) {
      response = "Hi there! How can I help you?";
    } else if (message.includes("help")) {
      response = "Sure, I'm here to assist you. What do you need help with?";
    } else if (message.includes("bye") || message.includes("goodbye")) {
      response = "Goodbye! Have a great day!";
    } else {
      response = "I'm sorry, I didn't understand that. Can you please rephrase?";
    }
    return response;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    handleUserMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className={`fixed bottom-8 right-8 ${isOpen ? 'w-full max-w-md' : ''}`}>
      {/* Button to toggle chatbot */}
      {!isOpen && (
        <button
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow-md focus:outline-none"
          onClick={toggleChatbot}
        >
          <FaCommentAlt className="text-xl" />
        </button>
      )}

      {/* Chatbot window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg">
          {/* Chatbot header */}
          <div className="bg-green-500 text-white px-4 py-2 flex justify-between items-center">
            <h3 className="font-bold">WhatsApp Chat</h3>
            <button onClick={toggleChatbot} className="focus:outline-none">
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
          {/* Chatbot messages */}
          <div className="p-4 overflow-y-auto max-h-96">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === "bot" ? "text-gray-800" : "text-green-800 text-right"}`}>
                <p className="bg-gray-200 rounded-lg px-3 py-2 inline-block">{message.text}</p>
              </div>
            ))}
          </div>
          {/* Chatbot input */}
          <form onSubmit={handleSubmit} className="bg-gray-100 p-4 flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-white border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white rounded-r-lg px-4 py-2 ml-2"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FloatingChatbot;
