import CenteredFeedback from '@/components/CenteredFeedback'
import OrderListCard from '@/components/OrderListCard'
import Colors from '@/constants/Colors'
import { useAdminOrderList } from '@/queries/orders'
import { Enums } from '@/types'
import { ActivityIndicator, FlatList } from 'react-native'

export default function AdminOrdersList({
  statuses,
}: {
  statuses: Enums<'statuses'>[]
}) {
  const { data, isLoading, error } = useAdminOrderList({
    statuses,
  })

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} color={Colors.primary} />
  }

  if (error) {
    return <CenteredFeedback text="Erro ao listar produtos." />
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
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
