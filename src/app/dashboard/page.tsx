'use client';

import { Header, Footer } from '../../components';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboardData } from '@/hooks/useDashboardData';
import DashboardOrderForm from '@/components/DashboardOrderForm';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardOrders from '@/components/dashboard/DashboardOrders';
import DashboardWallet from '@/components/dashboard/DashboardWallet';
import DashboardSettings from '@/components/dashboard/DashboardSettings';
import MobileDashboard from '@/components/dashboard/MobileDashboard';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  // Get authenticated user and dashboard data
  const { user: authUser, loading: authLoading, signOut } = useAuth();
  const {
    user: userProfile,
    orders,
    transactions,
    loading: dataLoading,
    error,
    refetch,
  } = useDashboardData(authUser);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Handle profile update
  const handleProfileUpdate = async (name: string) => {
    const response = await fetch('/api/user/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'خطا در به‌روزرسانی');
    }

    refetch();
  };

  // Handle password change
  const handlePasswordChange = async (password: string) => {
    const response = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'خطا در تغییر رمز عبور');
    }
  };

  // Handle order submission
  const handleOrderSubmit = async (data: any) => {
    setOrderSubmitting(true);
    setOrderError(null);

    try {
      if (data.paymentMethod === 'gateway') {
        const paymentResponse = await fetch('/api/payment/init', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: data.price,
            orderData: {
              japServiceId: data.japServiceId,
              link: data.link,
              quantity: data.quantity,
              serviceName: data.serviceName,
            },
          }),
        });

        const paymentData = await paymentResponse.json();

        if (!paymentData.success || !paymentData.paymentUrl) {
          throw new Error(paymentData.error || 'خطا در ایجاد درخواست پرداخت');
        }

        window.location.href = paymentData.paymentUrl;
      } else {
        const orderResponse = await fetch('/api/orders/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            japServiceId: data.japServiceId,
            link: data.link,
            quantity: data.quantity,
            price: data.price,
            serviceName: data.serviceName,
          }),
        });

        const orderData = await orderResponse.json();

        if (!orderData.success) {
          throw new Error(orderData.error || 'خطا در ثبت سفارش');
        }

        await refetch();
        setActiveSection('orders');
      }
    } catch (err) {
      console.error('Order error:', err);
      setOrderError(err instanceof Error ? err.message : 'خطا در ثبت سفارش');
      throw err;
    } finally {
      setOrderSubmitting(false);
    }
  };

  // Loading state
  if (authLoading || dataLoading) {
    return (
      <div className="bg-primary-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <FaSpinner className="mx-auto mb-4 animate-spin text-4xl text-[#279EFD]" />
          <p className="text-primary-text">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-primary-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <FaExclamationTriangle className="mx-auto mb-4 text-4xl text-red-500" />
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // No user data
  if (!userProfile || !authUser) {
    return (
      <div className="bg-primary-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-primary-text">لطفاً وارد شوید</p>
        </div>
      </div>
    );
  }

  // User data for display
  const displayUser = {
    name: userProfile.name || authUser.email?.split('@')[0] || 'کاربر',
    email: authUser.email || '',
    balance: userProfile.balance || 0,
    level: 'standard' as 'standard' | 'premium',
  };

  // Get recent orders (last 3)
  const recentOrders = orders.slice(0, 3);

  // Get recent transactions (last 10 for wallet section)
  const recentTransactions = transactions.slice(0, 10);

  return (
    <div className="bg-primary-background min-h-screen">
      <Header />

      {/* Desktop Layout */}
      <div className="hidden min-h-screen px-4 pt-20 pb-16 lg:flex">
        <div className="mx-auto flex w-full max-w-7xl gap-6">
          <DashboardSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            userName={displayUser.name}
            userEmail={displayUser.email}
            userBalance={displayUser.balance}
            userLevel={displayUser.level}
          />

          {/* Main Content */}
          <div className="flex-1">
            <div className="w-full">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-primary-text mb-2 text-3xl font-bold">
                  {activeSection === 'dashboard' && 'داشبورد'}
                  {activeSection === 'new-order' && 'ثبت سفارش جدید'}
                  {activeSection === 'orders' && 'سفارشات من'}
                  {activeSection === 'wallet' && 'کیف پول'}
                  {activeSection === 'settings' && 'تنظیمات حساب'}
                </h1>
                <p className="text-gray-700">
                  {activeSection === 'dashboard' && 'نمای کلی حساب کاربری شما'}
                  {activeSection === 'new-order' &&
                    'سرویس مورد نظر خود را انتخاب کرده و سفارش دهید'}
                  {activeSection === 'orders' && 'مدیریت و پیگیری سفارشات'}
                  {activeSection === 'wallet' && 'مدیریت کیف پول و تراکنش‌ها'}
                  {activeSection === 'settings' && 'تنظیمات شخصی حساب کاربری'}
                </p>
              </div>

              {/* Content Sections */}
              {activeSection === 'dashboard' && (
                <DashboardOverview
                  userName={displayUser.name}
                  recentOrders={recentOrders}
                  onNewOrder={() => setActiveSection('new-order')}
                  onViewAllOrders={() => setActiveSection('orders')}
                />
              )}

              {activeSection === 'new-order' && (
                <div className="space-y-6">
                  {orderError && (
                    <div className="rounded-2xl border border-red-500/30 bg-red-500/20 p-4">
                      <p className="text-center text-red-600">{orderError}</p>
                    </div>
                  )}
                  <DashboardOrderForm
                    userBalance={userProfile?.balance || 0}
                    onOrderSubmit={handleOrderSubmit}
                    isLoading={orderSubmitting}
                  />
                </div>
              )}

              {activeSection === 'orders' && <DashboardOrders orders={orders} />}

              {activeSection === 'wallet' && (
                <DashboardWallet balance={displayUser.balance} transactions={recentTransactions} />
              )}

              {activeSection === 'settings' && (
                <DashboardSettings
                  userName={displayUser.name}
                  onProfileUpdate={handleProfileUpdate}
                  onPasswordChange={handlePasswordChange}
                  onLogout={handleLogout}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <MobileDashboard
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        userName={displayUser.name}
        userEmail={displayUser.email}
        userBalance={displayUser.balance}
        userLevel={displayUser.level}
        orders={orders}
        transactions={recentTransactions}
        userProfileBalance={userProfile?.balance || 0}
        onOrderSubmit={handleOrderSubmit}
        orderSubmitting={orderSubmitting}
        orderError={orderError}
        onProfileUpdate={handleProfileUpdate}
        onPasswordChange={handlePasswordChange}
        onLogout={handleLogout}
      />

      <Footer />
    </div>
  );
}
