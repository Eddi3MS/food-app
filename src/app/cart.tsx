import Button from '@/components/Button'
import CartCard from '@/components/CartCard'
import EmptyCartCard from '@/components/EmptyCartCard'
import { useAuth } from '@/providers/AuthProvider'
import { useCart } from '@/providers/CartProvider'
import { formatCurrency } from '@/utils/formatCurrency'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Alert, FlatList, Platform, StyleSheet, Text, View } from 'react-native'

const CartScreen = () => {
  const { items, total, checkout, loading } = useCart()
  const { profile } = useAuth()

  const handleCheckout = () => {
    if (!Array.isArray(profile?.address) || profile.address.length <= 0) {
      return Alert.alert(
        'Atenção!!',
        'Vincule um endereço ao seu perfil antes de finalizar o pedido.',
        [
          {
            text: 'Cancelar',
            style: 'destructive',
          },
          {
            text: 'Ir para cadastro',
            style: 'default',
            onPress: () => router.push('/(user)/profile/address'),
          },
        ]
      )
    }

    checkout()
  }

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

      <Text style={styles.totalText}>Total: {formatCurrency(total)}</Text>
      <Button
        onPress={handleCheckout}
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
