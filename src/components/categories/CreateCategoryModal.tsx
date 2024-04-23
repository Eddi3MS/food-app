import Colors from '@/constants/Colors'
import {
  useCategoriesList,
  useInsertCategory,
  useUpdateCategory,
} from '@/queries/categories'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import Button from '../Button'
import Input from '../Input'

const CreateCategoryModal = ({
  handleClose,
  selectedId,
  selectedName,
}: {
  selectedId?: number
  handleClose: () => void
  selectedName?: string
}) => {
  const [category, setCategory] = useState(selectedName || '')
  const [loadingCategory, setLoadingCategory] = useState(false)

  const { data: categoriesList } = useCategoriesList()

  const { mutate: insertCategory } = useInsertCategory()
  const { mutate: updateCategory } = useUpdateCategory()

  const handleSubmit = () => {
    if (!category || category.length < 4) return

    setLoadingCategory(true)
    if (selectedId) {
      //update
      updateCategory(
        { name: category, id: selectedId },
        {
          onSettled() {
            setLoadingCategory(false)
          },
          onSuccess() {
            handleClose()
          },
          onError(error) {
            console.error(error)
            Alert.alert('Oops!', 'Algo deu errado na requisição.')
          },
        }
      )
    } else {
      //create
      insertCategory(
        { name: category, order: (categoriesList?.length || 0) + 1 },
        {
          onSettled() {
            setLoadingCategory(false)
          },
          onSuccess() {
            handleClose()
          },
          onError(error) {
            console.error(error)
            Alert.alert('Oops!', 'Algo deu errado na requisição.')
          },
        }
      )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.createContainer}>
        <Text style={styles.title}>Adicionar Categoria</Text>
        <View>
          <Input label="" value={category} onChangeText={setCategory} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            gap: 15,
          }}
        >
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
            <Button
              variant="danger"
              text="Cancelar"
              onPress={handleClose}
              disabled={loadingCategory}
            />
            <Button
              text={
                selectedId && loadingCategory
                  ? 'Atualizando'
                  : selectedId
                  ? 'Atualizar'
                  : loadingCategory
                  ? 'Adicionando..'
                  : 'Adicionar'
              }
              onPress={handleSubmit}
              disabled={loadingCategory}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default CreateCategoryModal

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#00000080',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createContainer: {
    width: '90%',
    maxWidth: 400,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
})
