'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiSearch, FiFilter, FiShoppingCart, FiStar } from 'react-icons/fi';
import { products } from '@/lib/data/products';
import { useCart } from '@/lib/cart/CartContext';
import { useToast } from '@/components/ui/Toast';

const CATEGORIES = [
  { id: 'all', label: 'সব পণ্য', emoji: '🛍️' },
  { id: 'gastric', label: 'হজম শক্তি', emoji: '🧪' },
  { id: 'weight', label: 'ওজন নিয়ন্ত্রণ', emoji: '⚖️' },
  { id: 'skin', label: 'ত্বক ও চুল', emoji: '✨' },
  { id: 'sexual', label: 'উজ্জীবনী', emoji: '❤️' },
  { id: 'mental', label: 'মানসিক স্বাস্থ্য', emoji: '🧠' },
  { id: 'diabetes', label: 'ডায়াবেটিস', emoji: '💧' },
  { id: 'heart', label: 'হার্টের স্বাস্থ্য', emoji: '💚' },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) setActiveCategory(category);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.id.includes(activeCategory);
    const matchesSearch = product.name_bn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setAddedToCart(product.id);
    addToast({ type: 'success', message: 'কার্টে যোগ করা হয়েছে!', description: product.name_bn });
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <div className="bg-[#F2F2F7] min-h-screen pb-20 pt-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-4 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-700">
            <FiArrowLeft />
          </Link>
          <h1 className="text-lg font-bangla font-black text-gray-900 tracking-tight">সকল পণ্য</h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Search */}
        <div className="relative mb-6">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="পণ্য খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:ring-2 ring-primary/10 transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white text-gray-500 border border-gray-100'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => {
              const discount = Math.round((1 - product.price / product.original_price) * 100);
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-white/60 group hover:shadow-xl transition-all"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden">
                      <motion.div whileHover={{ scale: 1.1 }} className="text-6xl drop-shadow-2xl">🌿</motion.div>
                      {product.in_stock && (
                        <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-black uppercase tracking-widest">
                          Stock
                        </div>
                      )}
                      {discount > 0 && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-black uppercase tracking-widest">
                          -{discount}%
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-6">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-bangla font-black text-lg text-gray-900 mb-1 leading-tight group-hover:text-primary transition-colors">
                        {product.name_bn}
                      </h3>
                      <p className="text-xs text-gray-500 mb-4 font-bold opacity-70">{product.tagline}</p>
                    </Link>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <FiStar className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-sm font-black text-gray-900">{product.rating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {product.original_price && (
                          <span className="text-sm text-gray-400 line-through font-bold">৳{product.original_price}</span>
                        )}
                        <span className="text-xl font-black text-primary">৳{product.price}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
                        addedToCart === product.id
                          ? 'bg-primary text-white shadow-lg shadow-primary/20'
                          : 'bg-gray-900 text-white hover:bg-black active:scale-95 shadow-lg shadow-black/10'
                      }`}
                    >
                      <FiShoppingCart className="w-5 h-5" />
                      {addedToCart === product.id ? 'যোগ হয়েছে' : 'কার্টে যোগ করুন'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-6">🔍</div>
            <h3 className="font-bangla font-black text-gray-500 opacity-50 uppercase tracking-widest">কোনো পণ্য পাওয়া যায়নি</h3>
          </div>
        )}
      </div>
    </div>
  );
}
