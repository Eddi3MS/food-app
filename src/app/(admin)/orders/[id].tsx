import ButtonSelection from '@/components/ButtonSelection'
import CenteredFeedback from '@/components/CenteredFeedback'
import OrderListCard from '@/components/OrderListCard'
import OrderProductCard from '@/components/OrderProductCard'
import Colors from '@/constants/Colors'
import { useOrderDetails } from '@/queries/orders'
import { OrderStatusList } from '@/types'
import { Stack, useLocalSearchParams } from 'expo-router'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native'

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

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Pedido #${id}` }} />

      <FlatList
        data={data.order_items}
        renderItem={({ item }) => (
          <OrderProductCard item={{ ...item, products: item.products! }} />
        )}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListCard order={data} />}
        ListFooterComponent={() => (
          <ButtonSelection
            title={<Text style={{ fontWeight: 'bold' }}>Status</Text>}
            options={OrderStatusList}
            optionsContainerClasses={{ flexDirection: 'row', gap: 5 }}
            keyExtractor={(option) => option}
          >
            {(status) => (
              <Pressable
                key={status}
                onPress={() => console.warn('Update status')}
                style={{
                  borderColor: Colors.primary,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  marginVertical: 10,
                  backgroundColor:
                    data.status === status ? Colors.primary : 'transparent',
                }}
              >
                <Text
                  style={{
                    color:
                      data.status === status ? Colors.white : Colors.primary,
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

