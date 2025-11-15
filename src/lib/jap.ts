// Just Another Panel API Integration

interface JAPConfig {
  apiUrl: string;
  apiKey: string;
}

export interface JAPServiceData {
  service: number;
  name: string;
  type: string;
  category: string;
  rate: string;
  min: string;
  max: string;
  refill: boolean;
  cancel: boolean;
}

export interface JAPOrderResponse {
  order: number;
}

export interface JAPOrderStatus {
  charge: string;
  start_count: string;
  status: string;
  remains: string;
  currency: string;
}

export interface JAPBalance {
  balance: string;
  currency: string;
}

export interface AddOrderParams {
  service: number;
  link: string;
  quantity?: number;
  runs?: number;
  interval?: number;
  keywords?: string;
  comments?: string;
  usernames?: string;
  hashtags?: string;
  username?: string;
  media?: string;
  answer_number?: number;
  groups?: string;
  country?: string;
  device?: number;
  type_of_traffic?: number;
  google_keyword?: string;
  referring_url?: string;
  hashtag?: string;
  min?: number;
  max?: number;
  posts?: number;
  old_posts?: number;
  delay?: number;
  expiry?: string;
}

export class JAPService {
  private config: JAPConfig;

  constructor() {
    this.config = {
      apiUrl: process.env.JAP_API_URL || 'https://justanotherpanel.com/api/v2',
      apiKey: process.env.JAP_API_KEY || '',
    };
  }

  private validateConfig(): void {
    if (!this.config.apiKey) {
      throw new Error('JAP_API_KEY is not configured in environment variables');
    }
  }

  private async makeRequest(
    action: string,
    params: Record<string, string | number | boolean> = {}
  ): Promise<Record<string, unknown>> {
    this.validateConfig();

    const formData = new URLSearchParams();
    formData.append('key', this.config.apiKey);
    formData.append('action', action);

    // Add additional parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    try {
      const response = await fetch(this.config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Check for API errors
      if (data.error) {
        throw new Error(`JAP API Error: ${data.error}`);
      }

      return data;
    } catch (error) {
      console.error('JAP API request failed:', error);
      throw error;
    }
  }

  /**
   * Get all available services from JAP
   */
  async getServices(): Promise<JAPServiceData[]> {
    return (await this.makeRequest('services')) as unknown as JAPServiceData[];
  }

  /**
   * Create a new order
   */
  async addOrder(params: AddOrderParams): Promise<JAPOrderResponse> {
    return (await this.makeRequest(
      'add',
      params as unknown as Record<string, string | number | boolean>
    )) as unknown as JAPOrderResponse;
  }

  /**
   * Get status of a single order
   */
  async getOrderStatus(orderId: number): Promise<JAPOrderStatus> {
    return (await this.makeRequest('status', { order: orderId })) as unknown as JAPOrderStatus;
  }

  /**
   * Get status of multiple orders
   */
  async getMultipleOrderStatus(orderIds: number[]): Promise<Record<string, JAPOrderStatus>> {
    return (await this.makeRequest('status', { orders: orderIds.join(',') })) as unknown as Record<
      string,
      JAPOrderStatus
    >;
  }

  /**
   * Create a refill for an order
   */
  async createRefill(orderId: number): Promise<{ refill: string }> {
    return (await this.makeRequest('refill', { order: orderId })) as unknown as { refill: string };
  }

  /**
   * Create refills for multiple orders
   */
  async createMultipleRefills(orderIds: number[]): Promise<Record<string, { refill: string }>> {
    return (await this.makeRequest('refill', { orders: orderIds.join(',') })) as unknown as Record<
      string,
      { refill: string }
    >;
  }

  /**
   * Get refill status
   */
  async getRefillStatus(refillId: number): Promise<{ status: string }> {
    return (await this.makeRequest('refill_status', { refill: refillId })) as unknown as {
      status: string;
    };
  }

  /**
   * Get multiple refill statuses
   */
  async getMultipleRefillStatus(refillIds: number[]): Promise<Record<string, { status: string }>> {
    return (await this.makeRequest('refill_status', {
      refills: refillIds.join(','),
    })) as unknown as Record<string, { status: string }>;
  }

  /**
   * Cancel orders
   */
  async cancelOrders(orderIds: number[]): Promise<Record<string, string>> {
    return (await this.makeRequest('cancel', { orders: orderIds.join(',') })) as unknown as Record<
      string,
      string
    >;
  }

  /**
   * Get account balance
   */
  async getBalance(): Promise<JAPBalance> {
    return (await this.makeRequest('balance')) as unknown as JAPBalance;
  }

  /**
   * Map JAP status to our order status
   */
  mapJAPStatus(japStatus: string): string {
    const statusMapping: Record<string, string> = {
      Pending: 'pending',
      'In progress': 'processing',
      In_progress: 'processing',
      Processing: 'processing',
      Partial: 'in_progress',
      Completed: 'completed',
      Canceled: 'cancelled',
      Canceled_Refunded: 'refunded',
    };

    return statusMapping[japStatus] || 'pending';
  }

  /**
   * Check if JAP is configured
   */
  isConfigured(): boolean {
    return !!this.config.apiKey;
  }
}

export const japService = new JAPService();
