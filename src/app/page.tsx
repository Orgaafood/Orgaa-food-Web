'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowRight, FiShield, FiCheck, FiStar, FiSearch,
  FiActivity, FiArrowUpRight, FiPhone, FiInfo,
  FiZap, FiMap, FiPackage, FiHeart, FiPlus, FiSmile, FiSun, FiShoppingCart, FiBook,
  FiCheckCircle, FiChevronRight, FiChevronLeft, FiLayers, FiDroplet, FiSend,
  FiClock, FiAward, FiMessageSquare, FiSmartphone, FiHelpCircle, FiCalendar, FiBox, FiUser, FiZap as FiOffer,
  FiClipboard, FiPieChart, FiShoppingBag, FiTruck, FiUsers, FiPercent, FiSettings, FiFileText
} from 'react-icons/fi';
import { products } from '@/lib/data/products';
import { useCart } from '@/lib/cart/CartContext';
import { useToast } from '@/components/ui/Toast';
import { 
  Scales, Drop, BowlFood, Heart, PersonSimpleCircle, Brain,
  Bone, DropHalf, ClipboardText, ShoppingCart, BowlSteam,
  UserCircleGear, Star, ChatCircle, Flame, BookOpen,
  Lightbulb, Package, User, Gear
} from '@phosphor-icons/react';

// --- STYLES ---
const iosGradient = "bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]";

// --- QUICK ACCESS DATA (EMOJI STYLE LIKE CATEGORIES) ---
const QUICK_FEATURES = [
  // === MOST IMPORTANT - Health Issues (First Priority) ===
  { label: 'ওজন কমানোর সমস্যা', emoji: '⚖️', path: '/products?category=weight', gradient: 'from-emerald-50 to-white', color: 'text-emerald-600' },
  { label: 'ডায়াবেটিস সমস্যা', emoji: '💧', path: '/products?category=diabetes', gradient: 'from-blue-50 to-white', color: 'text-blue-600' },
  { label: 'গ্যাস্ট্রিক সমস্যা', emoji: '🥣', path: '/products?category=digestion', gradient: 'from-orange-50 to-white', color: 'text-orange-600' },
  { label: 'হার্টের সমস্যা', emoji: '❤️', path: '/products?category=heart', gradient: 'from-rose-50 to-white', color: 'text-rose-600' },
  { label: 'ত্বক/চুলের সমস্যা', emoji: '✨', path: '/products?category=skin-hair', gradient: 'from-purple-50 to-white', color: 'text-purple-600' },
  { label: 'মানসিক সমস্যা', emoji: '🧠', path: '/products?category=mental-health', gradient: 'from-indigo-50 to-white', color: 'text-indigo-600' },
  { label: 'জয়েন্টের সমস্যা', emoji: '🦴', path: '/products?category=bone-joint', gradient: 'from-teal-50 to-white', color: 'text-teal-600' },
  { label: 'লিভারের সমস্যা', emoji: '🫘', path: '/products?category=liver-kidney', gradient: 'from-amber-50 to-white', color: 'text-amber-600' },
  
  // === SITE FEATURES (Second Priority) ===
  { label: 'ফ্রি চেকআপ', emoji: '📋', path: '/checkup', gradient: 'from-green-50 to-white', color: 'text-green-600' },
  { label: 'সকল পণ্য', emoji: '🛍️', path: '/products', gradient: 'from-cyan-50 to-white', color: 'text-cyan-600' },
  { label: 'ডায়েট প্ল্যান', emoji: '🥗', path: '/bot', gradient: 'from-lime-50 to-white', color: 'text-lime-600' },
  { label: 'বিশেষজ্ঞ পরামর্শ', emoji: '👨‍⚕️', path: '/consultation', gradient: 'from-sky-50 to-white', color: 'text-sky-600' },
  { label: 'সফলতার গল্প', emoji: '⭐', path: '/reviews', gradient: 'from-yellow-50 to-white', color: 'text-yellow-600' },
  { label: 'লাইভ চ্যাট', emoji: '💬', path: '/chat', gradient: 'from-pink-50 to-white', color: 'text-pink-600' },
  { label: 'অফারসমূহ', emoji: '🔥', path: '/offers', gradient: 'from-red-50 to-white', color: 'text-red-600' },
  { label: 'হেলথ ব্লগ', emoji: '📖', path: '/blog', gradient: 'from-violet-50 to-white', color: 'text-violet-600' },
  { label: 'ডেইলি টিপস', emoji: '💡', path: '/tips', gradient: 'from-amber-50 to-white', color: 'text-amber-600' },
  { label: 'অর্ডার ট্র্যাকিং', emoji: '📦', path: '/orders', gradient: 'from-fuchsia-50 to-white', color: 'text-fuchsia-600' },
  { label: 'আমার প্রোফাইল', emoji: '👤', path: '/dashboard', gradient: 'from-gray-50 to-white', color: 'text-gray-600' },
];

// --- COMPONENTS ---

function QuickAccessBoard() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const features = [...QUICK_FEATURES, ...QUICK_FEATURES, ...QUICK_FEATURES];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    const speed = 1.2;

    const scroll = () => {
      if (!isInteracting) {
        scrollContainer.scrollLeft += speed;
      }
      
      const oneSetWidth = scrollContainer.scrollWidth / 3;
      if (scrollContainer.scrollLeft >= oneSetWidth * 2) {
        scrollContainer.scrollLeft -= oneSetWidth;
      }

      const currentScroll = scrollContainer.scrollLeft % oneSetWidth;
      setScrollProgress((currentScroll / oneSetWidth) * 100);
      
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInteracting]);

  return (
    <div className="py-8 md:py-16 overflow-hidden relative w-full bg-transparent">
      {/* Dynamic Background Effects */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10" />
      
      <div 
        ref={scrollRef}
        className="flex gap-3 md:gap-8 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing px-4 pb-8"
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        onTouchStart={() => setIsInteracting(true)}
        onTouchEnd={() => setIsInteracting(false)}
      >
        {features.map((feature, idx) => (
          <Link key={idx} href={feature.path} className="flex-shrink-0">
            <motion.div 
              whileHover={{ y: -10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center text-center rounded-[2.5rem] bg-gradient-to-b ${feature.gradient} backdrop-blur-2xl border border-white/80 shadow-[0_15px_35px_rgba(0,0,0,0.05)] w-[140px] h-[140px] md:w-[180px] md:h-[180px] transition-all duration-300 group relative overflow-hidden`}
            >
              {/* Internal Glass Highlight */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />

              <div className="text-4xl md:text-5xl mb-3 md:mb-4 relative z-10 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
                {feature.emoji}
              </div>
              
              <div className="relative z-10 px-3">
                <h3 className={`font-bangla font-black text-[11px] md:text-[13px] ${feature.color} leading-tight tracking-tight group-hover:text-gray-900 transition-colors duration-300`}>
                  {feature.label}
                </h3>
              </div>

              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 rounded-[2.5rem] transition-all duration-300" />
            </motion.div>
          </Link>
        ))}
      </div>

      {/* --- NANO THREAD SCROLLBAR (SUPER SLIM) --- */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-[300px] h-[0.5px] bg-gray-900/5 relative rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 h-full w-[35%] bg-gradient-to-r from-transparent via-primary to-transparent"
            animate={{ left: `${scrollProgress}%` }}
            style={{ x: "-50%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.1 }}
          />
        </div>
      </div>
    </div>
  );
}

function FeaturedProductCard({ product, index }: { product: any; index: number }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    addToast({ type: 'success', message: 'কার্টে যোগ করা হয়েছে!', description: product.name_bn });
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = Math.round((1 - product.price / product.original_price) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`${iosGradient} rounded-[2.5rem] overflow-hidden group hover:shadow-2xl transition-all duration-700`}
    >
      <div className="relative aspect-[4/3] bg-[#F5F5F7] flex items-center justify-center overflow-hidden">
        <motion.div whileHover={{ scale: 1.1 }} className="text-6xl drop-shadow-2xl">🌿</motion.div>
        {product.in_stock && (
          <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md text-white text-[8px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest">
            Stock
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-[8px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest">
            -{discount}%
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-bangla font-black text-base text-gray-900 mb-1 leading-tight group-hover:text-primary transition-colors">
          {product.name_bn}
        </h3>
        <p className="text-[10px] text-gray-500 mb-4 font-bold opacity-70 tracking-tight">{product.tagline}</p>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1">
            <FiStar className="w-3 h-3 fill-accent text-accent" />
            <span className="text-[11px] font-black text-gray-900">{product.rating}</span>
          </div>
          <div className="flex items-center gap-2">
            {product.original_price && (
              <span className="text-[10px] text-gray-400 line-through font-bold">৳{product.original_price}</span>
            )}
            <span className="text-base font-black text-primary">৳{product.price}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 py-3 rounded-2xl border border-gray-100 text-[9px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all text-center"
          >
            Info
          </Link>
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all duration-300 ${
              added ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-900 text-white hover:bg-black active:scale-95 shadow-lg shadow-black/10'
            }`}
          >
            <FiShoppingCart className="w-3.5 h-3.5" />
            {added ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function HealthGoalsTracker() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('health_goals');
    const savedStreak = localStorage.getItem('health_streak');
    if (saved) setSelectedGoals(JSON.parse(saved));
    if (savedStreak) setStreak(parseInt(savedStreak));
  }, []);

  const goals = [
    { id: 'water', label: 'পানি', icon: '💧' },
    { id: 'exercise', label: 'ব্যায়াম', icon: '🏃' },
    { id: 'sleep', label: 'ঘুম', icon: '😴' },
    { id: 'meditation', label: 'ধ্যান', icon: '🧘' },
    { id: 'veggies', label: 'সবজি', icon: '🥗' },
    { id: 'no_junk', label: 'নো জাঙ্ক', icon: '🚫' },
  ];

  const toggleGoal = (goalId: string) => {
    const newGoals = selectedGoals.includes(goalId)
      ? selectedGoals.filter((id) => id !== goalId)
      : [...selectedGoals, goalId];
    
    setSelectedGoals(newGoals);
    localStorage.setItem('health_goals', JSON.stringify(newGoals));
    
    if (newGoals.length === goals.length) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('health_streak', newStreak.toString());
    }
  };

  const progress = Math.round((selectedGoals.length / goals.length) * 100);

  return (
    <div className={`${iosGradient} rounded-[2.5rem] p-6 shadow-xl shadow-black/5`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest opacity-40">আজকের প্রগ্রেস</h4>
          {streak > 0 && <p className="text-[9px] font-black text-accent uppercase mt-1">🔥 {streak} দিন একটানা!</p>}
        </div>
        <div className="text-xl font-black text-primary">{progress}%</div>
      </div>

      <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-primary"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {goals.map((goal) => {
          const isCompleted = selectedGoals.includes(goal.id);
          return (
            <motion.button
              key={goal.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleGoal(goal.id)}
              className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-1 ${
                isCompleted ? 'border-primary/40 bg-primary/5' : 'border-gray-50 bg-white'
              }`}
            >
              <span className="text-xl">{goal.icon}</span>
              <span className="font-bangla font-bold text-[9px] text-gray-700">{goal.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function HealthTools() {
  const [activeTab, setActiveTab] = useState<'bmi' | 'calorie'>('bmi');

  return (
    <div className={`${iosGradient} rounded-[2.5rem] overflow-hidden shadow-xl shadow-black/5`}>
      <div className="flex p-1.5 bg-gray-50 m-5 rounded-2xl">
        <button
          onClick={() => setActiveTab('bmi')}
          className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
            activeTab === 'bmi' ? 'bg-white text-primary shadow-lg shadow-black/5' : 'text-gray-400'
          }`}
        >
          BMI
        </button>
        <button
          onClick={() => setActiveTab('calorie')}
          className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
            activeTab === 'calorie' ? 'bg-white text-primary shadow-lg shadow-black/5' : 'text-gray-400'
          }`}
        >
          Calorie
        </button>
      </div>

      <div className="px-6 pb-6" id="tools">
        {activeTab === 'bmi' ? <BMICalculatorContent /> : <CalorieCalculatorContent />}
      </div>
    </div>
  );
}

function BMICalculatorContent() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    if (height && weight) {
      const h = parseFloat(height) / 100;
      const val = parseFloat(weight) / (h * h);
      setBmi(parseFloat(val.toFixed(1)));
      if (val < 18.5) setCategory('Underweight');
      else if (val < 25) setCategory('Normal');
      else if (val < 30) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height (cm)" className="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl text-[11px] font-bold outline-none focus:ring-2 ring-primary/10 transition-all text-gray-900" />
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight (kg)" className="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl text-[11px] font-bold outline-none focus:ring-2 ring-primary/10 transition-all text-gray-900" />
      </div>
      <button onClick={calculateBMI} className="w-full bg-gray-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-black/10">Calculate BMI</button>
      {bmi && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-2xl bg-primary/5 text-center border border-primary/10">
          <div className="text-2xl font-black text-primary">{bmi}</div>
          <div className="text-[10px] font-black uppercase tracking-widest text-primary/70 mt-1">{category}</div>
        </motion.div>
      )}
    </div>
  );
}

function CalorieCalculatorContent() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [calories, setCalories] = useState<number | null>(null);

  const calculate = () => {
    if (age && weight && height) {
      let bmr = gender === 'male' 
        ? 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseInt(age) + 5
        : 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseInt(age) - 161;
      setCalories(Math.round(bmr * 1.2));
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className="px-4 py-4 bg-gray-50 border-none rounded-2xl text-[11px] font-bold text-gray-900" />
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="px-4 py-4 bg-gray-50 border-none rounded-2xl text-[11px] font-bold outline-none text-gray-900">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight" className="px-4 py-4 bg-gray-50 border-none rounded-2xl text-[11px] font-bold text-gray-900" />
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height" className="px-4 py-4 bg-gray-50 border-none rounded-2xl text-[11px] font-bold text-gray-900" />
      </div>
      <button onClick={calculate} className="w-full bg-gray-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-black/10">Calculate Calories</button>
      {calories && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-2xl bg-accent/5 text-center border border-accent/10">
          <div className="text-2xl font-black text-accent">{calories} kcal</div>
          <div className="text-[10px] font-black uppercase tracking-widest text-accent/70 mt-1">Daily Requirement</div>
        </motion.div>
      )}
    </div>
  );
}

function SuccessStoriesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const reviews = [
    { 
      id: 1,
      name: 'আব্দুর রহমান', 
      role: 'ব্যবসায়ী', 
      img: 'https://i.pravatar.cc/150?u=1',
      rating: 5,
      text: 'অসাধারণ সলিউশন! আমি অনেকদিন ধরে গ্যাস্ট্রিকের সমস্যায় ভুগছিলাম, অর্গা ফুডের এই গাইডলাইন মেনে মাত্র ১ সপ্তাহে আমি অনেক ভালো অনুভব করছি।',
      category: 'গ্যাস্ট্রিক'
    },
    { 
      id: 2,
      name: 'ফাতেমা বেগম', 
      role: 'গৃহিণী', 
      img: 'https://i.pravatar.cc/150?u=2',
      rating: 5,
      text: 'ওজন কমানোর জন্য আমি অনেক কিছু ট্রাই করেছি কিন্তু কাজ হয়নি। এদের ন্যাচারাল ডায়েট চার্ট আর পণ্যগুলো সত্যিই জাদুর মতো কাজ করেছে। ৩ কেজি ওজন কমেছে ১ মাসে।',
      category: 'ওজন'
    },
    { 
      id: 3,
      name: 'তানভীর আহমেদ', 
      role: 'ইঞ্জিনিয়ার', 
      img: 'https://i.pravatar.cc/150?u=3',
      rating: 4,
      text: 'মানসিক প্রশান্তি আর ঘুমের জন্য এদের টিপসগুলো খুব কাজের। আমি এখন অনেক রিল্যাক্সড থাকি।',
      category: 'মানসিক'
    },
    { 
      id: 4,
      name: 'নুসরাত জাহান', 
      role: 'শিক্ষার্থী', 
      img: 'https://i.pravatar.cc/150?u=4',
      rating: 5,
      text: 'ত্বকের উজ্জলতা বাড়ানোর জন্য আমি অর্গা ফুডের স্কিন কেয়ার প্যাকেজটা নিয়েছি। প্রাকৃতিক উপাদান হওয়ায় কোনো ভয় নেই। ফলাফল খুব সন্তোষজনক।',
      category: 'ত্বক'
    },
    { 
      id: 5,
      name: 'আরিফ হোসেন', 
      role: 'চাকরিজীবী', 
      img: 'https://i.pravatar.cc/150?u=5',
      rating: 5,
      text: 'হজম শক্তি বাড়াতে দারুণ কাজ করে। সার্ভিস অনেক প্রফেশনাল। ধন্যবাদ অর্গা টিমকে!',
      category: 'গ্যাস্ট্রিক'
    },
    { 
      id: 6,
      name: 'সাবিহা সুলতানা', 
      role: 'শিক্ষিকা', 
      img: 'https://i.pravatar.cc/150?u=6',
      rating: 5,
      text: 'চুলের যত্নে এদের হেয়ার অয়েলটা বেস্ট। চুল পড়া বন্ধ হয়েছে এবং নতুন চুল গজাচ্ছে।',
      category: 'ত্বক'
    },
  ];

  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    const speed = 0.8;

    const scroll = () => {
      if (!isInteracting) {
        scrollContainer.scrollLeft += speed;
      }
      
      const oneSetWidth = scrollContainer.scrollWidth / 3;
      if (scrollContainer.scrollLeft >= oneSetWidth * 2) {
        scrollContainer.scrollLeft -= oneSetWidth;
      }
      
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInteracting]);

  return (
    <div className="py-8 md:py-16 overflow-hidden relative w-full bg-transparent">
      <div 
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing px-4 pb-8"
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        onTouchStart={() => setIsInteracting(true)}
        onTouchEnd={() => setIsInteracting(false)}
      >
        {duplicatedReviews.map((review, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex-shrink-0 w-[300px] md:w-[400px]"
          >
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-gray-100 shadow-xl shadow-black/5 hover:shadow-2xl transition-all duration-300 h-full">
              {/* Profile */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-primary/10 flex-shrink-0">
                  <Image src={review.img} alt={review.name} width={80} height={80} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bangla font-black text-base md:text-lg text-gray-900 mb-1 leading-tight">{review.name}</h4>
                  <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-tighter opacity-60 mb-2">{review.role}</p>
                  <div className="inline-block bg-primary/5 px-3 py-1 rounded-full">
                    <span className="text-[9px] md:text-[10px] font-black text-primary uppercase tracking-widest">{review.category}</span>
                  </div>
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-accent text-accent' : 'text-gray-200'}`} />
                ))}
              </div>
              
              {/* Review Text */}
              <p className="font-bangla text-xs md:text-sm text-gray-600 leading-relaxed italic opacity-80">
                "{review.text}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-[300px] h-[0.5px] bg-gray-900/5 relative rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 h-full w-[20%] bg-gradient-to-r from-transparent via-primary to-transparent"
            animate={{ left: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}

// --- CONFIG ---
const CATEGORIES = [
  { id: 'gastric', label: 'হজম শক্তি', icon: '🧪', gradient: "from-emerald-50 to-white", color: "text-emerald-600" },
  { id: 'weight', label: 'শারীরিক গঠন', icon: '⚖️', gradient: "from-blue-50 to-white", color: "text-blue-600" },
  { id: 'skin', label: 'প্রাকৃতিক রূপ', icon: '✨', gradient: "from-orange-50 to-white", color: "text-orange-600" },
  { id: 'sexual', label: 'উজ্জীবনী শক্তি', icon: '❤️', gradient: "from-rose-50 to-white", color: "text-rose-600" },
  { id: 'mental', label: 'মানসিক প্রশান্তি', icon: '🧠', gradient: "from-purple-50 to-white", color: "text-purple-600" },
  { id: 'more', label: 'আরও সমাধান', icon: '➕', gradient: "from-gray-50 to-white", color: "text-gray-600" }
];

const HERO_SLIDES = [
  { image: '/images/hero/slide_a.png', link: '/checkup' },
  { image: '/images/hero/slide_b.png', link: '/bot' },
  { image: '/images/hero/slide_c.png', link: '/products?category=weight' },
  { image: '/images/hero/slide_d.png', link: '/chat' },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      addToast({ type: 'success', message: 'সাবস্ক্রিপশন সফল!', description: 'আপনি সাপ্তাহিক টিপস পাবেন' });
      setEmail('');
    }
  };

  return (
    <div className="bg-[#F2F2F7] min-h-screen text-gray-900 antialiased selection:bg-primary/10 pb-32">
      {/* --- HERO SLIDER --- */}
      <section className="relative pt-20 pb-4 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto relative h-[380px] md:h-[520px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/40 group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Link href={HERO_SLIDES[currentSlide].link} className="relative block w-full h-full">
                <Image src={HERO_SLIDES[currentSlide].image} alt="Orgaa" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </Link>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-white/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1 rounded-full transition-all duration-700 ${currentSlide === i ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* --- QUICK ACCESS BOARD --- */}
      <QuickAccessBoard />

      {/* --- SYMPTOM CATEGORIES --- */}
      <section className="py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {CATEGORIES.map((cat, idx) => (
              <Link key={idx} href={`/products?category=${cat.id}`}>
                <motion.div 
                  whileTap={{ scale: 0.96 }}
                  className={`p-5 md:p-10 flex flex-col items-center text-center rounded-[2.5rem] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] bg-white hover:shadow-xl transition-all duration-500 group`}
                >
                  <div className="text-3xl md:text-5xl mb-2 md:mb-5 drop-shadow-xl transform group-hover:scale-110 transition-transform">{cat.icon}</div>
                  <h3 className="font-bangla font-black text-[10px] md:text-sm text-gray-900 leading-tight tracking-tight">{cat.label}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- STEPS TO SUCCESS --- */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xl md:text-3xl font-bangla font-black text-gray-900 tracking-tight">কিভাবে শুরু করবেন?</h2>
            <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.3em] mt-1 opacity-50">3 Easy Steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { step: '০১', title: 'চেকআপ করুন', desc: 'আপনার সমস্যা অনুযায়ী সঠিক গাইডলাইন পান।', icon: <FiActivity className="text-emerald-500" /> },
              { step: '০২', title: 'রুটিন মেনে চলুন', desc: 'প্রতিদিনের ডায়েট ও লাইফস্টাইল পরিবর্তন করুন।', icon: <FiClock className="text-blue-500" /> },
              { step: '০৩', title: 'সুস্থ থাকুন', desc: 'প্রাকৃতিক উপায়ে দীর্ঘস্থায়ী সমাধান উপভোগ করুন।', icon: <FiAward className="text-orange-500" /> }
            ].map((item, idx) => (
              <div key={idx} className={`${iosGradient} rounded-[2.5rem] p-8 relative overflow-hidden group hover:bg-gray-50 transition-all`}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="absolute top-6 right-6 text-2xl font-black text-gray-100 group-hover:text-primary/10 transition-colors">{item.step}</div>
                <h4 className="font-bangla font-black text-lg text-gray-900 mb-2">{item.title}</h4>
                <p className="text-[11px] text-gray-500 font-bold leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRUST STATS --- */}
      <section className="py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center bg-white/80 backdrop-blur-xl p-2 md:p-4 rounded-[2.2rem] border border-white shadow-xl shadow-black/5 overflow-x-auto no-scrollbar gap-2">
            {[
              { icon: '👥', val: '5k+', label: 'ইউজার' },
              { icon: '🌿', val: '১০০%', label: 'প্রাকৃতিক' },
              { icon: '👨‍⚕️', val: 'বেস্ট', label: 'গাইড' },
              { icon: '🔒', val: 'সেফ', label: 'পেমেন্ট' }
            ].map((stat, idx) => (
              <div key={idx} className="flex-1 min-w-[80px] flex flex-col items-center justify-center py-3 px-2 rounded-2xl bg-white border border-gray-50 shadow-sm transition-all hover:bg-gray-50">
                <span className="text-xl md:text-3xl mb-1.5">{stat.icon}</span>
                <div className="text-center">
                  <div className="text-[10px] md:text-sm font-black text-gray-900 leading-none">{stat.val}</div>
                  <div className="text-[7px] md:text-[9px] font-bold text-gray-500 uppercase tracking-tight mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPERT GUIDANCE --- */}
      <section className="py-12 px-4" id="expert">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 md:flex items-center gap-10">
              <div className="md:flex-1">
                <h2 className="text-2xl md:text-5xl font-bangla font-black mb-4 leading-tight tracking-tight">বিশেষজ্ঞ পরামর্শ নিন</h2>
                <p className="text-[11px] md:text-lg font-bold text-emerald-100/70 mb-8 leading-relaxed">আমাদের সার্টিফাইড পুষ্টিবিদ ও স্বাস্থ্য বিশেষজ্ঞরা আছেন আপনার অপেক্ষায়। যেকোনো জটিলতায় সরাসরি কথা বলুন।</p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-emerald-700 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                    <FiMessageSquare /> কনসালটেশন নিন
                  </button>
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-emerald-200">
                    <FiCheckCircle /> ২৪/৭ সাপোর্ট
                  </div>
                </div>
              </div>
              <div className="hidden md:block w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl absolute -right-20 -top-20" />
            </div>
          </div>
        </div>
      </section>

      {/* --- DAILY TIPS --- */}
      <section className="py-8 px-4" id="tips">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-5 px-2">
            <h2 className="text-lg md:text-2xl font-bangla font-black text-gray-900 tracking-tight">আজকের টিপস</h2>
            <span className="text-[8px] md:text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] opacity-60">Health Insights</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: '💧', title: 'পানি', gradient: 'from-blue-50 to-white' },
              { icon: '🧘', title: 'ধ্যান', gradient: 'from-purple-50 to-white' },
              { icon: '🥗', title: 'শাকসবজি', gradient: 'from-green-50 to-white' }
            ].map((tip, idx) => (
              <motion.div key={idx} whileTap={{ scale: 0.98 }} className={`p-4 md:p-10 text-center rounded-[2.2rem] border border-white shadow-xl shadow-black/5 bg-white`}>
                <div className="text-2xl md:text-5xl mb-2 md:mb-5">{tip.icon}</div>
                <h4 className="font-bangla font-black text-[9px] md:text-sm text-gray-800 uppercase tracking-tight">{tip.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BESTSELLING --- */}
      <section className="py-12 px-4 bg-white/50 border-y border-white shadow-inner">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bangla font-black text-gray-900 tracking-tight">সেরা পণ্যসমূহ</h2>
            <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.5em] mt-2 opacity-50">Premium Selection</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product, idx) => (
              <FeaturedProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* --- QUICK ASSESSMENT --- */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`bg-white rounded-[3.5rem] p-8 md:p-20 text-center overflow-hidden relative shadow-2xl shadow-black/5 border border-white`}>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-5xl font-bangla font-black text-gray-900 mb-2 tracking-tight">কেমন আছেন আপনি?</h2>
              <p className="text-[10px] md:text-lg font-bold text-gray-500 mb-10 opacity-70">আপনার সমস্যাগুলোর সঠিক সমাধান খুঁজে পেতে আমাদের সাথে যোগ দিন।</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                {[
                  { label: 'হজম শক্তি', icon: '🧪', gradient: 'from-emerald-50 to-white' },
                  { label: 'ওজন সমস্যা', icon: '⚖️', gradient: 'from-blue-50 to-white' },
                  { label: 'ত্বক ও চুল', icon: '✨', gradient: 'from-orange-50 to-white' },
                  { label: 'মানসিক প্রশান্তি', icon: '😴', gradient: 'from-purple-50 to-white' }
                ].map((item, idx) => (
                  <Link key={idx} href="/checkup" className={`p-6 md:p-12 rounded-[2.5rem] border border-gray-50 shadow-sm bg-gray-50 hover:bg-white hover:scale-105 hover:shadow-xl active:scale-95 transition-all`}>
                    <div className="text-3xl md:text-6xl mb-3 drop-shadow-lg">{item.icon}</div>
                    <h4 className="font-bangla font-black text-[9px] md:text-xs text-gray-900 uppercase tracking-tight opacity-70">{item.label}</h4>
                  </Link>
                ))}
              </div>
              <Link href="/checkup" className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-black active:scale-95 transition-all inline-flex items-center gap-3">
                <FiActivity className="text-primary text-xl" /> ফ্রি চেকআপ শুরু করো
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROGRESS & TOOLS --- */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <HealthGoalsTracker />
            <HealthTools />
          </div>
        </div>
      </section>

      {/* --- HEALTH ENCYCLOPEDIA --- */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-xl md:text-3xl font-bangla font-black text-gray-900 tracking-tight">স্বাস্থ্য তথ্যকোষ</h2>
            <Link href="/blog" className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1">সব দেখুন <FiChevronRight /></Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'গ্যাস্ট্রিক থেকে মুক্তির ৫টি উপায়', time: '৫ মিনিট রিড', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000' },
              { title: 'প্রাকৃতিক উপায়ে উজ্জ্বল ত্বক', time: '৩ মিনিট রিড', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000' }
            ].map((blog, idx) => (
              <div key={idx} className={`${iosGradient} rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-xl shadow-black/5`}>
                <div className="relative h-48">
                  <Image src={blog.img} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-primary">{blog.time}</div>
                </div>
                <div className="p-6">
                  <h4 className="font-bangla font-black text-lg text-gray-900 mb-2 group-hover:text-primary transition-colors">{blog.title}</h4>
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                    <FiBook className="text-primary" /> স্বাস্থ্য টিপস
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SUCCESS STORIES --- */}
      <section className="py-16 px-4 bg-white/40 border-y border-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bangla font-black mb-2 tracking-tight text-gray-900">সফলতার গল্প</h2>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em] mb-12 opacity-50">Transformation Stories</p>
          <SuccessStoriesCarousel />
          <Link href="/reviews" className="bg-white text-gray-900 px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest border border-gray-100 shadow-xl hover:bg-gray-50 transition-all inline-block active:scale-95 mt-8">সব রিভিউ দেখুন</Link>
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`bg-white rounded-[3rem] p-8 md:p-16 text-center shadow-2xl shadow-black/5 border border-white`}>
            <div className="text-4xl mb-6">📩</div>
            <h2 className="text-2xl md:text-4xl font-bangla font-black mb-2 text-gray-900 tracking-tight">সাপ্তাহিক স্বাস্থ্য টিপস পান</h2>
            <p className="text-[10px] md:text-lg font-bold text-gray-500 mb-10 opacity-70">আমাদের নিউজলেটারে সাবস্ক্রাইব করুন একদম ফ্রি।</p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-3">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ইমেইল অ্যাড্রেস..." className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-[12px] font-bold outline-none focus:ring-2 ring-primary/10 text-gray-900" required />
              <button type="submit" className="bg-gray-900 text-white p-4 rounded-2xl hover:bg-black active:scale-95 transition-all shadow-lg"><FiSend className="w-5 h-5" /></button>
            </form>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-20 px-4 bg-gray-900 text-white rounded-t-[4rem] shadow-2xl">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="text-3xl md:text-6xl font-bangla font-black mb-3 leading-tight tracking-tight">সুস্থ জীবনের শুরু হোক আজই</h2>
          <p className="text-[10px] md:text-sm font-bold text-white/30 mb-12 uppercase tracking-[0.5em]">Your health, our priority</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/checkup" className="bg-primary text-white px-12 py-5 w-full sm:w-auto rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all">ফ্রি চেকআপ শুরু করো</Link>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
              <FiShield className="text-primary w-4 h-4" /> 100% Confidential
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
