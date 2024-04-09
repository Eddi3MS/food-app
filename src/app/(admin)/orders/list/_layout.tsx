import Colors from '@/constants/Colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { withLayoutContext } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Tabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

const ListLayout = () => {
  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: Colors.white }}
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.gray,
          tabBarAndroidRipple: { color: Colors.gray, borderless: true },

          tabBarIndicatorStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Novos' }} />
        <Tabs.Screen name="received" options={{ title: 'Em Andamento' }} />
        <Tabs.Screen name="arquive" options={{ title: 'Finalizados' }} />
      </Tabs>
    </SafeAreaView>
  )
}

export default ListLayout
