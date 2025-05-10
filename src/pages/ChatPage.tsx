import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, ArrowUp, AtSign, Bot, ChevronRight, Copy, Send, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'ai',
    text: 'გამარჯობა! 👋 I\'m your Georgian language assistant. How can I help you today? You can ask me about vocabulary, grammar, pronunciation, or cultural aspects of the Georgian language.',
    timestamp: new Date(),
  },
];

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const ChatPage: React.FC = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const callChatAssistant = async (userMessage: string, retryCount = 0): Promise<string> => {
    try {
      // Reset error state
      setError(null);
      
      // Prepare messages for the API in the format OpenAI expects
      const apiMessages = messages
        .concat({
          id: Date.now().toString(),
          sender: 'user',
          text: userMessage,
          timestamp: new Date(),
        })
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));

      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: { messages: apiMessages },
      });

      if (error) {
        console.error('Error calling chat assistant:', error);
        
        // Check if the error is related to OpenAI quota
        if (error.message && (error.message.includes('429') || 
            (data && data.error && data.error.includes('quota')))) {
          setQuotaExceeded(true);
          throw new Error('OpenAI API quota exceeded. Please try again later.');
        }
        
        throw new Error('Error calling chat assistant: ' + error.message);
      }

      if (!data || !data.message) {
        throw new Error('Invalid response from chat assistant');
      }

      return data.message;
    } catch (error) {
      console.error('Error in chat:', error);
      
      // Check if the error message contains quota information
      if (error.message && (
          error.message.includes('quota') || 
          error.message.includes('429') || 
          error.message.includes('exceeded')
      )) {
        setQuotaExceeded(true);
        throw new Error('OpenAI API quota exceeded. Please try again later.');
      }
      
      // Retry logic
      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying... Attempt ${retryCount + 1} of ${MAX_RETRIES}`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return callChatAssistant(userMessage, retryCount + 1);
      }
      
      throw new Error('Failed to connect to the chat assistant after 3 attempts. Please try again later.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Reset quota exceeded state on new message
    setQuotaExceeded(false);
    setError(null);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue.trim(),
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      // Call the chat assistant function
      const aiResponse = await callChatAssistant(userMessage.text);
      
      if (!aiResponse) {
        throw new Error('Invalid response from chat assistant: Empty response');
      }
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      
      // Create a user-friendly error message
      let errorMessage = 'Sorry, I encountered an error. Please try again later.';
      
      if (quotaExceeded || (error.message && error.message.includes('quota'))) {
        errorMessage = 'Sorry, the AI service is currently unavailable due to high demand. Our quota has been exceeded. Please try again later.';
      }
      
      setError(errorMessage);
      
      // Add error message
      const errorResponseMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: errorMessage,
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, errorResponseMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const formatMessageTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${Math.min(element.scrollHeight, 200)}px`;
  };

  return (
    <div className="pt-16 pb-16">
      <div className={`min-h-[calc(100vh-8rem)] flex flex-col ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <div className={`py-4 px-4 md:px-6 border-b ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center">
              <div className={`p-2 rounded-full mr-3 ${
                theme === 'dark' ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
              }`}>
                <Bot size={24} />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Georgian Language Assistant
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Ask questions about Georgian language, vocabulary, or culture
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] md:max-w-[75%] rounded-lg p-4 ${
                  message.sender === 'user'
                    ? (theme === 'dark' ? 'bg-indigo-800 text-white' : 'bg-indigo-600 text-white')
                    : (theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800')
                }`}>
                  <div className="flex items-center mb-1">
                    <div className={`p-1 rounded-full mr-2 ${
                      message.sender === 'user' 
                        ? (theme === 'dark' ? 'bg-indigo-700 text-indigo-300' : 'bg-indigo-500 text-indigo-100')
                        : (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600')
                    }`}>
                      {message.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <span className={`text-xs ${
                      message.sender === 'user'
                        ? (theme === 'dark' ? 'text-indigo-200' : 'text-indigo-100')
                        : (theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
                    }`}>
                      {message.sender === 'user' ? 'You' : 'Georgian AI Assistant'} • {formatMessageTimestamp(message.timestamp)}
                    </span>
                  </div>
                  <div className="prose max-w-none">
                    {message.text.split('\n').map((line, i) => (
                      <p key={i} className={`${i > 0 ? 'mt-2' : ''} text-sm md:text-base`}>
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="flex justify-end mt-1">
                    <button
                      onClick={() => handleCopyMessage(message.text)}
                      className={`p-1 rounded-md hover:${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                      } transition-colors`}
                      aria-label="Copy message"
                    >
                      <Copy size={14} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className={`max-w-[85%] md:max-w-[75%] rounded-lg p-4 ${
                  theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
                }`}>
                  <div className="flex items-center">
                    <div className={`p-1 rounded-full mr-2 ${
                      theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Bot size={14} />
                    </div>
                    <div className="flex space-x-1">
                      <div className={`w-2 h-2 rounded-full animate-bounce ${theme === 'dark' ? 'bg-gray-400' : 'bg-gray-500'}`} style={{ animationDelay: '0s' }}></div>
                      <div className={`w-2 h-2 rounded-full animate-bounce ${theme === 'dark' ? 'bg-gray-400' : 'bg-gray-500'}`} style={{ animationDelay: '0.2s' }}></div>
                      <div className={`w-2 h-2 rounded-full animate-bounce ${theme === 'dark' ? 'bg-gray-400' : 'bg-gray-500'}`} style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {quotaExceeded && (
              <div className="flex justify-center">
                <div className={`rounded-lg p-4 max-w-md ${
                  theme === 'dark' ? 'bg-amber-900 text-amber-100' : 'bg-amber-100 text-amber-800'
                }`}>
                  <p className="text-sm font-medium">
                    The AI service is currently unavailable due to high demand. Our quota has been exceeded. 
                    Please try again later or explore the lessons and quizzes in the meantime.
                  </p>
                </div>
              </div>
            )}
            
            {error && !quotaExceeded && (
              <div className="flex justify-center">
                <div className={`rounded-lg p-4 max-w-md ${
                  theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'
                }`}>
                  <p className="text-sm font-medium">
                    {error}
                  </p>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input area */}
        <div className={`p-4 md:p-6 border-t ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <textarea
                  value={inputValue}
                  onChange={handleInputChange}
                  onInput={(e) => adjustTextareaHeight(e.target as HTMLTextAreaElement)}
                  placeholder="Ask me anything about Georgian language..."
                  rows={1}
                  className={`w-full pl-4 pr-12 py-3 rounded-lg resize-none ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white border-gray-600 focus:border-indigo-500 placeholder-gray-400' 
                      : 'bg-gray-50 text-gray-900 border-gray-300 focus:border-indigo-500 placeholder-gray-500'
                  } border focus:ring-2 focus:ring-indigo-500`}
                  style={{ maxHeight: '200px' }}
                  disabled={quotaExceeded || isTyping}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping || quotaExceeded}
                  className={`absolute right-2 bottom-2 p-2 rounded-full transition-colors ${
                    inputValue.trim() && !isTyping && !quotaExceeded
                      ? (theme === 'dark' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-600 text-white hover:bg-indigo-700')
                      : (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
            <div className="mt-2 text-xs text-center">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                Ask about grammar, vocabulary, pronunciation, or cultural aspects of the Georgian language
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;