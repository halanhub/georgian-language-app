import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, ArrowUp, AtSign, Bot, ChevronRight, Copy, Send, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

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

const ChatPage: React.FC = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
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
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue.trim());
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const getAIResponse = (userQuery: string): Message => {
    // Simple response logic based on user query
    let responseText = '';
    
    const lowerQuery = userQuery.toLowerCase();
    
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
      responseText = 'გამარჯობა! (Gamarjoba) That means "hello" in Georgian! How can I help you learn Georgian today?';
    } else if (lowerQuery.includes('thank you') || lowerQuery.includes('thanks')) {
      responseText = 'გმადლობ (Gmadlob) is how you say "thank you" in Georgian! You\'re very welcome!';
    } else if (lowerQuery.includes('alphabet') || lowerQuery.includes('letters')) {
      responseText = 'The Georgian alphabet (ქართული ანბანი) has 33 unique letters. Each letter has a distinct pronunciation. Would you like to learn more about specific letters or the alphabet as a whole?';
    } else if (lowerQuery.includes('number')) {
      responseText = 'Here are the basic numbers in Georgian:\n1 - ერთი (erti)\n2 - ორი (ori)\n3 - სამი (sami)\n4 - ოთხი (otkhi)\n5 - ხუთი (khuti)\n6 - ექვსი (ekvsi)\n7 - შვიდი (shvidi)\n8 - რვა (rva)\n9 - ცხრა (tskhra)\n10 - ათი (ati)';
    } else if (lowerQuery.includes('color')) {
      responseText = 'Here are some common colors in Georgian:\nRed - წითელი (tsiteli)\nBlue - ლურჯი (lurji)\nGreen - მწვანე (mtsvane)\nYellow - ყვითელი (qviteli)\nBlack - შავი (shavi)\nWhite - თეთრი (tetri)';
    } else if (lowerQuery.includes('food') || lowerQuery.includes('eat')) {
      responseText = 'Georgian cuisine is famous for dishes like:\n• ხაჭაპური (khachapuri) - cheese-filled bread\n• ხინკალი (khinkali) - soup dumplings\n• საცივი (satsivi) - walnut sauce with chicken\n• ლობიანი (lobiani) - bean-filled bread\n\nSome simple food vocabulary:\nBread - პური (puri)\nCheese - ყველი (qveli)\nWater - წყალი (tsqali)\nWine - ღვინო (ghvino)';
    } else if (lowerQuery.includes('how are you')) {
      responseText = 'In Georgian, you can ask "How are you?" by saying "როგორ ხარ?" (Rogor khar?). To respond that you are good, you can say "კარგად" (Kargad).';
    } else if (lowerQuery.includes('georgian culture') || lowerQuery.includes('traditions')) {
      responseText = 'Georgian culture is rich with traditions dating back thousands of years. Georgia is known for its hospitality (სტუმართმოყვარეობა), polyphonic singing, wine-making tradition (8000+ years old!), and elaborate feasts called სუფრა (supra) led by a toastmaster (თამადა).';
    } else {
      responseText = 'That\'s an interesting question about Georgian! Could you provide more context or specify what aspect of the language you\'d like to learn about? I can help with vocabulary, grammar, pronunciation, or cultural aspects.';
    }
    
    return {
      id: Date.now().toString(),
      sender: 'ai',
      text: responseText,
      timestamp: new Date(),
    };
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
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`absolute right-2 bottom-2 p-2 rounded-full transition-colors ${
                    inputValue.trim()
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