import { randomUUID } from 'expo-crypto'
import { PropsWithChildren, createContext, useContext, useState } from 'react'
import { CartItem, Enums, Tables } from '../types'
import { useInsertOrder, useInsertOrderItems } from '@/queries/orders'
import { router } from 'expo-router'

type CartType = {
  items: CartItem[]
  addItem: (
    product: Tables<'products'> & { categories: Tables<'categories'> | null }
  ) => void
  updateQuantity: (itemId: string, amount: 1 | -1) => void
  total: number
  checkout: (data: {
    paymentType?: Enums<'payment_type'>
    changeFor?: number | null
  }) => void
  loading: boolean
}

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
  loading: false,
})

export default function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)

  const { mutate: handleInsertOrder } = useInsertOrder()
  const { mutate: handleInsertOrderItems } = useInsertOrderItems()

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  const handleClearCart = () => {
    setItems([])
  }

  const addItem = (
    product: Tables<'products'> & { categories: Tables<'categories'> | null }
  ) => {
    const existingItem = items.find((item) => item.product.id === product.id)
    if (existingItem) {
      updateQuantity(existingItem.id, 1)
      return
    }

    const newCartItem = {
      id: randomUUID(),
      product,
      quantity: 1,
    }

    setItems((existingItems) => [newCartItem, ...existingItems])
  }

  const updateQuantity = (itemId: string, amount: 1 | -1) => {
    setItems((existingItems) =>
      existingItems
        .map((it) =>
          it.id === itemId ? { ...it, quantity: it.quantity + amount } : it
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const handleCheckout = async ({
    paymentType = 'Dinheiro',
    changeFor = null,
  }: {
    paymentType?: Enums<'payment_type'>
    changeFor?: number | null
  }) => {
    setLoading(true)
    handleInsertOrder(
      { total, payment_type: paymentType, change_for: changeFor },
      {
        onSuccess: handleSaveOrderItems,
        onError: () => setLoading(false),
      }
    )
  }

  const handleSaveOrderItems = (order: Tables<'orders'>) => {
    const orderItems = items.map((cartItem) => ({
      order_id: order.id,
      product_id: cartItem.product.id,
      quantity: cartItem.quantity,
    }))

    handleInsertOrderItems(orderItems, {
      onSuccess() {
        router.push(`/(user)/orders/${order.id}`)
        handleClearCart()
      },
      onSettled: () => setLoading(false),
    })
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        total,
        checkout: handleCheckout,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
