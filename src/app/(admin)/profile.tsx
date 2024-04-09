import Colors from '@/constants/Colors'
import { useUsersCount } from '@/queries/users'
import React from 'react'
import { Text, View } from 'react-native'

const Profile = () => {
  const { data } = useUsersCount()

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, color: Colors.primary }}>
        <Text style={{ color: Colors.black }}>Usuários Cadastrados:</Text>{' '}
        {data}
      </Text>
    </View>
  )
}

export default Profile
