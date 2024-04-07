import { Tables } from '@/types'
import { formatToRelativeTime } from '@/utils/dayjs'
import { Link, useSegments } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

type OrderListCardProps = {
  order: Tables<'orders'>
}

const OrderListCard = ({ order }: OrderListCardProps) => {
  const segments = useSegments<
    ['(user)', 'orders'] | ['(admin)', 'orders', '[id]']
  >()

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.title}>Pedido #{order.id}</Text>
          <Text style={styles.time}>
            {formatToRelativeTime(order.created_at)}
          </Text>
        </View>

        <Text style={styles.status}>{order.status}</Text>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  time: {
    color: 'gray',
  },
  status: {
    fontWeight: '500',
  },
})

export default OrderListCard
