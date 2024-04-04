import Button from '@/components/Button'
import ButtonSelection from '@/components/ButtonSelection'
import Colors from '@/constants/Colors'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types'
import { defaultImage } from '@/utils/defaultImage'
import products from '@assets/data/products'
import { Stack, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text } from 'react-native'

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
          uri: defaultImage(product.image),
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <ButtonSelection
        options={sizes}
        title={<Text style={styles.title}>Escolha o tamanho:</Text>}
        optionsContainerClasses={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 10,
        }}
      >
        {(size) => (
          <Pressable
            onPress={() => {
              setSelectedSize(size)
            }}
            style={[
              styles.size,
              {
                backgroundColor:
                  selectedSize === size ? 'gainsboro' : '#00000005',
              },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? Colors.light.text : 'gray',
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        )}
      </ButtonSelection>

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
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
  price: {
    color: Colors.light.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 'auto',
    textAlign: 'center',
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
})
