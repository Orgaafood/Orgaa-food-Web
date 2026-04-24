'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiShoppingCart, FiStar, FiCheck, FiClock, FiShield } from 'react-icons/fi';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProductById } from '@/lib/data/products';
import { useCart } from '@/lib/cart/CartContext';
import { useToast } from '@/components/ui/Toast';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="bg-[#F2F2F7] min-h-screen pb-20 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-6">😕</div>
          <h2 className="font-bangla font-black text-gray-500">পণ্য পাওয়া যায়নি</h2>
          <Link href="/products" className="text-primary font-bold mt-4 inline-block">সকল পণ্য দেখুন</Link>
        </div>
      </div>
    );
  }

  const discount = Math.round((1 - product.price / product.original_price) * 100);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    addToast({ type: 'success', message: 'কার্টে যোগ করা হয়েছে!', description: product.name_bn });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-[#F2F2F7] min-h-screen pb-20 pt-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-4 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/products" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-700">
            <FiArrowLeft />
          </Link>
          <h1 className="text-lg font-bangla font-black text-gray-900 tracking-tight">পণ্যের বিবরণ</h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Product Image */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-white/60 mb-6">
          <div className="relative aspect-[4/3] bg-gray-50 flex items-center justify-center">
            <div className="text-8xl drop-shadow-2xl">🌿</div>
            {product.in_stock && (
              <div className="absolute top-6 right-6 bg-primary/90 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full font-black uppercase tracking-widest">
                Stock Available
              </div>
            )}
            {discount > 0 && (
              <div className="absolute top-6 left-6 bg-red-500 text-white text-xs px-4 py-2 rounded-full font-black uppercase tracking-widest">
                -{discount}% OFF
              </div>
            )}
          </div>

          <div className="p-8">
            <h2 className="font-bangla font-black text-2xl md:text-3xl text-gray-900 mb-2 leading-tight">
              {product.name_bn}
            </h2>
            <p className="text-sm text-gray-500 mb-6 font-bold opacity-70">{product.tagline}</p>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FiStar className="w-5 h-5 fill-accent text-accent" />
                <span className="text-lg font-black text-gray-900">{product.rating}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.original_price && (
                  <span className="text-lg text-gray-400 line-through font-bold">৳{product.original_price}</span>
                )}
                <span className="text-3xl font-black text-primary">৳{product.price}</span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-5 rounded-2xl text-base font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 ${
                added
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-gray-900 text-white hover:bg-black active:scale-95 shadow-lg shadow-black/10'
              }`}
            >
              <FiShoppingCart className="w-6 h-6" />
              {added ? 'কার্টে যোগ হয়েছে' : 'কার্টে যোগ করুন'}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-white/60 mb-6">
          <h3 className="font-bangla font-black text-xl text-gray-900 mb-4">বর্ণনা</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Ingredients */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-white/60 mb-6">
          <h3 className="font-bangla font-black text-xl text-gray-900 mb-4">উপাদানসমূহ</h3>
          <div className="flex flex-wrap gap-3">
            {product.ingredients.map((ingredient, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full">
                <FiCheck className="text-primary" />
                <span className="text-sm font-bold text-gray-700">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-white/60 mb-6">
          <h3 className="font-bangla font-black text-xl text-gray-900 mb-4">ব্যবহার বিধি</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-2xl">
              <FiClock className="text-blue-500 mt-1" />
              <div>
                <div className="font-bold text-sm text-gray-900">সকাল</div>
                <div className="text-sm text-gray-600">{product.how_to_use.morning}</div>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-2xl">
              <FiClock className="text-purple-500 mt-1" />
              <div>
                <div className="font-bold text-sm text-gray-900">রাত</div>
                <div className="text-sm text-gray-600">{product.how_to_use.night}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-white/60 mb-6">
          <h3 className="font-bangla font-black text-xl text-gray-900 mb-4">ফলাফলের সময়সীমা</h3>
          <div className="space-y-4">
            {[
              { week: 'সপ্তাহ ১', result: product.timeline.week1, color: 'bg-emerald-500' },
              { week: 'সপ্তাহ ২', result: product.timeline.week2, color: 'bg-blue-500' },
              { week: 'সপ্তাহ ৩', result: product.timeline.week3, color: 'bg-orange-500' },
              { week: 'সপ্তাহ ৪', result: product.timeline.week4, color: 'bg-purple-500' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <div className="flex-1">
                  <div className="font-bold text-sm text-gray-900">{item.week}</div>
                  <div className="text-sm text-gray-600">{item.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-[2.5rem] p-8 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <FiShield className="text-4xl" />
            <div>
              <h3 className="font-black text-xl mb-1">{product.guarantee}</h3>
              <p className="text-sm text-emerald-100">আমরা আমাদের পণ্যের মান নিয়ে ১০০% আত্মবিশ্বাসী</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
