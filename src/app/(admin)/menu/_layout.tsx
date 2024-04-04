import FontAwesomeIcon from '@/components/FontAwesomeIcon'
import Colors from '@/constants/Colors'
import { Link, Stack } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'

export default function MenuLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesomeIcon
                    name="plus-square-o"
                    size={20}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  )
}

