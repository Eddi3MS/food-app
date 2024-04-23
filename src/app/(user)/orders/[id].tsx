import Button from '@/components/Button'
import CenteredFeedback from '@/components/CenteredFeedback'
import OrderListCard from '@/components/OrderListCard'
import OrderProductCard from '@/components/OrderProductCard'
import Colors from '@/constants/Colors'
import { useUserOrderDetails } from '@/queries/orders'
import { useUpdateOrderSubscription } from '@/queries/subscriptions'
import { formatCurrency } from '@/utils/formatCurrency'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

export default function OrderDetailsScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, error, isLoading } = useUserOrderDetails(+id)
  useUpdateOrderSubscription(+id)

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} color={Colors.primary} />
  }

  if (error) {
    return <CenteredFeedback text="Erro ao listar produto." />
  }

  if (!data) {
    return <CenteredFeedback text="Produto não encontrado." />
  }

  const handleBack = () => router.back()

  return (
    <View style={{ padding: 10, gap: 20 }}>
      <FlatList
        data={data.order_items}
        renderItem={({ item }) => (
          <OrderProductCard item={{ ...item, products: item.products! }} />
        )}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListCard order={data} />}
        ListFooterComponent={() => {
          return (
            <>
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
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  {formatCurrency(data.total)}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Button text="Voltar" onPress={handleBack} variant="danger" />
              </View>
            </>
          )
        }}
      />
    </View>
  )
}

