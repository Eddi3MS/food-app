import OrderListCard from '@/components/OrderListCard'
import OrderProductCard from '@/components/OrderProductCard'
import orders from '@assets/data/orders'
import { Stack, useLocalSearchParams } from 'expo-router'
import { FlatList, Text, View } from 'react-native'

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams()

  const order = orders.find((o) => o.id.toString() === id)

  if (!order) {
    return <Text>Não encontrado.</Text>
  }

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Pedido #${id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderProductCard item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListCard order={order} />}
      />
    </View>
  )
}

