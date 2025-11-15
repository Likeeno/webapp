'use client';

import { useState, useEffect } from 'react';
import { FaWallet, FaSpinner } from 'react-icons/fa';
import { formatDateTime } from '@/lib/dashboard-utils';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  isPositive: boolean;
}

interface DashboardWalletProps {
  balance: number;
  transactions: Transaction[];
}

const PRESET_AMOUNTS = [
  { value: 50000, label: '۵۰,۰۰۰' },
  { value: 100000, label: '۱۰۰,۰۰۰' },
  { value: 200000, label: '۲۰۰,۰۰۰' },
  { value: 500000, label: '۵۰۰,۰۰۰' },
];

export default function DashboardWallet({ balance, transactions }: DashboardWalletProps) {
  const [chargeAmount, setChargeAmount] = useState<number>(100000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isPaymentConfigured, setIsPaymentConfigured] = useState(true);

  useEffect(() => {
    fetch('/api/payment/status')
      .then((res) => res.json())
      .then((data) => {
        setIsPaymentConfigured(data.configured);
        if (!data.configured) {
          setPaymentError(data.message || 'درگاه پرداخت پیکربندی نشده است');
        }
      })
      .catch((err) => {
        console.error('Error checking payment status:', err);
        setIsPaymentConfigured(false);
      });
  }, []);

  const handlePresetClick = (value: number) => {
    setChargeAmount(value);
    setIsCustom(false);
    setCustomAmount('');
    setPaymentError(null);
  };

  const handleCustomClick = () => {
    setIsCustom(true);
    setPaymentError(null);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setCustomAmount(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setChargeAmount(numValue);
    }
  };

  const handleCharge = async () => {
    if (chargeAmount < 10000) {
      setPaymentError('حداقل مبلغ شارژ ۱۰,۰۰۰ تومان است');
      return;
    }

    if (chargeAmount > 50000000) {
      setPaymentError('حداکثر مبلغ شارژ ۵۰,۰۰۰,۰۰۰ تومان است');
      return;
    }

    try {
      setIsPaymentLoading(true);
      setPaymentError(null);

      const response = await fetch('/api/payment/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: chargeAmount }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        const errorMsg = data.message
          ? `${data.error}: ${data.message}`
          : data.error || 'خطا در ایجاد درخواست پرداخت';
        throw new Error(errorMsg);
      }

      window.location.href = data.paymentUrl;
    } catch (err) {
      console.error('Charge error:', err);
      const errorMessage = err instanceof Error ? err.message : 'خطا در پردازش درخواست';
      setPaymentError(errorMessage);
      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Balance Overview */}
      <div className="rounded-3xl border border-white/20 bg-gradient-to-r from-[#279EFD] to-[#1565C0] p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold">کیف پول</h2>
            <p className="mb-4 opacity-90">موجودی فعلی شما</p>
            <div className="text-4xl font-bold">{balance.toLocaleString()} تومان</div>
          </div>
          <FaWallet className="text-6xl opacity-30" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Charge Options */}
        <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
          <h3 className="text-primary-text mb-4 text-lg font-bold">شارژ کیف پول</h3>

          {paymentError && (
            <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/20 p-4">
              <p className="text-center text-sm text-red-600">{paymentError}</p>
            </div>
          )}

          <div className="mb-4 grid grid-cols-2 gap-3">
            {PRESET_AMOUNTS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => handlePresetClick(preset.value)}
                disabled={isPaymentLoading}
                className={`rounded-2xl p-4 text-center transition-all duration-300 ${
                  !isCustom && chargeAmount === preset.value
                    ? 'bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white shadow-lg'
                    : 'text-primary-text border border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30'
                } disabled:opacity-50`}
              >
                <div className="text-lg font-bold">{preset.label}</div>
                <div className="text-sm opacity-90">تومان</div>
              </button>
            ))}
          </div>

          <button
            onClick={handleCustomClick}
            disabled={isPaymentLoading}
            className={`mb-4 w-full rounded-2xl p-4 text-center transition-all duration-300 ${
              isCustom
                ? 'bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white shadow-lg'
                : 'text-primary-text border border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30'
            } disabled:opacity-50`}
          >
            <div className="text-lg font-bold">مبلغ دلخواه</div>
          </button>

          {isCustom && (
            <div className="mb-4">
              <input
                type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="مبلغ را وارد کنید"
                disabled={isPaymentLoading}
                className="text-primary-text w-full rounded-2xl border-2 border-white/40 bg-white/30 px-4 py-3 text-center text-lg placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 focus:outline-none disabled:opacity-50"
              />
              {chargeAmount > 0 && (
                <p className="mt-2 text-center text-sm text-gray-700">
                  {chargeAmount.toLocaleString()} تومان
                </p>
              )}
            </div>
          )}

          <div className="mb-4 rounded-2xl border border-white/20 bg-white/20 p-4 backdrop-blur-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-gray-700">مبلغ قابل پرداخت:</span>
              <span className="text-primary-text text-2xl font-bold">
                {chargeAmount.toLocaleString()} تومان
              </span>
            </div>
            <div className="border-t border-white/20 pt-2 text-center text-xs text-gray-600">
              معادل {(chargeAmount * 10).toLocaleString()} ریال
            </div>
          </div>

          <button
            onClick={handleCharge}
            disabled={isPaymentLoading || chargeAmount < 10000 || !isPaymentConfigured}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1] disabled:opacity-50"
          >
            {isPaymentLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                در حال پردازش...
              </>
            ) : (
              <>
                <FaWallet />
                پرداخت و شارژ
              </>
            )}
          </button>

          {isPaymentConfigured ? (
            <p className="mt-4 text-center text-xs text-gray-600">
              پس از کلیک بر روی پرداخت، به درگاه پرداخت منتقل خواهید شد
            </p>
          ) : (
            <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/20 p-3">
              <p className="text-center text-xs text-amber-700">
                ⚠️ درگاه پرداخت هنوز پیکربندی نشده است. لطفاً متغیرهای محیطی SizPay را تنظیم کنید.
              </p>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
          <h3 className="text-primary-text mb-4 text-lg font-bold">تراکنش‌های اخیر</h3>
          {transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/20 p-3 backdrop-blur-sm"
                >
                  <div className="flex-1">
                    <p className="text-primary-text font-bold">{transaction.description}</p>
                    <p className="text-sm text-gray-700">{formatDateTime(transaction.date)}</p>
                  </div>
                  <div
                    className={`text-right ${transaction.isPositive ? 'text-green-600' : 'text-red-600'}`}
                  >
                    <p className="font-bold">
                      {transaction.isPositive ? '+' : '-'}
                      {transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-sm">تومان</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-600">هنوز تراکنشی ثبت نشده است</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
