import Colors from '@/constants/Colors'
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from '@/queries/products'
import { defaultImage } from '@/utils/defaultImage'
import Button from '@components/Button'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

const CreateScreen = () => {
  const [image, setImage] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const { id } = useLocalSearchParams<{ id?: string }>()

  const isUpdating = !!id
  const { data: updatingProduct } = useProduct(id ? +id : 0)

  useEffect(() => {
    if (!updatingProduct) return

    setName(updatingProduct.name)
    setPrice(updatingProduct.price.toFixed(2))
    setImage(updatingProduct.image)
  }, [])

  const { mutate: handleCreateProduct } = useInsertProduct()
  const { mutate: handleUpdateProduct } = useUpdateProduct()
  const { mutate: handleDeleteProduct } = useDeleteProduct()

  const router = useRouter()

  const onSubmit = () => {
    if (!name || !price) {
      setErrors('Preencha todos os campos')
      return
    }

    if (isNaN(parseFloat(price))) {
      setErrors('Preço deve ser um número.')
      return
    }
    setLoading(true)

    if (isUpdating) {
      onUpdate()
    } else {
      onCreate()
    }
  }

  const onUpdate = () => {
    if (!id) return

    handleUpdateProduct(
      { name, price: parseFloat(price), id: +id },
      {
        onSuccess: () => router.back(),
      }
    )
  }
  const onCreate = () => {
    handleCreateProduct(
      { name, price: parseFloat(price) },
      {
        onSuccess: () => router.back(),
      }
    )
  }

  const onDelete = () => {
    if (!id) return

    handleDeleteProduct(+id, {
      onSuccess: () => router.replace('/(admin)/menu'),
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
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: isUpdating ? 'Atualizar produto' : 'Adicionar produto',
        }}
      />
      <Image
        source={{ uri: defaultImage(image) }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Margarita..."
        style={styles.input}
        placeholderTextColor={Colors.gray}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
        placeholderTextColor={Colors.gray}
      />
      <Text style={styles.error}>{errors}</Text>
      <Button
        onPress={onSubmit}
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
      {isUpdating && (
        <Pressable onPress={confirmDelete} disabled={deleteLoading}>
          <Text style={styles.deleteButton}>
            {deleteLoading ? 'Deletando..' : 'Deletar'}
          </Text>
        </Pressable>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
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
    color: Colors.red,
    textAlign: 'center',
  },
})

export default CreateScreen
