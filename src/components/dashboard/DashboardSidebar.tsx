'use client';

import {
  FaUser,
  FaWallet,
  FaPlus,
  FaHome,
  FaBox,
  FaCreditCard,
  FaCog,
  FaCrown,
} from 'react-icons/fa';

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userName: string;
  userEmail: string;
  userBalance: number;
  userLevel: 'standard' | 'premium';
}

export default function DashboardSidebar({
  activeSection,
  onSectionChange,
  userName,
  userEmail,
  userBalance,
  userLevel,
}: DashboardSidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: FaHome },
    { id: 'orders', label: 'سفارشات', icon: FaBox },
    { id: 'wallet', label: 'کیف پول', icon: FaCreditCard },
    { id: 'settings', label: 'تنظیمات', icon: FaCog },
  ];

  return (
    <div className="w-64 flex-shrink-0">
      <div className="sticky top-24 rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
        <div className="p-6">
          {/* User Profile */}
          <div className="mb-8 text-center">
            <div className="relative inline-block">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#279EFD] to-[#1565C0] shadow-lg">
                <FaUser className="text-2xl text-white" />
              </div>
              {userLevel === 'premium' && (
                <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg">
                  <FaCrown className="text-xs text-white" />
                </div>
              )}
            </div>
            <h3 className="text-primary-text mb-1 text-lg font-bold">{userName}</h3>
            <p className="mb-2 text-sm text-gray-700">{userEmail}</p>
            {userLevel === 'premium' && (
              <span className="inline-block rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-xs font-medium text-white shadow-sm">
                پریمیوم
              </span>
            )}
          </div>

          {/* Balance Card */}
          <div className="mb-6 rounded-2xl border border-white/20 bg-gradient-to-r from-[#279EFD] to-[#1565C0] p-4 text-white shadow-xl">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm opacity-90">موجودی</span>
              <FaWallet className="text-xl opacity-70" />
            </div>
            <div className="mb-3 text-2xl font-bold">{userBalance.toLocaleString()} تومان</div>
            <button
              onClick={() => onSectionChange('wallet')}
              className="w-full rounded-xl bg-white/20 py-2 text-sm font-medium transition-colors duration-300 hover:bg-white/30"
            >
              شارژ حساب
            </button>
          </div>

          {/* New Order Button */}
          <button
            onClick={() => onSectionChange('new-order')}
            className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-blue-400 bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl"
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
                  onClick={() => onSectionChange(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-300 ${
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
  );
}
