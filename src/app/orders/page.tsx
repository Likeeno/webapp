'use client';

import { Header, Footer } from '../../components';
import {
  FaSearch,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaFileAlt,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';
import { useState } from 'react';
import React from 'react';

interface OrderStatus {
  id: string;
  status: string;
  service: string;
  quantity: string;
  price: string;
  orderDate: string;
  deliveryDate: string;
  customer: string;
  email: string;
  phone: string;
}

export default function OrdersPage() {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // نمونه وضعیت سفارش برای نمایش
  const sampleOrder: OrderStatus = {
    id: 'LK-2024-001234',
    status: 'completed',
    service: 'افزایش فالوور اینستاگرام',
    quantity: '1000',
    price: '150,000',
    orderDate: '۱۴۰۲/۱۰/۱۵',
    deliveryDate: '۱۴۰۲/۱۰/۱۶',
    customer: 'علی محمدی',
    email: 'ali@example.com',
    phone: '۰۹۱۲-۳۴۵-۶۷۸۹',
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsLoading(true);
    setShowResult(false);

    // شبیه‌سازی جستجو
    setTimeout(() => {
      setOrderStatus(sampleOrder);
      setIsLoading(false);
      setShowResult(true);
    }, 2000);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          text: 'در انتظار پرداخت',
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/20',
          icon: FaClock,
        };
      case 'processing':
        return {
          text: 'در حال پردازش',
          color: 'text-blue-500',
          bgColor: 'bg-blue-500/20',
          icon: FaSpinner,
        };
      case 'completed':
        return {
          text: 'تکمیل شده',
          color: 'text-green-500',
          bgColor: 'bg-green-500/20',
          icon: FaCheckCircle,
        };
      case 'failed':
        return {
          text: 'ناموفق',
          color: 'text-red-500',
          bgColor: 'bg-red-500/20',
          icon: FaTimesCircle,
        };
      default:
        return {
          text: 'نامشخص',
          color: 'text-gray-500',
          bgColor: 'bg-gray-500/20',
          icon: FaFileAlt,
        };
    }
  };

  return (
    <div className="bg-primary-background min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="px-4 pt-24 pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-primary-text mb-6 text-4xl font-bold lg:text-5xl">
            <span className="text-[#279EFD]">پیگیری</span> سفارش
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
            با وارد کردن کد پیگیری سفارش خود، از وضعیت آن مطلع شوید
          </p>
        </div>
      </section>

      {/* Search Form */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label htmlFor="orderId" className="text-primary-text mb-3 block text-lg font-bold">
                  کد پیگیری سفارش
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="orderId"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="مثال: LK-2024-001234"
                    className="text-primary-text w-full rounded-2xl border border-white/30 bg-white/20 px-6 py-4 placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:border-[#279EFD] focus:ring-2 focus:ring-[#279EFD]/20 focus:outline-none"
                    required
                  />
                  <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 transform text-gray-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !orderId.trim()}
                className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] py-4 text-lg font-bold text-white transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="ml-2 animate-spin" />
                    در حال جستجو...
                  </>
                ) : (
                  <>
                    <FaSearch className="ml-2" />
                    جستجو
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Order Result */}
      {showResult && orderStatus && (
        <section className="px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
              {/* Order Header */}
              <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-primary-text mb-2 text-2xl font-bold">
                    سفارش #{orderStatus.id}
                  </h2>
                  <p className="text-gray-600">تاریخ سفارش: {orderStatus.orderDate}</p>
                </div>

                <div
                  className={`mt-4 rounded-2xl px-6 py-3 lg:mt-0 ${getStatusInfo(orderStatus.status).bgColor} ${getStatusInfo(orderStatus.status).color} flex items-center`}
                >
                  {React.createElement(getStatusInfo(orderStatus.status).icon, {
                    className: 'ml-2',
                  })}
                  <span className="font-bold">{getStatusInfo(orderStatus.status).text}</span>
                </div>
              </div>

              {/* Order Details Grid */}
              <div className="grid gap-8 md:grid-cols-2">
                {/* Service Information */}
                <div className="space-y-6">
                  <h3 className="text-primary-text mb-4 text-xl font-bold">اطلاعات سرویس</h3>

                  <div className="rounded-2xl bg-white/5 p-6">
                    <div className="mb-4 flex items-center">
                      <FaFileAlt className="ml-3 text-xl text-[#279EFD]" />
                      <h4 className="text-primary-text font-bold">نوع سرویس</h4>
                    </div>
                    <p className="text-gray-600">{orderStatus.service}</p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-6">
                    <div className="mb-4 flex items-center">
                      <FaSpinner className="ml-3 text-xl text-[#279EFD]" />
                      <h4 className="text-primary-text font-bold">تعداد</h4>
                    </div>
                    <p className="text-gray-600">{orderStatus.quantity} عدد</p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-6">
                    <div className="mb-4 flex items-center">
                      <FaCalendarAlt className="ml-3 text-xl text-[#279EFD]" />
                      <h4 className="text-primary-text font-bold">تاریخ تحویل</h4>
                    </div>
                    <p className="text-gray-600">{orderStatus.deliveryDate}</p>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="space-y-6">
                  <h3 className="text-primary-text mb-4 text-xl font-bold">اطلاعات مشتری</h3>

                  <div className="rounded-2xl bg-white/5 p-6">
                    <div className="mb-4 flex items-center">
                      <FaUser className="ml-3 text-xl text-[#279EFD]" />
                      <h4 className="text-primary-text font-bold">نام مشتری</h4>
                    </div>
                    <p className="text-gray-600">{orderStatus.customer}</p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-6">
                    <div className="mb-4 flex items-center">
                      <FaEnvelope className="ml-3 text-xl text-[#279EFD]" />
                      <h4 className="text-primary-text font-bold">ایمیل</h4>
                    </div>
                    <p className="text-gray-600">{orderStatus.email}</p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-6">
                    <div className="mb-4 flex items-center">
                      <FaPhone className="ml-3 text-xl text-[#279EFD]" />
                      <h4 className="text-primary-text font-bold">تلفن</h4>
                    </div>
                    <p className="text-gray-600">{orderStatus.phone}</p>
                  </div>
                </div>
              </div>

              {/* Price Information */}
              <div className="mt-8 border-t border-white/20 pt-8">
                <div className="flex items-center justify-between">
                  <span className="text-primary-text text-lg font-bold">مبلغ کل:</span>
                  <span className="text-2xl font-bold text-[#279EFD]">
                    {orderStatus.price} تومان
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button className="flex-1 rounded-2xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] py-3 font-bold text-white transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1]">
                  دانلود فاکتور
                </button>
                <button className="text-primary-text flex-1 rounded-2xl border border-white/30 bg-white/10 py-3 font-bold backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                  تماس با پشتیبانی
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Help Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-3xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] p-12 text-white">
            <h2 className="mb-4 text-3xl font-bold">نیاز به کمک دارید؟</h2>
            <p className="mb-8 text-xl opacity-90">
              اگر در پیگیری سفارش خود مشکلی دارید، با تیم پشتیبانی ما تماس بگیرید
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/support"
                className="rounded-2xl bg-white px-8 py-4 text-lg font-bold text-[#279EFD] transition-all duration-300 hover:bg-gray-100"
              >
                صفحه پشتیبانی
              </a>
              <a
                href="https://wa.me/989123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-[#25D366] px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-[#128C7E]"
              >
                چت واتساپ
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
