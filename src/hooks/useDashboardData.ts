'use client';

import { useEffect, useState } from 'react';
import { User, Order, Payment } from '@/types/database';

export interface Transaction {
  id: string;
  type: 'payment' | 'order';
  description: string;
  amount: number;
  date: string;
  isPositive: boolean;
  status?: string;
  refNo?: string;
}

interface DashboardData {
  user: User | null;
  orders: Order[];
  payments: Payment[];
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDashboardData(authUser: { id: string } | null): DashboardData {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!authUser) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch all data from API
      const [userResponse, ordersResponse, paymentsResponse] = await Promise.all([
        fetch('/api/user/profile'),
        fetch('/api/orders'),
        fetch('/api/payments'),
      ]);

      if (!userResponse.ok) throw new Error('Failed to fetch user profile');
      const userData = await userResponse.json();
      setUser(userData);

      let ordersData: Order[] = [];
      let paymentsData: Payment[] = [];

      if (ordersResponse.ok) {
        const ordersResult = await ordersResponse.json();
        ordersData = ordersResult.orders || [];
        setOrders(ordersData);
      }

      if (paymentsResponse.ok) {
        const paymentsResult = await paymentsResponse.json();
        paymentsData = paymentsResult.payments || [];
        setPayments(paymentsData);
      } else {
        setPayments([]);
      }

      // Combine payments and orders into unified transactions list
      const allTransactions: Transaction[] = [
        // Add completed payments (positive - top-ups)
        ...paymentsData.filter(p => p.status === 'completed').map(payment => ({
          id: payment.id,
          type: 'payment' as const,
          description: `شارژ کیف پول${payment.ref_no ? ` - ${payment.ref_no}` : ''}`,
          amount: payment.amount_toman,
          date: payment.completed_at || payment.created_at,
          isPositive: true,
          status: payment.status,
          refNo: payment.ref_no || undefined,
        })),
        
        // Add orders (negative - spending)
        ...ordersData.map(order => ({
          id: order.id,
          type: 'order' as const,
          description: `سفارش: ${order.service}`,
          amount: order.price,
          date: order.created_at,
          isPositive: false,
          status: order.status,
        }))
      ];

      // Sort all transactions by date (newest first)
      allTransactions.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      setTransactions(allTransactions);

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'خطا در بارگذاری اطلاعات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser?.id]);

  return {
    user,
    orders,
    payments,
    transactions,
    loading,
    error,
    refetch: fetchData,
  };
}
