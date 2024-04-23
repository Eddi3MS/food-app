import HeaderLogo from '@/components/HeaderLogo'
import Colors from '@/constants/Colors'
import { useCategoriesList } from '@/queries/categories'
import { Stack } from 'expo-router'
import React from 'react'

export default function CategoriesLayout() {
  useCategoriesList()

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
        }}
      />
    </Stack>
  )
}
