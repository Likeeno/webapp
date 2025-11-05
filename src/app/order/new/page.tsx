'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header, Footer } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

interface Service {
  id: string;
  jap_service_id: number;
  name: string;
  category: string;
  rate: number;
  min_quantity: number;
  max_quantity: number;
}

function NewOrderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'gateway'>('wallet');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState(0);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      const returnUrl = `/order/new${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      router.push(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
    }
  }, [user, authLoading, router, searchParams]);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/jap/services');
        const data = await response.json();
        
        if (data.success && data.data) {
          setServices(data.data);
          // Set first category as default
          if (data.data.length > 0) {
            const firstCategory = data.data[0].category;
            setSelectedCategory(firstCategory);
          }
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('خطا در دریافت سرویس‌ها');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchServices();
    }
  }, [user]);

  // Fetch user balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        if (data.balance !== undefined) {
          setUserBalance(data.balance);
        }
      } catch (err) {
        console.error('Error fetching balance:', err);
      }
    };

    if (user) {
      fetchBalance();
    }
  }, [user]);

  const categories = Array.from(new Set(services.map(s => s.category))).filter(Boolean);
  const filteredServices = selectedCategory 
    ? services.filter(s => s.category === selectedCategory)
    : services;

  const calculatePrice = () => {
    if (!selectedService || !quantity) return 0;
    const qty = parseInt(quantity);
    if (isNaN(qty)) return 0;
    // Convert rate to Toman (assuming rate is in Rials or needs conversion)
    // Adjust this calculation based on your actual pricing
    return Math.ceil(selectedService.rate * qty);
  };

  const totalPrice = calculatePrice();
  const canAfford = userBalance >= totalPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !link || !quantity) {
      setError('لطفاً تمام فیلدها را پر کنید');
      return;
    }

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < selectedService.min_quantity || qty > selectedService.max_quantity) {
      setError(`تعداد باید بین ${selectedService.min_quantity} تا ${selectedService.max_quantity} باشد`);
      return;
    }

    if (paymentMethod === 'wallet' && !canAfford) {
      setError('موجودی کافی نیست. لطفاً کیف پول خود را شارژ کنید یا از درگاه پرداخت استفاده کنید');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (paymentMethod === 'gateway') {
        // For gateway payment, first create a payment and then redirect
        const paymentResponse = await fetch('/api/payment/init', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: totalPrice,
            orderData: {
              japServiceId: selectedService.jap_service_id,
              link,
              quantity: qty,
              serviceName: selectedService.name,
            }
          }),
        });

        const paymentData = await paymentResponse.json();

        if (!paymentData.success || !paymentData.paymentUrl) {
          throw new Error(paymentData.error || 'خطا در ایجاد درخواست پرداخت');
        }

        // Redirect to payment gateway
        window.location.href = paymentData.paymentUrl;
      } else {
        // For wallet payment, directly create the order
        const orderResponse = await fetch('/api/orders/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            japServiceId: selectedService.jap_service_id,
            link,
            quantity: qty,
            price: totalPrice,
            serviceName: selectedService.name,
          }),
        });

        const orderData = await orderResponse.json();

        if (!orderData.success) {
          throw new Error(orderData.error || 'خطا در ثبت سفارش');
        }

        // Success! Redirect to dashboard
        router.push('/dashboard?orderSuccess=true');
      }
    } catch (err) {
      console.error('Order error:', err);
      setError(err instanceof Error ? err.message : 'خطا در ثبت سفارش');
      setSubmitting(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-primary-background">
        <Header />
        <div className="py-24 flex items-center justify-center">
          <FaSpinner className="text-4xl text-primary-accent animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-background">
        <Header />
        <div className="py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <FaSpinner className="text-4xl text-primary-accent animate-spin mx-auto mb-4" />
            <p className="text-gray-700">در حال بارگذاری سرویس‌ها...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-background">
      <Header />
      
      <div className="py-12 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-text mb-3">
              ثبت سفارش جدید
            </h1>
            <p className="text-gray-600">
              سرویس مورد نظر خود را انتخاب کرده و سفارش دهید
            </p>
          </div>

          {/* Balance Display */}
          <div className="bg-gradient-to-r from-[#279EFD]/20 to-[#1565C0]/20 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/20">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-bold">موجودی کیف پول:</span>
              <span className="text-2xl font-bold text-primary-text">
                {userBalance.toLocaleString()} تومان
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                دسته‌بندی
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedService(null);
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedCategory === category
                        ? 'border-primary-accent bg-primary-accent/10'
                        : 'border-white/20 bg-white/20 hover:border-primary-accent/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">
                      {category.toLowerCase().includes('instagram') ? '📱' :
                       category.toLowerCase().includes('tiktok') ? '🎵' :
                       category.toLowerCase().includes('youtube') ? '🎬' :
                       category.toLowerCase().includes('twitter') ? '🐦' : '⭐'}
                    </div>
                    <div className="text-sm font-bold text-gray-700">{category}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Service Selection */}
            {selectedCategory && (
              <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  سرویس
                </label>
                <select
                  value={selectedService?.id || ''}
                  onChange={(e) => {
                    const service = services.find(s => s.id === e.target.value);
                    setSelectedService(service || null);
                    setQuantity('');
                  }}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/50 focus:border-primary-accent focus:outline-none text-right"
                  required
                >
                  <option value="">سرویس مورد نظر را انتخاب کنید</option>
                  {filteredServices.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.rate.toLocaleString()} تومان
                    </option>
                  ))}
                </select>
                
                {selectedService && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
                    <div className="flex justify-between mb-1">
                      <span>حداقل:</span>
                      <span className="font-bold">{selectedService.min_quantity.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>حداکثر:</span>
                      <span className="font-bold">{selectedService.max_quantity.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Link Input */}
            {selectedService && (
              <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  لینک / آدرس
                </label>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://instagram.com/username"
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/50 focus:border-primary-accent focus:outline-none text-left"
                  required
                  dir="ltr"
                />
              </div>
            )}

            {/* Quantity Input */}
            {selectedService && (
              <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  تعداد
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min={selectedService.min_quantity}
                  max={selectedService.max_quantity}
                  placeholder={`${selectedService.min_quantity} - ${selectedService.max_quantity}`}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/50 focus:border-primary-accent focus:outline-none text-center text-lg font-bold"
                  required
                />
              </div>
            )}

            {/* Price Display */}
            {selectedService && quantity && (
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-700">قیمت کل:</span>
                  <span className="text-3xl font-bold text-primary-text">
                    {totalPrice.toLocaleString()} تومان
                  </span>
                </div>
              </div>
            )}

            {/* Payment Method Selection */}
            {selectedService && quantity && (
              <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  روش پرداخت
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    disabled={!canAfford}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'wallet'
                        ? 'border-primary-accent bg-primary-accent/10'
                        : 'border-white/20 bg-white/20 hover:border-primary-accent/50'
                    } ${!canAfford ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="text-2xl mb-2">💰</div>
                    <div className="font-bold text-gray-700 mb-1">کیف پول</div>
                    <div className="text-xs text-gray-600">
                      {canAfford ? 'پرداخت از موجودی' : 'موجودی ناکافی'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('gateway')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'gateway'
                        ? 'border-primary-accent bg-primary-accent/10'
                        : 'border-white/20 bg-white/20 hover:border-primary-accent/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">💳</div>
                    <div className="font-bold text-gray-700 mb-1">درگاه پرداخت</div>
                    <div className="text-xs text-gray-600">پرداخت اینترنتی</div>
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <FaExclamationTriangle className="text-red-500 text-xl flex-shrink-0" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedService || !link || !quantity || submitting}
              className="w-full bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white py-4 rounded-2xl font-bold text-lg hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {submitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>در حال پردازش...</span>
                </>
              ) : (
                <>
                  <FaCheckCircle />
                  <span>
                    {paymentMethod === 'gateway' ? 'پرداخت و ثبت سفارش' : 'ثبت سفارش'}
                  </span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function NewOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-primary-background">
        <Header />
        <div className="py-24 flex items-center justify-center">
          <FaSpinner className="text-4xl text-primary-accent animate-spin" />
        </div>
        <Footer />
      </div>
    }>
      <NewOrderContent />
    </Suspense>
  );
}

