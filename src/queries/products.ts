import { supabase } from '@/lib/supabase'
import { InsertTables, UpdateTables } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useProductList = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*, products(*)')
        .order('order', { ascending: true })

      if (error) {
        throw new Error(error.message)
      }

      if (!data) {
        return []
      }

      return data
        .map((group) => ({ title: group.name, data: group.products }))
        .filter((group) => group.data.length > 0)
    },
  })
}

export const useProduct = (id?: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      if (!id) return null

      const { data, error } = await supabase
        .from('products')
        .select('*, categories(*)')
        .eq('id', id)
        .single()

      if (error) {
        throw new Error(error.message)
      }
      return data
    },
  })
}

export const useInsertProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(data: InsertTables<'products'>) {
      const { error, data: newProduct } = await supabase
        .from('products')
        .insert(data)
        .single()

      if (error) {
        throw new Error(error.message)
      }
      return newProduct
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn({
      id,
      ...data
    }: UpdateTables<'products'> & { id: number }) {
      const { error, data: updatedProduct } = await supabase
        .from('products')
        .update(data)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }
      return updatedProduct
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ['products'] })
      await queryClient.invalidateQueries({ queryKey: ['products', id] })
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) {
        throw new Error(error.message)
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
