import FontAwesomeIcon from '@/components/FontAwesomeIcon'
import Colors from '@/constants/Colors'
import { supabase } from '@/lib/supabase'
import { Stack } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'

export default function MenuLayout() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Pressable
            onPress={() => {
              supabase.auth.signOut()
            }}
          >
            {({ pressed }) => (
              <FontAwesomeIcon
                name="sign-out"
                size={20}
                color={Colors.gray}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Perfil' }} />
      <Stack.Screen name="address" options={{ title: 'Endereço' }} />
    </Stack>
  )
}

