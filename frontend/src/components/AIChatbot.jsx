import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiUser, FiCpu } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { RiRobot2Fill } from 'react-icons/ri';
import axios from 'axios';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm Rachit's AI assistant. Ask me anything about his skills, projects, experience, or portfolio! 🚀",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      type: 'user',
      text: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await axios.post(`${API_URL}/api/chatbot`, {
        message: input,
      });

      const botMessage = {
        type: 'bot',
        text: response.data.reply,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage = {
        type: 'bot',
        text: "I'm having trouble connecting right now. Please try again later or contact Rachit directly! 😊",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "What are Rachit's skills?",
    "Tell me about his projects",
    "What's his experience?",
    "How can I contact him?",
  ];

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-full shadow-2xl flex items-center justify-center text-white overflow-hidden group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(139, 92, 246, 0.5)',
            '0 0 30px rgba(168, 85, 247, 0.7)',
            '0 0 20px rgba(139, 92, 246, 0.5)',
          ],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        {/* Animated background effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -180, opacity: 0, scale: 0 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 180, opacity: 0, scale: 0 }}
              className="relative z-10"
            >
              <FiX size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -180, opacity: 0, scale: 0 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 180, opacity: 0, scale: 0 }}
              className="relative z-10 flex items-center justify-center"
            >
              <RiRobot2Fill size={32} />
              {/* Sparkle effect */}
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <HiSparkles size={16} className="text-yellow-300" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-4 text-white relative overflow-hidden">
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              <div className="flex items-center gap-3 relative z-10">
                <motion.div 
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center relative"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <RiRobot2Fill size={24} className="text-white" />
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <HiSparkles size={14} className="text-yellow-300" />
                  </motion.div>
                </motion.div>
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    AI Portfolio Assistant
                    <HiSparkles size={16} className="text-yellow-300" />
                  </h3>
                  <p className="text-xs opacity-90">Powered by GPT-3.5 • Ask me anything!</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${
                    msg.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.type === 'bot' && (
                    <motion.div 
                      className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center flex-shrink-0 relative"
                      animate={{
                        boxShadow: [
                          '0 0 10px rgba(139, 92, 246, 0.3)',
                          '0 0 15px rgba(168, 85, 247, 0.5)',
                          '0 0 10px rgba(139, 92, 246, 0.3)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <RiRobot2Fill size={18} className="text-white" />
                    </motion.div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  </div>
                  {msg.type === 'user' && (
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiUser size={16} className="text-gray-600 dark:text-gray-300" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center relative"
                    animate={{
                      boxShadow: [
                        '0 0 10px rgba(139, 92, 246, 0.3)',
                        '0 0 15px rgba(168, 85, 247, 0.5)',
                        '0 0 10px rgba(139, 92, 246, 0.3)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <RiRobot2Fill size={18} className="text-white" />
                  </motion.div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                        className="w-2 h-2 bg-violet-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                        className="w-2 h-2 bg-purple-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                        className="w-2 h-2 bg-fuchsia-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Questions (show only if chat is empty) */}
              {messages.length === 1 && !isTyping && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Quick questions:
                  </p>
                  {quickQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setInput(question)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-left text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                  disabled={isTyping}
                />
                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg relative overflow-hidden"
                  animate={
                    !input.trim() || isTyping
                      ? {}
                      : {
                          boxShadow: [
                            '0 0 10px rgba(139, 92, 246, 0.5)',
                            '0 0 20px rgba(168, 85, 247, 0.7)',
                            '0 0 10px rgba(139, 92, 246, 0.5)',
                          ],
                        }
                  }
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <FiSend size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
