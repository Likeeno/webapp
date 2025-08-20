"use client";

import React, { useState, useRef } from 'react';
import { FaInstagram, FaTiktok, FaYoutube, FaTwitter, FaChevronDown, FaCheck } from 'react-icons/fa';

const platforms = [
  { label: 'اینستاگرام', value: 'instagram', icon: <FaInstagram className="text-lg" /> },
  { label: 'تیک تاک', value: 'tiktok', icon: <FaTiktok className="text-lg" /> },
  { label: 'یوتوب', value: 'youtube', icon: <FaYoutube className="text-lg" /> },
  { label: 'تویتر', value: 'twitter', icon: <FaTwitter className="text-lg" /> },
];

type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter';

const services: Record<Platform, string[]> = {
  instagram: ['فالوور', 'لایک', 'بازدید', 'کامنت'],
  tiktok: ['فالوور', 'لایک', 'بازدید', 'کامنت'],
  youtube: ['سابسکرایبر', 'لایک', 'بازدید', 'کامنت'],
  twitter: ['فالوور', 'لایک', 'بازدید', 'ریتویت'],
};

// تابع جداکننده سه‌رقمی با ویرگول فارسی
function formatPrice(num: number | string) {
  const str = typeof num === 'number' ? num.toString() : num;
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, '،');
}

export default function OrderForm() {
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [service, setService] = useState('');
  const [amount, setAmount] = useState('');
  const [link, setLink] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // نمونه قیمت داینامیک
  const price = amount ? formatPrice(parseInt(amount) * 100) : '۰';

  // بستن منوی سفارشی با کلیک بیرون
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!service || !amount || !link) {
      setError('لطفاً همه فیلدها را کامل کنید.');
      return;
    }
    setSuccess(true);
  };

  return (
    <div className="bg-white/80 border border-blue-100 shadow-xl rounded-2xl p-4 lg:p-10 w-full max-w-2xl lg:max-w-3xl mx-auto lg:mt-0 relative overflow-hidden transition-all duration-500">
      {/* Modern Platform Selector */}
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <div className="grid grid-cols-4 gap-1 sm:gap-2">
          {platforms.map((item) => (
            <button
              key={item.value}
              className={`relative p-3 sm:p-4 rounded-2xl ${
                platform === item.value 
                  ? 'bg-gradient-to-br from-[#279EFD] via-[#1E88E5] to-[#1565C0] text-white shadow-xl shadow-[#279EFD]/40' 
                  : 'bg-gradient-to-br from-gray-50 to-white text-gray-700 hover:from-gray-100 hover:to-gray-50 hover:text-gray-900 border border-gray-200/60 hover:border-gray-300/80'
              }`}
              onClick={() => setPlatform(item.value as Platform)}
              type="button"
            >
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <span className="text-xl sm:text-2xl lg:text-3xl">
                  {item.icon}
                </span>
                <span className="text-xs sm:text-sm font-medium text-center leading-tight">
                  {item.label}
                </span>
              </div>

            </button>
          ))}
        </div>
      </div>
      {/* Form */}
      <form className="space-y-6 lg:space-y-8" onSubmit={handleSubmit} autoComplete="off">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {/* Custom Select */}
          <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
            <label className="text-xs lg:text-sm text-gray-500 mb-1">نوع سرویس</label>
            <div className="relative">
              <button
                type="button"
                className={`appearance-none w-full p-3 lg:p-4 pr-4 pl-4 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-highlight font-regular transition-all focus:shadow-lg bg-white text-primary-text placeholder-gray-400 text-base lg:text-lg flex items-center justify-between cursor-pointer ${openDropdown ? 'ring-2 ring-primary-highlight' : ''}`}
                onClick={() => setOpenDropdown((v) => !v)}
                tabIndex={0}
              >
                <span>{service || 'انتخاب سرویس'}</span>
                <FaChevronDown className={`transition-transform ${openDropdown ? 'rotate-180' : ''} text-gray-400`} />
              </button>
              {openDropdown && (
                <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg animate-fade-in overflow-hidden">
                  {services[platform].map((srv: string) => (
                    <div
                      key={srv}
                      className={`px-4 py-3 lg:py-4 cursor-pointer flex items-center gap-2 transition-all hover:bg-primary-highlight/10 text-base lg:text-lg ${service === srv ? 'bg-primary-highlight/20 text-primary-highlight font-bold' : 'text-gray-700'}`}
                      onClick={() => { setService(srv); setOpenDropdown(false); }}
                    >
                      {service === srv && <FaCheck className="text-primary-highlight" />}
                      {srv}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Custom Input */}
          <div className="flex flex-col gap-1 relative">
            <label className="text-xs lg:text-sm text-gray-500 mb-1">تعداد</label>
            <div className="relative">
              <input
                type="number"
                min="1"
                placeholder="مثلاً ۱۰۰۰"
                className="appearance-none w-full p-3 lg:p-4 pr-4 pl-4 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-highlight font-regular transition-all focus:shadow-lg bg-white text-primary-text placeholder-gray-400 text-base lg:text-lg"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Custom Input */}
        <div className="flex flex-col gap-1 relative">
          <label className="text-xs lg:text-sm text-gray-500 mb-1">لینک</label>
          <div className="relative">
            <input
              type="text"
              placeholder="مثلاً https://instagram.com/..."
              className="appearance-none w-full p-3 lg:p-4 pr-4 pl-4 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-highlight font-regular transition-all focus:shadow-lg bg-white text-primary-text placeholder-gray-400 text-base lg:text-lg text-right"
              value={link}
              onChange={e => setLink(e.target.value)}
              dir="ltr"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 bg-gray-50 rounded-2xl px-4 lg:px-6 py-3 lg:py-4 border border-gray-100 shadow-inner">
          <span className="text-gray-600 font-bold text-base lg:text-lg">قیمت نهایی خرید</span>
          <span className="font-bold text-lg lg:text-xl">{price} تومان</span>
        </div>
        {error && <div className="text-red-500 text-sm lg:text-base text-center mt-2 animate-pulse">{error}</div>}
        {success && <div className="text-green-600 text-sm lg:text-base text-center mt-2 animate-bounce">سفارش با موفقیت ثبت شد!</div>}
        <button
          type="submit"
                          className="w-full bg-gradient-to-r from-[#279EFD] to-[#1565C0] hover:from-[#1E88E5] hover:to-[#0D47A1] text-white py-3 lg:py-4 rounded-2xl font-bold text-lg lg:text-xl transition-all shadow-xl hover:shadow-2xl mt-2 tracking-wide relative overflow-hidden flex items-center justify-center"
        >
          <span className="relative z-10">ثبت سفارش</span>
        </button>
      </form>
      <style jsx>{`
        .animate-fade-in { animation: fadeIn 0.2s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
} 