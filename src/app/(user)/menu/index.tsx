import CenteredFeedback from '@/components/CenteredFeedback'
import Colors from '@/constants/Colors'
import { useProductList } from '@/queries/products'
import ProductCard from '@components/ProductCard'
import { ActivityIndicator, SectionList, Text } from 'react-native'

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
    <SectionList
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <ProductCard product={item} />}
      contentContainerStyle={{
        gap: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
      }}
      sections={data}
      renderSectionHeader={({ section: { title } }) => (
        <Text
          style={{
            fontSize: 22,
            color: Colors.primary,
            fontWeight: '600',
            marginTop: 15,
            marginBottom: 5,
          }}
        >
          {title}
        </Text>
      )}
    />
  )
}

