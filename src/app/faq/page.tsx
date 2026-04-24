'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Link from 'next/link';

const FAQS = [
  {
    question: 'অর্গা ফুড কী?',
    answer: 'অর্গা ফুড একটি প্রাকৃতিক স্বাস্থ্য সমাধান ব্র্যান্ড যা গ্যাস্ট্রিক, ওজন নিয়ন্ত্রণ, ত্বকের যত্ন সহ বিভিন্ন স্বাস্থ্য সমস্যার জন্য কার্যকরী পণ্য প্রদান করে।'
  },
  {
    question: 'পণ্য অর্ডার কীভাবে করব?',
    answer: 'আমাদের ওয়েবসাইটে ব্রাউজ করুন, পছন্দের পণ্য কার্টে যোগ করুন এবং চেকআউট প্রক্রিয়া সম্পন্ন করুন। আপনি ফোনেও অর্ডার করতে পারেন।'
  },
  {
    question: 'ডেলিভারি কতদিনে পাব?',
    answer: 'ঢাকায় ১-২ দিন এবং ঢাকার বাইরে ২-৩ দিনের মধ্যে ডেলিভারি পেয়ে যাবেন।'
  },
  {
    question: 'পণ্য রিটার্ন বা এক্সচেঞ্জ করা যাবে?',
    answer: 'হ্যাঁ, পণ্য পাওয়ার ৭ দিনের মধ্যে রিটার্ন বা এক্সচেঞ্জ করতে পারবেন। পণ্য অবশ্যই ব্যবহার না করা থাকতে হবে।'
  },
  {
    question: 'পেমেন্ট কীভাবে করব?',
    answer: 'ক্যাশ অন ডেলিভারি, বিকাশ, নগদ, রকেট এবং ব্যাংক ট্রান্সফারের মাধ্যমে পেমেন্ট করতে পারবেন।'
  },
  {
    question: 'পণ্য কি নিরাপদ?',
    answer: 'হ্যাঁ, আমাদের সকল পণ্য ১০০% প্রাকৃতিক উপাদানে তৈরি এবং কোনো পার্শ্বপ্রতিক্রিয়া নেই। এগুলো স্বাস্থ্য বিশেষজ্ঞদের দ্বারা অনুমোদিত।'
  },
  {
    question: 'কনসালটেশন কীভাবে নেব?',
    answer: 'আমাদের ওয়েবসাইটে কনসালটেশন পেজে গিয়ে একজন বিশেষজ্ঞ নির্বাচন করুন এবং আপনার সুবিধামতো সময় বুক করুন।'
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#F2F2F7] min-h-screen pb-20 pt-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-4 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-700">
            <FiArrowLeft />
          </Link>
          <h1 className="text-lg font-bangla font-black text-gray-900 tracking-tight">সাধারণ জিজ্ঞাসা</h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Search Box */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
          <h2 className="font-bangla font-black text-xl text-gray-900 mb-4 text-center">কীভাবে সাহায্য করতে পারি?</h2>
          <input
            type="text"
            placeholder="প্রশ্ন খুঁজুন..."
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 ring-primary/10"
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-all"
              >
                <h3 className="font-bangla font-bold text-base text-gray-900">{faq.question}</h3>
                {openIndex === idx ? (
                  <FiChevronUp className="text-primary flex-shrink-0" />
                ) : (
                  <FiChevronDown className="text-gray-400 flex-shrink-0" />
                )}
              </button>

              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6"
                >
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-8 bg-gradient-to-br from-primary to-emerald-600 rounded-2xl p-8 text-center text-white shadow-lg">
          <h3 className="font-black text-xl mb-2">আরও প্রশ্ন আছে?</h3>
          <p className="text-sm text-white/80 mb-6">আমাদের সাথে যোগাযোগ করুন</p>
          <Link
            href="/contact"
            className="bg-white text-primary px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest inline-block active:scale-95 transition-all"
          >
            যোগাযোগ করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
