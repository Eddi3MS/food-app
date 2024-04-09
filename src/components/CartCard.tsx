import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import { useCart } from '../providers/CartProvider'
import { CartItem } from '../types'
import FontAwesomeIcon from './FontAwesomeIcon'
import RemoteImage from './RemoteImage'

type CartCardProps = {
  cartItem: CartItem
}

const CartCard = ({ cartItem }: CartCardProps) => {
  const { updateQuantity } = useCart()

  return (
    <View style={styles.container}>
      <RemoteImage
        path={cartItem.product.image}
        fallback={process.env.EXPO_PUBLIC_DEFAULT_IMAGE!}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{cartItem.product.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>
            R$ {cartItem.product.price.toFixed(2)}
          </Text>
          <Text>Tamanho: {cartItem.product.size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <FontAwesomeIcon
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          style={styles.quantityIcon}
          size={14}
        />

        <Text style={styles.quantity}>{cartItem.quantity}</Text>
        <FontAwesomeIcon
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          style={styles.quantityIcon}
          size={14}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 75,
    alignSelf: 'center',
    marginRight: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  quantitySelector: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  quantity: {
    fontWeight: '500',
    fontSize: 18,
  },
  quantityIcon: {
    padding: 5,
    aspectRatio: 1,
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  price: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
})

export default CartCard
