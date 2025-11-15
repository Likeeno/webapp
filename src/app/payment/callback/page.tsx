'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header, Footer } from '@/components';
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';

interface PaymentDetails {
  refNo?: string;
  orderId?: string;
  amount: number;
  newBalance: number;
}

function PaymentCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('در حال پردازش پرداخت...');
  const [details, setDetails] = useState<PaymentDetails | null>(null);

  useEffect(() => {
    const processPayment = async () => {
      try {
        // Check for error parameter first
        const errorParam = searchParams.get('error');
        if (errorParam) {
          setStatus('error');
          setMessage(errorParam);
          return;
        }

        // Get payment parameters from URL
        const token = searchParams.get('Token');
        const resCod = searchParams.get('ResCod');
        const resMessage = searchParams.get('Message');
        const merchantId = searchParams.get('MerchantID');
        const terminalId = searchParams.get('TerminalID');
        const amount = searchParams.get('Amount');
        const orderId = searchParams.get('OrderID');

        // Check if payment was initiated successfully
        if (!token || !resCod) {
          setStatus('error');
          setMessage(resMessage || 'اطلاعات پرداخت ناقص است');
          return;
        }

        // Verify payment with our backend
        const response = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Token: token,
            ResCod: resCod,
            Message: resMessage,
            MerchantID: merchantId,
            TerminalID: terminalId,
            Amount: amount,
            OrderID: orderId,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setStatus('success');
          setMessage('پرداخت با موفقیت انجام شد');
          setDetails(data.data);

          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push('/dashboard');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.message || data.error || 'پرداخت ناموفق بود');
        }
      } catch (error) {
        console.error('Payment callback error:', error);
        setStatus('error');
        setMessage('خطا در پردازش پرداخت');
      }
    };

    processPayment();
  }, [searchParams, router]);

  return (
    <div className="bg-primary-background min-h-screen">
      <Header />

      <div className="px-4 pt-32 pb-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-xl">
            {status === 'loading' && (
              <>
                <FaSpinner className="mx-auto mb-6 animate-spin text-6xl text-[#279EFD]" />
                <h1 className="text-primary-text mb-4 text-2xl font-bold">در حال پردازش پرداخت</h1>
                <p className="text-gray-700">{message}</p>
              </>
            )}

            {status === 'success' && (
              <>
                <FaCheckCircle className="mx-auto mb-6 text-6xl text-green-500" />
                <h1 className="text-primary-text mb-4 text-2xl font-bold">پرداخت موفق</h1>
                <p className="mb-6 text-gray-700">{message}</p>

                {details && (
                  <div className="mb-6 rounded-2xl border border-white/20 bg-white/20 p-6 text-right backdrop-blur-sm">
                    <div className="grid grid-cols-2 gap-4">
                      {details.refNo && (
                        <>
                          <div className="text-gray-700">شماره مرجع:</div>
                          <div className="text-primary-text font-bold">{details.refNo}</div>
                        </>
                      )}
                      {details.orderId && (
                        <>
                          <div className="text-gray-700">شماره سفارش:</div>
                          <div className="text-primary-text font-bold">{details.orderId}</div>
                        </>
                      )}
                      <div className="text-gray-700">مبلغ پرداختی:</div>
                      <div className="text-primary-text font-bold">
                        {Number(details.amount).toLocaleString()} تومان
                      </div>
                      <div className="text-gray-700">موجودی جدید:</div>
                      <div className="font-bold text-green-600">
                        {Number(details.newBalance).toLocaleString()} تومان
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-sm text-gray-600">در حال انتقال به داشبورد...</p>
              </>
            )}

            {status === 'error' && (
              <>
                <FaExclamationTriangle className="mx-auto mb-6 text-6xl text-red-500" />
                <h1 className="text-primary-text mb-4 text-2xl font-bold">خطا در پرداخت</h1>
                <p className="mb-6 text-red-600">{message}</p>

                <button
                  onClick={() => router.push('/dashboard')}
                  className="rounded-2xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] px-6 py-3 font-bold text-white transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1]"
                >
                  بازگشت به داشبورد
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-primary-background min-h-screen">
          <Header />
          <div className="py-24">
            <div className="mx-auto max-w-lg px-4">
              <div className="rounded-3xl border border-white/20 bg-white/40 p-8 text-center shadow-2xl backdrop-blur-md">
                <FaSpinner className="text-primary-accent mx-auto mb-6 animate-spin text-6xl" />
                <h1 className="text-primary-text mb-4 text-2xl font-bold">در حال پردازش...</h1>
                <p className="text-gray-700">لطفاً صبر کنید...</p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      }
    >
      <PaymentCallbackContent />
    </Suspense>
  );
}
