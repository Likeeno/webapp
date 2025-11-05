'use client';

import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface QuickOrderFormProps {
  japServiceId: number;
  serviceName: string;
  minQuantity: number;
  maxQuantity: number;
  onSubmit: (data: { japServiceId: number; link: string; quantity: number; price: number; serviceName: string }) => void;
  isLoading?: boolean;
}

export default function QuickOrderForm({
  japServiceId,
  serviceName,
  minQuantity,
  maxQuantity,
  onSubmit,
  isLoading = false,
}: QuickOrderFormProps) {
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [rate, setRate] = useState(0);
  const [loadingRate, setLoadingRate] = useState(true);

  // Fetch service rate from database
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const response = await fetch('/api/jap/services');
        if (response.ok) {
          const data = await response.json();
          interface ServiceResponse {
            jap_service_id: number;
            rate: number;
          }
          const service = data.data?.find((s: ServiceResponse) => s.jap_service_id === japServiceId);
          if (service) {
            setRate(service.rate || 0);
          }
        }
      } catch (err) {
        console.error('Error fetching service rate:', err);
      } finally {
        setLoadingRate(false);
      }
    };

    fetchRate();
  }, [japServiceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!link.trim()) {
      setError('لطفاً لینک را وارد کنید');
      return;
    }

    if (!quantity || isNaN(parseInt(quantity))) {
      setError('لطفاً تعداد معتبر وارد کنید');
      return;
    }

    const qty = parseInt(quantity);
    if (qty < minQuantity || qty > maxQuantity) {
      setError(`تعداد باید بین ${minQuantity.toLocaleString()} تا ${maxQuantity.toLocaleString()} باشد`);
      return;
    }

    if (rate <= 0) {
      setError('قیمت سرویس تنظیم نشده است. لطفاً با پشتیبانی تماس بگیرید.');
      return;
    }

    const price = Math.ceil(rate * qty);
    onSubmit({
      japServiceId,
      link: link.trim(),
      quantity: qty,
      price,
      serviceName,
    });
  };

  const calculatedPrice = quantity && !isNaN(parseInt(quantity)) && rate > 0
    ? Math.ceil(rate * parseInt(quantity))
    : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-primary-text mb-2">
          لینک
        </label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://instagram.com/username"
          className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/50 focus:border-[#279EFD] focus:outline-none text-left"
          required
          dir="ltr"
          disabled={isLoading || loadingRate}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-primary-text mb-2">
          تعداد
        </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min={minQuantity}
          max={maxQuantity}
          placeholder={`${minQuantity.toLocaleString()} - ${maxQuantity.toLocaleString()}`}
          className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/50 focus:border-[#279EFD] focus:outline-none text-center text-lg font-bold"
          required
          disabled={isLoading || loadingRate}
        />
      </div>

      {loadingRate ? (
        <div className="bg-gray-50 rounded-xl p-4 text-center text-sm text-gray-600">
          در حال بارگذاری قیمت...
        </div>
      ) : rate > 0 ? (
        calculatedPrice > 0 && (
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-xl border border-white/20 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-700">قیمت کل:</span>
              <span className="text-2xl font-bold text-primary-text">
                {calculatedPrice.toLocaleString()} تومان
              </span>
            </div>
            <div className="text-xs text-gray-600 text-center mt-2">
              قیمت واحد: {rate.toLocaleString()} تومان
            </div>
          </div>
        )
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center text-sm text-amber-700">
          قیمت این سرویس هنوز تنظیم نشده است
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3">
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || loadingRate || !link || !quantity || calculatedPrice <= 0 || rate <= 0}
        className="w-full bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white py-4 rounded-xl font-bold text-lg hover:from-[#1E88E5] hover:to-[#1565C0] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <FaSpinner className="animate-spin" />
            <span>در حال پردازش...</span>
          </>
        ) : (
          <span>ثبت سفارش</span>
        )}
      </button>
    </form>
  );
}

