import { Tables } from '@/types'
import { Link, useSegments } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import RemoteImage from './RemoteImage'

type ProductCardPros = { product: Tables<'products'> }

const ProductCard = ({ product }: ProductCardPros) => {
  const segments = useSegments<['(admin)', 'menu'] | ['(user)', 'menu']>()

  return (
    <View style={[styles.container]}>
      <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
        <Pressable style={styles.Pressable}>
          <RemoteImage
            path={product.image}
            fallback={process.env.EXPO_PUBLIC_DEFAULT_IMAGE!}
            resizeMode="contain"
            style={styles.image}
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
