'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSend, FiMessageCircle } from 'react-icons/fi';
import Link from 'next/link';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const BOT_RESPONSES: { [key: string]: string } = {
  'ওজন কমাতে চাই': 'ওজন কমাতে প্রতিদিন ৩০ মিনিট হাঁটুন, প্রচুর পানি পান করুন, এবং প্রক্রিয়াজাত খাবার এড়িয়ে চলুন। আমাদের ওজন কমানোর প্যাকেজ দেখতে পারেন।',
  'ডায়েট প্ল্যান': 'সকালে: ওটমিল + ফল, দুপুরে: ভাত + সবজি + মাছ, রাতে: হালকা খাবার + সালাদ। বিস্তারিত ডায়েট প্ল্যানের জন্য আমাদের চেকআপ করুন।',
  'গ্যাস্ট্রিক': 'গ্যাস্ট্রিকের জন্য: নিয়মিত খান, ঝাল ও ভাজাপোড়া এড়িয়ে চলুন, পর্যাপ্ত পানি পান করুন। আমাদের গ্যাস্ট্রিক সলিউশন প্যাকেজ দেখুন।',
  'ত্বক ভালো করতে চাই': 'ত্বক ভালো রাখতে: দিনে ২বার মুখ ধুয়ে ফেলুন, সানস্ক্রিন ব্যবহার করুন, প্রচুর পানি পান করুন, এবং ঘুম ঠিক রাখুন।',
  'চুল পড়া বন্ধ করতে': 'চুল পড়া বন্ধ করতে: নারকেল তেল ব্যবহার করুন, পর্যাপ্ত প্রোটিন খান, স্ট্রেস কমান, এবং হালকা শ্যাম্পু ব্যবহার করুন।',
};

export default function BotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'হ্যালো! আমি আপনার ডায়েট এবং স্বাস্থ্য সহকারী। আপনাকে কীভাবে সাহায্য করতে পারি?', sender: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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
    setIsTyping(true);

    setTimeout(() => {
      let responseText = 'দুঃখিত, আমি এই বিষয়ে বিস্তারিত জানি না। তবে আমাদের বিশেষজ্ঞদের সাথে কথা বলতে পারেন।';
      
      for (const [key, value] of Object.entries(BOT_RESPONSES)) {
        if (input.toLowerCase().includes(key.toLowerCase())) {
          responseText = value;
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const quickQuestions = ['ওজন কমাতে চাই', 'ডায়েট প্ল্যান', 'গ্যাস্ট্রিক', 'ত্বক ভালো করতে চাই', 'চুল পড়া বন্ধ করতে'];

  return (
    <div className="bg-[#F2F2F7] min-h-screen pb-20 pt-20 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-700">
            <FiArrowLeft />
          </Link>
          <div className="flex items-center gap-2">
            <FiMessageCircle className="text-primary text-xl" />
            <h1 className="text-lg font-bangla font-black text-gray-900 tracking-tight">ডায়েট বট</h1>
          </div>
          <div className="w-10 h-10" />
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

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-gray-100">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="px-4 py-2 bg-white border-t border-gray-100">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => {
                setInput(q);
              }}
              className="whitespace-nowrap px-4 py-2 bg-gray-50 rounded-full text-xs font-bold text-gray-700 hover:bg-primary/10 hover:text-primary transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 py-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="আপনার প্রশ্ন লিখুন..."
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
