import Button from '@/components/Button'
import CenteredFeedback from '@/components/CenteredFeedback'
import Colors from '@/constants/Colors'
import { useCart } from '@/providers/CartProvider'
import { useProduct } from '@/queries/products'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native'

const ProductDetails = () => {
  const { addItem } = useCart()

  const { id } = useLocalSearchParams<{ id: string }>()
  const { data: product, error, isLoading } = useProduct(+id)

  if (isLoading) {
    return (
      <>
        <ActivityIndicator style={{ flex: 1 }} color={Colors.primary} />
        <Stack.Screen options={{ title: 'Carregando..' }} />
      </>
    )
  }

  if (!product || error) {
    return (
      <>
        <CenteredFeedback text="Produto não encontrado." />
        <Stack.Screen options={{ title: 'Oops..' }} />
      </>
    )
  }

  const handleAddItemToCart = () => {
    addItem(product)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: product.name }} />

      <Image
        source={{
          uri: product.image || process.env.EXPO_PUBLIC_DEFAULT_IMAGE!,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>{product.description}</Text>
      <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>

      <Button text="Adicionar ao carrinho" onPress={handleAddItemToCart} />
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
    width: '100%',
    aspectRatio: 1,
    borderRadius: 6,
  },
  text: { fontSize: 18, textAlign: 'center', marginVertical: 10 },
  price: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 'auto',
    textAlign: 'center',
  },
})
