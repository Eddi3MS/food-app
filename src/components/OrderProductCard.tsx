import { sizeName } from '@/utils/dictionary'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import { Tables } from '../types'
import { formatCurrency } from '@/utils/formatCurrency'

type OrderProductCardProps = {
  item: Tables<'order_items'> & {
    products:
      | (Tables<'products'> & { categories: Tables<'categories'> | null })
      | null
  }
}

const OrderProductCard = ({ item }: OrderProductCardProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: item?.products?.image || process.env.EXPO_PUBLIC_DEFAULT_IMAGE!,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.badge}>{item?.products?.categories?.name}</Text>
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <Text style={styles.title}>
          {item.quantity}x - {item?.products?.name}
        </Text>

        <Text>
          <Text style={styles.price}>
            {formatCurrency(item?.products?.price)}
          </Text>{' '}
          unid.
        </Text>

        {item.quantity > 1 && (
          <Text>
            <Text style={styles.price}>
              {formatCurrency(item.quantity * item?.products?.price!)}
            </Text>{' '}
            total.
          </Text>
        )}
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
    gap: 10,
    position: 'relative',
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
    marginBottom: 5,
    color: Colors.black,
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: Colors.primary,
    padding: 5,
    color: Colors.white,
    borderTopRightRadius: 10,
  },
  subtitleContainer: {
    gap: 5,
    paddingHorizontal: 10,
  },
  quantityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: Colors.primary,
    aspectRatio: 1,
    width: 40,
    borderRadius: 5,
  },
  quantity: {
    fontWeight: '500',
    fontSize: 16,
    color: Colors.black,
  },
  price: {
    color: Colors.black,
    fontWeight: 'bold',
  },
})

export default OrderProductCard

