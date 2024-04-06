import FontAwesomeIcon from '@/components/FontAwesomeIcon'
import Colors from '@/constants/Colors'
import { useAuth } from '@/providers/AuthProvider'
import { Redirect, Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
  const { isAdmin } = useAuth()

  if (!isAdmin) {
    return <Redirect href="/" />
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
        name="orders"
        options={{
          title: 'Pedidos',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="list" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

