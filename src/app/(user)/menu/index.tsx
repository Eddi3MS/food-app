import CenteredFeedback from '@/components/CenteredFeedback'
import Colors from '@/constants/Colors'
import { useProductList } from '@/queries/products'
import ProductCard from '@components/ProductCard'
import { ActivityIndicator, FlatList, Text } from 'react-native'

export default function ProductsList() {
  const { data, error, isLoading } = useProductList()

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} color={Colors.primary} />
  }

  if (error) {
    return <CenteredFeedback text="Erro ao listar produtos." />
  }

  if (!data) {
    return <CenteredFeedback text="Nenhum produto cadastrado." />
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      renderItem={(itemData) => <ProductCard product={itemData.item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  )
}

