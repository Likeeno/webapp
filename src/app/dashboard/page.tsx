'use client';

import { Header, Footer } from '../../components';
import { FaUser, FaSignOutAlt, FaCog, FaHistory, FaCreditCard, FaHeadset } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#279EFD]"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-primary-background">
      <Header />
      
      {/* Dashboard Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary-text mb-2">
                  خوش آمدید، {user.email}
                </h1>
                <p className="text-gray-600">به پنل کاربری لایکینو خوش آمدید</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSignOut}
                  className="bg-red-500/20 text-red-600 px-4 py-2 rounded-full hover:bg-red-500/30 transition-all duration-300 flex items-center gap-2"
                >
                  <FaSignOutAlt />
                  خروج
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-primary-text">سفارشات فعال</h3>
                <div className="w-10 h-10 bg-[#279EFD]/20 rounded-full flex items-center justify-center">
                  <FaHistory className="text-[#279EFD]" />
                </div>
              </div>
              <div className="text-3xl font-bold text-primary-text mb-2">12</div>
              <p className="text-gray-600 text-sm">سفارش در حال پردازش</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-primary-text">موجودی</h3>
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <FaCreditCard className="text-green-500" />
                </div>
              </div>
              <div className="text-3xl font-bold text-primary-text mb-2">۲۵۰,۰۰۰</div>
              <p className="text-gray-600 text-sm">تومان موجودی</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-primary-text">پشتیبانی</h3>
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <FaHeadset className="text-orange-500" />
                </div>
              </div>
              <div className="text-3xl font-bold text-primary-text mb-2">۳</div>
              <p className="text-gray-600 text-sm">تیکت باز</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-8 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-primary-text mb-6">سفارشات اخیر</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-right py-4 px-4 text-sm font-bold text-primary-text">شماره سفارش</th>
                    <th className="text-right py-4 px-4 text-sm font-bold text-primary-text">سرویس</th>
                    <th className="text-right py-4 px-4 text-sm font-bold text-primary-text">مبلغ</th>
                    <th className="text-right py-4 px-4 text-sm font-bold text-primary-text">وضعیت</th>
                    <th className="text-right py-4 px-4 text-sm font-bold text-primary-text">تاریخ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 text-sm text-gray-300">#LK-2024-001</td>
                    <td className="py-4 px-4 text-sm text-gray-300">فالوور اینستاگرام</td>
                    <td className="py-4 px-4 text-sm text-gray-300">۵۰,۰۰۰ تومان</td>
                    <td className="py-4 px-4">
                      <span className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-xs">
                        تکمیل شده
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-300">۱۴۰۲/۱۲/۱۵</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 text-sm text-gray-300">#LK-2024-002</td>
                    <td className="py-4 px-4 text-sm text-gray-300">لایک تیک تاک</td>
                    <td className="py-4 px-4 text-sm text-gray-300">۳۰,۰۰۰ تومان</td>
                    <td className="py-4 px-4">
                      <span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-xs">
                        در حال پردازش
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-300">۱۴۰۲/۱۲/۱۴</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-sm text-gray-300">#LK-2024-003</td>
                    <td className="py-4 px-4 text-sm text-gray-300">بازدید یوتیوب</td>
                    <td className="py-4 px-4 text-sm text-gray-300">۷۵,۰۰۰ تومان</td>
                    <td className="py-4 px-4">
                      <span className="bg-blue-500/20 text-blue-500 px-3 py-1 rounded-full text-xs">
                        در انتظار
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-300">۱۴۰۲/۱۲/۱۳</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Link 
              href="/orders"
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-primary-text mb-2">سفارش جدید</h3>
                  <p className="text-gray-600">سفارش جدید ثبت کنید</p>
                </div>
                <div className="w-12 h-12 bg-[#279EFD]/20 rounded-full flex items-center justify-center group-hover:bg-[#279EFD]/30 transition-all duration-300">
                  <FaUser className="text-[#279EFD]" />
                </div>
              </div>
            </Link>

            <Link 
              href="/support"
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-primary-text mb-2">پشتیبانی</h3>
                  <p className="text-gray-600">با تیم پشتیبانی در ارتباط باشید</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-all duration-300">
                  <FaHeadset className="text-orange-500" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 