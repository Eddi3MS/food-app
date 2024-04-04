import FontAwesomeIcon from '@/components/FontAwesomeIcon'
import Colors from '@/constants/Colors'
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
    </Tabs>
  )
}

