import { useRouter } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Button from './Button'
import { defaultImage } from '@/utils/defaultImage'

const EmptyCartCard = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <View style={{ padding: 10 }}>
      <View style={styles.emptyCartContainer}>
        <Image source={{ uri: defaultImage() }} style={styles.image} />
        <Text style={styles.text}>Seu carrinho está vazio..</Text>
        <View style={styles.buttonContainer}>
          <Button onPress={handleBack} text="Voltar" />
        </View>
      </View>
    </View>
  )
}

export default EmptyCartCard

const styles = StyleSheet.create({
  emptyCartContainer: {
    padding: 20,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: '50%',
    aspectRatio: 1,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
  buttonContainer: {
    width: '100%',
  },
})
