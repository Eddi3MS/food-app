import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { Enums, InsertTables, UpdateTables } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useAdminOrderList = ({
  statuses,
}: {
  statuses: Enums<'statuses'>[]
}) => {
  return useQuery({
    queryKey: ['orders', { statuses }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .in('status', statuses)
        .order('created_at', { ascending: false })
      if (error) {
        throw new Error(error.message)
      }
      return data
    },
  })
}

export const useMyOrderList = () => {
  const { session } = useAuth()
  const id = session?.user.id

  return useQuery({
    queryKey: ['orders', { userId: id }],
    queryFn: async () => {
      if (!id) return null
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', id)
        .order('created_at', { ascending: false })
      if (error) {
        throw new Error(error.message)
      }
      return data
    },
  })
}

export const useUserOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*, categories(*)))')
        .eq('id', id)
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    },
  })
}

export const useAdminOrderDetails = (id: number, isAdmin = false) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(
          '*, order_items(*, products(*, categories(*))), profiles(expo_push_token,address(*))'
        )
        .eq('id', id)
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    },
  })
}

export const useInsertOrder = () => {
  const queryClient = useQueryClient()
  const { session } = useAuth()
  const userId = session?.user.id

  return useMutation({
    async mutationFn(data: Omit<InsertTables<'orders'>, 'user_id'>) {
      const { error, data: newProduct } = await supabase
        .from('orders')
        .insert({ ...data, user_id: userId! })
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }
      return newProduct
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}

export const useInsertOrderItems = () => {
  return useMutation({
    async mutationFn(items: InsertTables<'order_items'>[]) {
      const { error, data: newProduct } = await supabase
        .from('order_items')
        .insert(items)
        .select()

      if (error) {
        throw new Error(error.message)
      }
      return newProduct
    },
  })
}

export const useUpdateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn({
      id,
      updatedFields,
    }: {
      id: number
      updatedFields: UpdateTables<'orders'>
    }) {
      const { error, data: updatedOrder } = await supabase
        .from('orders')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }
      return updatedOrder
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ['orders'] })
      await queryClient.invalidateQueries({ queryKey: ['orders', id] })
    },
  })
}
