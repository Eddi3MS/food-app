import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

type InputProps = { label: string; error?: string } & Omit<
  TextInputProps,
  'style'
>

const Input = ({ label, error, ...rest }: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.error_border : undefined]}
        placeholderTextColor={Colors.gray}
        {...rest}
      />
      <Text style={styles.error}>{error}</Text>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  label: {
    color: Colors.black,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    color: Colors.black,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  error: {
    position: 'absolute',
    bottom: 0,
    color: Colors.red,
  },

  error_border: {
    borderColor: Colors.red,
  },
})
