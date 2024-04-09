import { supabase } from '@/lib/supabase'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Tables, InsertTables, UpdateTables } from '@/types'
import { sizeName } from '@/utils/dictionary'

export const useProductList = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*')

      if (error) {
        throw new Error(error.message)
      }

      const formattedData = data.reduce(
        (acc: { title: string; data: Tables<'products'>[] }[], att) => {
          const title = `Pizza ${sizeName(att.size)}`
          const existingObject = acc.find((item) => item.title === title)

          if (existingObject) {
            existingObject.data.push(att)
          } else {
            acc.push({ title, data: [att] })
          }

          return acc
        },
        []
      )

      return formattedData
    },
  })
}

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
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
