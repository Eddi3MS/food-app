import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack initialRouteName="sign-in" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" options={{ title: 'Entrar' }} />
      <Stack.Screen name="sign-up" options={{ title: 'Registre-se' }} />
    </Stack>
  )
}
