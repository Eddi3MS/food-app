import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

const ButtonSelection = <T,>({
  options,
  title,
  children,
  containerClasses,
  optionsContainerClasses,
}: {
  options: T[]
  title: ReactNode
  children: (option: T) => ReactNode
  containerClasses?: StyleProp<ViewStyle>
  optionsContainerClasses?: StyleProp<ViewStyle>
}) => {
  return (
    <View style={containerClasses}>
      {title}
      <View
        style={[
          styles.sizesContainer,
          optionsContainerClasses && optionsContainerClasses,
        ]}
      >
        {options.map((option) => children(option))}
      </View>
    </View>
  )
}

export default ButtonSelection

const styles = StyleSheet.create({
  sizesContainer: {
    flexDirection: 'row',
  },
})
