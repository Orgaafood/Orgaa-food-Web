'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiTag, FiClock, FiShoppingCart, FiPercent } from 'react-icons/fi';
import Link from 'next/link';
import { products } from '@/lib/data/products';
import { useCart } from '@/lib/cart/CartContext';
import { useToast } from '@/components/ui/Toast';

const OFFERS = [
  {
    id: 1,
    title: 'নতুন বছর সেল!',
    description: 'সকল পণ্যে ৩০% ছাড়',
    code: 'NEWYEAR30',
    discount: 30,
    validUntil: '2026-02-28',
    emoji: '🎉',
    gradient: 'from-red-500 to-pink-500'
  },
  {
    id: 2,
    title: 'ফ্রি শিপিং',
    description: '৫০০৳ এর উপরে অর্ডারে ফ্রি ডেলিভারি',
    code: 'FREESHIP',
    discount: 0,
    validUntil: '2026-03-31',
    emoji: '🚚',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    title: 'প্রথম অর্ডারে ২০% ছাড়',
    description: 'নতুন ইউজারদের জন্য বিশেষ অফার',
    code: 'WELCOME20',
    discount: 20,
    validUntil: '2026-12-31',
    emoji: '🎁',
    gradient: 'from-emerald-500 to-green-500'
  },
];

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addToast({ type: 'success', message: 'কুপন কপি হয়েছে!', description: code });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    addToast({ type: 'success', message: 'কার্টে যোগ করা হয়েছে!', description: product.name_bn });
  };

  return (
    <div className="bg-[#F2F2F7] min-h-screen pb-20 pt-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-4 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-700">
            <FiArrowLeft />
          </Link>
          <h1 className="text-lg font-bangla font-black text-gray-900 tracking-tight">অফারসমূহ</h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Active Offers */}
        <div className="space-y-4 mb-8">
          {OFFERS.map((offer) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gradient-to-br ${offer.gradient} rounded-[2rem] p-8 text-white shadow-lg relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <div className="relative z-10">
                <div className="text-5xl mb-4">{offer.emoji}</div>
                <h3 className="font-black text-2xl mb-2">{offer.title}</h3>
                <p className="text-sm text-white/80 mb-4">{offer.description}</p>
                
                {offer.code && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl">
                      <span className="font-black text-lg">{offer.code}</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(offer.code)}
                      className="bg-white text-gray-900 px-4 py-2 rounded-xl font-bold text-sm active:scale-95 transition-all"
                    >
                      {copiedCode === offer.code ? '✅ কপি হয়েছে' : '📋 কপি'}
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-white/70">
                  <FiClock />
                  <span>ভ্যালিড: {offer.validUntil}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Products with Discount */}
        <div className="mb-8">
          <h2 className="font-bangla font-black text-xl text-gray-900 mb-4 flex items-center gap-2">
            <FiPercent className="text-primary" /> ডিসকাউন্টেড পণ্য
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => {
              const discount = Math.round((1 - product.price / product.original_price) * 100);
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl">🌿</div>
                    <div className="flex-1">
                      <h3 className="font-bangla font-bold text-base text-gray-900 mb-1">{product.name_bn}</h3>
                      {discount > 0 && (
                        <div className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full font-black">
                          -{discount}%
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {product.original_price && (
                      <span className="text-sm text-gray-400 line-through">৳{product.original_price}</span>
                    )}
                    <span className="text-xl font-black text-primary">৳{product.price}</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <FiShoppingCart /> কার্টে যোগ করুন
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-[2rem] p-8 text-white text-center shadow-lg">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="font-black text-2xl mb-2">আরও অফার পেতে</h3>
          <p className="text-sm text-white/80 mb-6">আমাদের নিউজলেটারে সাবস্ক্রাইব করুন</p>
          <Link
            href="/products"
            className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest inline-block active:scale-95 transition-all"
          >
            শপিং শুরু করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
