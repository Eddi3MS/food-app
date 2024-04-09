import { Database } from './database.types'

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]

export type CartItem = {
  id: string
  product: Tables<'products'>
  quantity: number
}

export const OrderStatusList: Enums<'statuses'>[] = [
  'Novo',
  'Preparando',
  'Saiu p/ Entrega',
  'Entregue',
]

export type Profile = {
  id: string
  group: string
}

