// SizPay Payment Gateway Integration

interface SizPayConfig {
  baseUrl: string;
  username: string;
  password: string;
  merchantId: string;
  terminalId: string;
  returnUrl: string;
}

interface GetTokenParams {
  Username: string;
  Password: string;
  MerchantID: string;
  TerminalID: string;
  DocDate: string;
  ReturnURL: string;
  ExtraInf: string;
  Amount: string;
  OrderID: string;
  InvoiceNo: string;
  AppExtraInf: {
    PayerNm: string;
    PayerMobile: string;
    PayerEmail: string;
    Descr: string;
    PayerIP: string;
    PayTitle: string;
  };
  SignData: string;
}

interface ConfirmParams {
  UserName: string;
  Password: string;
  MerchantID: string;
  TerminalID: string;
  Token: string;
  SignData: string;
}

export interface SizPayTokenResponse {
  ResCod: string | number;
  Message: string;
  Token?: string;
}

export interface SizPayConfirmResponse {
  ResCod: string | number;
  Message: string;
  MerchantID?: string;
  TerminalID?: string;
  OrderID?: string;
  RefNo?: string;
  Amount?: string;
}

export class SizPayService {
  private config: SizPayConfig;

  constructor() {
    this.config = {
      baseUrl: process.env.SIZPAY_BASE_URL || '',
      username: process.env.SIZPAY_USERNAME || '',
      password: process.env.SIZPAY_PASSWORD || '',
      merchantId: process.env.SIZPAY_MERCHANT_ID || '',
      terminalId: process.env.SIZPAY_TERMINAL_ID || '',
      returnUrl: process.env.SIZPAY_RETURN_URL || '',
    };
  }

  private validateConfig(): void {
    const missing: string[] = [];
    
    if (!this.config.baseUrl) missing.push('SIZPAY_BASE_URL');
    if (!this.config.username) missing.push('SIZPAY_USERNAME');
    if (!this.config.password) missing.push('SIZPAY_PASSWORD');
    if (!this.config.merchantId) missing.push('SIZPAY_MERCHANT_ID');
    if (!this.config.terminalId) missing.push('SIZPAY_TERMINAL_ID');
    if (!this.config.returnUrl) missing.push('SIZPAY_RETURN_URL');

    if (missing.length > 0) {
      throw new Error(
        `تنظیمات پرداخت ناقص است. لطفاً متغیرهای زیر را در .env.local تنظیم کنید: ${missing.join(', ')}`
      );
    }
  }

  async getToken(params: {
    amount: number;
    orderId: string;
    invoiceNo: string;
    payerName?: string;
    payerMobile?: string;
    payerEmail?: string;
    description?: string;
    payerIp?: string;
  }): Promise<SizPayTokenResponse> {
    // Validate configuration before making request
    this.validateConfig();

    const tokenParams: GetTokenParams = {
      Username: this.config.username,
      Password: this.config.password,
      MerchantID: this.config.merchantId,
      TerminalID: this.config.terminalId,
      DocDate: '',
      ReturnURL: this.config.returnUrl,
      ExtraInf: '',
      Amount: params.amount.toString(),
      OrderID: params.orderId,
      InvoiceNo: params.invoiceNo,
      AppExtraInf: {
        PayerNm: params.payerName || '',
        PayerMobile: params.payerMobile || '',
        PayerEmail: params.payerEmail || '',
        Descr: params.description || '',
        PayerIP: params.payerIp || '',
        PayTitle: 'شارژ کیف پول',
      },
      SignData: '',
    };

    try {
      const response = await fetch(`${this.config.baseUrl}/api/PaymentSimple/GetTokenSimple`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tokenParams),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: SizPayTokenResponse = await response.json();
      return data;
    } catch (error) {
      console.error('SizPay getToken error:', error);
      throw error;
    }
  }

  async confirm(token: string): Promise<SizPayConfirmResponse> {
    // Validate configuration before making request
    this.validateConfig();

    const confirmParams: ConfirmParams = {
      UserName: this.config.username,
      Password: this.config.password,
      MerchantID: this.config.merchantId,
      TerminalID: this.config.terminalId,
      Token: token,
      SignData: '',
    };

    try {
      const response = await fetch(`${this.config.baseUrl}/api/PaymentSimple/ConfirmSimple`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(confirmParams),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SizPayConfirmResponse = await response.json();
      return data;
    } catch (error) {
      console.error('SizPay confirm error:', error);
      throw error;
    }
  }

  getPaymentUrl(token: string): string {
    return `${this.config.baseUrl}/Route/Payment?MerchantID=${this.config.merchantId}&TerminalID=${this.config.terminalId}&Token=${token}`;
  }

  isSuccessResponse(resCod: string | number): boolean {
    // SizPay returns 0 or '0' or '00' for success
    return resCod === 0 || resCod === '0' || resCod === '00';
  }
}

export const sizpayService = new SizPayService();

