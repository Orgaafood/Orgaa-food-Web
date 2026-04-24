'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiMinus, FiPlus, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart/CartContext';
import { useToast } from '@/components/ui/Toast';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { addToast } = useToast();

  const handleCheckout = () => {
    addToast({ type: 'info', message: 'চেকআউট শীঘ্রই আসছে!', description: 'এই ফিচারটি ডেভেলপমেন্টে আছে' });
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#F2F2F7] min-h-screen pb-20 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="font-bangla font-black text-xl text-gray-500 mb-4">আপনার কার্ট খালি</h2>
          <Link
            href="/products"
            className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest inline-block active:scale-95 transition-all"
          >
            শপিং শুরু করুন
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F2F2F7] min-h-screen pb-20 pt-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-4 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-700">
            <FiArrowLeft />
          </Link>
          <h1 className="text-lg font-bangla font-black text-gray-900 tracking-tight">শপিং কার্ট ({cart.length})</h1>
          <button
            onClick={() => {
              clearCart();
              addToast({ type: 'success', message: 'কার্ট খালি করা হয়েছে' });
            }}
            className="text-sm font-bold text-red-500 hover:text-red-600"
          >
            সব মুছুন
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-4xl">🌿</div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bangla font-bold text-base text-gray-900 mb-1">{item.name_bn}</h3>
                    <p className="text-xs text-gray-500 mb-3">{item.tagline}</p>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-black text-primary">৳{item.price * item.quantity}</div>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
                        >
                          <FiMinus className="text-sm" />
                        </button>
                        <span className="text-sm font-black text-gray-900 w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
                        >
                          <FiPlus className="text-sm" />
                        </button>
                        <button
                          onClick={() => {
                            removeFromCart(item.id);
                            addToast({ type: 'success', message: 'কার্ট থেকে মুছে ফেলা হয়েছে' });
                          }}
                          className="ml-2 text-red-500 hover:text-red-600"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Cart Summary */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
          <h3 className="font-black text-lg text-gray-900 mb-4">সারসংক্ষেপ</h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">সাবটোটাল</span>
              <span className="font-bold text-gray-900">৳{getCartTotal()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">ডেলিভারি চার্জ</span>
              <span className="font-bold text-green-500">ফ্রি</span>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-gray-900">মোট</span>
                <span className="text-2xl font-black text-primary">৳{getCartTotal()}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            <FiShoppingCart /> চেকআউট করুন
          </button>
        </div>

        {/* Continue Shopping */}
        <div className="text-center">
          <Link
            href="/products"
            className="text-sm font-bold text-gray-500 hover:text-primary transition-colors"
          >
            ← শপিং চালিয়ে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
