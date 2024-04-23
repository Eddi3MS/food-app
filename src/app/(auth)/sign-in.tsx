import HeaderLogo from '@/components/HeaderLogo'
import Input from '@/components/Input'
import Colors from '@/constants/Colors'
import { supabase } from '@/lib/supabase'
import { LoginFormType, LoginSchema } from '@/schemas'
import Button from '@components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'

const SignInScreen = () => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      password: '',
      email: '',
    },
  })

  const handleSignIn = async (data: LoginFormType) => {
    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
      Alert.alert('Algo deu errado!!', error.message)
    }
  }

  return (
    <View style={styles.container}>
      <HeaderLogo mode="black" size="lg" />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder="joão@gmail.com"
            label={'E-mail'}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder="******"
            label={'Senha'}
            error={errors.password?.message}
            secureTextEntry
          />
        )}
      />

      <Button
        text={isSubmitting ? 'Entrando..' : 'Entrar'}
        onPress={handleSubmit(handleSignIn)}
        disabled={isSubmitting}
      />
      <Link href="/sign-up" style={styles.textButton}>
        Criar Conta
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
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.primary,
    marginVertical: 10,
  },
})

export default SignInScreen
