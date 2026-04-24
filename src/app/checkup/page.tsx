'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const HEALTH_ISSUES = [
  { id: 'gastric', label: 'গ্যাস্ট্রিক/হজম সমস্যা', emoji: '🧪' },
  { id: 'weight', label: 'ওজন সমস্যা', emoji: '⚖️' },
  { id: 'skin', label: 'ত্বক ও চুলের সমস্যা', emoji: '✨' },
  { id: 'diabetes', label: 'ডায়াবেটিস', emoji: '💧' },
  { id: 'heart', label: 'হার্টের সমস্যা', emoji: '❤️' },
  { id: 'mental', label: 'মানসিক সমস্যা', emoji: '🧠' },
  { id: 'bone', label: 'জয়েন্ট/হাড়ের সমস্যা', emoji: '🦴' },
  { id: 'liver', label: 'লিভার/কিডনি সমস্যা', emoji: '🫘' },
];

const QUESTIONS = {
  gastric: [
    { key: 'frequency', label: 'কতদিন ধরে সমস্যা?', options: ['১ সপ্তাহ', '১ মাস', '৬ মাস', '১ বছর+'] },
    { key: 'severity', label: 'তীব্রতা কেমন?', options: ['হালকা', 'মাঝারি', 'তীব্র'] },
  ],
  weight: [
    { key: 'current', label: 'বর্তমান ওজন (কেজি)?', options: ['৫০-৬০', '৬০-৭০', '৭০-৮০', '৮০+'] },
    { key: 'goal', label: 'লক্ষ্য কী?', options: ['ওজন কমানো', 'ওজন বাড়ানো', 'ফিট থাকা'] },
  ],
  skin: [
    { key: 'issue', label: 'মূল সমস্যা?', options: ['ব্রণ', 'দাগ', 'রুক্ষতা', 'চুল পড়া'] },
    { key: 'duration', label: 'কতদিন ধরে?', options: ['১ মাস', '৩ মাস', '৬ মাস+', '১ বছর+'] },
  ],
};

export default function CheckupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState('');
  const [answers, setAnswers] = useState<any>({});

  const handleIssueSelect = (issueId: string) => {
    setSelectedIssue(issueId);
    setStep(2);
  };

  const handleAnswer = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
  };

  const handleSubmit = () => {
    router.push(`/products?category=${selectedIssue}`);
  };

  return (
    <div className="bg-[#F2F2F7] min-h-screen pb-20 pt-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-4 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-700">
            <FiArrowLeft />
          </Link>
          <h1 className="text-lg font-bangla font-black text-gray-900 tracking-tight">ফ্রি স্বাস্থ্য চেকআপ</h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Step {step} of 3</span>
            <span className="text-xs font-black text-primary">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(step / 3) * 100}%` }}
              className="h-full bg-primary"
            />
          </div>
        </div>

        {/* Step 1: Select Issue */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-bangla font-black text-2xl text-gray-900 mb-2">আপনার সমস্যা নির্বাচন করুন</h2>
              <p className="text-sm text-gray-500">আমরা আপনার জন্য সেরা সমাধান খুঁজে বের করব</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {HEALTH_ISSUES.map((issue) => (
                <motion.button
                  key={issue.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleIssueSelect(issue.id)}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all text-left"
                >
                  <div className="text-4xl mb-3">{issue.emoji}</div>
                  <div className="font-bangla font-bold text-sm text-gray-900">{issue.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Questions */}
        {step === 2 && selectedIssue && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-bangla font-black text-2xl text-gray-900 mb-2">কিছু প্রশ্নের উত্তর দিন</h2>
              <p className="text-sm text-gray-500">সঠিক সমাধানের জন্য এটি জরুরি</p>
            </div>

            {QUESTIONS[selectedIssue as keyof typeof QUESTIONS]?.map((q, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bangla font-bold text-base text-gray-900 mb-4">{q.label}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {q.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(q.key, option)}
                      className={`py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                        answers[q.key] === option
                          ? 'bg-primary text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={() => setStep(3)}
              className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              পরবর্তী <FiArrowRight />
            </button>
          </motion.div>
        )}

        {/* Step 3: Recommendation */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="text-6xl mb-6">✅</div>
              <h2 className="font-bangla font-black text-2xl text-gray-900 mb-2">আপনার চেকআপ সম্পন্ন!</h2>
              <p className="text-sm text-gray-500 mb-6">আমরা আপনার সমস্যার জন্য সেরা সমাধান খুঁজে বের করেছি</p>

              <div className="bg-primary/5 p-6 rounded-2xl mb-6">
                <div className="flex items-center gap-3 justify-center mb-2">
                  <FiCheck className="text-primary text-xl" />
                  <span className="font-bold text-sm text-gray-900">সমস্যা:</span>
                </div>
                <div className="font-bangla font-black text-lg text-primary">
                  {HEALTH_ISSUES.find(i => i.id === selectedIssue)?.label}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                সমাধান দেখুন <FiArrowRight />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
