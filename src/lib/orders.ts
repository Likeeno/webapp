import { createClient } from './supabase';
import { InsertOrder, Order, OrderStatus } from '@/types/database';

export async function createOrder(orderData: Omit<InsertOrder, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getOrders(userId: string): Promise<Order[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('issuer_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export function getOrderStatusText(status: OrderStatus): string {
  const statusMap: Record<OrderStatus, string> = {
    'pending': 'در انتظار',
    'processing': 'در حال پردازش',
    'in_progress': 'در حال انجام',
    'completed': 'انجام شده',
    'cancelled': 'لغو شده',
    'refunded': 'بازگشت وجه'
  };
  return statusMap[status] || 'نامشخص';
}

export function getOrderStatusColor(status: OrderStatus): string {
  const colorMap: Record<OrderStatus, string> = {
    'pending': 'text-amber-600 bg-amber-50 border border-amber-200',
    'processing': 'text-blue-600 bg-blue-50 border border-blue-200',
    'in_progress': 'text-blue-600 bg-blue-50 border border-blue-200',
    'completed': 'text-green-600 bg-green-50 border border-green-200',
    'cancelled': 'text-red-600 bg-red-50 border border-red-200',
    'refunded': 'text-gray-600 bg-gray-50 border border-gray-200'
  };
  return colorMap[status] || 'text-gray-600 bg-gray-50 border border-gray-200';
}

