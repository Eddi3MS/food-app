import Colors from '@/constants/Colors'
import React from 'react'
import { Pressable, Text } from 'react-native'
import {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist'
import FontAwesomeIcon from '../FontAwesomeIcon'

const CategoryCard = ({
  item,
  drag,
  isActive,
  onEdit,
}: RenderItemParams<{ name: string; order: number }> & {
  onEdit: () => void
}) => {
  return (
    <ScaleDecorator>
      <Pressable
        onLongPress={drag}
        disabled={isActive}
        style={{
          padding: 10,
          backgroundColor: isActive ? Colors.primary : Colors.white,
          borderRadius: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            color: isActive ? Colors.white : Colors.black,
          }}
        >
          {item.order} - {item.name}
        </Text>

        <Pressable onPress={onEdit}>
          <FontAwesomeIcon name="pencil" size={20} color={Colors.primary} />
        </Pressable>
      </Pressable>
    </ScaleDecorator>
  )
}

export default CategoryCard
