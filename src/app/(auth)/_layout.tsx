import { Redirect, Stack } from 'expo-router'
import React from 'react'
import { useAuth } from '../../providers/AuthProvider'

export default function AuthLayout() {
  const { session } = useAuth()

  if (session) {
    return <Redirect href={'/'} />
  }

  return (
    <Stack initialRouteName="sign-in" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" options={{ title: 'Entrar' }} />
      <Stack.Screen name="sign-up" options={{ title: 'Registre-se' }} />
    </Stack>
  )
}
