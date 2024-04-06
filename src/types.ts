import { Database } from './database.types'

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]

export type PizzaSize = 'P' | 'M' | 'G' | 'GG'

export type CartItem = {
  id: string
  product: Tables<'products'>
  size: PizzaSize
  quantity: number
}

export const OrderStatusList: OrderStatus[] = [
  'Novo',
  'Preparando',
  'Saiu p/ Entrega',
  'Entregue',
]

export type OrderStatus = 'Novo' | 'Preparando' | 'Saiu p/ Entrega' | 'Entregue'

export type Order = {
  id: number
  created_at: string
  total: number
  user_id: string
  status: OrderStatus

  order_items?: OrderItem[]
}

export type OrderItem = {
  id: number
  product_id: number
  products: Tables<'products'>
  order_id: number
  size: PizzaSize
  quantity: number
}

export type Profile = {
  id: string
  group: string
}

