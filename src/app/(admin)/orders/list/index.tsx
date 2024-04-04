import OrderListCard from '@/components/OrderListCard'
import orders from '@assets/data/orders'
import { Tabs } from 'expo-router'
import { FlatList } from 'react-native'

export default function OrdersScreen() {
  return (
    <>
      <Tabs.Screen options={{ title: 'Recentes' }} />
      <FlatList
        data={orders.filter((o) => o.status !== 'Entregue')}
        renderItem={({ item }) => <OrderListCard order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </>
  )
}