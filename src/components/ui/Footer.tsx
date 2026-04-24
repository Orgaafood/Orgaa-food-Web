'use client';

import Link from 'next/link';
import { FiFacebook, FiInstagram, FiYoutube, FiPhone, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 px-6 py-12 pb-36">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-xl border border-gray-100">🌿</div>
              <span className="text-sm font-black tracking-tight text-gray-900 uppercase tracking-[0.1em]">Orgaa<span className="text-primary">Food</span></span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed font-bold opacity-80">
              প্রাকৃতিক উপাদানে আধুনিক স্বাস্থ্য সমাধান। আপনার সুস্থতাই আমাদের মূল লক্ষ্য এবং প্রেরণা।
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-[10px] text-gray-500 hover:text-primary transition-all font-black uppercase tracking-widest">সকল পণ্য</Link></li>
              <li><Link href="/checkup" className="text-[10px] text-gray-500 hover:text-primary transition-all font-black uppercase tracking-widest">ফ্রি চেকআপ</Link></li>
              <li><Link href="/reviews" className="text-[10px] text-gray-500 hover:text-primary transition-all font-black uppercase tracking-widest">সফলতার গল্প</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 mb-6">Support</h4>
            <ul className="space-y-3">
              <li><Link href="/chat" className="text-[10px] text-gray-500 hover:text-primary transition-all font-black uppercase tracking-widest">লাইভ চ্যাট</Link></li>
              <li><Link href="/faq" className="text-[10px] text-gray-500 hover:text-primary transition-all font-black uppercase tracking-widest">সাধারণ জিজ্ঞাসা</Link></li>
              <li><Link href="/contact" className="text-[10px] text-gray-500 hover:text-primary transition-all font-black uppercase tracking-widest">যোগাযোগ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 mb-6">Connect</h4>
            <div className="flex gap-3">
              {[
                { icon: <FiFacebook />, link: '#' },
                { icon: <FiInstagram />, link: '#' },
                { icon: <FiYoutube />, link: '#' }
              ].map((social, i) => (
                <a key={i} href={social.link} className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 hover:border-primary/20 border border-gray-100 transition-all">
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <a href="tel:+880123456789" className="flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-primary transition-all">
                <FiPhone className="text-primary" /> +880 1XXX-XXXXXX
              </a>
              <a href="mailto:info@orgaafood.com" className="flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-primary transition-all">
                <FiMail className="text-primary" /> info@orgaafood.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center pt-10 border-t border-gray-50">
          <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.4em]">
            © 2026 Orgaa Food. Pure Nature, Proven Science.
          </p>
        </div>
      </div>
    </footer>
  );
}
