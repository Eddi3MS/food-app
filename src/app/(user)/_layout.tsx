import FontAwesomeIcon from '@/components/FontAwesomeIcon'
import Colors from '@/constants/Colors'
import { useAuth } from '@/providers/AuthProvider'
import { Redirect, Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
  const { session, isAdmin } = useAuth()

  if (!session) {
    return <Redirect href={'/sign-in'} />
  }

  if (isAdmin) {
    return <Redirect href={'/(admin)/menu'} />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen name="index" options={{ href: null, headerShown: false }} />
      <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="cutlery" color={color} size={20} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="list" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

