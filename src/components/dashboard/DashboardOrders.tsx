'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getPlatformIcon, getStatusIcon, formatDate } from '@/lib/dashboard-utils';
import { getOrderStatusText, getOrderStatusColor } from '@/lib/orders';

interface Order {
  id: string;
  service: string;
  status: string;
  price: number;
  created_at: string;
}

interface DashboardOrdersProps {
  orders: Order[];
}

export default function DashboardOrders({ orders }: DashboardOrdersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="جستجو براساس سرویس، لینک یا ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-primary-text w-full rounded-2xl border-2 border-white/40 bg-white/30 py-3 pr-4 pl-12 placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 focus:outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-primary-text rounded-2xl border-2 border-white/40 bg-white/30 px-4 py-3 backdrop-blur-xl transition-all duration-300 focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 focus:outline-none"
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="completed">انجام شده</option>
            <option value="in-progress">در حال انجام</option>
            <option value="pending">در انتظار</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-primary-text mb-6 text-xl font-bold">سفارشات من</h2>
        <div className="space-y-4">
          {filteredOrders.map((order) => (
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
