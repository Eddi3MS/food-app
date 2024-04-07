import CenteredFeedback from '@/components/CenteredFeedback'
import OrderListCard from '@/components/OrderListCard'
import Colors from '@/constants/Colors'
import { useAdminOrderList } from '@/queries/orders'
import { ActivityIndicator, FlatList, Text } from 'react-native'

export default function ReceivedOrdersScreen() {
  const { data, isLoading, error } = useAdminOrderList({
    statuses: ['Preparando', 'Saiu p/ Entrega'],
  })

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} color={Colors.primary} />
  }

  if (error) {
    return <CenteredFeedback text="Erro ao listar produtos." />
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
