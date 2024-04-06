import { Link } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import Button from '../../components/Button'
import Colors from '../../constants/Colors'
import { supabase } from '@/lib/supabase'

const SignUpScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignUp = async () => {
    if (!password || !email) {
      return Alert.alert('Atenção!!', 'Preencha todos os campos.')
    }

    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      let message = error.message

      if (message === 'password should be at least 6 characters') {
        message = 'Senha deve conter pelo menos 6 caracteres.'
      }

      if (message === 'Email rate limit exceeded') {
        message = 'Número de tentativas esgotado, tente novamente mais tarde.'
      }

      Alert.alert('Algo deu errado!!', message)
    }

    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>E-mail</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
        placeholderTextColor={Colors.gray}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        placeholderTextColor={Colors.gray}
        secureTextEntry
      />

      <Button
        text={loading ? 'Carregando..' : 'Criar Conta'}
        onPress={handleSignUp}
        disabled={loading}
      />
      <Link href="/sign-in" style={styles.textButton}>
        Entrar
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
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
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.primary,
    marginVertical: 10,
  },
})

export default SignUpScreen
