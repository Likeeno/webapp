'use client';

import { Header, Footer } from '../../components';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboardData } from '@/hooks/useDashboardData';
import { getOrderStatusText, getOrderStatusColor } from '@/lib/orders';
import DashboardOrderForm from '@/components/DashboardOrderForm';
import { 
  FaUser, 
  FaInstagram, 
  FaTiktok, 
  FaYoutube, 
  FaTwitter,
  FaEye, 
  FaEyeSlash,
  FaWallet,
  FaClock,
  FaCheckCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaSearch,
  FaCrown,
  FaSignOutAlt,
  FaEdit,
  FaHome,
  FaPlus,
  FaBox,
  FaCreditCard,
  FaCog,
  FaLock,
  FaTimes,
  FaSave
} from 'react-icons/fa';

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [chargeAmount, setChargeAmount] = useState<number>(100000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isPaymentConfigured, setIsPaymentConfigured] = useState(true);
  
  // Settings state
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const [settingsSuccess, setSettingsSuccess] = useState<string | null>(null);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Order form state
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  
  // Get authenticated user and dashboard data
  const { user: authUser, loading: authLoading, signOut } = useAuth();
  const { user: userProfile, orders, transactions, loading: dataLoading, error, refetch } = useDashboardData(authUser);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Handle edit profile
  const handleOpenEditProfile = () => {
    setEditName(userProfile?.name || '');
    setIsEditProfileOpen(true);
    setSettingsError(null);
    setSettingsSuccess(null);
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      setSettingsError('لطفاً نام خود را وارد کنید');
      return;
    }

    try {
      setSettingsLoading(true);
      setSettingsError(null);

      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editName.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'خطا در به‌روزرسانی');
      }

      setSettingsSuccess('اطلاعات شما با موفقیت به‌روزرسانی شد');
      setIsEditProfileOpen(false);
      refetch(); // Refresh dashboard data
      
      // Clear success message after 3 seconds
      setTimeout(() => setSettingsSuccess(null), 3000);
    } catch (err) {
      console.error('Update profile error:', err);
      setSettingsError('خطا در به‌روزرسانی اطلاعات');
    } finally {
      setSettingsLoading(false);
    }
  };

  // Handle change password
  const handleOpenChangePassword = () => {
    setNewPassword('');
    setConfirmNewPassword('');
    setIsChangePasswordOpen(true);
    setSettingsError(null);
    setSettingsSuccess(null);
  };

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 8) {
      setSettingsError('رمز عبور جدید باید حداقل ۸ کاراکتر باشد');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setSettingsError('رمز عبور جدید و تکرار آن یکسان نیستند');
      return;
    }

    try {
      setSettingsLoading(true);
      setSettingsError(null);

      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'خطا در تغییر رمز عبور');
      }

      setSettingsSuccess('رمز عبور با موفقیت تغییر کرد');
      setIsChangePasswordOpen(false);
      setNewPassword('');
      setConfirmNewPassword('');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSettingsSuccess(null), 3000);
    } catch (err) {
      console.error('Change password error:', err);
      setSettingsError('خطا در تغییر رمز عبور');
    } finally {
      setSettingsLoading(false);
    }
  };

  // Preset amounts for wallet charge
  const PRESET_AMOUNTS = [
    { value: 50000, label: '۵۰,۰۰۰' },
    { value: 100000, label: '۱۰۰,۰۰۰' },
    { value: 200000, label: '۲۰۰,۰۰۰' },
    { value: 500000, label: '۵۰۰,۰۰۰' },
  ];

  // Check payment configuration when wallet section is accessed
  useEffect(() => {
    if (activeSection === 'wallet') {
      fetch('/api/payment/status')
        .then(res => res.json())
        .then(data => {
          setIsPaymentConfigured(data.configured);
          if (!data.configured) {
            setPaymentError(data.message || 'درگاه پرداخت پیکربندی نشده است');
          }
        })
        .catch(err => {
          console.error('Error checking payment status:', err);
          setIsPaymentConfigured(false);
        });
    }
  }, [activeSection]);


  // Loading state
  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-primary-background flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-[#279EFD] mx-auto mb-4" />
          <p className="text-primary-text">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-primary-background flex items-center justify-center">
        <div className="text-center">
          <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // No user data
  if (!userProfile || !authUser) {
    return (
      <div className="min-h-screen bg-primary-background flex items-center justify-center">
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
    level: 'standard' as 'standard' | 'premium', // You can add this to your database later
    points: 0 // You can add this to your database later
  };

  // Format date to Persian
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  };

  // Format date with time for transactions
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get recent orders (last 3)
  const recentOrders = orders.slice(0, 3);

  // Get recent transactions (last 10 for wallet section)
  const recentTransactions = transactions.slice(0, 10);


  // Detect platform from service name
  const getPlatformFromService = (service: string): string => {
    const lowerService = service.toLowerCase();
    if (lowerService.includes('instagram') || lowerService.includes('اینستاگرام')) return 'instagram';
    if (lowerService.includes('tiktok') || lowerService.includes('تیک تاک')) return 'tiktok';
    if (lowerService.includes('youtube') || lowerService.includes('یوتیوب')) return 'youtube';
    if (lowerService.includes('twitter') || lowerService.includes('توییتر')) return 'twitter';
    return 'other';
  };

  const getPlatformIcon = (service: string) => {
    const platform = getPlatformFromService(service);
    switch (platform) {
      case 'instagram': return <FaInstagram className="text-pink-500" />;
      case 'tiktok': return <FaTiktok className="text-black" />;
      case 'youtube': return <FaYoutube className="text-red-500" />;
      case 'twitter': return <FaTwitter className="text-blue-400" />;
      default: return <FaEye />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <FaCheckCircle className="text-green-600" />;
      case 'in_progress': 
      case 'processing': return <FaSpinner className="text-blue-600 animate-spin" />;
      case 'pending': return <FaClock className="text-amber-600" />;
      case 'cancelled':
      case 'refunded': return <FaExclamationTriangle className="text-red-600" />;
      default: return <FaExclamationTriangle className="text-gray-600" />;
    }
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Payment handlers
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

      // Redirect to payment gateway
      window.location.href = data.paymentUrl;
    } catch (err) {
      console.error('Charge error:', err);
      const errorMessage = err instanceof Error ? err.message : 'خطا در پردازش درخواست';
      setPaymentError(errorMessage);
      setIsPaymentLoading(false);
    }
  };


  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: FaHome },
    { id: 'orders', label: 'سفارشات', icon: FaBox },
    { id: 'wallet', label: 'کیف پول', icon: FaCreditCard },
    { id: 'settings', label: 'تنظیمات', icon: FaCog }
  ];

  return (
    <div className="min-h-screen bg-primary-background">
      <Header />
      
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto w-full flex gap-6">
          {/* Sidebar Card */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 sticky top-24">
          <div className="p-6">
            {/* User Profile */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="w-20 h-20 bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FaUser className="text-white text-2xl" />
                </div>
                {displayUser.level === 'premium' && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <FaCrown className="text-white text-xs" />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-bold text-primary-text mb-1">{displayUser.name}</h3>
              <p className="text-sm text-gray-700 mb-2">{displayUser.email}</p>
              {displayUser.level === 'premium' && (
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs rounded-full font-medium shadow-sm">
                  پریمیوم
                </span>
              )}
            </div>

            {/* Balance Card */}
            <div className="bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-2xl p-4 text-white mb-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-90">موجودی</span>
                <FaWallet className="text-xl opacity-70" />
              </div>
              <div className="text-2xl font-bold mb-3">{displayUser.balance.toLocaleString()} تومان</div>
              <button 
                onClick={() => setActiveSection('wallet')}
                className="w-full bg-white/20 hover:bg-white/30 transition-colors duration-300 rounded-xl py-2 text-sm font-medium"
              >
                شارژ حساب
              </button>
            </div>

            {/* New Order Button */}
            <button
              onClick={() => setActiveSection('new-order')}
              className="w-full mb-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 border-2 border-blue-400"
            >
              <FaPlus className="text-lg" />
              <span>سفارش جدید</span>
            </button>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 text-left ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white shadow-lg'
                        : 'text-primary-text hover:bg-white/30 hover:backdrop-blur-sm'
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
              </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
        <div className="w-full">
            
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-primary-text mb-2">
                {activeSection === 'dashboard' && 'داشبورد'}
                {activeSection === 'new-order' && 'ثبت سفارش جدید'}
                {activeSection === 'orders' && 'سفارشات من'}
                {activeSection === 'wallet' && 'کیف پول'}
                {activeSection === 'settings' && 'تنظیمات حساب'}
              </h1>
              <p className="text-gray-700">
                {activeSection === 'dashboard' && 'نمای کلی حساب کاربری شما'}
                {activeSection === 'new-order' && 'سرویس مورد نظر خود را انتخاب کرده و سفارش دهید'}
                {activeSection === 'orders' && 'مدیریت و پیگیری سفارشات'}
                {activeSection === 'wallet' && 'مدیریت کیف پول و تراکنش‌ها'}
                {activeSection === 'settings' && 'تنظیمات شخصی حساب کاربری'}
              </p>
            </div>

            {/* Content Sections */}
            {activeSection === 'dashboard' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-3xl p-6 text-white shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                      <h2 className="text-2xl font-bold mb-2">سلام {displayUser.name} 👋</h2>
                      <p className="opacity-90">خوش آمدید! امروز چه کاری می‌خواهید انجام دهید؟</p>
                    </div>
                    <div>
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <FaUser className="text-2xl" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Action - New Order */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-primary-text">
                    آماده برای رشد هستید؟
                  </h3>
                  <button
                    onClick={() => setActiveSection('new-order')}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <FaPlus className="text-lg" />
                    <span>ثبت سفارش جدید</span>
                  </button>
                </div>

                {/* Recent Orders */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-primary-text">سفارشات اخیر</h2>
                    <button 
                      onClick={() => setActiveSection('orders')}
                      className="text-[#279EFD] hover:text-[#1565C0] font-medium transition-colors duration-300"
                    >
                      مشاهده همه
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-colors duration-300 border border-white/20">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-sm border border-white/30">
                            {getPlatformIcon(order.service)}
                          </div>
                          <div>
                            <h3 className="font-bold text-primary-text">{order.service}</h3>
                            <p className="text-xs text-gray-600">شناسه: {order.id.slice(0, 8)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusIcon(order.status)}
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getOrderStatusColor(order.status)}`}>
                              {getOrderStatusText(order.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 font-bold">{order.price.toLocaleString()} تومان</p>
                          <p className="text-xs text-gray-600">{formatDate(order.created_at)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'new-order' && (
              <div className="space-y-6">
                <DashboardOrderForm
                  userBalance={userProfile?.balance || 0}
                  onOrderSubmit={async (data) => {
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
                            }
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

                        // Refresh data and go to orders section
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
                  }}
                  isLoading={orderSubmitting}
                />
                      </div>
                    )}

            {activeSection === 'orders' && (
              <div className="space-y-6">
                {/* Success/Error Messages */}
                    {orderError && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4">
                    <p className="text-red-600 text-center">{orderError}</p>
                      </div>
                    )}

                {/* Search and Filter */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="جستجو براساس سرویس، لینک یا ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/30 backdrop-blur-xl border-2 border-white/40 rounded-2xl text-primary-text placeholder-gray-500 focus:outline-none focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 transition-all duration-300"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-3 bg-white/30 backdrop-blur-xl border-2 border-white/40 rounded-2xl text-primary-text focus:outline-none focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 transition-all duration-300"
                    >
                      <option value="all">همه وضعیت‌ها</option>
                      <option value="completed">انجام شده</option>
                      <option value="in-progress">در حال انجام</option>
                      <option value="pending">در انتظار</option>
                    </select>
                  </div>
                </div>

                {/* Orders List */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6">
                  <h2 className="text-xl font-bold text-primary-text mb-6">سفارشات من</h2>
                  <div className="space-y-4">
                    {filteredOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-colors duration-300 border border-white/20">
              <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-sm border border-white/30">
                            {getPlatformIcon(order.service)}
                          </div>
                          <div>
                            <h3 className="font-bold text-primary-text">{order.service}</h3>
                            <p className="text-xs text-gray-600">شناسه: {order.id.slice(0, 8)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusIcon(order.status)}
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getOrderStatusColor(order.status)}`}>
                              {getOrderStatusText(order.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 font-bold">{order.price.toLocaleString()} تومان</p>
                          <p className="text-xs text-gray-600">{formatDate(order.created_at)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'wallet' && (
              <div className="space-y-6">
                {/* Balance Overview */}
                <div className="bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-3xl p-6 text-white shadow-xl border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">کیف پول</h2>
                      <p className="opacity-90 mb-4">موجودی فعلی شما</p>
                      <div className="text-4xl font-bold">{displayUser.balance.toLocaleString()} تومان</div>
                    </div>
                    <FaWallet className="text-6xl opacity-30" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Charge Options */}
                  <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6">
                    <h3 className="text-lg font-bold text-primary-text mb-4">شارژ کیف پول</h3>
                    
                    {/* Error Message */}
                    {paymentError && (
                      <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4 mb-4">
                        <p className="text-red-600 text-sm text-center">{paymentError}</p>
                      </div>
                    )}

                    {/* Preset Amounts */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {PRESET_AMOUNTS.map((preset) => (
                        <button
                          key={preset.value}
                          onClick={() => handlePresetClick(preset.value)}
                          disabled={isPaymentLoading}
                          className={`p-4 rounded-2xl transition-all duration-300 text-center ${
                            !isCustom && chargeAmount === preset.value
                              ? 'bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white shadow-lg'
                              : 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-primary-text'
                          } disabled:opacity-50`}
                        >
                          <div className="text-lg font-bold">{preset.label}</div>
                          <div className="text-sm opacity-90">تومان</div>
                      </button>
                      ))}
                    </div>

                    {/* Custom Amount Button */}
                    <button
                      onClick={handleCustomClick}
                      disabled={isPaymentLoading}
                      className={`w-full p-4 rounded-2xl transition-all duration-300 text-center mb-4 ${
                        isCustom
                          ? 'bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white shadow-lg'
                          : 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-primary-text'
                      } disabled:opacity-50`}
                    >
                        <div className="text-lg font-bold">مبلغ دلخواه</div>
                      </button>

                    {/* Custom Amount Input */}
                    {isCustom && (
                      <div className="mb-4">
                        <input
                          type="text"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          placeholder="مبلغ را وارد کنید"
                          disabled={isPaymentLoading}
                          className="w-full px-4 py-3 bg-white/30 backdrop-blur-xl border-2 border-white/40 rounded-2xl text-primary-text placeholder-gray-500 focus:outline-none focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 transition-all duration-300 text-center text-lg disabled:opacity-50"
                        />
                        {chargeAmount > 0 && (
                          <p className="text-sm text-gray-700 text-center mt-2">
                            {chargeAmount.toLocaleString()} تومان
                          </p>
                        )}
                    </div>
                    )}

                    {/* Total Amount Display */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-white/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">مبلغ قابل پرداخت:</span>
                        <span className="text-2xl font-bold text-primary-text">
                          {chargeAmount.toLocaleString()} تومان
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 text-center pt-2 border-t border-white/20">
                        معادل {(chargeAmount * 10).toLocaleString()} ریال
                      </div>
                    </div>

                {/* Payment Button */}
                <button
                  onClick={handleCharge}
                  disabled={isPaymentLoading || chargeAmount < 10000 || !isPaymentConfigured}
                  className="w-full bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white px-6 py-3 rounded-2xl font-bold hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
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

                {/* Info */}
                {isPaymentConfigured ? (
                  <p className="text-xs text-gray-600 text-center mt-4">
                    پس از کلیک بر روی پرداخت، به درگاه پرداخت منتقل خواهید شد
                  </p>
                ) : (
                  <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-3 mt-4">
                    <p className="text-amber-700 text-xs text-center">
                      ⚠️ درگاه پرداخت هنوز پیکربندی نشده است. لطفاً متغیرهای محیطی SizPay را تنظیم کنید.
                    </p>
                  </div>
                )}
                  </div>
                  
                  {/* Recent Transactions */}
                  <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6">
                    <h3 className="text-lg font-bold text-primary-text mb-4">تراکنش‌های اخیر</h3>
                    {recentTransactions.length > 0 ? (
                    <div className="space-y-3">
                        {recentTransactions.map((transaction) => (
                          <div key={transaction.id} className="flex items-center justify-between p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/20">
                            <div className="flex-1">
                              <p className="font-bold text-primary-text">{transaction.description}</p>
                              <p className="text-sm text-gray-700">{formatDateTime(transaction.date)}</p>
                          </div>
                          <div className={`text-right ${transaction.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            <p className="font-bold">{transaction.isPositive ? '+' : '-'}{transaction.amount.toLocaleString()}</p>
                            <p className="text-sm">تومان</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600">هنوز تراکنشی ثبت نشده است</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'settings' && (
              <div className="space-y-6">
                {/* Success/Error Messages */}
                {settingsSuccess && (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4">
                    <p className="text-green-600 text-center font-bold">{settingsSuccess}</p>
                  </div>
                )}
                {settingsError && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4">
                    <p className="text-red-600 text-center">{settingsError}</p>
                  </div>
                )}

                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6">
                  <h2 className="text-xl font-bold text-primary-text mb-6">تنظیمات حساب</h2>
                  <div className="space-y-4">
                    {/* Edit Profile Section */}
                    {!isEditProfileOpen ? (
                      <div className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-colors duration-300 border border-white/20">
                      <div>
                          <h3 className="font-bold text-primary-text">ویرایش اطلاعات کاربری</h3>
                          <p className="text-sm text-gray-700">نام و اطلاعات شخصی</p>
                      </div>
                        <button 
                          onClick={handleOpenEditProfile}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white rounded-xl hover:from-[#1E88E5] hover:to-[#0D47A1] transition-colors duration-300 shadow-lg"
                        >
                        <FaEdit />
                        ویرایش
                      </button>
                    </div>
                    ) : (
                      <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/20">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-primary-text">ویرایش نام</h3>
                          <button 
                            onClick={() => setIsEditProfileOpen(false)}
                            className="text-gray-600 hover:text-primary-text"
                          >
                            <FaTimes />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="نام خود را وارد کنید"
                          disabled={settingsLoading}
                          className="w-full px-4 py-3 bg-white/30 backdrop-blur-xl border-2 border-white/40 rounded-2xl text-primary-text placeholder-gray-500 focus:outline-none focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 transition-all duration-300 mb-4 disabled:opacity-50"
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={() => setIsEditProfileOpen(false)}
                            disabled={settingsLoading}
                            className="flex-1 bg-white/20 text-primary-text px-4 py-2 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 border border-white/30 disabled:opacity-50"
                          >
                            انصراف
                          </button>
                          <button
                            onClick={handleSaveProfile}
                            disabled={settingsLoading}
                            className="flex-1 bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white px-4 py-2 rounded-xl font-bold hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
                          >
                            {settingsLoading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                            ذخیره
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Change Password Section */}
                    {!isChangePasswordOpen ? (
                      <div className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-colors duration-300 border border-white/20">
                      <div>
                          <h3 className="font-bold text-primary-text">تغییر رمز عبور</h3>
                          <p className="text-sm text-gray-700">به‌روزرسانی رمز عبور حساب</p>
                      </div>
                        <button 
                          onClick={handleOpenChangePassword}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white rounded-xl hover:from-[#1E88E5] hover:to-[#0D47A1] transition-colors duration-300 shadow-lg"
                        >
                        <FaEdit />
                        تغییر
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/20">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-primary-text">تغییر رمز عبور</h3>
                          <button 
                            onClick={() => setIsChangePasswordOpen(false)}
                            className="text-gray-600 hover:text-primary-text"
                          >
                            <FaTimes />
                      </button>
                    </div>
                    
                        {/* New Password */}
                        <div className="mb-4">
                          <label className="block text-sm font-bold text-primary-text mb-2">رمز عبور جدید</label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? 'text' : 'password'}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="رمز عبور جدید"
                              disabled={settingsLoading}
                              className="w-full px-4 py-3 pl-12 bg-white/30 backdrop-blur-xl border-2 border-white/40 rounded-2xl text-primary-text placeholder-gray-500 focus:outline-none focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 transition-all duration-300 disabled:opacity-50"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#279EFD]"
                            >
                              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-4">
                          <label className="block text-sm font-bold text-primary-text mb-2">تکرار رمز عبور جدید</label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              value={confirmNewPassword}
                              onChange={(e) => setConfirmNewPassword(e.target.value)}
                              placeholder="تکرار رمز عبور جدید"
                              disabled={settingsLoading}
                              className="w-full px-4 py-3 pl-12 bg-white/30 backdrop-blur-xl border-2 border-white/40 rounded-2xl text-primary-text placeholder-gray-500 focus:outline-none focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 transition-all duration-300 disabled:opacity-50"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#279EFD]"
                            >
                              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => setIsChangePasswordOpen(false)}
                            disabled={settingsLoading}
                            className="flex-1 bg-white/20 text-primary-text px-4 py-2 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 border border-white/30 disabled:opacity-50"
                          >
                            انصراف
                          </button>
                          <button
                            onClick={handleChangePassword}
                            disabled={settingsLoading}
                            className="flex-1 bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white px-4 py-2 rounded-xl font-bold hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
                          >
                            {settingsLoading ? <FaSpinner className="animate-spin" /> : <FaLock />}
                            تغییر رمز عبور
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-colors duration-300 border border-white/20">
                      <div>
                        <h3 className="font-bold text-primary-text">خروج از حساب</h3>
                        <p className="text-sm text-gray-700">خروج امن از حساب کاربری</p>
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-300 shadow-lg"
                      >
                  <FaSignOutAlt />
                  خروج
                </button>
              </div>
            </div>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col min-h-screen pt-20 pb-24 px-4">
        <div className="max-w-7xl mx-auto w-full pb-8">
        {/* Mobile Header */}
        <div className="bg-white/10 backdrop-blur-xl shadow-xl border-b border-white/20 px-4 py-3 rounded-3xl mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-full flex items-center justify-center shadow-lg">
                <FaUser className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-primary-text">{displayUser.name}</h3>
                <p className="text-sm text-gray-700">{displayUser.balance.toLocaleString()} تومان</p>
              </div>
            </div>
            {displayUser.level === 'premium' && (
              <span className="px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs rounded-full font-medium">
                پریمیوم
              </span>
            )}
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 p-4">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary-text mb-1">
              {activeSection === 'dashboard' && 'داشبورد'}
              {activeSection === 'new-order' && 'ثبت سفارش جدید'}
              {activeSection === 'orders' && 'سفارشات من'}
              {activeSection === 'wallet' && 'کیف پول'}
              {activeSection === 'settings' && 'تنظیمات حساب'}
            </h1>
            <p className="text-gray-700 text-sm">
              {activeSection === 'dashboard' && 'نمای کلی حساب کاربری شما'}
              {activeSection === 'new-order' && 'سرویس مورد نظر خود را انتخاب کنید'}
              {activeSection === 'orders' && 'مدیریت و پیگیری سفارشات'}
              {activeSection === 'wallet' && 'مدیریت کیف پول و تراکنش‌ها'}
              {activeSection === 'settings' && 'تنظیمات شخصی حساب کاربری'}
            </p>
          </div>

          {/* Content Sections */}
          {activeSection === 'dashboard' && (
            <div className="space-y-4">
              {/* Welcome Card */}
              <div className="bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-2xl p-4 text-white shadow-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-1">سلام {displayUser.name} 👋</h2>
                    <p className="opacity-90 text-sm">خوش آمدید!</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <FaUser className="text-xl" />
                  </div>
                </div>
              </div>

              {/* Balance Card */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-primary-text">موجودی کیف پول</h3>
                  <FaWallet className="text-[#279EFD]" />
                </div>
                <div className="text-2xl font-bold text-primary-text mb-3">{displayUser.balance.toLocaleString()} تومان</div>
                <button 
                  onClick={() => setActiveSection('wallet')}
                  className="w-full bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white rounded-xl py-2 text-sm font-medium shadow-lg"
                >
                  شارژ حساب
                </button>
            </div>

              {/* New Order - Mobile */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-primary-text">
                  آماده برای رشد؟
                </h3>
                <button
                  onClick={() => setActiveSection('new-order')}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300 shadow-lg flex items-center gap-2 text-sm"
                >
                  <FaPlus />
                  <span>ثبت سفارش</span>
                </button>
              </div>

              {/* Recent Orders */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4">
              <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-primary-text">سفارشات اخیر</h2>
                  <button 
                    onClick={() => setActiveSection('orders')}
                    className="text-[#279EFD] text-sm"
                  >
                    مشاهده همه
                  </button>
                </div>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                          {getPlatformIcon(order.service)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-primary-text text-sm">{order.service}</h3>
                          <p className="text-xs text-gray-600">شناسه: {order.id.slice(0, 8)}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            {getStatusIcon(order.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getOrderStatusColor(order.status)}`}>
                              {getOrderStatusText(order.status)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">{formatDate(order.created_at)}</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-bold text-primary-text">{order.price.toLocaleString()} تومان</span>
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
                userBalance={userProfile?.balance || 0}
                onOrderSubmit={async (data) => {
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
                          }
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

                      // Refresh data and go to orders section
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
                }}
                isLoading={orderSubmitting}
              />
            </div>
          )}

          {activeSection === 'orders' && (
            <div className="space-y-4">
              {/* Search and Filter */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4">
                <div className="space-y-3">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="جستجو..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/30 backdrop-blur-xl border-2 border-white/40 rounded-xl text-primary-text placeholder-gray-500 focus:outline-none focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 transition-all duration-300 text-sm"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-white/30 backdrop-blur-xl border-2 border-white/40 rounded-xl text-primary-text focus:outline-none focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 transition-all duration-300 text-sm"
                  >
                    <option value="all">همه وضعیت‌ها</option>
                    <option value="completed">انجام شده</option>
                    <option value="in-progress">در حال انجام</option>
                    <option value="pending">در انتظار</option>
                  </select>
                </div>
              </div>

              {/* Orders List */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4">
                <h2 className="font-bold text-primary-text mb-4">سفارشات من</h2>
                <div className="space-y-3">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                          {getPlatformIcon(order.service)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-primary-text text-sm">{order.service}</h3>
                          <p className="text-xs text-gray-600">شناسه: {order.id.slice(0, 8)}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            {getStatusIcon(order.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getOrderStatusColor(order.status)}`}>
                              {getOrderStatusText(order.status)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">{formatDate(order.created_at)}</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-bold text-primary-text">{order.price.toLocaleString()} تومان</span>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
            </div>
          )}

          {activeSection === 'wallet' && (
            <div className="space-y-4">
              {/* Balance Overview */}
              <div className="bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-2xl p-4 text-white shadow-xl border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-1">کیف پول</h2>
                    <p className="opacity-90 text-sm mb-2">موجودی فعلی شما</p>
                    <div className="text-3xl font-bold">{displayUser.balance.toLocaleString()} تومان</div>
                  </div>
                  <FaWallet className="text-4xl opacity-30" />
                </div>
              </div>
              
              {/* Charge Options */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4">
                <h3 className="font-bold text-primary-text mb-3">شارژ کیف پول</h3>
                
                {/* Error Message */}
                {paymentError && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 mb-3">
                    <p className="text-red-600 text-xs text-center">{paymentError}</p>
                  </div>
                )}

                {/* Preset Amounts */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {PRESET_AMOUNTS.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => handlePresetClick(preset.value)}
                      disabled={isPaymentLoading}
                      className={`p-3 rounded-xl transition-all duration-300 text-center ${
                        !isCustom && chargeAmount === preset.value
                          ? 'bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white shadow-lg'
                          : 'bg-white/20 border border-white/30 hover:bg-white/30 text-primary-text'
                      } disabled:opacity-50`}
                    >
                      <div className="font-bold">{preset.label}</div>
                      <div className="text-xs opacity-90">تومان</div>
                  </button>
                  ))}
                </div>

                {/* Custom Amount Button */}
                <button
                  onClick={handleCustomClick}
                  disabled={isPaymentLoading}
                  className={`w-full p-3 rounded-xl transition-all duration-300 text-center mb-3 ${
                    isCustom
                      ? 'bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white shadow-lg'
                      : 'bg-white/20 border border-white/30 hover:bg-white/30 text-primary-text'
                  } disabled:opacity-50`}
                >
                    <div className="font-bold">مبلغ دلخواه</div>
                  </button>

                {/* Custom Amount Input */}
                {isCustom && (
                  <div className="mb-3">
                    <input
                      type="text"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="مبلغ را وارد کنید"
                      disabled={isPaymentLoading}
                      className="w-full px-3 py-2 bg-white/30 backdrop-blur-xl border-2 border-white/40 rounded-xl text-primary-text placeholder-gray-500 focus:outline-none focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 transition-all duration-300 text-center disabled:opacity-50"
                    />
                    {chargeAmount > 0 && (
                      <p className="text-xs text-gray-700 text-center mt-2">
                        {chargeAmount.toLocaleString()} تومان
                      </p>
                    )}
                </div>
                )}

                {/* Total Amount */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mb-3 border border-white/20">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 text-sm">مبلغ قابل پرداخت:</span>
                    <span className="text-lg font-bold text-primary-text">
                      {chargeAmount.toLocaleString()} تومان
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 text-center pt-2 border-t border-white/20">
                    معادل {(chargeAmount * 10).toLocaleString()} ریال
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handleCharge}
                  disabled={isPaymentLoading || chargeAmount < 10000 || !isPaymentConfigured}
                  className="w-full bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white px-4 py-3 rounded-xl font-bold hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg text-sm"
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
                  <p className="text-xs text-gray-600 text-center mt-2">
                    پس از کلیک بر روی پرداخت، به درگاه پرداخت منتقل خواهید شد
                  </p>
                ) : (
                  <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-2 mt-2">
                    <p className="text-amber-700 text-xs text-center">
                      ⚠️ درگاه پرداخت پیکربندی نشده است
                    </p>
                  </div>
                )}
              </div>
              
              {/* Recent Transactions */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4">
                <h3 className="font-bold text-primary-text mb-3">تراکنش‌های اخیر</h3>
                {recentTransactions.length > 0 ? (
                <div className="space-y-2">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                        <div className="flex-1">
                          <p className="font-bold text-primary-text text-sm">{transaction.description}</p>
                          <p className="text-xs text-gray-700">{formatDateTime(transaction.date)}</p>
                      </div>
                      <div className={`text-right ${transaction.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        <p className="font-bold text-sm">{transaction.isPositive ? '+' : '-'}{transaction.amount.toLocaleString()}</p>
                        <p className="text-xs">تومان</p>
                      </div>
                    </div>
                  ))}
                </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-600 text-sm">هنوز تراکنشی ثبت نشده است</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="space-y-4">
              {/* Success/Error Messages */}
              {settingsSuccess && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3">
                  <p className="text-green-600 text-center font-bold text-sm">{settingsSuccess}</p>
                </div>
              )}
              {settingsError && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3">
                  <p className="text-red-600 text-center text-sm">{settingsError}</p>
                </div>
              )}

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4">
                <h2 className="font-bold text-primary-text mb-4">تنظیمات حساب</h2>
                <div className="space-y-3">
                  {/* Edit Profile Section */}
                  {!isEditProfileOpen ? (
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-primary-text text-sm">ویرایش اطلاعات کاربری</h3>
                        <button 
                          onClick={handleOpenEditProfile}
                          className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white rounded-lg text-xs shadow-lg"
                        >
                        <FaEdit />
                        ویرایش
                      </button>
                    </div>
                      <p className="text-xs text-gray-700">نام و اطلاعات شخصی</p>
                  </div>
                  ) : (
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-primary-text text-sm">ویرایش نام</h3>
                        <button 
                          onClick={() => setIsEditProfileOpen(false)}
                          className="text-gray-600 hover:text-primary-text"
                        >
                          <FaTimes className="text-sm" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="نام خود را وارد کنید"
                        disabled={settingsLoading}
                        className="w-full px-3 py-2 bg-white/30 backdrop-blur-xl border-2 border-white/40 rounded-xl text-primary-text placeholder-gray-500 focus:outline-none focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 transition-all duration-300 mb-3 text-sm disabled:opacity-50"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsEditProfileOpen(false)}
                          disabled={settingsLoading}
                          className="flex-1 bg-white/20 text-primary-text px-3 py-2 rounded-lg text-xs font-bold hover:bg-white/30 transition-all duration-300 border border-white/30 disabled:opacity-50"
                        >
                          انصراف
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          disabled={settingsLoading}
                          className="flex-1 bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white px-3 py-2 rounded-lg text-xs font-bold hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300 flex items-center justify-center gap-1 disabled:opacity-50 shadow-lg"
                        >
                          {settingsLoading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                          ذخیره
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Change Password Section */}
                  {!isChangePasswordOpen ? (
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-primary-text text-sm">تغییر رمز عبور</h3>
                        <button 
                          onClick={handleOpenChangePassword}
                          className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white rounded-lg text-xs shadow-lg"
                        >
                        <FaEdit />
                        تغییر
                      </button>
                    </div>
                      <p className="text-xs text-gray-700">به‌روزرسانی رمز عبور حساب</p>
                    </div>
                  ) : (
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-primary-text text-sm">تغییر رمز عبور</h3>
                        <button 
                          onClick={() => setIsChangePasswordOpen(false)}
                          className="text-gray-600 hover:text-primary-text"
                        >
                          <FaTimes className="text-sm" />
                        </button>
                  </div>
                  
                      {/* New Password */}
                      <div className="mb-3">
                        <label className="block text-xs font-bold text-primary-text mb-2">رمز عبور جدید</label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="رمز عبور جدید"
                            disabled={settingsLoading}
                            className="w-full px-3 py-2 pl-10 bg-white/30 backdrop-blur-xl border-2 border-white/40 rounded-xl text-primary-text placeholder-gray-500 focus:outline-none focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 transition-all duration-300 text-sm disabled:opacity-50"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#279EFD]"
                          >
                            {showNewPassword ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="mb-3">
                        <label className="block text-xs font-bold text-primary-text mb-2">تکرار رمز عبور</label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            placeholder="تکرار رمز عبور"
                            disabled={settingsLoading}
                            className="w-full px-3 py-2 pl-10 bg-white/30 backdrop-blur-xl border-2 border-white/40 rounded-xl text-primary-text placeholder-gray-500 focus:outline-none focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 transition-all duration-300 text-sm disabled:opacity-50"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#279EFD]"
                          >
                            {showConfirmPassword ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsChangePasswordOpen(false)}
                          disabled={settingsLoading}
                          className="flex-1 bg-white/20 text-primary-text px-3 py-2 rounded-lg text-xs font-bold hover:bg-white/30 transition-all duration-300 border border-white/30 disabled:opacity-50"
                        >
                          انصراف
                        </button>
                        <button
                          onClick={handleChangePassword}
                          disabled={settingsLoading}
                          className="flex-1 bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white px-3 py-2 rounded-lg text-xs font-bold hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300 flex items-center justify-center gap-1 disabled:opacity-50 shadow-lg"
                        >
                          {settingsLoading ? <FaSpinner className="animate-spin" /> : <FaLock />}
                          تغییر
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-primary-text text-sm">خروج از حساب</h3>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg text-xs shadow-lg"
                      >
                        <FaSignOutAlt />
                        خروج
                      </button>
                    </div>
                    <p className="text-xs text-gray-700">خروج امن از حساب کاربری</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-t border-white/20 px-4 py-2 shadow-xl">
          <div className="flex justify-around">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-white bg-gradient-to-r from-[#279EFD] to-[#1565C0] shadow-lg'
                      : 'text-primary-text bg-white/20'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 