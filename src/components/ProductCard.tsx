import { Link, useSegments, AllRoutes, usePathname } from 'expo-router'
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Colors from '../constants/Colors'
import { Product } from '../types'

type ProductCardPros = { product: Product }

const ProductCard = ({ product }: ProductCardPros) => {
  const segments = useSegments<['(admin)', 'menu'] | ['(user)', 'menu']>()

  const productImage = product.image || process.env.EXPO_PUBLIC_DEFAULT_IMAGE

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
          <Image
            source={{ uri: productImage }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title} numberOfLines={1}>
            {product.name}
          </Text>
          <Text style={styles.price}>${product.price}</Text>
        </Pressable>
      </Link>
    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
})
