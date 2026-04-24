'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiBook, FiShare2 } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

const BLOGS = [
  {
    id: 1,
    title: 'গ্যাস্ট্রিক থেকে মুক্তির ৫টি উপায়',
    excerpt: 'প্রাকৃতিক উপায়ে গ্যাস্ট্রিক সমস্যা সমাধানের কার্যকরী উপায় জানুন...',
    category: 'হজম শক্তি',
    readTime: '৫ মিনিট',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000',
    date: '২০ জানুয়ারি ২০২৬'
  },
  {
    id: 2,
    title: 'প্রাকৃতিক উপায়ে উজ্জ্বল ত্বক',
    excerpt: 'রাসায়নিক মুক্ত উপাদানে ত্বকের যত্ন নেওয়ার টিপস...',
    category: 'ত্বক যত্ন',
    readTime: '৩ মিনিট',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000',
    date: '১৮ জানুয়ারি ২০২৬'
  },
  {
    id: 3,
    title: 'ওজন কমানোর সঠিক নিয়ম',
    excerpt: 'বিজ্ঞানসম্মত উপায়ে ওজন কমানোর গোপন কৌশল...',
    category: 'ওজন নিয়ন্ত্রণ',
    readTime: '৭ মিনিট',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000',
    date: '১৫ জানুয়ারি ২০২৬'
  },
  {
    id: 4,
    title: 'মানসিক চাপ কমানোর উপায়',
    excerpt: 'দৈনন্দিন জীবনে মানসিক প্রশান্তি বজায় রাখার উপায়...',
    category: 'মানসিক স্বাস্থ্য',
    readTime: '৪ মিনিট',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe8c1f64?q=80&w=1000',
    date: '১২ জানুয়ারি ২০২৬'
  },
];

const CATEGORIES = ['সব', 'হজম শক্তি', 'ত্বক যত্ন', 'ওজন নিয়ন্ত্রণ', 'মানসিক স্বাস্থ্য'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('সব');

  const filteredBlogs = BLOGS.filter(blog => 
    activeCategory === 'সব' || blog.category === activeCategory
  );

  return (
    <div className="bg-[#F2F2F7] min-h-screen pb-20 pt-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-4 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-700">
            <FiArrowLeft />
          </Link>
          <h1 className="text-lg font-bangla font-black text-gray-900 tracking-tight">হেলথ ব্লগ</h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
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

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBlogs.map((blog, idx) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-white/60 group hover:shadow-xl transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1">
                  <FiClock /> {blog.readTime}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                  <span className="text-xs text-gray-400">{blog.date}</span>
                </div>

                <h3 className="font-bangla font-black text-lg text-gray-900 mb-2 group-hover:text-primary transition-colors leading-tight">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <button className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                    <FiBook /> পড়ুন
                  </button>
                  <button className="text-gray-400 hover:text-primary transition-colors">
                    <FiShare2 />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-6">📝</div>
            <h3 className="font-bangla font-black text-gray-500 opacity-50">এই ক্যাটাগরিতে কোনো ব্লগ নেই</h3>
          </div>
        )}
      </div>
    </div>
  );
}
