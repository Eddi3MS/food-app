import CenteredFeedback from '@/components/CenteredFeedback'
import OrderListCard from '@/components/OrderListCard'
import OrderProductCard from '@/components/OrderProductCard'
import Colors from '@/constants/Colors'
import { useOrderDetails } from '@/queries/orders'
import { Stack, useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, error, isLoading } = useOrderDetails(+id)

  if (isLoading) {
    return (
      <>
        <ActivityIndicator style={{ flex: 1 }} color={Colors.primary} />
        <Stack.Screen options={{ title: 'Carregando..' }} />
      </>
    )
  }

  if (error) {
    return (
      <>
        <CenteredFeedback text="Erro ao listar produto." />
        <Stack.Screen options={{ title: 'Oops..' }} />
      </>
    )
  }

  if (!data) {
    return (
      <>
        <CenteredFeedback text="Produto não encontrado." />
        <Stack.Screen options={{ title: 'Oops..' }} />
      </>
    )
  }

  const total = data.order_items?.reduce((acc, att) => {
    return (acc += att.quantity * att.products!.price)
  }, 0)

  return (
    <View style={{ padding: 10, gap: 20 }}>
      <Stack.Screen options={{ title: `Pedido #${id}` }} />

      <FlatList
        data={data.order_items}
        renderItem={({ item }) => (
          <OrderProductCard item={{ ...item, products: item.products! }} />
        )}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListCard order={data} />}
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

