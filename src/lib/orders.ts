import { prisma } from './prisma';
import { InsertOrder, Order, OrderStatus } from '@/types/database';

export async function createOrder(
  orderData: Omit<InsertOrder, 'id' | 'created_at' | 'updated_at'>
) {
  try {
    const order = await prisma.order.create({
      data: {
        issuerId: orderData.issuer_id,
        service: orderData.service,
        price: orderData.price,
        japOrderId: orderData.jap_order_id || null,
        link: orderData.link || null,
        quantity: orderData.quantity || null,
        startCount: orderData.start_count || null,
        remains: orderData.remains || null,
        japServiceId: orderData.jap_service_id || null,
        extraData: orderData.extra_data ? JSON.stringify(orderData.extra_data) : null,
        status: orderData.status || 'pending',
      },
    });

    return {
      id: order.id,
      status: order.status,
      issuer_id: order.issuerId,
      price: order.price,
      service: order.service,
      jap_order_id: order.japOrderId,
      link: order.link,
      quantity: order.quantity,
      start_count: order.startCount,
      remains: order.remains,
      jap_service_id: order.japServiceId,
      extra_data: order.extraData ? JSON.parse(order.extraData) : null,
      created_at: order.createdAt.toISOString(),
      updated_at: order.updatedAt.toISOString(),
    };
  } catch {
    throw new Error('Failed to create order');
  }
}

export async function getOrders(userId: string): Promise<Order[]> {
  try {
    const orders = await prisma.order.findMany({
      where: { issuerId: userId },
      orderBy: { createdAt: 'desc' },
    });

    return orders.map((order) => ({
      id: order.id,
      status: order.status,
      issuer_id: order.issuerId,
      price: order.price,
      service: order.service,
      jap_order_id: order.japOrderId,
      link: order.link,
      quantity: order.quantity,
      start_count: order.startCount,
      remains: order.remains,
      jap_service_id: order.japServiceId,
      extra_data: order.extraData ? JSON.parse(order.extraData) : null,
      created_at: order.createdAt.toISOString(),
      updated_at: order.updatedAt.toISOString(),
    }));
  } catch {
    throw new Error('Failed to fetch orders');
  }
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) return null;

    return {
      id: order.id,
      status: order.status,
      issuer_id: order.issuerId,
      price: order.price,
      service: order.service,
      jap_order_id: order.japOrderId,
      link: order.link,
      quantity: order.quantity,
      start_count: order.startCount,
      remains: order.remains,
      jap_service_id: order.japServiceId,
      extra_data: order.extraData ? JSON.parse(order.extraData) : null,
      created_at: order.createdAt.toISOString(),
      updated_at: order.updatedAt.toISOString(),
    };
  } catch {
    throw new Error('Failed to fetch order');
  }
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return {
      id: order.id,
      status: order.status,
      issuer_id: order.issuerId,
      price: order.price,
      service: order.service,
      jap_order_id: order.japOrderId,
      link: order.link,
      quantity: order.quantity,
      start_count: order.startCount,
      remains: order.remains,
      jap_service_id: order.japServiceId,
      extra_data: order.extraData ? JSON.parse(order.extraData) : null,
      created_at: order.createdAt.toISOString(),
      updated_at: order.updatedAt.toISOString(),
    };
  } catch {
    throw new Error('Failed to update order status');
  }
}

export function getOrderStatusText(status: OrderStatus): string {
  const statusMap: Record<OrderStatus, string> = {
    pending: 'در انتظار',
    processing: 'در حال پردازش',
    in_progress: 'در حال انجام',
    completed: 'انجام شده',
    cancelled: 'لغو شده',
    refunded: 'بازگشت وجه',
  };
  return statusMap[status] || 'نامشخص';
}

export function getOrderStatusColor(status: OrderStatus): string {
  const colorMap: Record<OrderStatus, string> = {
    pending: 'text-amber-600 bg-amber-50 border border-amber-200',
    processing: 'text-blue-600 bg-blue-50 border border-blue-200',
    in_progress: 'text-blue-600 bg-blue-50 border border-blue-200',
    completed: 'text-green-600 bg-green-50 border border-green-200',
    cancelled: 'text-red-600 bg-red-50 border border-red-200',
    refunded: 'text-gray-600 bg-gray-50 border border-gray-200',
  };
  return colorMap[status] || 'text-gray-600 bg-gray-50 border border-gray-200';
}
