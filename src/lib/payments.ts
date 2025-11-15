import { prisma } from './prisma';
import { Payment, PaymentStatus } from '@/types/database';

/**
 * Get all payments for a user
 */
export async function getUserPayments(userId: string): Promise<Payment[]> {
  try {
    const payments = await prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return payments.map((payment) => ({
      id: payment.id,
      user_id: payment.userId,
      order_id: payment.orderId,
      invoice_no: payment.invoiceNo,
      amount_toman: payment.amountToman,
      amount_rial: payment.amountRial,
      status: payment.status,
      token: payment.token,
      ref_no: payment.refNo,
      merchant_id: payment.merchantId,
      terminal_id: payment.terminalId,
      gateway_response: payment.gatewayResponse ? JSON.parse(payment.gatewayResponse) : null,
      ip_address: payment.ipAddress,
      created_at: payment.createdAt.toISOString(),
      updated_at: payment.updatedAt.toISOString(),
      completed_at: payment.completedAt?.toISOString() || null,
    }));
  } catch {
    return [];
  }
}

/**
 * Get payment by order ID
 */
export async function getPaymentByOrderId(orderId: string): Promise<Payment | null> {
  try {
    const payment = await prisma.payment.findFirst({
      where: { orderId },
    });

    if (!payment) return null;

    return {
      id: payment.id,
      user_id: payment.userId,
      order_id: payment.orderId,
      invoice_no: payment.invoiceNo,
      amount_toman: payment.amountToman,
      amount_rial: payment.amountRial,
      status: payment.status,
      token: payment.token,
      ref_no: payment.refNo,
      merchant_id: payment.merchantId,
      terminal_id: payment.terminalId,
      gateway_response: payment.gatewayResponse ? JSON.parse(payment.gatewayResponse) : null,
      ip_address: payment.ipAddress,
      created_at: payment.createdAt.toISOString(),
      updated_at: payment.updatedAt.toISOString(),
      completed_at: payment.completedAt?.toISOString() || null,
    };
  } catch {
    return null;
  }
}

/**
 * Get payment by token
 */
export async function getPaymentByToken(token: string): Promise<Payment | null> {
  try {
    const payment = await prisma.payment.findUnique({
      where: { token },
    });

    if (!payment) return null;

    return {
      id: payment.id,
      user_id: payment.userId,
      order_id: payment.orderId,
      invoice_no: payment.invoiceNo,
      amount_toman: payment.amountToman,
      amount_rial: payment.amountRial,
      status: payment.status,
      token: payment.token,
      ref_no: payment.refNo,
      merchant_id: payment.merchantId,
      terminal_id: payment.terminalId,
      gateway_response: payment.gatewayResponse ? JSON.parse(payment.gatewayResponse) : null,
      ip_address: payment.ipAddress,
      created_at: payment.createdAt.toISOString(),
      updated_at: payment.updatedAt.toISOString(),
      completed_at: payment.completedAt?.toISOString() || null,
    };
  } catch {
    return null;
  }
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
  try {
    const payments = await prisma.payment.findMany({
      where: {
        userId,
        status: 'completed',
      },
      orderBy: { completedAt: 'desc' },
    });

    return payments.map((payment) => ({
      id: payment.id,
      user_id: payment.userId,
      order_id: payment.orderId,
      invoice_no: payment.invoiceNo,
      amount_toman: payment.amountToman,
      amount_rial: payment.amountRial,
      status: payment.status,
      token: payment.token,
      ref_no: payment.refNo,
      merchant_id: payment.merchantId,
      terminal_id: payment.terminalId,
      gateway_response: payment.gatewayResponse ? JSON.parse(payment.gatewayResponse) : null,
      ip_address: payment.ipAddress,
      created_at: payment.createdAt.toISOString(),
      updated_at: payment.updatedAt.toISOString(),
      completed_at: payment.completedAt?.toISOString() || null,
    }));
  } catch {
    return [];
  }
}

/**
 * Get payment status text in Persian
 */
export function getPaymentStatusText(status: PaymentStatus): string {
  const statusMap: Record<PaymentStatus, string> = {
    pending: 'در انتظار',
    processing: 'در حال پردازش',
    verifying: 'در حال تایید',
    completed: 'تکمیل شده',
    failed: 'ناموفق',
    cancelled: 'لغو شده',
  };
  return statusMap[status] || 'نامشخص';
}

/**
 * Get payment status color for UI
 */
export function getPaymentStatusColor(status: PaymentStatus): string {
  const colorMap: Record<PaymentStatus, string> = {
    pending: 'text-amber-600 bg-amber-50 border border-amber-200',
    processing: 'text-blue-600 bg-blue-50 border border-blue-200',
    verifying: 'text-blue-600 bg-blue-50 border border-blue-200',
    completed: 'text-green-600 bg-green-50 border border-green-200',
    failed: 'text-red-600 bg-red-50 border border-red-200',
    cancelled: 'text-gray-600 bg-gray-50 border border-gray-200',
  };
  return colorMap[status] || 'text-gray-600 bg-gray-50 border border-gray-200';
}
