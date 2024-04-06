import FontAwesomeIcon from '@/components/FontAwesomeIcon'
import Colors from '@/constants/Colors'
import { useProduct } from '@/queries/products'
import { defaultImage } from '@/utils/defaultImage'
import products from '@assets/data/products'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native'

const ProductDetails = () => {
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
        <Text>Produto não encontrado.</Text>
        <Stack.Screen options={{ title: 'Oops..' }} />
      </>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: product.name,
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesomeIcon
                    name="pencil"
                    size={20}
                    color={Colors.primary}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

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
    backgroundColor: Colors.white,
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
    color: Colors.black,
    textAlign: 'center',
  },
  price: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
