import { sizeName } from '@/utils/dictionary'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import { Tables } from '../types'
import { formatCurrency } from '@/utils/formatCurrency'

type OrderProductCardProps = {
  item: Tables<'order_items'> & { products: Tables<'products'> }
}

const OrderProductCard = ({ item }: OrderProductCardProps) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}
        >
          <Text style={styles.title}>
            {item.quantity}x - {item.products.name}
          </Text>
          <Text style={styles.title}>{sizeName(item.products.size)}</Text>
        </View>

        <View style={styles.subtitleContainer}>
          <Text>
            <Text style={styles.price}>
              {formatCurrency(item.products.price)}
            </Text>{' '}
            unid.
          </Text>
        </View>
        {item.quantity > 1 && (
          <View style={styles.subtitleContainer}>
            <Text>
              <Text style={styles.price}>
                {formatCurrency(item.quantity * item.products.price)}
              </Text>{' '}
              total.
            </Text>
          </View>
        )}
      </View>

      <Image
        source={{
          uri: item.products.image || process.env.EXPO_PUBLIC_DEFAULT_IMAGE!,
        }}
        style={styles.image}
        resizeMode="contain"
      />
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
    gap: 10,
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

