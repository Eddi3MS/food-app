import FontAwesomeIcon from '@/components/FontAwesomeIcon'
import Colors from '@/constants/Colors'
import { useClientOnlyValue } from '@hooks/useClientOnlyValue'
import { useColorScheme } from '@hooks/useColorScheme'
import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
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
        name="two"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="list" color={color} size={20} />
          ),
        }}
      />
    </Tabs>
  )
}

