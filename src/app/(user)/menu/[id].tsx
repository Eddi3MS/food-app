import Button from '@/components/Button'
import CenteredFeedback from '@/components/CenteredFeedback'
import Colors from '@/constants/Colors'
import { useCart } from '@/providers/CartProvider'
import { useProduct } from '@/queries/products'
import { formatCurrency } from '@/utils/formatCurrency'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const ProductDetails = () => {
  const router = useRouter()
  const { addItem } = useCart()

  const { id } = useLocalSearchParams<{ id: string }>()
  const { data: product, error, isLoading } = useProduct(id)

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} color={Colors.primary} />
  }

  if (!product || error) {
    return <CenteredFeedback text="Produto não encontrado." />
  }

  const handleAddItemToCart = () => {
    addItem(product)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: product.image || process.env.EXPO_PUBLIC_DEFAULT_IMAGE!,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.category}>{product.categories?.name}</Text>
      <Text style={styles.text}>{product.description}</Text>
      <Text style={styles.price}>{formatCurrency(product.price)}</Text>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Button text="Voltar" onPress={handleBack} variant="danger" />
        <Button text="Adicionar" onPress={handleAddItemToCart} />
      </View>
    </ScrollView>
  )
}

export default ProductDetails

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: '100%',
    flex: 1,
    padding: 20,
  },
  image: {
    alignSelf: 'center',
    width: '80%',
    aspectRatio: 1,
    borderRadius: 6,
  },
  title: { fontSize: 20, textAlign: 'center', marginVertical: 15 },
  text: { fontSize: 18, textAlign: 'center', marginVertical: 10 },
  category: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    alignSelf: 'center',
    padding: 5,
    borderRadius: 5,
  },
  price: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 'auto',
    textAlign: 'center',
  },
})
