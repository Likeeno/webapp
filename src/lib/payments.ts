import { createClient } from './supabase';
import { Payment, PaymentStatus } from '@/types/database';

/**
 * Get all payments for a user
 */
export async function getUserPayments(userId: string): Promise<Payment[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching payments:', error);
    return [];
  }
  return data || [];
}

/**
 * Get payment by order ID
 */
export async function getPaymentByOrderId(orderId: string): Promise<Payment | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('order_id', orderId)
    .single();

  if (error) {
    console.error('Error fetching payment:', error);
    return null;
  }
  return data;
}

/**
 * Get payment by token
 */
export async function getPaymentByToken(token: string): Promise<Payment | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('token', token)
    .single();

  if (error) {
    console.error('Error fetching payment:', error);
    return null;
  }
  return data;
}

/**
 * Check if payment is already completed (prevent double spending)
 */
export async function isPaymentCompleted(token: string): Promise<boolean> {
  const payment = await getPaymentByToken(token);
  return payment?.status === 'completed';
}

/**
 * Get completed payments (successful charges)
 */
export async function getCompletedPayments(userId: string): Promise<Payment[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'completed')
    .order('completed_at', { ascending: false });

  if (error) {
    console.error('Error fetching completed payments:', error);
    return [];
  }
  return data || [];
}

/**
 * Get payment status text in Persian
 */
export function getPaymentStatusText(status: PaymentStatus): string {
  const statusMap: Record<PaymentStatus, string> = {
    'pending': 'در انتظار',
    'processing': 'در حال پردازش',
    'verifying': 'در حال تایید',
    'completed': 'تکمیل شده',
    'failed': 'ناموفق',
    'cancelled': 'لغو شده'
  };
  return statusMap[status] || 'نامشخص';
}

/**
 * Get payment status color for UI
 */
export function getPaymentStatusColor(status: PaymentStatus): string {
  const colorMap: Record<PaymentStatus, string> = {
    'pending': 'text-amber-600 bg-amber-50 border border-amber-200',
    'processing': 'text-blue-600 bg-blue-50 border border-blue-200',
    'verifying': 'text-blue-600 bg-blue-50 border border-blue-200',
    'completed': 'text-green-600 bg-green-50 border border-green-200',
    'failed': 'text-red-600 bg-red-50 border border-red-200',
    'cancelled': 'text-gray-600 bg-gray-50 border border-gray-200'
  };
  return colorMap[status] || 'text-gray-600 bg-gray-50 border border-gray-200';
}

