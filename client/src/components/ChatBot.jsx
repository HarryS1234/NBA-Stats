import React, { useState, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);
  
  // Store the API token in a variable
  const API_TOKEN = import.meta.env.VITE_HF_TOKEN ; // For Vite

  const nbaInfo = {
    context: `
      This is an NBA fan chatbot for NBA Stats Duel. The assistant knows about:
      - Current NBA teams and their complete rosters
      - NBA history and legendary players
      - NBA rules and gameplay details
      - Comprehensive NBA statistics and records
      - Recent NBA seasons, playoffs, and championships
      - NBA draft information and prospects
      - Detailed player profiles, career stats, and accomplishments
      - NBA trivia and fun facts
    `
  };

  // Prevent hydration errors by initializing state after mount
  useEffect(() => {
    setMounted(true);
    setMessages([
      { 
        sender: "bot", 
        text: "🏀 Welcome to NBA Stats Duel! I'm your basketball expert. Ask me anything about NBA players, teams, stats, history, or trivia!" 
      },
    ]);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
        {
          inputs: `Context: ${nbaInfo.context}\n\nUser Question: ${input}\n\nAnswer as an NBA expert with enthusiasm:`,
          parameters: { max_new_tokens: 200, temperature: 0.7 },
        },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botResponse = response.data[0]?.generated_text.split("Answer as an NBA expert with enthusiasm:")[1]?.trim() || 
        "I don't have stats on that yet! Try asking about another player or team.";
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [...prev, { 
        sender: "bot", 
        text: "Time out! Our stats database is currently taking a breather. Please try again in a moment!" 
      }]);
    }
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleNewChat = () => {
    setMessages([{ 
      sender: "bot", 
      text: "🏀 Starting a fresh quarter! What NBA stats or facts would you like to know about?" 
    }]);
  };

  // Return null or placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#c8102e] hover:bg-[#1d428a] text-white font-bold px-8 py-6 rounded-full shadow-xl flex items-center transition-all duration-300 transform hover:scale-105"
          style={{ 
            backgroundImage: 'linear-gradient(135deg, #c8102e 0%, #ff8e00 100%)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)' 
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11.5v5l4-2.5z"></path>
          </svg>
          NBA Stats Chat
        </button>
      )}

      {isOpen && (
        <div className="w-96 bg-white dark:bg-gray-900 rounded-xl shadow-2xl flex flex-col overflow-hidden" 
            style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)' }}>
          <div className="text-white p-4 rounded-t-xl flex justify-between items-center"
               style={{ backgroundImage: 'linear-gradient(135deg, #c8102e 0%, #ff8e00 100%)' }}>
            <div className="flex items-center">
              <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.71-13.7l4.24 4.24-.7.7L10.58 8H14V7H9v5h1V8.41l3.94 3.94-.7.7-4.24-4.24.7-.7z"/>
              </svg>
              <span className="font-bold text-xl">NBA Stats Assistant</span>
            </div>
            <div className="flex">
              <button onClick={handleNewChat} className="mr-2 bg-white text-[#c8102e] dark:bg-gray-800 dark:text-white px-3 py-1 rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
                New Chat
              </button>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 bg-[#1d428a] hover:bg-blue-700 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300">
                ✕
              </button>
            </div>
          </div>
          <div className="flex-1 p-4 max-h-96 overflow-y-auto dark:bg-gray-900 bg-gray-50" 
               style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/basketball.png")' }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 ${msg.sender === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block p-3 rounded-lg max-w-3/4 shadow-md ${
                    msg.sender === "user" 
                      ? "bg-[#1d428a] text-white rounded-tr-none" 
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border-2 border-[#c8102e]"
                  }`}
                  style={msg.sender === "user" ? {
                    boxShadow: '0 3px 10px rgba(29, 66, 138, 0.4)'
                  } : {
                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t-2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 bg-white">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about NBA players, stats, or trivia..."
                className="flex-1 p-3 border-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-l-lg focus:outline-none focus:border-[#ff8e00] transition-all duration-300"
              />
              <button
                onClick={handleSend}
                className="bg-[#1d428a] hover:bg-[#c8102e] text-white p-3 rounded-r-lg transition-all duration-300 flex items-center"
                style={{ backgroundImage: 'linear-gradient(135deg, #1d428a 0%, #0046bd 100%)' }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
