'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSend, FiPhone, FiMessageCircle } from 'react-icons/fi';
import Link from 'next/link';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'হ্যালো! আমাদের সাপোর্ট টিমে স্বাগতম। কীভাবে সাহায্য করতে পারি?', sender: 'agent', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'ধন্যবাদ! আপনার বার্তা পেয়েছি। আমাদের এজেন্ট শীঘ্রই উত্তর দেবেন।',
        sender: 'agent',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1500);
  };

  return (
    <div className="bg-[#F2F2F7] min-h-screen pb-20 pt-20 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-700">
            <FiArrowLeft />
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <FiMessageCircle className="text-primary" />
              </div>
              {isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div>
              <h1 className="text-base font-black text-gray-900">লাইভ চ্যাট</h1>
              <p className="text-xs text-green-500 font-bold">
                {isOnline ? 'অনলাইন' : 'অফলাইন'}
              </p>
            </div>
          </div>
          <a href="tel:+880123456789" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <FiPhone />
          </a>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-white text-gray-900 rounded-bl-none border border-gray-100'
                }`}
              >
                <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                <p className={`text-xs mt-2 ${msg.sender === 'user' ? 'text-primary-100' : 'text-gray-400'}`}>
                  {msg.timestamp.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="আপনার বার্তা লিখুন..."
            className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 ring-primary/10"
          />
          <button
            onClick={handleSend}
            className="bg-primary text-white p-3 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
