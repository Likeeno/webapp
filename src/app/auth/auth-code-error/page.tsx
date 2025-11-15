'use client';

import { Header, Footer } from '@/components';
import { FaExclamationTriangle, FaHome, FaSignInAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function AuthCodeErrorPage() {
  return (
    <div className="bg-primary-background min-h-screen">
      <Header />

      {/* Error Section */}
      <section className="px-4 pt-24 pb-16">
        <div className="mx-auto max-w-md">
          {/* Error Card */}
          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-xl">
            {/* Error Icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20">
              <FaExclamationTriangle className="text-3xl text-red-500" />
            </div>

            {/* Error Message */}
            <h1 className="text-primary-text mb-4 text-2xl font-bold">خطا در احراز هویت</h1>
            <p className="mb-8 text-gray-600">
              متأسفانه مشکلی در فرآیند ورود شما پیش آمده است. لطفاً دوباره تلاش کنید.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link
                href="/login"
                className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] py-4 font-bold text-white transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1]"
              >
                <FaSignInAlt className="ml-2" />
                تلاش مجدد برای ورود
              </Link>

              <Link
                href="/"
                className="text-primary-text flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white/20 py-4 font-bold transition-all duration-300 hover:bg-white/30"
              >
                <FaHome className="ml-2" />
                بازگشت به صفحه اصلی
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
