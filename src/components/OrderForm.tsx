'use client';

import React, { useState, useRef } from 'react';
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTwitter,
  FaChevronDown,
  FaCheck,
} from 'react-icons/fa';

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
    <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-blue-100 bg-white/80 p-4 shadow-xl transition-all duration-500 lg:mt-0 lg:max-w-3xl lg:p-10">
      {/* Modern Platform Selector */}
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <div className="grid grid-cols-4 gap-1 sm:gap-2">
          {platforms.map((item) => (
            <button
              key={item.value}
              className={`relative rounded-2xl p-3 sm:p-4 ${
                platform === item.value
                  ? 'bg-gradient-to-br from-[#279EFD] via-[#1E88E5] to-[#1565C0] text-white shadow-xl shadow-[#279EFD]/40'
                  : 'border border-gray-200/60 bg-gradient-to-br from-gray-50 to-white text-gray-700 hover:border-gray-300/80 hover:from-gray-100 hover:to-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setPlatform(item.value as Platform)}
              type="button"
            >
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <span className="text-xl sm:text-2xl lg:text-3xl">{item.icon}</span>
                <span className="text-center text-xs leading-tight font-medium sm:text-sm">
                  {item.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Form */}
      <form className="space-y-6 lg:space-y-8" onSubmit={handleSubmit} autoComplete="off">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {/* Custom Select */}
          <div className="relative flex flex-col gap-1" ref={dropdownRef}>
            <label className="mb-1 text-xs text-gray-500 lg:text-sm">نوع سرویس</label>
            <div className="relative">
              <button
                type="button"
                className={`focus:border-primary-highlight font-regular text-primary-text flex w-full cursor-pointer appearance-none items-center justify-between rounded-xl border border-gray-200 bg-white p-3 pr-4 pl-4 text-base placeholder-gray-400 transition-all focus:shadow-lg focus:outline-none lg:p-4 lg:text-lg ${openDropdown ? 'ring-primary-highlight ring-2' : ''}`}
                onClick={() => setOpenDropdown((v) => !v)}
                tabIndex={0}
              >
                <span>{service || 'انتخاب سرویس'}</span>
                <FaChevronDown
                  className={`transition-transform ${openDropdown ? 'rotate-180' : ''} text-gray-400`}
                />
              </button>
              {openDropdown && (
                <div className="animate-fade-in absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                  {services[platform].map((srv: string) => (
                    <div
                      key={srv}
                      className={`hover:bg-primary-highlight/10 flex cursor-pointer items-center gap-2 px-4 py-3 text-base transition-all lg:py-4 lg:text-lg ${service === srv ? 'bg-primary-highlight/20 text-primary-highlight font-bold' : 'text-gray-700'}`}
                      onClick={() => {
                        setService(srv);
                        setOpenDropdown(false);
                      }}
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
          <div className="relative flex flex-col gap-1">
            <label className="mb-1 text-xs text-gray-500 lg:text-sm">تعداد</label>
            <div className="relative">
              <input
                type="number"
                min="1"
                placeholder="مثلاً ۱۰۰۰"
                className="focus:border-primary-highlight font-regular text-primary-text w-full appearance-none rounded-xl border border-gray-200 bg-white p-3 pr-4 pl-4 text-base placeholder-gray-400 transition-all focus:shadow-lg focus:outline-none lg:p-4 lg:text-lg"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Custom Input */}
        <div className="relative flex flex-col gap-1">
          <label className="mb-1 text-xs text-gray-500 lg:text-sm">لینک</label>
          <div className="relative">
            <input
              type="text"
              placeholder="مثلاً https://instagram.com/..."
              className="focus:border-primary-highlight font-regular text-primary-text w-full appearance-none rounded-xl border border-gray-200 bg-white p-3 pr-4 pl-4 text-right text-base placeholder-gray-400 transition-all focus:shadow-lg focus:outline-none lg:p-4 lg:text-lg"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              dir="ltr"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 shadow-inner lg:px-6 lg:py-4">
          <span className="text-base font-bold text-gray-600 lg:text-lg">قیمت نهایی خرید</span>
          <span className="text-lg font-bold lg:text-xl">{price} تومان</span>
        </div>
        {error && (
          <div className="mt-2 animate-pulse text-center text-sm text-red-500 lg:text-base">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-2 animate-bounce text-center text-sm text-green-600 lg:text-base">
            سفارش با موفقیت ثبت شد!
          </div>
        )}
        <button
          type="submit"
          className="relative mt-2 flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] py-3 text-lg font-bold tracking-wide text-white shadow-xl transition-all hover:from-[#1E88E5] hover:to-[#0D47A1] hover:shadow-2xl lg:py-4 lg:text-xl"
        >
          <span className="relative z-10">ثبت سفارش</span>
        </button>
      </form>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.2s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
