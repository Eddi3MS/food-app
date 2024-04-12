import Colors from '@/constants/Colors'
import { useAuth } from '@/providers/AuthProvider'
import { useUsersCount } from '@/queries/users'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Profile = () => {
  const { data } = useUsersCount()
  const { profile } = useAuth()

  return (
    <View style={styles.container}>
      {profile?.full_name && (
        <View style={styles.innerContainer}>
          <Text style={styles.text}>
            <Text style={styles.label}>Administrador:</Text> {profile.full_name}
          </Text>
        </View>
      )}

      <View style={styles.innerContainer}>
        <Text style={styles.text}>
          <Text style={styles.label}>Usuários Cadastrados:</Text> {data}
        </Text>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 10 },
  title: { fontSize: 20, fontWeight: '600' },
  innerContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 6,
    position: 'relative',
    paddingRight: 25,
  },
  editAddress: {
    position: 'absolute',
    right: 5,
    top: 5,
    padding: 5,
    backgroundColor: Colors.white,
  },
  label: { fontSize: 16, color: Colors.primary },
  text: { fontSize: 14, fontWeight: '500' },
})
