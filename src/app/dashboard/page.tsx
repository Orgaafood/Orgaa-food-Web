'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiUser, FiPackage, FiHeart, FiSettings, FiLogOut } from 'react-icons/fi';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser({ name: 'অতিথি ব্যবহারকারী', email: '', phone: '' });
    }
  }, []);

  const menuItems = [
    { icon: <FiPackage />, label: 'আমার অর্ডার', path: '/orders', color: 'text-blue-500' },
    { icon: <FiHeart />, label: 'উইশলিস্ট', path: '/wishlist', color: 'text-red-500' },
    { icon: <FiSettings />, label: 'সেটিংস', path: '/settings', color: 'text-gray-500' },
  ];

  return (
    <div className="bg-[#F2F2F7] min-h-screen pb-20 pt-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-4 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-700">
            <FiArrowLeft />
          </Link>
          <h1 className="text-lg font-bangla font-black text-gray-900 tracking-tight">আমার প্রোফাইল</h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm mb-6 text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUser className="text-5xl text-primary" />
          </div>
          <h2 className="font-bangla font-black text-2xl text-gray-900 mb-2">{user?.name || 'অতিথি ব্যবহারকারী'}</h2>
          <p className="text-sm text-gray-500 mb-4">{user?.email || 'ইমেইল যোগ করুন'}</p>
          <p className="text-sm text-gray-500">{user?.phone || 'ফোন নম্বর যোগ করুন'}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="text-2xl font-black text-primary mb-1">০</div>
            <div className="text-xs font-bold text-gray-500 uppercase">অর্ডার</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="text-2xl font-black text-red-500 mb-1">০</div>
            <div className="text-xs font-bold text-gray-500 uppercase">উইশলিস্ট</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="text-2xl font-black text-green-500 mb-1">০</div>
            <div className="text-xs font-bold text-gray-500 uppercase">পয়েন্ট</div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-lg transition-all"
            >
              <div className={`p-3 rounded-xl bg-gray-50 ${item.color}`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bangla font-bold text-base text-gray-900">{item.label}</h3>
              </div>
              <div className="text-gray-400">→</div>
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <button className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all">
          <FiLogOut /> লগ আউট
        </button>
      </div>
    </div>
  );
}
