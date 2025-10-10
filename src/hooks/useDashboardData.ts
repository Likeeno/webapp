'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { User, Order, Payment } from '@/types/database';
import { User as AuthUser } from '@supabase/supabase-js';

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

export function useDashboardData(authUser: AuthUser | null): DashboardData {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchData = async () => {
    if (!authUser) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [userResult, ordersResult, paymentsResult] = await Promise.all([
        // Fetch user profile
        supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single(),
        
        // Fetch orders
        supabase
          .from('orders')
          .select('*')
          .eq('issuer_id', authUser.id)
          .order('created_at', { ascending: false }),
        
        // Fetch completed payments
        supabase
          .from('payments')
          .select('*')
          .eq('user_id', authUser.id)
          .eq('status', 'completed')
          .order('completed_at', { ascending: false })
      ]);

      if (userResult.error) throw userResult.error;
      setUser(userResult.data);

      if (ordersResult.error) throw ordersResult.error;
      setOrders(ordersResult.data || []);

      // Payments might not exist yet (table not created)
      const paymentsData = paymentsResult.data || [];
      setPayments(paymentsData);

      // Combine payments and orders into unified transactions list
      const allTransactions: Transaction[] = [
        // Add completed payments (positive - top-ups)
        ...paymentsData.map(payment => ({
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
        ...(ordersResult.data || []).map(order => ({
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

