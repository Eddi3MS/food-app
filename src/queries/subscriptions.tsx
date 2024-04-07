import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useInsertOrderSubscription = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const ordersSubscription = supabase
      .channel('admin-insert-order-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['orders'] })
        }
      )
      .subscribe()

    return () => {
      ordersSubscription.unsubscribe()
    }
  }, [])
}

export const useUpdateOrderSubscription = (id: number) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const order = supabase
      .channel('user-order-details-update-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${id}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['orders', id] })
        }
      )
      .subscribe()

    return () => {
      order.unsubscribe()
    }
  }, [])
}

export const useUpdateMyOrderListSubscription = () => {
  const { session } = useAuth()
  const id = session?.user.id!
  const queryClient = useQueryClient()

  useEffect(() => {
    const orders = supabase
      .channel('user-orders-list-update-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${id}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ['orders', { userId: id }],
          })
        }
      )
      .subscribe()

    return () => {
      orders.unsubscribe()
    }
  }, [])
}
