'use client';

import { Header, Footer } from '../../components';
import { FaSearch, FaClock, FaCheckCircle, FaTimesCircle, FaSpinner, FaFileAlt, FaCalendarAlt, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
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
    phone: '۰۹۱۲-۳۴۵-۶۷۸۹'
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
          icon: FaClock
        };
      case 'processing':
        return {
          text: 'در حال پردازش',
          color: 'text-blue-500',
          bgColor: 'bg-blue-500/20',
          icon: FaSpinner
        };
      case 'completed':
        return {
          text: 'تکمیل شده',
          color: 'text-green-500',
          bgColor: 'bg-green-500/20',
          icon: FaCheckCircle
        };
      case 'failed':
        return {
          text: 'ناموفق',
          color: 'text-red-500',
          bgColor: 'bg-red-500/20',
          icon: FaTimesCircle
        };
      default:
        return {
          text: 'نامشخص',
          color: 'text-gray-500',
          bgColor: 'bg-gray-500/20',
          icon: FaFileAlt
        };
    }
  };

  return (
    <div className="min-h-screen bg-primary-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary-text mb-6">
            <span className="text-[#279EFD]">پیگیری</span> سفارش
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            با وارد کردن کد پیگیری سفارش خود، از وضعیت آن مطلع شوید
          </p>
        </div>
      </section>

      {/* Search Form */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label htmlFor="orderId" className="block text-lg font-bold text-primary-text mb-3">
                  کد پیگیری سفارش
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="orderId"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="مثال: LK-2024-001234"
                    className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-primary-text placeholder-gray-400 focus:outline-none focus:border-[#279EFD] focus:ring-2 focus:ring-[#279EFD]/20 transition-all duration-300"
                    required
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !orderId.trim()}
                className="w-full bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white py-4 rounded-2xl font-bold text-lg hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin ml-2" />
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
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              {/* Order Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-primary-text mb-2">
                    سفارش #{orderStatus.id}
                  </h2>
                  <p className="text-gray-600">تاریخ سفارش: {orderStatus.orderDate}</p>
                </div>
                
                <div className={`mt-4 lg:mt-0 px-6 py-3 rounded-2xl ${getStatusInfo(orderStatus.status).bgColor} ${getStatusInfo(orderStatus.status).color} flex items-center`}>
                  {React.createElement(getStatusInfo(orderStatus.status).icon, { className: "ml-2" })}
                  <span className="font-bold">{getStatusInfo(orderStatus.status).text}</span>
                </div>
              </div>

              {/* Order Details Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Service Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-primary-text mb-4">اطلاعات سرویس</h3>
                  
                  <div className="bg-white/5 rounded-2xl p-6">
                    <div className="flex items-center mb-4">
                      <FaFileAlt className="text-[#279EFD] text-xl ml-3" />
                      <h4 className="font-bold text-primary-text">نوع سرویس</h4>
                    </div>
                    <p className="text-gray-600">{orderStatus.service}</p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6">
                    <div className="flex items-center mb-4">
                      <FaSpinner className="text-[#279EFD] text-xl ml-3" />
                      <h4 className="font-bold text-primary-text">تعداد</h4>
                    </div>
                    <p className="text-gray-600">{orderStatus.quantity} عدد</p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6">
                    <div className="flex items-center mb-4">
                      <FaCalendarAlt className="text-[#279EFD] text-xl ml-3" />
                      <h4 className="font-bold text-primary-text">تاریخ تحویل</h4>
                    </div>
                    <p className="text-gray-600">{orderStatus.deliveryDate}</p>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-primary-text mb-4">اطلاعات مشتری</h3>
                  
                  <div className="bg-white/5 rounded-2xl p-6">
                    <div className="flex items-center mb-4">
                      <FaUser className="text-[#279EFD] text-xl ml-3" />
                      <h4 className="font-bold text-primary-text">نام مشتری</h4>
                    </div>
                    <p className="text-gray-600">{orderStatus.customer}</p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6">
                    <div className="flex items-center mb-4">
                      <FaEnvelope className="text-[#279EFD] text-xl ml-3" />
                      <h4 className="font-bold text-primary-text">ایمیل</h4>
                    </div>
                    <p className="text-gray-600">{orderStatus.email}</p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6">
                    <div className="flex items-center mb-4">
                      <FaPhone className="text-[#279EFD] text-xl ml-3" />
                      <h4 className="font-bold text-primary-text">تلفن</h4>
                    </div>
                    <p className="text-gray-600">{orderStatus.phone}</p>
                  </div>
                </div>
              </div>

              {/* Price Information */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary-text">مبلغ کل:</span>
                  <span className="text-2xl font-bold text-[#279EFD]">{orderStatus.price} تومان</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white py-3 rounded-2xl font-bold hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300">
                  دانلود فاکتور
                </button>
                <button className="flex-1 bg-white/10 backdrop-blur-sm border border-white/30 text-primary-text py-3 rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                  تماس با پشتیبانی
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Help Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">نیاز به کمک دارید؟</h2>
            <p className="text-xl mb-8 opacity-90">اگر در پیگیری سفارش خود مشکلی دارید، با تیم پشتیبانی ما تماس بگیرید</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/support" 
                className="bg-white text-[#279EFD] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300"
              >
                صفحه پشتیبانی
              </a>
              <a 
                href="https://wa.me/989123456789" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#128C7E] transition-all duration-300"
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