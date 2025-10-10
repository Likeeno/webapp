interface TelegramConfig {
  botToken: string;
  chatId: string;
  enabled: boolean;
}

interface SendMessageParams {
  text: string;
  parseMode?: 'Markdown' | 'HTML';
  disableNotification?: boolean;
}

export class TelegramService {
  private config: TelegramConfig;

  constructor() {
    this.config = {
      botToken: process.env.TELEGRAM_BOT_TOKEN || '',
      chatId: process.env.TELEGRAM_CHAT_ID || '',
      enabled: !!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
    };
  }

  async sendMessage(params: SendMessageParams): Promise<boolean> {
    if (!this.config.enabled) {
      return false;
    }

    try {
      const url = `https://api.telegram.org/bot${this.config.botToken}/sendMessage`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.config.chatId,
          text: params.text,
          parse_mode: params.parseMode || 'HTML',
          disable_notification: params.disableNotification || false,
        }),
      });

      if (!response.ok) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }


  async notifyNewUser(userData: {
    name: string;
    email: string;
    userId: string;
  }): Promise<void> {
    const message = `
🎉 <b>کاربر جدید ثبت نام کرد</b>

👤 نام: ${userData.name}
📧 ایمیل: ${userData.email}
📅 تاریخ: ${new Date().toLocaleString('fa-IR')}
    `.trim();

    await this.sendMessage({ text: message });
  }

  async notifyPayment(paymentData: {
    userName: string;
    userEmail: string;
    amount: number;
    refNo?: string;
    orderId: string;
  }): Promise<void> {
    const message = `
💰 <b>شارژ کیف پول موفق</b>

👤 کاربر: ${paymentData.userName}
📧 ایمیل: ${paymentData.userEmail}
💵 مبلغ: ${paymentData.amount.toLocaleString()} تومان
🧾 شماره سفارش: <code>${paymentData.orderId}</code>
${paymentData.refNo ? `📝 شماره مرجع: <code>${paymentData.refNo}</code>` : ''}
📅 تاریخ: ${new Date().toLocaleString('fa-IR')}
    `.trim();

    await this.sendMessage({ text: message });
  }

  async notifyNewOrder(orderData: {
    userName: string;
    userEmail: string;
    service: string;
    price: number;
    orderId: string;
  }): Promise<void> {
    const message = `
📦 <b>سفارش جدید</b>

👤 کاربر: ${orderData.userName}
📧 ایمیل: ${orderData.userEmail}
🎯 سرویس: ${orderData.service}
💰 قیمت: ${orderData.price.toLocaleString()} تومان
🆔 شناسه سفارش: <code>${orderData.orderId}</code>
📅 تاریخ: ${new Date().toLocaleString('fa-IR')}
    `.trim();

    await this.sendMessage({ text: message });
  }

  async notifyFailedPayment(paymentData: {
    userName: string;
    userEmail: string;
    amount: number;
    reason: string;
    orderId: string;
  }): Promise<void> {
    const message = `
⚠️ <b>پرداخت ناموفق</b>

👤 کاربر: ${paymentData.userName}
📧 ایمیل: ${paymentData.userEmail}
💵 مبلغ: ${paymentData.amount.toLocaleString()} تومان
🧾 شماره سفارش: <code>${paymentData.orderId}</code>
❌ دلیل: ${paymentData.reason}
📅 تاریخ: ${new Date().toLocaleString('fa-IR')}
    `.trim();

    await this.sendMessage({ text: message, disableNotification: true });
  }

  /**
   * Send custom admin notification
   */
  async notifyAdmin(title: string, details: Record<string, string | number | boolean>): Promise<void> {
    const detailsText = Object.entries(details)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    const message = `
🔔 <b>${title}</b>

${detailsText}
📅 ${new Date().toLocaleString('fa-IR')}
    `.trim();

    await this.sendMessage({ text: message });
  }

  /**
   * Check if Telegram notifications are configured
   */
  isConfigured(): boolean {
    return this.config.enabled;
  }
}

export const telegramService = new TelegramService();

