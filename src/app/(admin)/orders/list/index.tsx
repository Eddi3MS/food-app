import AdminOrdersList from '@/components/AdminOrderList'
import { useInsertOrderSubscription } from '@/queries/subscriptions'

export default function OrdersScreen() {
  useInsertOrderSubscription()

  return <AdminOrdersList statuses={['Novo']} />
}
