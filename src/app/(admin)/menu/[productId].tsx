import Colors from '@/constants/Colors'
import { defaultImage } from '@/utils/defaultImage'
import products from '@assets/data/products'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text } from 'react-native'

const ProductDetails = () => {
  const { productId } = useLocalSearchParams<{ productId: string }>()
  const product = products.find((product) => {
    return product.id === +productId
  })

  if (!product) {
    return <Text>Produto não encontrado.</Text>
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{
          uri: defaultImage(product.image),
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
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
    fontSize: 30,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
  },
  price: {
    color: Colors.light.text,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
