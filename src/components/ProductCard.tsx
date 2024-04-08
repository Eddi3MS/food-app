import { Tables } from '@/types'
import { Link, useSegments } from 'expo-router'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import RemoteImage from './RemoteImage'

type ProductCardPros = { product: Tables<'products'> }

const ProductCard = ({ product }: ProductCardPros) => {
  const segments = useSegments<['(admin)', 'menu'] | ['(user)', 'menu']>()

  return (
    <View
      style={[
        styles.container,
        /* container: padding 10 gap 10 => 10 + gap / 2 = 15 ) */
        { maxWidth: Dimensions.get('window').width / 2 - 15 },
      ]}
    >
      <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
        <Pressable style={styles.Pressable}>
          <RemoteImage
            path={product.image}
            fallback={process.env.EXPO_PUBLIC_DEFAULT_IMAGE!}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title} numberOfLines={1}>
            {product.name}
          </Text>
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
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
    borderRadius: 20,
  },
  Pressable: {
    padding: 10,
    flex: 1,
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
    color: Colors.primary,
    fontWeight: 'bold',
  },
})
