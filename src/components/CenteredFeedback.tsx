import Colors from '@/constants/Colors'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const CenteredFeedback = ({ text }: { text: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Pressable onPress={() => router.back()} style={styles.button}>
        <Text style={{ color: Colors.white, textTransform: 'uppercase' }}>
          voltar
        </Text>
      </Pressable>
    </View>
  )
}

export default CenteredFeedback

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
  button: {
    minWidth: 100,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
})
