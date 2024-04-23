import FontAwesomeIcon from '@/components/FontAwesomeIcon'
import HeaderLogo from '@/components/HeaderLogo'
import Colors from '@/constants/Colors'
import { supabase } from '@/lib/supabase'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, Platform, Pressable, Text, View } from 'react-native'

export default function MenuLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => <HeaderLogo />,
        headerStyle: { backgroundColor: Colors.primary },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '',
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
      />
      <Stack.Screen name="address" options={{ title: ' ' }} />
    </Stack>
  )
}

