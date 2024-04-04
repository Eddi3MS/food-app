import Colors from '@/constants/Colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { withLayoutContext } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Tab = withLayoutContext(createMaterialTopTabNavigator().Navigator)

const ListLayout = () => {
  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: Colors.dark.text }}
    >
      <Tab />
    </SafeAreaView>
  )
}

export default ListLayout
