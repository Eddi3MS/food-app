import Button from '@/components/Button'
import CartCard from '@/components/CartCard'
import EmptyCartCard from '@/components/EmptyCartCard'
import { useCart } from '@/providers/CartProvider'
import { StatusBar } from 'expo-status-bar'
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native'

const CartScreen = () => {
  const { items, total, checkout, loading } = useCart()

  if (items.length === 0) {
    return <EmptyCartCard />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartCard cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />

      <Text style={styles.totalText}>Total: ${total}</Text>
      <Button
        onPress={checkout}
        text={loading ? 'Finalizando..' : 'Finalizar'}
        disabled={loading}
      />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: { padding: 10, flex: 1 },
  totalText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '500',
  },
})
