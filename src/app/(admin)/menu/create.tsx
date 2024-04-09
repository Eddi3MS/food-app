import ButtonSelection from '@/components/ButtonSelection'
import RemoteImage from '@/components/RemoteImage'
import Colors from '@/constants/Colors'
import { supabase } from '@/lib/supabase'
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from '@/queries/products'
import { Enums } from '@/types'
import Button from '@components/Button'
import { decode } from 'base64-arraybuffer'
import { randomUUID } from 'expo-crypto'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

const sizes: Enums<'sizes'>[] = ['P', 'M', 'G', 'GG']

const CreateScreen = () => {
  const [image, setImage] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [selectedSize, setSelectedSize] = useState<Enums<'sizes'>>(sizes[0])
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
    setSelectedSize(updatingProduct.size)
    setDescription(updatingProduct.description)
  }, [])

  const { mutate: handleCreateProduct } = useInsertProduct()
  const { mutate: handleUpdateProduct } = useUpdateProduct()
  const { mutate: handleDeleteProduct } = useDeleteProduct()

  const router = useRouter()

  const onSubmit = () => {
    if (!name || !price || !selectedSize || !description) {
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

  const onUpdate = async () => {
    if (!id) return

    const imagePath = await uploadImage()

    handleUpdateProduct(
      {
        name,
        price: parseFloat(price),
        size: selectedSize,
        description,
        id: parseFloat(id),
        ...(imagePath && { image: imagePath }),
      },
      {
        onSuccess: () => router.back(),
      }
    )
  }

  const onCreate = async () => {
    const imagePath = await uploadImage()

    handleCreateProduct(
      {
        name,
        price: parseFloat(price),
        size: selectedSize,
        description,
        ...(imagePath && { image: imagePath }),
      },
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
      aspect: [4, 4],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const uploadImage = async () => {
    if (!image?.startsWith('file://')) {
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

    if (data) {
      return data.path
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Stack.Screen
          options={{
            title: isUpdating ? 'Atualizar produto' : 'Adicionar produto',
          }}
        />

        <RemoteImage
          path={image}
          fallback={process.env.EXPO_PUBLIC_DEFAULT_IMAGE!}
          style={styles.image}
          resizeMode="contain"
        />

        <Text onPress={pickImage} style={styles.textButton}>
          Selecione uma imagem
        </Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Margarita..."
          style={styles.input}
          placeholderTextColor={Colors.gray}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Pão, bife de.."
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

        <ButtonSelection
          options={sizes}
          keyExtractor={(size) => size}
          title={<Text style={styles.label}>Tamanho:</Text>}
          optionsContainerClasses={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 10,
          }}
        >
          {(size) => (
            <Pressable
              onPress={() => {
                setSelectedSize(size)
              }}
              style={[
                styles.size,
                {
                  backgroundColor:
                    selectedSize === size ? Colors.gray : '#00000005',
                },
              ]}
              key={size}
            >
              <Text
                style={[
                  styles.sizeText,
                  {
                    color: selectedSize === size ? Colors.black : Colors.gray,
                  },
                ]}
              >
                {size}
              </Text>
            </Pressable>
          )}
        </ButtonSelection>
        <Text style={styles.error}>{errors}</Text>
        <View style={{ marginTop: 'auto' }}>
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
        </View>

        {isUpdating && (
          <Pressable onPress={confirmDelete} disabled={deleteLoading}>
            <Text style={styles.deleteButton}>
              {deleteLoading ? 'Deletando..' : 'Deletar'}
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  image: {
    width: '50%',
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
  sizeTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    color: Colors.black,
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
})

export default CreateScreen
