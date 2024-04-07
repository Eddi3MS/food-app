import CenteredFeedback from '@/components/CenteredFeedback'
import OrderListCard from '@/components/OrderListCard'
import Colors from '@/constants/Colors'
import { useMyOrderList } from '@/queries/orders'
import { ActivityIndicator, FlatList } from 'react-native'

export default function OrdersScreen() {
  const { data, isLoading, error } = useMyOrderList()

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} color={Colors.primary} />
  }

  if (error) {
    return <CenteredFeedback text="Algo deu errado na listagem." />
  }

  if (!data) {
    return <CenteredFeedback text="Nenhum pedido encontrado." />
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <OrderListCard order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  )
}

