import FontAwesomeIcon from '@/components/FontAwesomeIcon'
import HeaderLogo from '@/components/HeaderLogo'
import Colors from '@/constants/Colors'
import { supabase } from '@/lib/supabase'
import { Stack } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'

export default function ProfileLayout() {
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
                  color={Colors.white}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
    </Stack>
  )
}
