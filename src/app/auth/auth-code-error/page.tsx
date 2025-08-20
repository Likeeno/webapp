'use client';

import { Header, Footer } from '../../components';
import { FaExclamationTriangle, FaHome, FaSignInAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-primary-background">
      <Header />
      
      {/* Error Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-md mx-auto">
          {/* Error Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center">
            {/* Error Icon */}
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaExclamationTriangle className="text-red-500 text-3xl" />
            </div>

            {/* Error Message */}
            <h1 className="text-2xl font-bold text-primary-text mb-4">
              خطا در احراز هویت
            </h1>
            <p className="text-gray-600 mb-8">
              متأسفانه مشکلی در فرآیند ورود شما پیش آمده است. لطفاً دوباره تلاش کنید.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link 
                href="/login"
                className="w-full bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white py-4 rounded-2xl font-bold hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300 flex items-center justify-center"
              >
                <FaSignInAlt className="ml-2" />
                تلاش مجدد برای ورود
              </Link>
              
              <Link 
                href="/"
                className="w-full bg-white/20 text-primary-text py-4 rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 flex items-center justify-center border border-white/20"
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
