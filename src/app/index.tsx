import Colors from '@/constants/Colors'
import { useAuth } from '@/providers/AuthProvider'
import { Redirect } from 'expo-router'
import React from 'react'
import { ActivityIndicator } from 'react-native'

const Page = () => {
  const { session, loading, isAdmin } = useAuth()

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} color={Colors.primary} />
  }

  if (!session) {
    return <Redirect href="/sign-in" />
  }

  if (!isAdmin) {
    return <Redirect href="/(user)" />
  }

  return <Redirect href="/(admin)" />
}

export default Page
