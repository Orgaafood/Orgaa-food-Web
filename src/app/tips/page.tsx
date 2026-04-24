'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiRefreshCw, FiCheck } from 'react-icons/fi';
import Link from 'next/link';

const TIPS = [
  {
    id: 1,
    title: 'প্রতিদিন ৮ গ্লাস পানি পান করুন',
    description: 'শরীরকে হাইড্রেটেড রাখতে পর্যাপ্ত পানি পান অত্যন্ত জরুরি। এতে ত্বক ভালো থাকে এবং হজম শক্তি বাড়ে।',
    icon: '💧',
    category: 'সাধারণ স্বাস্থ্য'
  },
  {
    id: 2,
    title: 'সকালের নাস্তা কখনও বাদ দেবেন না',
    description: 'সকালের নাস্তা মেটাবলিজম সক্রিয় রাখে এবং সারাদিন শক্তি যোগায়।',
    icon: '🌅',
    category: 'ডায়েট'
  },
  {
    id: 3,
    title: 'প্রতিদিন ৩০ মিনিট হাঁটুন',
    description: 'নিয়মিত হাঁটু হৃদরোগের ঝুঁকি কমায় এবং ওজন নিয়ন্ত্রণে সাহায্য করে।',
    icon: '🚶',
    category: 'ব্যায়াম'
  },
  {
    id: 4,
    title: 'রাতে ৭-৮ ঘণ্টা ঘুমান',
    description: 'পর্যাপ্ত ঘুম শরীর ও মন দুটোকেই রিচার্জ করে এবং রোগ প্রতিরোধ ক্ষমতা বাড়ায়।',
    icon: '😴',
    category: 'ঘুম'
  },
  {
    id: 5,
    title: 'শাকসবজি বেশি খান',
    description: 'শাকসবজিতে ভিটামিন, মিনারেল এবং ফাইবার সমৃদ্ধ যা স্বাস্থ্যের জন্য অত্যন্ত উপকারী।',
    icon: '🥗',
    category: 'ডায়েট'
  },
  {
    id: 6,
    title: 'মানসিক চাপ কমান',
    description: 'মেডিটেশন বা গভীর শ্বাসের ব্যায়াম করে মানসিক চাপ কমান এবং প্রশান্তি বজায় রাখুন।',
    icon: '🧘',
    category: 'মানসিক স্বাস্থ্য'
  },
];

const CATEGORIES = ['সব', 'সাধারণ স্বাস্থ্য', 'ডায়েট', 'ব্যায়াম', 'ঘুম', 'মানসিক স্বাস্থ্য'];

export default function TipsPage() {
  const [activeCategory, setActiveCategory] = useState('সব');
  const [completedTips, setCompletedTips] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('completed_tips');
    if (saved) setCompletedTips(JSON.parse(saved));
  }, []);

  const toggleTip = (tipId: string) => {
    const newCompleted = completedTips.includes(tipId)
      ? completedTips.filter(id => id !== tipId)
      : [...completedTips, tipId];
    
    setCompletedTips(newCompleted);
    localStorage.setItem('completed_tips', JSON.stringify(newCompleted));
  };

  const filteredTips = TIPS.filter(tip =>
    activeCategory === 'সব' || tip.category === activeCategory
  );

  return (
    <div className="bg-[#F2F2F7] min-h-screen pb-20 pt-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-4 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-700">
            <FiArrowLeft />
          </Link>
          <h1 className="text-lg font-bangla font-black text-gray-900 tracking-tight">ডেইলি হেলথ টিপস</h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Progress */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-gray-500">আজকের অগ্রগতি</span>
            <span className="text-sm font-black text-primary">{completedTips.length}/{TIPS.length}</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedTips.length / TIPS.length) * 100}%` }}
              className="h-full bg-primary"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white text-gray-500 border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tips List */}
        <div className="space-y-4">
          {filteredTips.map((tip, idx) => {
            const isCompleted = completedTips.includes(tip.id.toString());
            return (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`bg-white p-6 rounded-2xl border-2 transition-all ${
                  isCompleted
                    ? 'border-primary/30 bg-primary/5'
                    : 'border-gray-100 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{tip.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className={`font-bangla font-black text-base text-gray-900 ${isCompleted ? 'line-through opacity-60' : ''}`}>
                        {tip.title}
                      </h3>
                      <button
                        onClick={() => toggleTip(tip.id.toString())}
                        className={`p-2 rounded-full transition-all ${
                          isCompleted
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-400 hover:bg-primary/10 hover:text-primary'
                        }`}
                      >
                        <FiCheck />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-3 leading-relaxed">{tip.description}</p>
                    <span className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full">
                      {tip.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 mx-auto active:scale-95 transition-all">
            <FiRefreshCw /> নতুন টিপস লোড করুন
          </button>
        </div>
      </div>
    </div>
  );
}
