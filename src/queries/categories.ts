import { supabase } from '@/lib/supabase'
import { UpdateTables, InsertTables, Tables } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCategoriesList = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('order')

      if (error) {
        throw new Error(error.message)
      }

      if (!data) {
        return []
      }

      return data
    },
  })
}

export const useInsertCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(data: InsertTables<'categories'>) {
      const { error, data: newCategory } = await supabase
        .from('categories')
        .insert(data)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }
      return newCategory
    },
    async onSuccess(update) {
      await queryClient.setQueryData(
        ['categories'],
        (data: Tables<'categories'>[]) => [...data, update]
      )
    },
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn({
      id,
      ...data
    }: UpdateTables<'categories'> & { id: number }) {
      const { error, data: updatedCategory } = await supabase
        .from('categories')
        .update(data)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }
      return updatedCategory
    },
    async onSuccess(update, { id }) {
      await queryClient.setQueryData(
        ['categories'],
        (data: Tables<'categories'>[]) =>
          Array.isArray(data) && data.length > 0
            ? data.map((cat) => (cat.id === id ? update : cat))
            : [update]
      )
    },
  })
}

export const useUpdateCategoriesOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(data: (UpdateTables<'categories'> & { name: string })[]) {
      const { error, data: updatedCategories } = await supabase
        .from('categories')
        .upsert(data)
        .select()
        .order('order')

      if (error) {
        throw new Error(error.message)
      }
      return updatedCategories
    },
    async onSuccess(update) {
      await queryClient.setQueryData(['categories'], () => update)
    },
  })
}
