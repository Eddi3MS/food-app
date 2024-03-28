import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import products from '@assets/data/products'
import { Stack, useLocalSearchParams } from 'expo-router'
import Colors from '@/constants/Colors'

const product = (props: any) => {
  const { productId } = useLocalSearchParams<{ productId: string }>()
  const product = products.find((product) => {
    return product.id === +productId
  })

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
      <Text style={styles.title} numberOfLines={1}>
        {product.name}
      </Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  )
}

export default product

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
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
})
