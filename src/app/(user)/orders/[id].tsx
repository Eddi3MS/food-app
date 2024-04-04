import OrderListCard from '@/components/OrderListCard'
import OrderProductCard from '@/components/OrderProductCard'
import orders from '@assets/data/orders'
import { Stack, useLocalSearchParams } from 'expo-router'
import { FlatList, Text, View } from 'react-native'

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams()

  const order = orders.find((o) => o.id.toString() === id)

  if (!order) {
    return <Text>Not found</Text>
  }

  const total = order.order_items?.reduce((acc, att) => {
    return (acc += att.quantity * att.products.price)
  }, 0)

  return (
    <View style={{ padding: 10, gap: 20 }}>
      <Stack.Screen options={{ title: `Pedido #${id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderProductCard item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListCard order={order} />}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total:</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>R${total}</Text>
      </View>
    </View>
  )
}

