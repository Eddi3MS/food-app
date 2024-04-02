import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import { useCart } from '../providers/CartProvider'
import { CartItem } from '../types'
import FontAwesomeIcon from './FontAwesomeIcon'

type CartCardProps = {
  cartItem: CartItem
}

const CartCard = ({ cartItem }: CartCardProps) => {
  const { updateQuantity } = useCart()

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: cartItem.product.image || process.env.EXPO_PUBLIC_DEFAULT_IMAGE,
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{cartItem.product.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${cartItem.product.price.toFixed(2)}</Text>
          <Text>Tamanho: {cartItem.size}</Text>
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
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 75,
    aspectRatio: 1,
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
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
})

export default CartCard
