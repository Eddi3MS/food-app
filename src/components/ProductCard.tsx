import { Tables } from '@/types'
import { Link, useSegments } from 'expo-router'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'

type ProductCardPros = { product: Tables<'products'> }

const ProductCard = ({ product }: ProductCardPros) => {
  const segments = useSegments<['(admin)', 'menu'] | ['(user)', 'menu']>()

  return (
    <View style={[styles.container]}>
      <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
        <Pressable style={styles.Pressable}>
          <Image
            source={{
              uri: product.image || process.env.EXPO_PUBLIC_DEFAULT_IMAGE!,
            }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={1}>
              {product.name}
            </Text>
            <Text>{product.description}</Text>
            <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
          </View>
        </Pressable>
      </Link>
    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    borderRadius: 10,
  },
  Pressable: {
    flexDirection: 'row-reverse',
    padding: 10,
    flex: 1,
  },
  image: {
    maxWidth: 90,
    width: '100%',
    aspectRatio: 1,
    borderRadius: 6,
  },
  info: { flex: 1, justifyContent: 'space-between' },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
})
