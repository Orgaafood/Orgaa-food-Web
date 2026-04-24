'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiPhone, FiCalendar, FiCheck, FiClock } from 'react-icons/fi';
import Link from 'next/link';

const TIME_SLOTS = [
  'সকাল ১০:০০', 'সকাল ১১:০০', 'দুপুর ১২:০০', 
  'বিকাল ৩:০০', 'বিকাল ৪:০০', 'সন্ধ্যা ৬:০০', 'সন্ধ্যা ৭:০০'
];

const EXPERTS = [
  { id: 1, name: 'ডা. ফাতেমা আক্তার', specialty: 'পুষ্টিবিদ', experience: '১৫ বছর', image: '👩‍⚕️' },
  { id: 2, name: 'ডা. রাশেদ হাসান', specialty: 'স্বাস্থ্য বিশেষজ্ঞ', experience: '১২ বছর', image: '👨‍⚕️' },
  { id: 3, name: 'ডা. নাসরিন সুলতানা', specialty: 'চর্মরোগ বিশেষজ্ঞ', experience: '১০ বছর', image: '👩‍⚕️' },
];

export default function ConsultationPage() {
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState(1);

  const handleBook = () => {
    setStep(3);
  };

  return (
    <div className="bg-[#F2F2F7] min-h-screen pb-20 pt-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-4 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-700">
            <FiArrowLeft />
          </Link>
          <h1 className="text-lg font-bangla font-black text-gray-900 tracking-tight">বিশেষজ্ঞ পরামর্শ</h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        {/* Step 1: Select Expert */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-bangla font-black text-2xl text-gray-900 mb-2">আপনার বিশেষজ্ঞ নির্বাচন করুন</h2>
              <p className="text-sm text-gray-500">অভিজ্ঞ স্বাস্থ্য বিশেষজ্ঞদের সাথে কথা বলুন</p>
            </div>

            {EXPERTS.map((expert) => (
              <motion.button
                key={expert.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedExpert(expert.id);
                  setStep(2);
                }}
                className={`w-full bg-white p-6 rounded-2xl border-2 transition-all text-left flex items-center gap-4 ${
                  selectedExpert === expert.id
                    ? 'border-primary shadow-lg'
                    : 'border-gray-100 shadow-sm hover:border-primary/30'
                }`}
              >
                <div className="text-5xl">{expert.image}</div>
                <div className="flex-1">
                  <h3 className="font-bangla font-black text-lg text-gray-900 mb-1">{expert.name}</h3>
                  <p className="text-sm text-gray-500 font-bold mb-2">{expert.specialty}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FiClock />
                    <span>{expert.experience} অভিজ্ঞতা</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-bangla font-black text-2xl text-gray-900 mb-2">সময় নির্বাচন করুন</h2>
              <p className="text-sm text-gray-500">আপনার সুবিধামতো সময় বেছে নিন</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
                <FiCalendar className="text-primary" /> তারিখ নির্বাচন
              </h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-4 bg-gray-50 rounded-xl text-sm font-bold border border-gray-100 outline-none focus:ring-2 ring-primary/10"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
                <FiClock className="text-primary" /> সময় নির্বাচন
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                      selectedTime === time
                        ? 'bg-primary text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleBook}
              disabled={!selectedDate || !selectedTime}
              className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiPhone /> কনসালটেশন বুক করুন
            </button>
          </motion.div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="text-6xl mb-6">✅</div>
              <h2 className="font-bangla font-black text-2xl text-gray-900 mb-2">বুকিং সফল!</h2>
              <p className="text-sm text-gray-500 mb-6">আপনার কনসালটেশন সফলভাবে বুক করা হয়েছে</p>

              <div className="bg-primary/5 p-6 rounded-2xl mb-6 text-left space-y-3">
                <div className="flex items-start gap-3">
                  <FiCheck className="text-primary mt-1" />
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase">বিশেষজ্ঞ</div>
                    <div className="font-bangla font-black text-base text-gray-900">
                      {EXPERTS.find(e => e.id === selectedExpert)?.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiCalendar className="text-primary mt-1" />
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase">তারিখ</div>
                    <div className="font-bold text-base text-gray-900">{selectedDate}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiClock className="text-primary mt-1" />
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase">সময়</div>
                    <div className="font-bold text-base text-gray-900">{selectedTime}</div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-6">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব</p>

              <Link
                href="/"
                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest inline-block active:scale-95 transition-all"
              >
                হোমে ফিরে যান
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
