'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiShoppingCart, FiUser, FiSearch, FiGrid, FiActivity, FiPackage } from 'react-icons/fi';
import { useCart } from '@/lib/cart/CartContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'হোম', path: '/', icon: <FiGrid /> },
    { label: 'রুটিন', path: '/checkup', icon: <FiActivity /> },
    { label: 'প্রোডাক্ট', path: '/products', icon: <FiPackage /> },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 pt-4`}>
      <div className={`max-w-4xl mx-auto px-5 py-2.5 rounded-[2rem] border transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-2xl border-white shadow-[0_15px_40px_rgba(0,0,0,0.08)] scale-[0.98]' 
          : 'bg-white border-white shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl border border-gray-50">🌿</div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-gray-900 leading-none">Orgaa <span className="text-emerald-500 font-bold">food</span></span>
              <span className="text-[9px] text-gray-400 font-black uppercase tracking-[0.3em] mt-1.5">Premium</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    isActive 
                      ? 'bg-white text-primary shadow-md' 
                      : 'text-gray-400 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative w-9 h-9 bg-gray-50 rounded-2xl flex items-center justify-center hover:bg-gray-100 transition-all border border-gray-100 group">
              <FiShoppingCart className="w-4 h-4 text-gray-700 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-primary text-white text-[8px] rounded-full flex items-center justify-center font-black shadow-lg border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/dashboard" className="w-9 h-9 bg-gray-50 rounded-2xl flex items-center justify-center hover:bg-gray-100 transition-all border border-gray-100 group">
              <FiUser className="w-4 h-4 text-gray-700 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
