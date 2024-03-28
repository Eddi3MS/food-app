import Button from '@/components/Button'
import CartCard from '@/components/CartCard'
import { useCart } from '@/providers/CartProvider'
import { StatusBar } from 'expo-status-bar'
import { FlatList, Image, Platform, StyleSheet, Text, View } from 'react-native'

const CartScreen = () => {
  const { items, total } = useCart()

  if (items.length === 0) {
    return (
      <View style={{ padding: 10 }}>
        <View style={styles.emptyCartContainer}>
          <Image
            source={{ uri: process.env.EXPO_PUBLIC_DEFAULT_IMAGE }}
            style={styles.image}
          />
          <Text>Nenhum item adicionado.</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartCard cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />

      <Text style={styles.totalText}>Total: ${total}</Text>
      <Button onPress={() => {}} text="Checkout" />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  emptyCartContainer: {
    padding: 20,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: '50%',
    aspectRatio: 1,
  },
  totalText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '500',
  },
})
