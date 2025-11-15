'use client';

import { FaUser, FaPlus } from 'react-icons/fa';
import { getPlatformIcon, getStatusIcon, formatDate } from '@/lib/dashboard-utils';
import { getOrderStatusText, getOrderStatusColor } from '@/lib/orders';

interface Order {
  id: string;
  service: string;
  status: string;
  price: number;
  created_at: string;
}

interface DashboardOverviewProps {
  userName: string;
  recentOrders: Order[];
  onNewOrder: () => void;
  onViewAllOrders: () => void;
}

export default function DashboardOverview({
  userName,
  recentOrders,
  onNewOrder,
  onViewAllOrders,
}: DashboardOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="rounded-3xl border border-white/20 bg-gradient-to-r from-[#279EFD] to-[#1565C0] p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold">سلام {userName} 👋</h2>
            <p className="opacity-90">خوش آمدید! امروز چه کاری می‌خواهید انجام دهید؟</p>
          </div>
          <div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <FaUser className="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action - New Order */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-primary-text text-2xl font-bold">آماده برای رشد هستید؟</h3>
        <button
          onClick={onNewOrder}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl"
        >
          <FaPlus className="text-lg" />
          <span>ثبت سفارش جدید</span>
        </button>
      </div>

      {/* Recent Orders */}
      <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-primary-text text-xl font-bold">سفارشات اخیر</h2>
          <button
            onClick={onViewAllOrders}
            className="font-medium text-[#279EFD] transition-colors duration-300 hover:text-[#1565C0]"
          >
            مشاهده همه
          </button>
        </div>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/20 p-4 backdrop-blur-sm transition-colors duration-300 hover:bg-white/30"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/30 bg-white/80 shadow-sm backdrop-blur-sm">
                  {getPlatformIcon(order.service)}
                </div>
                <div>
                  <h3 className="text-primary-text font-bold">{order.service}</h3>
                  <p className="text-xs text-gray-600">شناسه: {order.id.slice(0, 8)}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="mb-1 flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${getOrderStatusColor(order.status as any)}`}
                  >
                    {getOrderStatusText(order.status as any)}
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-700">
                  {order.price.toLocaleString()} تومان
                </p>
                <p className="text-xs text-gray-600">{formatDate(order.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
