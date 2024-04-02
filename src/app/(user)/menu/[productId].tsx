import Button from '@/components/Button'
import SizeSelect from '@/components/SizeSelect'
import Colors from '@/constants/Colors'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types'
import products from '@assets/data/products'
import { Stack, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'

const sizes: PizzaSize[] = ['P', 'M', 'G', 'GG']

const valueMultiplier = {
  P: 1,
  M: 1.5,
  G: 2,
  GG: 2.5,
}

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>(sizes[0])
  const { addItem } = useCart()

  const { productId } = useLocalSearchParams<{ productId: string }>()
  const product = products.find((product) => {
    return product.id === +productId
  })

  if (!product) {
    return <Text>Produto não encontrado.</Text>
  }

  const handleAddItemToCart = () => {
    addItem(product, selectedSize)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{
          uri: product.image || process.env.EXPO_PUBLIC_DEFAULT_IMAGE,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <SizeSelect
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        sizes={sizes}
      />
      <Text style={styles.price}>
        ${(product.price * valueMultiplier[selectedSize]).toFixed(2)}
      </Text>
      <Button text="Adicionar ao carrinho" onPress={handleAddItemToCart} />
    </ScrollView>
  )
}

export default ProductDetails

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 'auto',
    textAlign: 'center',
  },
})
