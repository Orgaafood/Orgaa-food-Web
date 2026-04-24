'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiPackage, FiTruck, FiCheckCircle, FiClock } from 'react-icons/fi';
import Link from 'next/link';

const MOCK_ORDERS = [
  {
    id: 'ORD-001',
    date: '2026-01-20',
    status: 'delivered',
    items: ['গ্যাস্ট্রিক সলিউশন প্যাকেজ'],
    total: 1250,
    tracking: [
      { status: 'অর্ডার কনফার্ম হয়েছে', date: '20 Jan', completed: true },
      { status: 'প্রস্তুত হচ্ছে', date: '21 Jan', completed: true },
      { status: 'শিপমেন্ট হয়েছে', date: '22 Jan', completed: true },
      { status: 'ডেলিভারি হয়েছে', date: '23 Jan', completed: true },
    ]
  },
  {
    id: 'ORD-002',
    date: '2026-01-22',
    status: 'shipping',
    items: ['প্রাকৃতিক রূপচর্চা কিট'],
    total: 1850,
    tracking: [
      { status: 'অর্ডার কনফার্ম হয়েছে', date: '22 Jan', completed: true },
      { status: 'প্রস্তুত হচ্ছে', date: '23 Jan', completed: true },
      { status: 'শিপমেন্ট হয়েছে', date: '24 Jan', completed: true },
      { status: 'ডেলিভারি হচ্ছে', date: 'Pending', completed: false },
    ]
  },
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'delivered': return <FiCheckCircle className="text-green-500" />;
      case 'shipping': return <FiTruck className="text-blue-500" />;
      case 'processing': return <FiClock className="text-orange-500" />;
      default: return <FiPackage className="text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'delivered': return 'ডেলিভারি হয়েছে';
      case 'shipping': return 'শিপমেন্ট হচ্ছে';
      case 'processing': return 'প্রস্তুত হচ্ছে';
      default: return 'পেন্ডিং';
    }
  };

  return (
    <div className="bg-[#F2F2F7] min-h-screen pb-20 pt-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-4 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-700">
            <FiArrowLeft />
          </Link>
          <h1 className="text-lg font-bangla font-black text-gray-900 tracking-tight">অর্ডার ট্র্যাকিং</h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {!selectedOrder ? (
          <div className="space-y-4">
            {MOCK_ORDERS.map((order) => (
              <motion.button
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedOrder(order.id)}
                className="w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <FiPackage className="text-2xl text-gray-400" />
                    <div>
                      <div className="font-black text-sm text-gray-900">{order.id}</div>
                      <div className="text-xs text-gray-400">{order.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="text-xs font-bold text-gray-700">{getStatusText(order.status)}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-500 mb-3">
                  {order.items.join(', ')}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-primary">৳{order.total}</span>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">বিস্তারিত দেখুন →</span>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {(() => {
              const order = MOCK_ORDERS.find(o => o.id === selectedOrder);
              if (!order) return null;

              return (
                <div className="space-y-6">
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-sm font-bold text-gray-500 hover:text-primary transition-colors"
                  >
                    ← সব অর্ডার দেখুন
                  </button>

                  {/* Order Details */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-black text-lg text-gray-900">{order.id}</h3>
                        <p className="text-sm text-gray-400">{order.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className="text-sm font-bold text-gray-700">{getStatusText(order.status)}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="font-bold text-sm text-gray-900 mb-2">পণ্যসমূহ:</h4>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-sm text-gray-600 mb-1">• {item}</div>
                      ))}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900">মোট:</span>
                          <span className="text-xl font-black text-primary">৳{order.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-black text-lg text-gray-900 mb-6">ট্র্যাকিং আপডেট</h3>
                    <div className="space-y-6">
                      {order.tracking.map((track, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              track.completed
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              {track.completed ? <FiCheckCircle /> : <FiClock />}
                            </div>
                            {idx < order.tracking.length - 1 && (
                              <div className={`w-0.5 h-12 ${
                                track.completed ? 'bg-primary' : 'bg-gray-100'
                              }`} />
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className={`font-bold text-sm mb-1 ${
                              track.completed ? 'text-gray-900' : 'text-gray-400'
                            }`}>
                              {track.status}
                            </div>
                            <div className="text-xs text-gray-400">{track.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </div>
    </div>
  );
}
