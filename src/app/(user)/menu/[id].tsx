import Button from '@/components/Button'
import ButtonSelection from '@/components/ButtonSelection'
import CenteredFeedback from '@/components/CenteredFeedback'
import RemoteImage from '@/components/RemoteImage'
import Colors from '@/constants/Colors'
import { useCart } from '@/providers/CartProvider'
import { useProduct } from '@/queries/products'
import { Enums } from '@/types'
import { Stack, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native'

const sizes: Enums<'sizes'>[] = ['P', 'M', 'G', 'GG']

const valueMultiplier = {
  P: 1,
  M: 1.5,
  G: 2,
  GG: 2.5,
}

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState<Enums<'sizes'>>(sizes[0])
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
    addItem(product, selectedSize)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <RemoteImage
        path={product.image}
        fallback={process.env.EXPO_PUBLIC_DEFAULT_IMAGE!}
        style={styles.image}
        resizeMode="contain"
      />

      <ButtonSelection
        options={sizes}
        keyExtractor={(size) => size}
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
                  selectedSize === size ? Colors.gray : '#00000005',
              },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? Colors.black : Colors.gray,
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        )}
      </ButtonSelection>

      <Text style={styles.price}>
        R$ {(product.price * valueMultiplier[selectedSize]).toFixed(2)}
      </Text>
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
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    color: Colors.black,
  },
  price: {
    color: Colors.black,
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
