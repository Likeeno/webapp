'use client';

import { FaRocket, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function QuickOrder() {
  const router = useRouter();

  const handleOrderClick = () => {
    router.push('/order/new');
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#279EFD]/20 to-[#1565C0]/20 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Right side - Content */}
            <div className="text-right">
              <div className="inline-block bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                پیشنهاد ویژه
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-text mb-4">
                همین الان سفارش بده!
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                افزایش فالوور، لایک، بازدید و... برای اینستاگرام، تیک‌تاک، یوتیوب و سایر شبکه‌های اجتماعی
              </p>
              <ul className="space-y-3 mb-8 text-right">
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-full"></div>
                  <span>شروع فوری و پردازش سریع</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-full"></div>
                  <span>کیفیت بالا و ضمانت بازگشت وجه</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-full"></div>
                  <span>قیمت مناسب و رقابتی</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-full"></div>
                  <span>پشتیبانی ۲۴ساعته</span>
                </li>
              </ul>
              <button
                onClick={handleOrderClick}
                className="group bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto md:mx-0"
              >
                <FaRocket className="text-xl" />
                <span>ثبت سفارش</span>
                <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Left side - Visual */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-3xl opacity-20 blur-3xl"></div>
                <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-[#279EFD]/20 to-[#1565C0]/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                      <div className="text-4xl mb-2">📱</div>
                      <div className="text-sm text-gray-700 font-bold">اینستاگرام</div>
                    </div>
                    <div className="bg-gradient-to-br from-[#279EFD]/20 to-[#1565C0]/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                      <div className="text-4xl mb-2">🎵</div>
                      <div className="text-sm text-gray-700 font-bold">تیک‌تاک</div>
                    </div>
                    <div className="bg-gradient-to-br from-[#279EFD]/20 to-[#1565C0]/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                      <div className="text-4xl mb-2">🎬</div>
                      <div className="text-sm text-gray-700 font-bold">یوتیوب</div>
                    </div>
                    <div className="bg-gradient-to-br from-[#279EFD]/20 to-[#1565C0]/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                      <div className="text-4xl mb-2">🐦</div>
                      <div className="text-sm text-gray-700 font-bold">توییتر</div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <div className="text-2xl font-bold text-primary-text mb-1">+۱۵۰</div>
                    <div className="text-sm text-gray-600">سرویس متنوع</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


