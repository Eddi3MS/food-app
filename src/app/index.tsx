import { Link, Redirect } from 'expo-router'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import Button from '../components/Button'
import { useAuth } from '@/providers/AuthProvider'
import { supabase } from '@/lib/supabase'

const index = () => {
  const { session, loading } = useAuth()

  if (loading) {
    return <ActivityIndicator />
  }

  if (!session) {
    return <Redirect href="/sign-in" />
  }

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

      <Button
        text="sign out"
        style={{ paddingVertical: 5, alignItems: 'center' }}
        onPress={() => supabase.auth.signOut()}
      />
    </View>
  )
}

export default index
