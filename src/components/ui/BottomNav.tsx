'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FiHome, FiShoppingBag, FiActivity, FiMenu, FiSettings, FiPlus, FiTrash2, 
  FiX, FiCheck, FiBell, FiMoon, FiSun, FiLayers, FiShield, FiHeart, FiSearch, 
  FiShoppingCart, FiUser, FiZap, FiBook, FiMessageSquare, FiTruck, FiStar, FiPieChart
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Customization State
  const [activeItems, setActiveItems] = useState([
    { id: 'shop', label: 'শপ', icon: <FiShoppingBag />, path: '/products' },
    { id: 'guide', label: 'গাইড', icon: <FiActivity />, path: '/checkup' },
    { id: 'home', label: 'হোম', icon: <FiHome />, path: '/', isCenter: true },
    { id: 'menu', label: 'মেনু', icon: <FiMenu />, path: '/dashboard' },
  ]);

  // Long Press Logic Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressActive = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // --- LONG PRESS HANDLERS ---
  const startPress = () => {
    isLongPressActive.current = false;
    timerRef.current = setTimeout(() => {
      isLongPressActive.current = true;
      triggerLongPress();
    }, 700);
  };

  const endPress = (path: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!isLongPressActive.current) {
      router.push(path);
    }
    setTimeout(() => { isLongPressActive.current = false; }, 100);
  };

  const triggerLongPress = () => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([50, 30, 50]);
    }
    setShowPanel(true);
  };

  const ALL_POSSIBLE_ICONS = [
    { label: 'হোম স্ক্রিন', icon: <FiHome />, desc: 'মূল পাতা', category: 'General' },
    { label: 'পণ্য শপ', icon: <FiShoppingBag />, desc: 'সব পণ্য', category: 'Shopping' },
    { label: 'স্বাস্থ্য গাইড', icon: <FiActivity />, desc: 'চেকআপ ও পরামর্শ', category: 'Health' },
    { label: 'সার্চ প্যানেল', icon: <FiSearch />, desc: 'দ্রুত পণ্য খুঁজুন', category: 'General' },
    { label: 'শপিং কার্ট', icon: <FiShoppingCart />, desc: 'কেনাকাটার ঝুলি', category: 'Shopping' },
    { label: 'আমার প্রোফাইল', icon: <FiUser />, desc: 'একাউন্ট সেটিংস', category: 'User' },
    { label: 'অফার জোন', icon: <FiZap />, desc: 'ডিসকাউন্ট ও ডিল', category: 'General' },
    { label: 'স্বাস্থ্য ব্লগ', icon: <FiBook />, desc: 'পরামর্শ ও নিবন্ধ', category: 'General' },
    { label: 'লাইভ চ্যাট', icon: <FiMessageSquare />, desc: 'বিশেষজ্ঞের সাথে কথা', category: 'Support' },
    { label: 'অর্ডার ট্র্যাকিং', icon: <FiTruck />, desc: 'পার্সেল কোথায় আছে', category: 'Shopping' },
    { label: 'সফলতার গল্প', icon: <FiStar />, desc: 'ইউজার রিভিউ', category: 'Health' },
    { label: 'BMI ক্যালকুলেটর', icon: <FiPieChart />, desc: 'স্বাস্থ্য টুলস', category: 'Health' },
    { label: 'নিরাপত্তা', icon: <FiShield />, desc: 'প্রাইভেসি ও পলিসি', category: 'User' },
    { label: 'পছন্দ তালিকা', icon: <FiHeart />, desc: 'উইশলিস্ট', category: 'User' },
  ];

  return (
    <>
      <div className="fixed bottom-6 left-0 right-0 z-[100] px-6 pointer-events-none">
        <nav className="max-w-md mx-auto h-[72px] bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/50 flex items-center justify-between px-4 pointer-events-auto relative">
          
          <div className="flex-1 flex justify-around items-center h-full">
            {activeItems.slice(0, 2).map((item, idx) => (
              <button key={idx} onClick={() => router.push(item.path)} className="flex flex-col items-center gap-1 outline-none">
                <div className={`text-2xl transition-all duration-300 ${pathname === item.path ? 'text-black scale-110' : 'text-gray-300 hover:text-gray-500'}`}>
                  {item.icon}
                </div>
              </button>
            ))}
          </div>

          <div className="relative w-20 flex justify-center">
            <motion.div
              onPointerDown={startPress}
              onPointerUp={() => endPress('/')}
              onPointerLeave={() => timerRef.current && clearTimeout(timerRef.current)}
              whileTap={{ scale: 0.85 }}
              className={`w-16 h-16 rounded-full bg-black flex items-center justify-center shadow-[0_15px_35px_rgba(0,0,0,0.3)] border-4 border-white -mt-10 transition-all cursor-pointer relative z-50 ${
                pathname === '/' ? 'scale-110' : 'scale-100'
              }`}
            >
              <FiHome className="text-2xl text-white" />
            </motion.div>
          </div>

          <div className="flex-1 flex justify-around items-center h-full">
            {activeItems.slice(3, 4).map((item, idx) => (
              <button key={idx} onClick={() => router.push(item.path)} className="flex flex-col items-center gap-1 outline-none">
                <div className={`text-2xl transition-all duration-300 ${pathname === item.path ? 'text-black scale-110' : 'text-gray-300 hover:text-gray-500'}`}>
                  {item.icon}
                </div>
              </button>
            ))}
            <div className="w-12 hidden md:block"></div>
          </div>

          <div className="absolute -left-3 bottom-0 w-8 h-8 bg-black rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-all">
            N
          </div>
        </nav>
      </div>

      {/* --- QUICK CUSTOMIZATION PANEL --- */}
      <AnimatePresence>
        {showPanel && (
          <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowPanel(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-white rounded-t-[3.5rem] md:rounded-[3.5rem] p-8 shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bangla font-black text-gray-900 leading-tight">কাস্টমাইজ প্যানেল</h2>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Advanced Nav Control</p>
                </div>
                <button onClick={() => setShowPanel(false)} className="p-3 bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-all">
                  <FiX />
                </button>
              </div>

              {/* LIVE SAMPLE PREVIEW WITH GLOW STROKE */}
              <div className="mb-8 relative p-1 rounded-[2.8rem] bg-gradient-to-r from-primary via-accent to-primary shadow-[0_0_30px_rgba(34,197,94,0.2)] animate-gradient-xy">
                <div className="bg-gray-50 rounded-[2.6rem] p-4 border border-white/50 backdrop-blur-sm relative">
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4 text-center opacity-50">Live Nav Preview</div>
                  <div className="flex items-center justify-between px-6 py-4 bg-white rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.02)] border border-white">
                    <FiShoppingBag className="text-primary text-xl" />
                    <FiActivity className="text-gray-300 text-xl" />
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center -mt-2 shadow-xl border-4 border-white">
                      <FiHome className="text-white text-base" />
                    </div>
                    <FiMenu className="text-gray-300 text-xl" />
                    <FiUser className="text-gray-300 text-xl" />
                  </div>
                </div>
                {/* Exterior Glow Overlay */}
                <div className="absolute inset-0 rounded-[2.8rem] shadow-[inset_0_0_20px_rgba(255,255,255,0.4)] pointer-events-none" />
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-8 pr-1">
                {/* Quick Settings */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-1 rounded-[2rem] bg-gradient-to-br from-gray-100 to-white">
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className={`w-full p-6 rounded-[1.8rem] flex items-center justify-center gap-3 transition-all ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 shadow-sm'}`}>
                      {isDarkMode ? <FiSun className="text-2xl" /> : <FiMoon className="text-2xl" />}
                      <span className="text-[10px] font-black uppercase tracking-widest">{isDarkMode ? 'Light' : 'Dark'}</span>
                    </button>
                  </div>
                  <div className="p-1 rounded-[2rem] bg-gradient-to-br from-gray-100 to-white">
                    <button className="w-full p-6 rounded-[1.8rem] bg-white text-gray-700 shadow-sm flex items-center justify-center gap-3">
                      <FiBell className="text-2xl" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Alerts</span>
                    </button>
                  </div>
                </div>

                {/* Maximum Icons List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">সবগুলো অপশন ({ALL_POSSIBLE_ICONS.length})</h4>
                    <span className="text-[8px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-black">PRO</span>
                  </div>
                  <div className="space-y-3">
                    {ALL_POSSIBLE_ICONS.map((item, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: i * 0.03 }}
                        key={i} 
                        className="flex items-center justify-between p-5 bg-white rounded-[2.2rem] border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500">
                            <span className="text-2xl">{item.icon}</span>
                          </div>
                          <div>
                            <div className="text-[13px] font-black text-gray-800">{item.label}</div>
                            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{item.desc}</div>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                          <button className="p-2.5 text-red-400 hover:bg-red-50 rounded-xl transition-all"><FiTrash2 size={18} /></button>
                          <button className="p-2.5 text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"><FiCheck size={18} /></button>
                        </div>
                      </motion.div>
                    ))}
                    
                    <button className="w-full py-6 flex items-center justify-center gap-3 text-primary font-black text-[11px] uppercase tracking-[0.2em] border-2 border-dashed border-primary/20 rounded-[2.5rem] hover:bg-primary/5 transition-all mt-6">
                      <FiPlus className="text-xl" /> কাস্টম শর্টকাট যোগ করুন
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-8 bg-white mt-auto">
                <button className="flex-1 bg-gray-900 text-white py-5 rounded-[1.8rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-black/20 active:scale-95 transition-all">সেভ সেটিংস</button>
                <button onClick={() => setShowPanel(false)} className="px-10 bg-gray-100 text-gray-500 py-5 rounded-[1.8rem] font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all">বাতিল</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
