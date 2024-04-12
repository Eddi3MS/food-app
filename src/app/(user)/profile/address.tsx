import Button from '@/components/Button'
import Input from '@/components/Input'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { AddressFormType, AddressSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'

function returnStringValue(field?: string | null): string {
  if (!field || typeof field !== 'string') {
    return ''
  }

  return field
}

const Address = () => {
  const { session, updateProfile, profile } = useAuth()

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      street: returnStringValue(profile?.address?.[0]?.street),
      number: returnStringValue(profile?.address?.[0]?.number),
      district: returnStringValue(profile?.address?.[0]?.district),
      complement: returnStringValue(profile?.address?.[0]?.complement),
    },
  })

  const handleSaveAddress = async (data: AddressFormType) => {
    if (!session) return

    try {
      // is insertion
      if (!Array.isArray(profile?.address) || profile.address.length <= 0) {
        const { error, data: newAd } = await supabase
          .from('address')
          .insert({ ...data, user_id: session.user.id })
          .select()
          .single()

        if (error) {
          throw new Error(error.message)
        }

        updateProfile(newAd)
      } else {
        // is update
        const { error, data: upAd } = await supabase
          .from('address')
          .update(data)
          .eq('id', profile.address[0].id)
          .select()
          .single()

        if (error) {
          throw new Error(error.message)
        }

        updateProfile(upAd)
      }

      router.back()
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        Alert.alert('Error', error.message)
      }
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <Text style={styles.title}>Cadastre endereço</Text>

        <Controller
          control={control}
          name="street"
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Av. Beni..."
              label={'Rua'}
              error={errors.street?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="number"
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="123"
              label={'Número'}
              error={errors.number?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="district"
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Dom bos..."
              label={'Bairro'}
              error={errors.district?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="complement"
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Próximo ao..."
              label={'Complemento'}
              error={errors.complement?.message}
            />
          )}
        />

        <Button
          text={isSubmitting ? 'Salvando' : 'Salvar'}
          onPress={handleSubmit(handleSaveAddress)}
          disabled={isSubmitting}
        />
      </ScrollView>
    </View>
  )
}

export default Address

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: { fontSize: 20, marginVertical: 20 },
})
