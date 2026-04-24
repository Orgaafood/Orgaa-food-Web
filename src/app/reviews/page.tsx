'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiStar, FiCheckCircle, FiSearch, FiFilter, FiArrowLeft, FiMessageCircle } from 'react-icons/fi';
import Link from 'next/link';

const REVIEWS = [
  { id: 1, name: 'আব্দুর রহমান', role: 'ব্যবসায়ী', img: 'https://i.pravatar.cc/100?u=1', rating: 5, date: '২ দিন আগে', text: 'অসাধারণ সলিউশন! আমি অনেকদিন ধরে গ্যাস্ট্রিকের সমস্যায় ভুগছিলাম, অর্গা ফুডের এই গাইডলাইন মেনে মাত্র ১ সপ্তাহে আমি অনেক ভালো অনুভব করছি।', category: 'গ্যাস্ট্রিক', verified: true },
  { id: 2, name: 'ফাতেমা বেগম', role: 'গৃহিণী', img: 'https://i.pravatar.cc/100?u=2', rating: 5, date: '৫ দিন আগে', text: 'ওজন কমানোর জন্য আমি অনেক কিছু ট্রাই করেছি কিন্তু কাজ হয়নি। এদের ন্যাচারাল ডায়েট চার্ট আর পণ্যগুলো সত্যিই জাদুর মতো কাজ করেছে। ৩ কেজি ওজন কমেছে ১ মাসে।', category: 'ওজন', verified: true },
  { id: 3, name: 'তানভীর আহমেদ', role: 'ইঞ্জিনিয়ার', img: 'https://i.pravatar.cc/100?u=3', rating: 4, date: '১ সপ্তাহ আগে', text: 'মানসিক প্রশান্তি আর ঘুমের জন্য এদের টিপসগুলো খুব কাজের। আমি এখন অনেক রিল্যাক্সড থাকি। পণ্য ডেলিভারি আর একটু ফাস্ট হলে ভালো হতো।', category: 'মানসিক', verified: true },
  { id: 4, name: 'নুসরাত জাহান', role: 'শিক্ষার্থী', img: 'https://i.pravatar.cc/100?u=4', rating: 5, date: '২ সপ্তাহ আগে', text: 'ত্বকের উজ্জলতা বাড়ানোর জন্য আমি অর্গা ফুডের স্কিন কেয়ার প্যাকেজটা নিয়েছি। প্রাকৃতিক উপাদান হওয়ায় কোনো ভয় নেই। ফলাফল খুব সন্তোষজনক।', category: 'ত্বক', verified: true },
  { id: 5, name: 'আরিফ হোসেন', role: 'চাকরিজীবী', img: 'https://i.pravatar.cc/100?u=5', rating: 5, date: '৩ সপ্তাহ আগে', text: 'হজম শক্তি বাড়াতে দারুণ কাজ করে। সার্ভিস অনেক প্রফেশনাল। ধন্যবাদ অর্গা টিমকে!', category: 'গ্যাস্ট্রিক', verified: true },
  { id: 6, name: 'সাবিহা সুলতানা', role: 'শিক্ষিকা', img: 'https://i.pravatar.cc/100?u=6', rating: 5, date: '১ মাস আগে', text: 'চুলের যত্নে এদের হেয়ার অয়েলটা বেস্ট। চুল পড়া বন্ধ হয়েছে এবং নতুন চুল গজাচ্ছে।', category: 'ত্বক', verified: true },
];

const CATEGORIES = ['সব', 'গ্যাস্ট্রিক', 'ওজন', 'ত্বক', 'মানসিক'];

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState('সব');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReviews = REVIEWS.filter(review => {
    const matchesTab = activeTab === 'সব' || review.category === activeTab;
    const matchesSearch = review.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          review.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-[#F2F2F7] min-h-screen pb-20 pt-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-4 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-700">
            <FiArrowLeft />
          </Link>
          <h1 className="text-lg font-bangla font-black text-gray-900 tracking-tight">সফলতার গল্পসমূহ</h1>
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white p-4 rounded-2xl text-center shadow-sm border border-white/60">
            <div className="text-xl font-black text-primary leading-none mb-1">৫,০০০+</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-tighter opacity-50">সফল ইউজার</div>
          </div>
          <div className="bg-white p-4 rounded-2xl text-center shadow-sm border border-white/60">
            <div className="text-xl font-black text-primary leading-none mb-1">৪.৯/৫</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-tighter opacity-50">গড় রেটিং</div>
          </div>
          <div className="bg-white p-4 rounded-2xl text-center shadow-sm border border-white/60">
            <div className="text-xl font-black text-primary leading-none mb-1">১০০%</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-tighter opacity-50">সন্তুষ্টি</div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="রিভিউ খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-gray-900 outline-none focus:border-primary/40 transition-all shadow-sm placeholder-gray-400"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`whitespace-nowrap px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === cat 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white text-gray-500 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review, idx) => (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[2rem] p-6 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-primary/10 p-0.5">
                        <Image src={review.img} alt={review.name} width={64} height={64} className="w-full h-full rounded-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bangla font-black text-sm md:text-lg text-gray-900 tracking-tight">{review.name}</h3>
                          {review.verified && <FiCheckCircle className="text-blue-500 w-3 h-3" />}
                        </div>
                        <p className="text-xs md:text-sm text-gray-500 font-bold opacity-60 uppercase tracking-tighter">{review.role} • {review.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-0.5 text-accent mb-1.5">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-border'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400 font-black tracking-widest uppercase opacity-40">{review.date}</span>
                    </div>
                  </div>
                  <p className="font-bangla text-xs md:text-base text-gray-600 leading-relaxed mb-6 italic opacity-80">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-[9px] font-black text-primary bg-primary/5 px-4 py-2 rounded-xl hover:bg-primary/10 transition-all uppercase tracking-widest">
                      <FiMessageCircle /> রিপ্লাই দেখুন
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20">
                <div className="text-5xl mb-6">🔍</div>
                <h3 className="font-bangla font-black text-gray-500 opacity-50 uppercase tracking-widest">কোনো রিভিউ পাওয়া যায়নি</h3>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Load More Mock */}
        <div className="mt-12 text-center">
          <button className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:opacity-90 active:scale-95 transition-all">
            রিভিউ লোড করুন
          </button>
        </div>
      </div>
    </div>
  );
}
