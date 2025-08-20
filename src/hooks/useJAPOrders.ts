import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Database } from '@/types/database'

type Order = Database['public']['Tables']['orders']['Row']
type JAPService = {
  service: number
  name: string
  type: string
  category: string
  rate: string
  min: string
  max: string
  refill: boolean
  cancel: boolean
}

interface CreateOrderParams {
  user_id: string
  platform_id: number
  service_type_id: number
  package_id: number
  service: number // JAP service ID
  link: string
  quantity: number
  unit_price: number
  total_price: number
  runs?: number
  interval?: number
  keywords?: string
  comments?: string
  usernames?: string
  hashtags?: string
  username?: string
  media?: string
  answer_number?: number
  groups?: string
  country?: string
  device?: number
  type_of_traffic?: number
  google_keyword?: string
  referring_url?: string
}

interface JAPOrderStatus {
  charge: string
  start_count: string
  status: string
  remains: string
  currency: string
}

interface JAPBalance {
  balance: string
  currency: string
}

export function useJAPOrders() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const callJAPFunction = async (action: string, params: any = {}) => {
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.functions.invoke('orders', {
        body: { action, ...params }
      })

      if (error) throw error

      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getServices = async (): Promise<JAPService[]> => {
    try {
      const response = await fetch('/api/jap/services')
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch services')
      }

      return data.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch services'
      setError(errorMessage)
      throw err
    }
  }

  const createOrder = async (params: CreateOrderParams): Promise<{ order: Order; jap_order_id: number }> => {
    return await callJAPFunction('create-order', params)
  }

  const getOrderStatus = async (orderId: number): Promise<JAPOrderStatus> => {
    return await callJAPFunction('get-status', { orderId })
  }

  const getMultipleOrderStatus = async (orderIds: number[]): Promise<Record<string, JAPOrderStatus>> => {
    return await callJAPFunction('sync-status', { orderIds })
  }

  const createRefill = async (orderId: number): Promise<{ refill: string }> => {
    return await callJAPFunction('refill', { orderId })
  }

  const cancelOrders = async (orderIds: number[]): Promise<any> => {
    return await callJAPFunction('cancel', { orderIds })
  }

  const getBalance = async (): Promise<JAPBalance> => {
    try {
      const response = await fetch('/api/jap/balance')
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch balance')
      }

      return data.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch balance'
      setError(errorMessage)
      throw err
    }
  }

  return {
    loading,
    error,
    getServices,
    createOrder,
    getOrderStatus,
    getMultipleOrderStatus,
    createRefill,
    cancelOrders,
    getBalance
  }
}

// Hook for managing JAP services
export function useJAPServices() {
  const [services, setServices] = useState<JAPService[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from('jap_services_with_mappings')
        .select('*')
        .eq('is_active', true)
        .eq('mapping_active', true)

      if (error) throw error

      setServices(data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch services'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const getServiceByPlatformAndType = async (platformId: number, serviceTypeId: number) => {
    try {
      const { data, error } = await supabase
        .rpc('get_jap_service', {
          p_platform_id: platformId,
          p_service_type_id: serviceTypeId
        })

      if (error) throw error

      return data?.[0] || null
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get service'
      setError(errorMessage)
      throw err
    }
  }

  const refreshServices = async () => {
    try {
      const response = await fetch('/api/jap/services')
      const data = await response.json()
      
      if (data.success) {
        await fetchServices()
      }
    } catch (err) {
      console.error('Failed to refresh services:', err)
    }
  }

  return {
    services,
    loading,
    error,
    getServiceByPlatformAndType,
    refreshServices
  }
}

// Hook for real-time order updates
export function useJAPOrderUpdates(userId: string) {
  const [orderUpdates, setOrderUpdates] = useState<Record<number, JAPOrderStatus>>({})
  const supabase = createClient()

  useEffect(() => {
    if (!userId) return

    // Subscribe to order updates
    const channel = supabase
      .channel('jap_order_updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${userId}`
        },
        async (payload) => {
          const order = payload.new as Order
          
          if (order.jap_order_id) {
            try {
              // Fetch updated status from JAP
              const { data } = await supabase.functions.invoke('orders', {
                body: { 
                  action: 'get-status', 
                  orderId: order.jap_order_id 
                }
              })

              if (data?.success) {
                setOrderUpdates(prev => ({
                  ...prev,
                  [order.jap_order_id!]: data.data
                }))
              }
            } catch (error) {
              console.error('Failed to fetch order status:', error)
            }
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  return orderUpdates
}

// Hook for JAP balance monitoring
export function useJAPBalance() {
  const [balance, setBalance] = useState<JAPBalance | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBalance = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/jap/balance')
      const data = await response.json()
      
      if (data.success) {
        setBalance(data.data)
      } else {
        throw new Error(data.error || 'Failed to fetch balance')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch balance'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBalance()
  }, [])

  return {
    balance,
    loading,
    error,
    refreshBalance: fetchBalance
  }
}
