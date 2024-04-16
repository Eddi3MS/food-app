import FontAwesomeIcon from '@/components/FontAwesomeIcon'
import Colors from '@/constants/Colors'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { Redirect, Tabs } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'

export default function TabLayout() {
  const { session, isAdmin } = useAuth()

  if (!session) {
    return <Redirect href={'/sign-in'} />
  }

  if (!isAdmin) {
    return <Redirect href="/(user)/menu" />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: {
          backgroundColor: Colors.primary,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null, title: 'Menu' }} />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="cutlery" color={color} size={20} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categorias',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="file" color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Pedidos',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="list" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="user" color={color} />
          ),
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
    </Tabs>
  )
}
