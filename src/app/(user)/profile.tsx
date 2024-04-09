import Colors from '@/constants/Colors'
import React from 'react'
import { Text, View } from 'react-native'

const Profile = () => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, color: Colors.primary }}>Olá Mundo</Text>
    </View>
  )
}

export default Profile
