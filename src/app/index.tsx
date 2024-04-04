import { Link } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import Button from '../components/Button'

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button
          text="User"
          style={{ paddingVertical: 5, alignItems: 'center' }}
        />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button
          text="Admin"
          style={{ paddingVertical: 5, alignItems: 'center' }}
        />
      </Link>
      <Link href={'/(auth)'} asChild>
        <Button
          text="auth"
          style={{ paddingVertical: 5, alignItems: 'center' }}
        />
      </Link>
    </View>
  )
}

export default index
