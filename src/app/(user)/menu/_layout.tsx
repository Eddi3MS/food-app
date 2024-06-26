import FontAwesomeIcon from '@/components/FontAwesomeIcon'
import HeaderLogo from '@/components/HeaderLogo'
import Colors from '@/constants/Colors'
import { useCart } from '@/providers/CartProvider'
import { Link, Stack } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function MenuLayout() {
  const { items } = useCart()

  const totalItems = items?.reduce((acc, att) => acc + att.quantity, 0) || null

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <View style={{ position: 'relative' }}>
                  {totalItems && (
                    <View style={styles.counter}>
                      <Text style={styles.counterText}>{totalItems}</Text>
                    </View>
                  )}
                  <FontAwesomeIcon
                    name="shopping-cart"
                    size={20}
                    color={Colors.white}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                </View>
              )}
            </Pressable>
          </Link>
        ),
        headerLeft: () => <HeaderLogo />,
        headerStyle: { backgroundColor: Colors.primary },
      }}
    >
      <Stack.Screen name="index" options={{ title: '' }} />
      <Stack.Screen name="[id]" options={{ title: '' }} />
    </Stack>
  )
}

const styles = StyleSheet.create({
  counter: {
    position: 'absolute',
    width: 15,
    borderRadius: 20,
    aspectRatio: 1,
    backgroundColor: Colors.red,
    top: -8,
    right: 5,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 8,
    color: Colors.white,
  },
})

