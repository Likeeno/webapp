export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'refunded'

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'verifying'
  | 'completed'
  | 'failed'
  | 'cancelled'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string | null
          balance: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          balance?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          balance?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          status: OrderStatus
          issuer_id: string
          price: number
          service: string
          jap_order_id: number | null
          link: string | null
          quantity: number | null
          start_count: number | null
          remains: number | null
          jap_service_id: number | null
          extra_data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          status?: OrderStatus
          issuer_id: string
          price: number
          service: string
          jap_order_id?: number | null
          link?: string | null
          quantity?: number | null
          start_count?: number | null
          remains?: number | null
          jap_service_id?: number | null
          extra_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          status?: OrderStatus
          issuer_id?: string
          price?: number
          service?: string
          jap_order_id?: number | null
          link?: string | null
          quantity?: number | null
          start_count?: number | null
          remains?: number | null
          jap_service_id?: number | null
          extra_data?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      jap_services: {
        Row: {
          id: string
          jap_service_id: number
          name: string
          type: string | null
          category: string | null
          rate: number
          min_quantity: number
          max_quantity: number
          refill_available: boolean
          cancel_available: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          jap_service_id: number
          name: string
          type?: string | null
          category?: string | null
          rate: number
          min_quantity: number
          max_quantity: number
          refill_available?: boolean
          cancel_available?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          jap_service_id?: number
          name?: string
          type?: string | null
          category?: string | null
          rate?: number
          min_quantity?: number
          max_quantity?: number
          refill_available?: boolean
          cancel_available?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          order_id: string
          invoice_no: string
          amount_toman: number
          amount_rial: number
          status: PaymentStatus
          token: string | null
          ref_no: string | null
          merchant_id: string | null
          terminal_id: string | null
          gateway_response: Json | null
          ip_address: string | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          order_id: string
          invoice_no: string
          amount_toman: number
          amount_rial: number
          status?: PaymentStatus
          token?: string | null
          ref_no?: string | null
          merchant_id?: string | null
          terminal_id?: string | null
          gateway_response?: Json | null
          ip_address?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          order_id?: string
          invoice_no?: string
          amount_toman?: number
          amount_rial?: number
          status?: PaymentStatus
          token?: string | null
          ref_no?: string | null
          merchant_id?: string | null
          terminal_id?: string | null
          gateway_response?: Json | null
          ip_address?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      order_status: OrderStatus
      payment_status: PaymentStatus
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type Payment = Database['public']['Tables']['payments']['Row']
export type JAPServiceRow = Database['public']['Tables']['jap_services']['Row']
export type InsertUser = Database['public']['Tables']['users']['Insert']
export type UpdateUser = Database['public']['Tables']['users']['Update']
export type InsertOrder = Database['public']['Tables']['orders']['Insert']
export type UpdateOrder = Database['public']['Tables']['orders']['Update']
export type InsertPayment = Database['public']['Tables']['payments']['Insert']
export type UpdatePayment = Database['public']['Tables']['payments']['Update']
export type InsertJAPService = Database['public']['Tables']['jap_services']['Insert']
export type UpdateJAPService = Database['public']['Tables']['jap_services']['Update']
