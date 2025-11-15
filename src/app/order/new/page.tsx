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

  const categories = Array.from(new Set(services.map((s) => s.category))).filter(Boolean);
  const filteredServices = selectedCategory
    ? services.filter((s) => s.category === selectedCategory)
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
      setError(
        `تعداد باید بین ${selectedService.min_quantity} تا ${selectedService.max_quantity} باشد`
      );
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
            },
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
      <div className="bg-primary-background min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-24">
          <FaSpinner className="text-primary-accent animate-spin text-4xl" />
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-primary-background min-h-screen">
        <Header />
        <div className="py-24">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <FaSpinner className="text-primary-accent mx-auto mb-4 animate-spin text-4xl" />
            <p className="text-gray-700">در حال بارگذاری سرویس‌ها...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-primary-background min-h-screen">
      <Header />

      <div className="py-12 pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-primary-text mb-3 text-3xl font-bold md:text-4xl">
              ثبت سفارش جدید
            </h1>
            <p className="text-gray-600">سرویس مورد نظر خود را انتخاب کرده و سفارش دهید</p>
          </div>

          {/* Balance Display */}
          <div className="mb-6 rounded-2xl border border-white/20 bg-gradient-to-r from-[#279EFD]/20 to-[#1565C0]/20 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-700">موجودی کیف پول:</span>
              <span className="text-primary-text text-2xl font-bold">
                {userBalance.toLocaleString()} تومان
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div className="rounded-2xl border border-white/20 bg-white/40 p-6 backdrop-blur-md">
              <label className="mb-3 block text-sm font-bold text-gray-700">دسته‌بندی</label>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedService(null);
                    }}
                    className={`rounded-xl border-2 p-4 transition-all ${
                      selectedCategory === category
                        ? 'border-primary-accent bg-primary-accent/10'
                        : 'hover:border-primary-accent/50 border-white/20 bg-white/20'
                    }`}
                  >
                    <div className="mb-2 text-2xl">
                      {category.toLowerCase().includes('instagram')
                        ? '📱'
                        : category.toLowerCase().includes('tiktok')
                          ? '🎵'
                          : category.toLowerCase().includes('youtube')
                            ? '🎬'
                            : category.toLowerCase().includes('twitter')
                              ? '🐦'
                              : '⭐'}
                    </div>
                    <div className="text-sm font-bold text-gray-700">{category}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Service Selection */}
            {selectedCategory && (
              <div className="rounded-2xl border border-white/20 bg-white/40 p-6 backdrop-blur-md">
                <label className="mb-3 block text-sm font-bold text-gray-700">سرویس</label>
                <select
                  value={selectedService?.id || ''}
                  onChange={(e) => {
                    const service = services.find((s) => s.id === e.target.value);
                    setSelectedService(service || null);
                    setQuantity('');
                  }}
                  className="focus:border-primary-accent w-full rounded-xl border-2 border-white/20 bg-white/50 px-4 py-3 text-right focus:outline-none"
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
                  <div className="mt-3 rounded-lg bg-blue-50 p-3 text-sm text-gray-700">
                    <div className="mb-1 flex justify-between">
                      <span>حداقل:</span>
                      <span className="font-bold">
                        {selectedService.min_quantity.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>حداکثر:</span>
                      <span className="font-bold">
                        {selectedService.max_quantity.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Link Input */}
            {selectedService && (
              <div className="rounded-2xl border border-white/20 bg-white/40 p-6 backdrop-blur-md">
                <label className="mb-3 block text-sm font-bold text-gray-700">لینک / آدرس</label>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://instagram.com/username"
                  className="focus:border-primary-accent w-full rounded-xl border-2 border-white/20 bg-white/50 px-4 py-3 text-left focus:outline-none"
                  required
                  dir="ltr"
                />
              </div>
            )}

            {/* Quantity Input */}
            {selectedService && (
              <div className="rounded-2xl border border-white/20 bg-white/40 p-6 backdrop-blur-md">
                <label className="mb-3 block text-sm font-bold text-gray-700">تعداد</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min={selectedService.min_quantity}
                  max={selectedService.max_quantity}
                  placeholder={`${selectedService.min_quantity} - ${selectedService.max_quantity}`}
                  className="focus:border-primary-accent w-full rounded-xl border-2 border-white/20 bg-white/50 px-4 py-3 text-center text-lg font-bold focus:outline-none"
                  required
                />
              </div>
            )}

            {/* Price Display */}
            {selectedService && quantity && (
              <div className="rounded-2xl border border-white/20 bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-6 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-700">قیمت کل:</span>
                  <span className="text-primary-text text-3xl font-bold">
                    {totalPrice.toLocaleString()} تومان
                  </span>
                </div>
              </div>
            )}

            {/* Payment Method Selection */}
            {selectedService && quantity && (
              <div className="rounded-2xl border border-white/20 bg-white/40 p-6 backdrop-blur-md">
                <label className="mb-3 block text-sm font-bold text-gray-700">روش پرداخت</label>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    disabled={!canAfford}
                    className={`rounded-xl border-2 p-4 transition-all ${
                      paymentMethod === 'wallet'
                        ? 'border-primary-accent bg-primary-accent/10'
                        : 'hover:border-primary-accent/50 border-white/20 bg-white/20'
                    } ${!canAfford ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    <div className="mb-2 text-2xl">💰</div>
                    <div className="mb-1 font-bold text-gray-700">کیف پول</div>
                    <div className="text-xs text-gray-600">
                      {canAfford ? 'پرداخت از موجودی' : 'موجودی ناکافی'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('gateway')}
                    className={`rounded-xl border-2 p-4 transition-all ${
                      paymentMethod === 'gateway'
                        ? 'border-primary-accent bg-primary-accent/10'
                        : 'hover:border-primary-accent/50 border-white/20 bg-white/20'
                    }`}
                  >
                    <div className="mb-2 text-2xl">💳</div>
                    <div className="mb-1 font-bold text-gray-700">درگاه پرداخت</div>
                    <div className="text-xs text-gray-600">پرداخت اینترنتی</div>
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                <FaExclamationTriangle className="flex-shrink-0 text-xl text-red-500" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedService || !link || !quantity || submitting}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>در حال پردازش...</span>
                </>
              ) : (
                <>
                  <FaCheckCircle />
                  <span>{paymentMethod === 'gateway' ? 'پرداخت و ثبت سفارش' : 'ثبت سفارش'}</span>
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
    <Suspense
      fallback={
        <div className="bg-primary-background min-h-screen">
          <Header />
          <div className="flex items-center justify-center py-24">
            <FaSpinner className="text-primary-accent animate-spin text-4xl" />
          </div>
          <Footer />
        </div>
      }
    >
      <NewOrderContent />
    </Suspense>
  );
}
