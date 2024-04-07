import AdminOrdersList from '@/components/AdminOrderList'

export default function ReceivedOrdersScreen() {
  return <AdminOrdersList statuses={['Preparando', 'Saiu p/ Entrega']} />
}
