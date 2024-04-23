import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import { useCart } from '../providers/CartProvider'
import { CartItem } from '../types'
import FontAwesomeIcon from './FontAwesomeIcon'
import { formatCurrency } from '@/utils/formatCurrency'

type CartCardProps = {
  cartItem: CartItem
}

const CartCard = ({ cartItem }: CartCardProps) => {
  const { updateQuantity } = useCart()

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>{cartItem.product.categories.name}</Text>
      <Image
        source={{
          uri: cartItem.product.image || process.env.EXPO_PUBLIC_DEFAULT_IMAGE!,
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={{ flex: 1, gap: 15 }}>
        <Text style={styles.title}>{cartItem.product.name}</Text>

        <Text style={styles.price}>
          {formatCurrency(cartItem.product.price)}
        </Text>
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
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 10,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  image: {
    width: 75,
    alignSelf: 'center',
    marginRight: 10,
    aspectRatio: 1,
    borderRadius: 6,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
  },

  quantitySelector: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 'auto',
    backgroundColor: Colors.gray,
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 8,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 10,
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
    marginTop: 'auto',
  },
})

export default CartCard
