import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export const useUsersCount = () => {
  return useQuery({
    queryKey: ['users-count'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'USER')

      if (error) {
        throw new Error(error.message)
      }
      return data?.length ?? 0
    },
  })
}
