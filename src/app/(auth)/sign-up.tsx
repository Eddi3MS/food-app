import Input from '@/components/Input'
import { supabase } from '@/lib/supabase'
import { RegisterFormType, RegisterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'
import Button from '../../components/Button'
import Colors from '../../constants/Colors'
import HeaderLogo from '@/components/HeaderLogo'

const SignUpScreen = () => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      password: '',
      email: '',
      name: '',
    },
  })

  const handleSignUp = async (data: RegisterFormType) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.name,
        },
      },
    })

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
  }

  return (
    <View style={styles.container}>
      <HeaderLogo mode="black" size="lg" />

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder="João da Silva"
            label={'Nome'}
            error={errors.name?.message}
          />
        )}
      />

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
          />
        )}
      />
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Button
          text={isSubmitting ? 'Criando..' : 'Criar Conta'}
          onPress={handleSubmit(handleSignUp)}
          disabled={isSubmitting}
        />
      </View>

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
