import OrderListCard from '@/components/OrderListCard'
import orders from '@assets/data/orders'
import { FlatList } from 'react-native'

export default function OrdersScreen() {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListCard order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  )
}
