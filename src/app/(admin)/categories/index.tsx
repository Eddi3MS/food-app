import CategoryCard from '@/components/categories/CategoryCard'
import CreateCategoryModal from '@/components/categories/CreateCategoryModal'
import CenteredFeedback from '@/components/CenteredFeedback'
import FontAwesomeIcon from '@/components/FontAwesomeIcon'
import HeaderLogo from '@/components/HeaderLogo'
import Colors from '@/constants/Colors'
import {
  useCategoriesList,
  useUpdateCategoriesOrder,
} from '@/queries/categories'
import { Tables } from '@/types'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'

const Categories = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string
    id: number
  } | null>(null)

  const { data: categoriesList, isLoading, error } = useCategoriesList()
  const { mutate: updateOrder } = useUpdateCategoriesOrder()

  const handleDragEndReorder = (data: Tables<'categories'>[]) => {
    updateOrder(data, {
      onError(error) {
        Alert.alert('Oops!', 'Algo deu errado na requisição.')
        console.error(error)
      },
    })
  }

  const handleClose = () => {
    setSelectedCategory(null)
    setShowModal(false)
  }

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} color={Colors.primary} />
  }

  if (error) {
    return <CenteredFeedback text="Erro ao carregar dados." />
  }

  if (!categoriesList) {
    return <CenteredFeedback text="Nenhuma categoria cadastrada." />
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={() => setShowModal(true)}>
              {({ pressed }) => (
                <FontAwesomeIcon
                  name="plus-square-o"
                  size={20}
                  color={Colors.white}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <DraggableFlatList
        data={categoriesList}
        onDragEnd={({ data }) => {
          const orderedData = data.map((d, i) => ({ ...d, order: i + 1 }))

          handleDragEndReorder(orderedData)
        }}
        keyExtractor={(item) => String(item.id)}
        renderItem={(render) => (
          <CategoryCard
            {...render}
            onEdit={() => {
              setSelectedCategory({
                id: render.item.id,
                name: render.item.name,
              })
              setShowModal(true)
            }}
          />
        )}
        contentContainerStyle={{ gap: 10 }}
      />
      <Text>*Arraste para reordenar.</Text>

      {showModal && (
        <CreateCategoryModal
          selectedId={selectedCategory?.id}
          handleClose={handleClose}
          selectedName={selectedCategory?.name}
        />
      )}
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 20 },
})
