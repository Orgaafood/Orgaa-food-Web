'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiPhone, FiMail, FiMap, FiSend } from 'react-icons/fi';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';

export default function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({ type: 'success', message: 'বার্তা পাঠানো হয়েছে!', description: 'আমরা শীঘ্রই যোগাযোগ করব' });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="bg-[#F2F2F7] min-h-screen pb-20 pt-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-4 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-700">
            <FiArrowLeft />
          </Link>
          <h1 className="text-lg font-bangla font-black text-gray-900 tracking-tight">যোগাযোগ</h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.a
            href="tel:+880123456789"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-lg transition-all"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPhone className="text-2xl text-primary" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-2">ফোন</h3>
            <p className="text-xs text-gray-500">+880 1XXX-XXXXXX</p>
          </motion.a>

          <motion.a
            href="mailto:info@orgaafood.com"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-lg transition-all"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMail className="text-2xl text-primary" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-2">ইমেইল</h3>
            <p className="text-xs text-gray-500">info@orgaafood.com</p>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMap className="text-2xl text-primary" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-2">ঠিকানা</h3>
            <p className="text-xs text-gray-500">ঢাকা, বাংলাদেশ</p>
          </motion.div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h2 className="font-bangla font-black text-xl text-gray-900 mb-6 text-center">আমাদের মেসেজ পাঠান</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">নাম *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 ring-primary/10"
                placeholder="আপনার নাম"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">ইমেইল *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 ring-primary/10"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">ফোন নম্বর</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 ring-primary/10"
                placeholder="+880 1XXX-XXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">মেসেজ *</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 ring-primary/10 resize-none"
                placeholder="আপনার মেসেজ লিখুন..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              <FiSend /> মেসেজ পাঠান
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div className="mt-8 text-center">
          <h3 className="font-bold text-sm text-gray-500 mb-4">সোশ্যাল মিডিয়া</h3>
          <div className="flex justify-center gap-4">
            {['Facebook', 'Instagram', 'YouTube'].map((social, idx) => (
              <a
                key={idx}
                href="#"
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all text-gray-600 hover:text-primary"
              >
                {social[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
