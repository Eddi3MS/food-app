import CenteredFeedback from '@/components/CenteredFeedback'
import Input from '@/components/Input'
import Select from '@/components/Select'
import Colors from '@/constants/Colors'
import { supabase } from '@/lib/supabase'
import { useCategoriesList } from '@/queries/categories'
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from '@/queries/products'
import { ProductFormType, ProductSchema } from '@/schemas'
import { formatCurrency } from '@/utils/formatCurrency'
import Button from '@components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { decode } from 'base64-arraybuffer'
import { randomUUID } from 'expo-crypto'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { Redirect, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const CreateScreen = () => {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<ProductFormType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      image: '',
    },
  })

  const image = watch('image')

  const { id } = useLocalSearchParams<{ id?: string }>()

  const isUpdating = !!id
  const {
    data: updatingProduct,
    isLoading: isLoadingProduct,
    error: productError,
  } = useProduct(id)
  const { data: categoriesList, isLoading, error } = useCategoriesList()

  useEffect(() => {
    if (!updatingProduct) return

    setValue('name', updatingProduct.name)
    setValue('price', String(updatingProduct.price))
    setValue('image', updatingProduct.image ? updatingProduct.image : '')
    setValue('category_id', updatingProduct.category_id)
    setValue('description', updatingProduct.description)
  }, [])

  const { mutate: handleCreateProduct } = useInsertProduct()
  const { mutate: handleUpdateProduct } = useUpdateProduct()
  const { mutate: handleDeleteProduct } = useDeleteProduct()

  const router = useRouter()

  const uploadImage = async (image?: string) => {
    if (!image || !image?.startsWith('file://')) {
      return
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64',
    })

    const filePath = `${randomUUID()}.png`
    const contentType = 'image/png'

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, decode(base64), { contentType })

    if (error) {
      throw new Error('Falha no upload da image.')
    }

    if (data) {
      return data.path
    }
  }

  const onSubmit = async (data: ProductFormType) => {
    setLoading(true)
    const { image, name, description, category_id, price } = data

    const parsedPriceInCents = parseFloat(price.replace(',', ''))

    const productData = {
      name,
      price: parsedPriceInCents,
      category_id,
      description,
    }

    try {
      const imagePath = await uploadImage(image)

      if (isUpdating) {
        handleUpdateProduct(
          {
            ...productData,
            id: parseFloat(id),
            ...(imagePath && {
              image: `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${imagePath}`,
            }),
          },
          {
            onSuccess: () => router.back(),
            onSettled: () => setLoading(false),
            onError: (e) => Alert.alert('Algo deu errado', e.message),
          }
        )
      } else {
        handleCreateProduct(
          {
            ...productData,
            ...(imagePath && {
              image: `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${imagePath}`,
            }),
          },
          {
            onSuccess: () => router.back(),
            onSettled: () => setLoading(false),
            onError: (e) => Alert.alert('Algo deu errado', e.message),
          }
        )
      }
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        Alert.alert('Algo deu errado.', error.message)
      }
    }
  }

  const onDelete = () => {
    if (!id) return

    handleDeleteProduct(+id, {
      onSuccess: () => router.replace('/(admin)/menu'),
      onError: (e) => Alert.alert('Erro ao deletar produto!!', e.message),
    })
  }

  const confirmDelete = () => {
    setDeleteLoading(true)

    Alert.alert('Confirme', 'Deletar produto do database?', [
      {
        text: 'cancelar',
        style: 'cancel',
        onPress: () => setDeleteLoading(false),
      },
      { text: 'Deletar', style: 'destructive', onPress: onDelete },
    ])
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    if (!result.canceled) {
      setValue('image', result.assets[0].uri)
    }
  }

  if (isLoading || isLoadingProduct) {
    return <ActivityIndicator style={{ flex: 1 }} color={Colors.primary} />
  }

  if (error || productError) {
    return <CenteredFeedback text="Erro ao carregar dados." />
  }

  if (!categoriesList) {
    return <Redirect href="/(admin)/menu/categories" />
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          {isUpdating ? 'Atualizar produto' : 'Adicionar produto'}
        </Text>
        <Pressable onPress={pickImage}>
          <Image
            source={{
              uri: image || process.env.EXPO_PUBLIC_DEFAULT_IMAGE!,
            }}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.textButton}>Selecione uma imagem</Text>
        </Pressable>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Portuguesa"
              label={'Nome'}
              error={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Massa fina, presunto, tom.."
              label={'Descrição'}
              error={errors.description?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <Input
              value={formatCurrency(value)}
              onChangeText={(text) => {
                const sanitizedText = text.replace(/[^0-9]/g, '')

                onChange(sanitizedText)
              }}
              placeholder="R$35,50"
              label={'Preço'}
              error={errors.price?.message}
              keyboardType="numeric"
            />
          )}
        />

        <Controller
          control={control}
          name="category_id"
          render={({ field: { onChange, value } }) => (
            <Select
              options={categoriesList.map((cat) => ({
                label: cat.name,
                value: cat.id,
                key: cat.id,
              }))}
              onChange={(value) => onChange(value)}
              value={value}
              error={errors.category_id?.message}
            />
          )}
        />

        <View style={{ marginTop: 'auto' }}>
          <Button
            onPress={handleSubmit(onSubmit)}
            text={
              isUpdating && loading
                ? 'Atualizando..'
                : isUpdating
                ? 'Atualizar'
                : loading
                ? 'Adicionando..'
                : 'Adicionar'
            }
            disabled={loading}
          />
        </View>

        {isUpdating && (
          <Pressable onPress={confirmDelete} disabled={deleteLoading}>
            <Text style={styles.deleteButton}>
              {deleteLoading ? 'Deletando..' : 'Deletar Produto'}
            </Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 15,
    textAlign: 'center',
  },
  image: {
    width: '50%',
    alignSelf: 'center',
    aspectRatio: 1,
    borderRadius: 6,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginVertical: 10,
  },
  deleteButton: {
    color: Colors.red,
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: Colors.red,
  },
  label: {
    color: Colors.black,
  },
})

export default CreateScreen
