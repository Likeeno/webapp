'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTwitter,
  FaChevronDown,
  FaCheck,
  FaSpinner,
} from 'react-icons/fa';

const platforms = [
  { label: 'اینستاگرام', value: 'instagram', icon: <FaInstagram className="text-lg" /> },
  { label: 'تیک تاک', value: 'tiktok', icon: <FaTiktok className="text-lg" /> },
  { label: 'یوتوب', value: 'youtube', icon: <FaYoutube className="text-lg" /> },
  { label: 'تویتر', value: 'twitter', icon: <FaTwitter className="text-lg" /> },
];

type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter';

// Service mapping: platform + service name -> JAP Service ID
const serviceMapping: Record<string, number> = {
  'instagram-لایک': 4343,
  'instagram-فالوور': 3305,
  'telegram-ممبر': 7102,
};

// Service details mapping
const serviceDetails: Record<string, { min: number; max: number }> = {
  'instagram-لایک': { min: 10, max: 5000000 },
  'instagram-فالوور': { min: 1000, max: 500000 },
  'telegram-ممبر': { min: 10, max: 50000 },
};

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

interface DashboardOrderFormProps {
  userBalance?: number;
  onOrderSubmit: (data: {
    japServiceId: number;
    link: string;
    quantity: number;
    price: number;
    serviceName: string;
    paymentMethod: 'wallet' | 'gateway';
  }) => Promise<void>;
  isLoading?: boolean;
}

export default function DashboardOrderForm({
  userBalance = 0,
  onOrderSubmit,
  isLoading = false,
}: DashboardOrderFormProps) {
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [service, setService] = useState('');
  const [amount, setAmount] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [serviceRate, setServiceRate] = useState(0);
  const [loadingRate, setLoadingRate] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'gateway'>('wallet');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch service rate when service is selected
  useEffect(() => {
    const fetchRate = async () => {
      if (!service || !platform) {
        setServiceRate(0);
        return;
      }

      const serviceKey = `${platform}-${service}`;
      const japServiceId = serviceMapping[serviceKey];

      if (!japServiceId) {
        setServiceRate(0);
        return;
      }

      setLoadingRate(true);
      try {
        const response = await fetch('/api/jap/services');
        if (response.ok) {
          const data = await response.json();
          interface ServiceResponse {
            jap_service_id: number;
            rate: number;
          }
          const serviceData = data.data?.find(
            (s: ServiceResponse) => s.jap_service_id === japServiceId
          );
          if (serviceData) {
            setServiceRate(serviceData.rate || 0);
          } else {
            setServiceRate(0);
          }
        }
      } catch (err) {
        console.error('Error fetching service rate:', err);
        setServiceRate(0);
      } finally {
        setLoadingRate(false);
      }
    };

    fetchRate();
  }, [service, platform]);

  // Get service limits
  const getServiceLimits = () => {
    const serviceKey = `${platform}-${service}`;
    return serviceDetails[serviceKey] || { min: 1, max: 1000000 };
  };

  // Calculate price
  const limits = getServiceLimits();
  const quantity = amount ? parseInt(amount) : 0;
  const price = quantity > 0 && serviceRate > 0 ? Math.ceil(serviceRate * quantity) : 0;
  const formattedPrice = price > 0 ? formatPrice(price) : '۰';

  // Check if wallet payment is available
  const canUseWallet = price > 0 && userBalance >= price;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!service || !amount || !link) {
      setError('لطفاً همه فیلدها را کامل کنید.');
      return;
    }

    const serviceKey = `${platform}-${service}`;
    const japServiceId = serviceMapping[serviceKey];

    if (!japServiceId) {
      setError('این سرویس در حال حاضر در دسترس نیست.');
      return;
    }

    if (quantity < limits.min || quantity > limits.max) {
      setError(
        `تعداد باید بین ${limits.min.toLocaleString()} تا ${limits.max.toLocaleString()} باشد`
      );
      return;
    }

    if (serviceRate <= 0) {
      setError('قیمت سرویس تنظیم نشده است. لطفاً با پشتیبانی تماس بگیرید.');
      return;
    }

    if (paymentMethod === 'wallet' && !canUseWallet) {
      setError('موجودی کافی نیست. لطفاً کیف پول خود را شارژ کنید یا از درگاه پرداخت استفاده کنید');
      return;
    }

    try {
      await onOrderSubmit({
        japServiceId,
        link: link.trim(),
        quantity,
        price,
        serviceName: `${platform === 'instagram' ? 'اینستاگرام' : platform === 'tiktok' ? 'تیک تاک' : platform === 'youtube' ? 'یوتوب' : 'تویتر'} ${service}`,
        paymentMethod,
      });

      // Reset form on success
      setService('');
      setAmount('');
      setLink('');
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در ثبت سفارش');
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl transition-all duration-500 lg:p-10">
      {/* Modern Platform Selector */}
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <div className="grid grid-cols-4 gap-1 sm:gap-2">
          {platforms.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`relative rounded-2xl p-3 transition-all sm:p-4 ${
                platform === item.value
                  ? 'bg-gradient-to-br from-[#279EFD] via-[#1E88E5] to-[#1565C0] text-white shadow-xl shadow-[#279EFD]/40'
                  : 'border border-white/20 bg-gradient-to-br from-white/20 to-white/10 text-gray-700 hover:border-white/40 hover:from-white/30 hover:to-white/20'
              }`}
              onClick={() => {
                setPlatform(item.value as Platform);
                setService('');
                setAmount('');
              }}
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
                className={`font-regular text-primary-text flex w-full cursor-pointer appearance-none items-center justify-between rounded-xl border border-white/20 bg-white/50 p-3 pr-4 pl-4 text-base placeholder-gray-400 transition-all focus:border-[#279EFD] focus:shadow-lg focus:outline-none lg:p-4 lg:text-lg ${openDropdown ? 'ring-2 ring-[#279EFD]' : ''}`}
                onClick={() => setOpenDropdown((v) => !v)}
                tabIndex={0}
              >
                <span>{service || 'انتخاب سرویس'}</span>
                <FaChevronDown
                  className={`transition-transform ${openDropdown ? 'rotate-180' : ''} text-gray-400`}
                />
              </button>
              {openDropdown && (
                <div className="animate-fade-in absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-white/20 bg-white shadow-lg">
                  {services[platform].map((srv: string) => {
                    const serviceKey = `${platform}-${srv}`;
                    const isAvailable = serviceMapping[serviceKey] !== undefined;
                    return (
                      <div
                        key={srv}
                        className={`flex cursor-pointer items-center gap-2 px-4 py-3 text-base transition-all lg:py-4 lg:text-lg ${
                          service === srv
                            ? 'bg-[#279EFD]/20 font-bold text-[#279EFD]'
                            : isAvailable
                              ? 'text-gray-700 hover:bg-[#279EFD]/10'
                              : 'cursor-not-allowed text-gray-400 opacity-50'
                        }`}
                        onClick={() => {
                          if (isAvailable) {
                            setService(srv);
                            setOpenDropdown(false);
                          }
                        }}
                      >
                        {service === srv && <FaCheck className="text-[#279EFD]" />}
                        {srv}
                        {!isAvailable && <span className="mr-auto text-xs">(به زودی)</span>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Custom Input */}
          <div className="relative flex flex-col gap-1">
            <label className="mb-1 text-xs text-gray-500 lg:text-sm">
              تعداد {service && `(${limits.min.toLocaleString()} - ${limits.max.toLocaleString()})`}
            </label>
            <div className="relative">
              <input
                type="number"
                min={limits.min}
                max={limits.max}
                placeholder={`مثلاً ${limits.min.toLocaleString()}`}
                className="font-regular text-primary-text w-full appearance-none rounded-xl border border-white/20 bg-white/50 p-3 pr-4 pl-4 text-base placeholder-gray-400 transition-all focus:border-[#279EFD] focus:shadow-lg focus:outline-none lg:p-4 lg:text-lg"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={!service}
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
              className="font-regular text-primary-text w-full appearance-none rounded-xl border border-white/20 bg-white/50 p-3 pr-4 pl-4 text-left text-base placeholder-gray-400 transition-all focus:border-[#279EFD] focus:shadow-lg focus:outline-none lg:p-4 lg:text-lg"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              dir="ltr"
            />
          </div>
        </div>

        {/* Price Display */}
        {loadingRate ? (
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/20 px-4 py-3 backdrop-blur-md lg:px-6 lg:py-4">
            <FaSpinner className="animate-spin text-[#279EFD]" />
            <span className="text-gray-600">در حال محاسبه قیمت...</span>
          </div>
        ) : price > 0 ? (
          <div className="rounded-2xl border border-white/20 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-4 py-3 shadow-inner backdrop-blur-md lg:px-6 lg:py-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-gray-600 lg:text-lg">قیمت نهایی خرید</span>
              <span className="text-lg font-bold lg:text-xl">{formattedPrice} تومان</span>
            </div>
            {serviceRate > 0 && (
              <div className="mt-1 text-center text-xs text-gray-500">
                قیمت واحد: {formatPrice(serviceRate)} تومان
              </div>
            )}
          </div>
        ) : null}

        {/* Payment Method Selection */}
        {price > 0 && (
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
            <label className="mb-4 block text-sm font-bold text-gray-700">روش پرداخت</label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                disabled={!canUseWallet}
                className={`rounded-xl border-2 p-4 transition-all ${
                  paymentMethod === 'wallet'
                    ? 'border-[#279EFD] bg-[#279EFD]/10'
                    : 'border-white/20 bg-white/20 hover:border-[#279EFD]/50'
                } ${!canUseWallet ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <div className="mb-2 text-2xl">💰</div>
                <div className="mb-1 font-bold text-gray-700">کیف پول</div>
                <div className="text-xs text-gray-600">
                  {canUseWallet ? `موجودی: ${userBalance.toLocaleString()} تومان` : 'موجودی ناکافی'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('gateway')}
                className={`rounded-xl border-2 p-4 transition-all ${
                  paymentMethod === 'gateway'
                    ? 'border-[#279EFD] bg-[#279EFD]/10'
                    : 'border-white/20 bg-white/20 hover:border-[#279EFD]/50'
                }`}
              >
                <div className="mb-2 text-2xl">💳</div>
                <div className="mb-1 font-bold text-gray-700">درگاه پرداخت</div>
                <div className="text-xs text-gray-600">پرداخت اینترنتی</div>
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-2 animate-pulse rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm text-red-500 lg:text-base">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!service || !amount || !link || price <= 0 || isLoading || loadingRate}
          className="relative mt-2 flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] py-3 text-lg font-bold tracking-wide text-white shadow-xl transition-all hover:from-[#1E88E5] hover:to-[#0D47A1] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50 lg:py-4 lg:text-xl"
        >
          {isLoading ? (
            <>
              <FaSpinner className="mr-2 animate-spin" />
              <span>در حال پردازش...</span>
            </>
          ) : (
            <span className="relative z-10">
              {paymentMethod === 'gateway' ? 'پرداخت و ثبت سفارش' : 'ثبت سفارش'}
            </span>
          )}
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
