import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { Tables } from '@/types'
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

        (update: { new: Tables<'orders'> }) => {
          queryClient.setQueryData(
            ['orders', { statuses: ['Novo'] }],
            (data: Tables<'orders'>[]) => [update.new, ...data]
          )
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
        (update: { new: Tables<'orders'> }) => {
          queryClient.setQueryData(
            ['orders', id],
            (
              data: Tables<'orders'> & { order_items: Tables<'order_items'> }
            ) => ({ ...data, status: update.new.status })
          )
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

        (update: { new: Tables<'orders'> }) => {
          queryClient.setQueryData(
            ['orders', { userId: id }],
            (data: Tables<'orders'>[]) =>
              data.map((d) => (d.id === update.new.id ? update.new : d))
          )
        }
      )
      .subscribe()

    return () => {
      orders.unsubscribe()
    }
  }, [])
}
