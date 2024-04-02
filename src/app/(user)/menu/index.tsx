import products from '@assets/data/products'
import ProductCard from '@components/ProductCard'
import { FlatList } from 'react-native'

export default function ProductsList() {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => String(item.id)}
      renderItem={(itemData) => <ProductCard product={itemData.item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  )
}

