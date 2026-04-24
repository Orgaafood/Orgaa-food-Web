export const products = [
  {
    id: 'gastric-1',
    name_bn: 'গ্যাস্ট্রিক সলিউশন প্যাকেজ',
    tagline: 'স্থায়ীভাবে হজম সমস্যা সমাধান',
    price: 1250,
    original_price: 1500,
    rating: 4.9,
    in_stock: true,
    description: 'প্রাকৃতিক উপাদানে তৈরি এই প্যাকেজটি আপনার হজম শক্তি বাড়াতে এবং এসিডিটি কমাতে সাহায্য করবে।',
    ingredients: ['আদা', 'পুদিনা', 'মৌরি', 'জোয়ান', 'ত্রিফলা'],
    how_to_use: { morning: 'খালি পেটে ১ চামচ', night: 'খাবার পর ১ চামচ' },
    timeline: { week1: 'হজম শক্তি বৃদ্ধি', week2: 'এসিডিটি হ্রাস', week3: 'পেট ফাঁপা বন্ধ', week4: 'স্থায়ী প্রশান্তি' },
    guarantee: '100% Money Back'
  },
  {
    id: 'weight-1',
    name_bn: 'ওজন নিয়ন্ত্রণ ডায়েট চার্ট',
    tagline: 'বিজ্ঞানের আলোকে প্রাকৃতিক ওজন কমানো',
    price: 850,
    original_price: 1200,
    rating: 4.8,
    in_stock: true,
    description: 'কোনো পার্শ্বপ্রতিক্রিয়া ছাড়াই ওজন কমানোর জন্য এই গাইডলাইনটি সেরা।',
    ingredients: ['গ্রিন টি', 'দারুচিনি', 'লেবু', 'মধু'],
    how_to_use: { morning: 'ব্যায়ামের আগে', night: 'ঘুমানোর আগে' },
    timeline: { week1: 'মেটাবলিজম বৃদ্ধি', week2: 'ফ্যাট বার্নিং শুরু', week3: 'শরীরে হালকা বোধ', week4: 'কাঙ্ক্ষিত ওজন' },
    guarantee: 'Expert Guided'
  },
  {
    id: 'skin-1',
    name_bn: 'প্রাকৃতিক রূপচর্চা কিট',
    tagline: 'ত্বকের জেল্লা ফেরান প্রাকৃতিকভাবে',
    price: 1850,
    original_price: 2200,
    rating: 4.9,
    in_stock: true,
    description: 'রাসায়নিক মুক্ত ত্বকের যত্নের জন্য এই কিটটি অতুলনীয়।',
    ingredients: ['নিম', 'হলুদ', 'চন্দন', 'অ্যালোভেরা'],
    how_to_use: { morning: 'ফেসওয়াশ হিসেবে', night: 'নাইট ক্রিম হিসেবে' },
    timeline: { week1: 'ত্বক পরিষ্কার', week2: 'ব্রণ কমানো', week3: 'উজ্জ্বলতা বৃদ্ধি', week4: 'সিল্কি ও গ্লোয়িং স্কিন' },
    guarantee: 'Chemical Free'
  }
];

export const getProductById = (id: string) => products.find(p => p.id === id);
