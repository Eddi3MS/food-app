import CartCard from '@/components/CartCard'
import EmptyCartCard from '@/components/EmptyCartCard'
import Input from '@/components/Input'
import Select from '@/components/Select'
import Colors from '@/constants/Colors'
import { useAuth } from '@/providers/AuthProvider'
import { useCart } from '@/providers/CartProvider'
import { Enums } from '@/types'
import { formatCurrency } from '@/utils/formatCurrency'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const paymentOptions = [
  {
    label: 'Dinheiro',
    value: 'Dinheiro',
    key: 'Dinheiro',
  },
  {
    label: 'Cartão de Crédito',
    value: 'Cartão de Crédito',
    key: 'Cartão de Crédito',
  },
  {
    label: 'Cartão de débito',
    value: 'Cartão de débito',
    key: 'Cartão de débito',
  },
  {
    label: 'Pix',
    value: 'Pix',
    key: 'Pix',
  },
]

const CartScreen = () => {
  const [paymentType, setPaymentType] =
    useState<Enums<'payment_type'>>('Dinheiro')
  const [changeFor, setChangeFor] = useState<string | null>(null)

  const handlePaymentType = (type: Enums<'payment_type'>) => {
    setPaymentType(type)
  }
  const handleChangeFor = (change: string | null) => {
    setChangeFor(change)
  }

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
    const change = changeFor ? Number(changeFor) : null

    if (!paymentType) {
      return Alert.alert('Erro!', 'Selecione um meio de pagamento.')
    }

    if (change && change < total) {
      return Alert.alert('Erro!', 'Troco para deve ser maior que total.')
    }

    checkout({
      paymentType,
      ...(changeFor &&
        paymentType === 'Dinheiro' && { changeFor: Number(changeFor) }),
    })
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
        style={{
          padding: 5,
          borderColor: Colors.gray,
          borderRadius: 10,
          borderWidth: 1,
        }}
      />

      <Select
        options={paymentOptions}
        title="Forma de Pagamento"
        onChange={(value) => {
          handlePaymentType(value)
        }}
        value={paymentType}
      />

      {paymentType === 'Dinheiro' ? (
        <Input
          value={formatCurrency(changeFor || 0)}
          onChangeText={(text) => {
            const sanitizedText = text.replace(/[^0-9]/g, '')

            handleChangeFor(sanitizedText)
          }}
          placeholder="R$100,00"
          label={'Troco para'}
          keyboardType="numeric"
          key="select_change"
        />
      ) : null}

      <View style={styles.checkout}>
        <Text style={styles.checkoutButtonText}>
          Total: {formatCurrency(total)}
        </Text>
        <Pressable
          onPress={handleCheckout}
          disabled={loading}
          style={styles.checkoutButton}
        >
          <Text style={styles.checkoutButtonText}>
            {loading ? 'Finalizando..' : 'Finalizar'}
          </Text>
        </Pressable>
      </View>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 80,
    gap: 10,
  },
  checkout: {
    marginTop: 'auto',
    backgroundColor: Colors.primary,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  checkoutButton: {
    backgroundColor: Colors.primaryDark,
    flex: 0.8,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
})
