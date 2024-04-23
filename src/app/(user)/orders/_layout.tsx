import HeaderLogo from '@/components/HeaderLogo'
import Colors from '@/constants/Colors'
import { Stack } from 'expo-router'

export default function MenuStack() {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => <HeaderLogo />,
        headerStyle: { backgroundColor: Colors.primary },
      }}
    >
      <Stack.Screen name="index" options={{ title: '' }} />
    </Stack>
  )
}

