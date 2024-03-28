import { useClientOnlyValue } from '@hooks/useClientOnlyValue'
import { useColorScheme } from '@hooks/useColorScheme'
import Colors from '@/constants/Colors'
import { Link, Tabs } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'
import FontAwesomeIcon from '@/components/FontAwesomeIcon'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pizzas',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="code" color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesomeIcon
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon name="shopping-cart" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

