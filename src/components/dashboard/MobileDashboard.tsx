'use client';

import { FaUser, FaWallet, FaPlus } from 'react-icons/fa';
import { getPlatformIcon, getStatusIcon, formatDate } from '@/lib/dashboard-utils';
import { getOrderStatusText, getOrderStatusColor } from '@/lib/orders';
import DashboardOrderForm from '@/components/DashboardOrderForm';
import DashboardOrders from './DashboardOrders';
import DashboardWallet from './DashboardWallet';
import DashboardSettings from './DashboardSettings';
import MobileNavigation from './MobileNavigation';

interface Order {
  id: string;
  service: string;
  status: string;
  price: number;
  created_at: string;
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  isPositive: boolean;
}

interface MobileDashboardProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userName: string;
  userEmail: string;
  userBalance: number;
  userLevel: 'standard' | 'premium';
  orders: Order[];
  transactions: Transaction[];
  userProfileBalance: number;
  onOrderSubmit: (data: any) => Promise<void>;
  orderSubmitting: boolean;
  orderError: string | null;
  onProfileUpdate: (name: string) => Promise<void>;
  onPasswordChange: (password: string) => Promise<void>;
  onLogout: () => void;
}

export default function MobileDashboard({
  activeSection,
  onSectionChange,
  userName,
  userEmail,
  userBalance,
  userLevel,
  orders,
  transactions,
  userProfileBalance,
  onOrderSubmit,
  orderSubmitting,
  orderError,
  onProfileUpdate,
  onPasswordChange,
  onLogout,
}: MobileDashboardProps) {
  const recentOrders = orders.slice(0, 3);
  const recentTransactions = transactions.slice(0, 10);

  return (
    <div className="flex min-h-screen flex-col px-4 pt-20 pb-24 lg:hidden">
      <div className="mx-auto w-full max-w-7xl pb-8">
        {/* Mobile Header */}
        <div className="mb-4 rounded-3xl border-b border-white/20 bg-white/10 px-4 py-3 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#279EFD] to-[#1565C0] shadow-lg">
                <FaUser className="text-white" />
              </div>
              <div>
                <h3 className="text-primary-text font-bold">{userName}</h3>
                <p className="text-sm text-gray-700">{userBalance.toLocaleString()} تومان</p>
              </div>
            </div>
            {userLevel === 'premium' && (
              <span className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2 py-1 text-xs font-medium text-white">
                پریمیوم
              </span>
            )}
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 p-4">
          <div className="mb-6">
            <h1 className="text-primary-text mb-1 text-2xl font-bold">
              {activeSection === 'dashboard' && 'داشبورد'}
              {activeSection === 'new-order' && 'ثبت سفارش جدید'}
              {activeSection === 'orders' && 'سفارشات من'}
              {activeSection === 'wallet' && 'کیف پول'}
              {activeSection === 'settings' && 'تنظیمات حساب'}
            </h1>
            <p className="text-sm text-gray-700">
              {activeSection === 'dashboard' && 'نمای کلی حساب کاربری شما'}
              {activeSection === 'new-order' && 'سرویس مورد نظر خود را انتخاب کنید'}
              {activeSection === 'orders' && 'مدیریت و پیگیری سفارشات'}
              {activeSection === 'wallet' && 'مدیریت کیف پول و تراکنش‌ها'}
              {activeSection === 'settings' && 'تنظیمات شخصی حساب کاربری'}
            </p>
          </div>

          {activeSection === 'dashboard' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/20 bg-gradient-to-r from-[#279EFD] to-[#1565C0] p-4 text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="mb-1 text-xl font-bold">سلام {userName} 👋</h2>
                    <p className="text-sm opacity-90">خوش آمدید!</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                    <FaUser className="text-xl" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-xl">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-primary-text font-bold">موجودی کیف پول</h3>
                  <FaWallet className="text-[#279EFD]" />
                </div>
                <div className="text-primary-text mb-3 text-2xl font-bold">
                  {userBalance.toLocaleString()} تومان
                </div>
                <button
                  onClick={() => onSectionChange('wallet')}
                  className="w-full rounded-xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] py-2 text-sm font-medium text-white shadow-lg"
                >
                  شارژ حساب
                </button>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-primary-text text-xl font-bold">آماده برای رشد؟</h3>
                <button
                  onClick={() => onSectionChange('new-order')}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-700"
                >
                  <FaPlus />
                  <span>ثبت سفارش</span>
                </button>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-primary-text font-bold">سفارشات اخیر</h2>
                  <button
                    onClick={() => onSectionChange('orders')}
                    className="text-sm text-[#279EFD]"
                  >
                    مشاهده همه
                  </button>
                </div>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-xl border border-white/20 bg-white/20 p-3 backdrop-blur-sm"
                    >
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/30 bg-white/80 backdrop-blur-sm">
                          {getPlatformIcon(order.service)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-primary-text text-sm font-bold">{order.service}</h3>
                          <p className="text-xs text-gray-600">شناسه: {order.id.slice(0, 8)}</p>
                        </div>
                        <div className="text-right">
                          <div className="mb-1 flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-bold ${getOrderStatusColor(order.status as any)}`}
                            >
                              {getOrderStatusText(order.status as any)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">{formatDate(order.created_at)}</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-text font-bold">
                          {order.price.toLocaleString()} تومان
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'new-order' && (
            <div className="space-y-4">
              <DashboardOrderForm
                userBalance={userProfileBalance}
                onOrderSubmit={onOrderSubmit}
                isLoading={orderSubmitting}
              />
            </div>
          )}

          {activeSection === 'orders' && <DashboardOrders orders={orders} />}

          {activeSection === 'wallet' && (
            <DashboardWallet balance={userBalance} transactions={recentTransactions} />
          )}

          {activeSection === 'settings' && (
            <DashboardSettings
              userName={userName}
              onProfileUpdate={onProfileUpdate}
              onPasswordChange={onPasswordChange}
              onLogout={onLogout}
            />
          )}
        </div>
      </div>

      <MobileNavigation activeSection={activeSection} onSectionChange={onSectionChange} />
    </div>
  );
}
