import Button from '@/components/Button'
import FontAwesomeIcon from '@/components/FontAwesomeIcon'
import Colors from '@/constants/Colors'
import { useAuth } from '@/providers/AuthProvider'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const Profile = () => {
  const { profile } = useAuth()

  const handleNavigateToAddress = () => {
    router.push('/profile/address')
  }

  if (!Array.isArray(profile?.address) || profile.address.length <= 0) {
    return (
      <View style={styles.container}>
        {profile?.full_name && (
          <View style={styles.innerContainer}>
            <Text style={styles.text}>
              <Text style={styles.label}>Usuário:</Text> {profile.full_name}.
            </Text>
          </View>
        )}
        <View style={styles.innerContainer}>
          <Text style={styles.text}>
            Você ainda não cadastrou um endereço de entrega.
          </Text>
          <Text style={styles.text}>Deseja fazer isso agora?</Text>

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Button text="Ir para cadastro" onPress={handleNavigateToAddress} />
          </View>
        </View>
      </View>
    )
  }

  const { complement, district, number, street } = profile?.address[0]

  return (
    <View style={styles.container}>
      {profile?.full_name && (
        <View style={styles.innerContainer}>
          <Text style={styles.text}>
            <Text style={styles.label}>Usuário:</Text> {profile.full_name}.
          </Text>
        </View>
      )}
      <Text style={styles.title}>Endereço para entrega:</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>
          <Text style={styles.label}>Rua:</Text> {street}, num {number}.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Bairro:</Text> {district}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.label}>Complemento:</Text> {complement}
        </Text>

        <Pressable onPress={handleNavigateToAddress} style={styles.editAddress}>
          <FontAwesomeIcon name="edit" color={Colors.primary} />
        </Pressable>
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
