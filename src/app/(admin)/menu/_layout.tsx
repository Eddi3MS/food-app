import FontAwesomeIcon from '@/components/FontAwesomeIcon'
import HeaderLogo from '@/components/HeaderLogo'
import Colors from '@/constants/Colors'
import { useCategoriesList } from '@/queries/categories'
import { Link, Stack } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'

export default function MenuLayout() {
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
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesomeIcon
                    name="plus-square-o"
                    size={20}
                    color={Colors.white}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen name="[id]" options={{ title: '' }} />
      <Stack.Screen name="create" options={{ title: '' }} />
    </Stack>
  )
}

