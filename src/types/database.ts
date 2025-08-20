export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          avatar_url: string | null
          balance: number
          total_spent: number
          total_orders: number
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          balance?: number
          total_spent?: number
          total_orders?: number
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          balance?: number
          total_spent?: number
          total_orders?: number
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      platforms: {
        Row: {
          id: number
          name: string
          display_name: string
          icon_name: string | null
          color: string | null
          bg_color: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          display_name: string
          icon_name?: string | null
          color?: string | null
          bg_color?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          display_name?: string
          icon_name?: string | null
          color?: string | null
          bg_color?: string | null
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      service_types: {
        Row: {
          id: number
          name: string
          display_name: string
          description: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          display_name: string
          description?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          display_name?: string
          description?: string | null
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      platform_services: {
        Row: {
          id: number
          platform_id: number
          service_type_id: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: number
          platform_id: number
          service_type_id: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          platform_id?: number
          service_type_id?: number
          is_active?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "platform_services_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "platform_services_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["id"]
          }
        ]
      }
      service_packages: {
        Row: {
          id: number
          platform_id: number
          service_type_id: number
          name: string
          quantity: number
          price: number
          delivery_time_hours: number
          is_popular: boolean
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: number
          platform_id: number
          service_type_id: number
          name: string
          quantity: number
          price: number
          delivery_time_hours: number
          is_popular?: boolean
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          platform_id?: number
          service_type_id?: number
          name?: string
          quantity?: number
          price?: number
          delivery_time_hours?: number
          is_popular?: boolean
          is_active?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_packages_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_packages_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          id: number
          order_number: string
          user_id: string
          platform_id: number | null
          service_type_id: number | null
          package_id: number | null
          target_link: string
          quantity: number
          unit_price: number
          total_price: number
          status: Database['public']['Enums']['order_status']
          delivery_date: string | null
          completed_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          order_number?: string
          user_id: string
          platform_id?: number | null
          service_type_id?: number | null
          package_id?: number | null
          target_link: string
          quantity: number
          unit_price: number
          total_price: number
          status?: Database['public']['Enums']['order_status']
          delivery_date?: string | null
          completed_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          order_number?: string
          user_id?: string
          platform_id?: number | null
          service_type_id?: number | null
          package_id?: number | null
          target_link?: string
          quantity?: number
          unit_price?: number
          total_price?: number
          status?: Database['public']['Enums']['order_status']
          delivery_date?: string | null
          completed_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "service_packages"
            referencedColumns: ["id"]
          }
        ]
      }
      order_progress: {
        Row: {
          id: number
          order_id: number
          current_quantity: number
          delivered_quantity: number
          progress_percentage: number
          status_message: string | null
          updated_at: string
        }
        Insert: {
          id?: number
          order_id: number
          current_quantity?: number
          delivered_quantity?: number
          progress_percentage?: number
          status_message?: string | null
          updated_at?: string
        }
        Update: {
          id?: number
          order_id?: number
          current_quantity?: number
          delivered_quantity?: number
          progress_percentage?: number
          status_message?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_progress_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
      payment_methods: {
        Row: {
          id: number
          name: string
          display_name: string
          description: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          display_name: string
          description?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          display_name?: string
          description?: string | null
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          id: number
          transaction_number: string
          user_id: string
          order_id: number | null
          payment_method_id: number | null
          amount: number
          type: Database['public']['Enums']['transaction_type']
          status: Database['public']['Enums']['transaction_status']
          gateway_response: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          transaction_number?: string
          user_id: string
          order_id?: number | null
          payment_method_id?: number | null
          amount: number
          type: Database['public']['Enums']['transaction_type']
          status?: Database['public']['Enums']['transaction_status']
          gateway_response?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          transaction_number?: string
          user_id?: string
          order_id?: number | null
          payment_method_id?: number | null
          amount?: number
          type?: Database['public']['Enums']['transaction_type']
          status?: Database['public']['Enums']['transaction_status']
          gateway_response?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          }
        ]
      }
      support_tickets: {
        Row: {
          id: number
          ticket_number: string
          user_id: string
          subject: string
          message: string
          priority: Database['public']['Enums']['ticket_priority']
          status: Database['public']['Enums']['ticket_status']
          category: Database['public']['Enums']['ticket_category'] | null
          assigned_to: string | null
          resolved_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          ticket_number?: string
          user_id: string
          subject: string
          message: string
          priority?: Database['public']['Enums']['ticket_priority']
          status?: Database['public']['Enums']['ticket_status']
          category?: Database['public']['Enums']['ticket_category'] | null
          assigned_to?: string | null
          resolved_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          ticket_number?: string
          user_id?: string
          subject?: string
          message?: string
          priority?: Database['public']['Enums']['ticket_priority']
          status?: Database['public']['Enums']['ticket_status']
          category?: Database['public']['Enums']['ticket_category'] | null
          assigned_to?: string | null
          resolved_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ticket_messages: {
        Row: {
          id: number
          ticket_id: number
          user_id: string
          message: string
          is_internal: boolean
          created_at: string
        }
        Insert: {
          id?: number
          ticket_id: number
          user_id: string
          message: string
          is_internal?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          ticket_id?: number
          user_id?: string
          message?: string
          is_internal?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          id: number
          user_id: string
          title: string
          message: string
          type: Database['public']['Enums']['notification_type']
          is_read: boolean
          data: Json | null
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          title: string
          message: string
          type?: Database['public']['Enums']['notification_type']
          is_read?: boolean
          data?: Json | null
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          title?: string
          message?: string
          type?: Database['public']['Enums']['notification_type']
          is_read?: boolean
          data?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_activity_logs: {
        Row: {
          id: number
          user_id: string
          action: string
          details: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          action: string
          details?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          action?: string
          details?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      platform_statistics: {
        Row: {
          id: number
          platform_id: number
          date: string
          total_orders: number
          total_revenue: number
          total_quantity: number
          created_at: string
        }
        Insert: {
          id?: number
          platform_id: number
          date: string
          total_orders?: number
          total_revenue?: number
          total_quantity?: number
          created_at?: string
        }
        Update: {
          id?: number
          platform_id?: number
          date?: string
          total_orders?: number
          total_revenue?: number
          total_quantity?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "platform_statistics_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          }
        ]
      }
      system_settings: {
        Row: {
          id: number
          key: string
          value: string
          description: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          key: string
          value: string
          description?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          key?: string
          value?: string
          description?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      user_dashboard: {
        Row: {
          user_id: string | null
          first_name: string | null
          last_name: string | null
          balance: number | null
          total_spent: number | null
          total_orders: number | null
          active_orders: number | null
          completed_orders: number | null
          pending_orders: number | null
        }
        Relationships: []
      }
      order_details: {
        Row: {
          id: number | null
          order_number: string | null
          user_id: string | null
          platform_id: number | null
          service_type_id: number | null
          package_id: number | null
          target_link: string | null
          quantity: number | null
          unit_price: number | null
          total_price: number | null
          status: Database['public']['Enums']['order_status'] | null
          delivery_date: string | null
          completed_date: string | null
          notes: string | null
          created_at: string | null
          updated_at: string | null
          platform_name: string | null
          service_name: string | null
          package_name: string | null
          user_email: string | null
          first_name: string | null
          last_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      order_status: 'pending' | 'processing' | 'in_progress' | 'completed' | 'cancelled' | 'refunded'
      transaction_type: 'deposit' | 'order_payment' | 'refund' | 'withdrawal'
      transaction_status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
      ticket_priority: 'low' | 'medium' | 'high' | 'urgent'
      ticket_status: 'open' | 'in_progress' | 'waiting_for_user' | 'resolved' | 'closed'
      ticket_category: 'technical' | 'billing' | 'order_issue' | 'general' | 'feature_request'
      notification_type: 'info' | 'success' | 'warning' | 'error' | 'order_update' | 'payment' | 'support'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
