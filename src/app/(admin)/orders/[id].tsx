import ButtonSelection from '@/components/ButtonSelection'
import OrderListCard from '@/components/OrderListCard'
import OrderProductCard from '@/components/OrderProductCard'
import Colors from '@/constants/Colors'
import { OrderStatusList } from '@/types'
import orders from '@assets/data/orders'
import { Stack, useLocalSearchParams } from 'expo-router'
import { FlatList, Pressable, Text, View } from 'react-native'

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
        ListFooterComponent={() => (
          <ButtonSelection
            title={<Text style={{ fontWeight: 'bold' }}>Status</Text>}
            options={OrderStatusList}
            optionsContainerClasses={{ flexDirection: 'row', gap: 5 }}
          >
            {(status) => (
              <Pressable
                key={status}
                onPress={() => console.warn('Update status')}
                style={{
                  borderColor: Colors.light.tint,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  marginVertical: 10,
                  backgroundColor:
                    order.status === status ? Colors.light.tint : 'transparent',
                }}
              >
                <Text
                  style={{
                    color:
                      order.status === status ? 'white' : Colors.light.tint,
                  }}
                >
                  {status}
                </Text>
              </Pressable>
            )}
          </ButtonSelection>
        )}
      />
    </View>
  )
}

