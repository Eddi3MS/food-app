import Button from '@/components/Button'
import SizeSelect from '@/components/SizeSelect'
import Colors from '@/constants/Colors'
import products from '@assets/data/products'
import { Stack, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const sizes = ['P', 'M', 'G', 'GG']

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState(sizes[0])

  const { productId } = useLocalSearchParams<{ productId: string }>()
  const product = products.find((product) => {
    return product.id === +productId
  })

  const handleAddItemToCart = () => {
    console.warn(selectedSize)
  }

  if (!product) {
    return <Text>Produto não encontrado.</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || process.env.EXPO_PUBLIC_DEFAULT_IMAGE }}
        style={styles.image}
        resizeMode="contain"
      />

      <SizeSelect
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        sizes={sizes}
      />

      <Text style={styles.price}>${product.price}</Text>
      <Button text="Adicionar ao carrinho" onPress={handleAddItemToCart} />
    </View>
  )
}

export default ProductDetails

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
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
