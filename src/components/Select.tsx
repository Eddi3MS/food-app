import { View, Text } from 'react-native'
import React from 'react'
import PickerSelect, { type Item } from 'react-native-picker-select'
import Colors from '@/constants/Colors'
import { StyleSheet } from 'react-native'

const Select = <T,>({
  categoriesList,
  onChange,
  value,
  error,
}: {
  categoriesList: T & Item[]
  onChange: (item: T & Item['value']) => void
  value: T & Item['value']
  error?: string
}) => {
  return (
    <View>
      <Text style={styles.label}>Categoria:</Text>
      <PickerSelect
        onValueChange={(value) => onChange(value)}
        items={categoriesList}
        itemKey={value}
        value={value}
        placeholder={{ label: 'Selecione..', value: null }}
        style={{
          inputIOS: {
            fontSize: 16,
            color: Colors.black,
            paddingRight: 30,
          },
          inputAndroid: {
            fontSize: 16,
            color: Colors.black,
            paddingRight: 30,
          },
          viewContainer: {
            borderWidth: 1,
            borderColor: error ? Colors.red : Colors.gray,
            marginTop: 5,
            marginBottom: 20,
            backgroundColor: Colors.white,
            borderRadius: 5,
          },
          iconContainer: {
            top: 20,
            right: 10,
          },
          placeholder: {
            color: Colors.gray,
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />
      <Text style={styles.error}>{error}</Text>
    </View>
  )
}

export default Select

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  label: {
    color: Colors.black,
  },
  error: {
    position: 'absolute',
    bottom: 0,
    color: Colors.red,
  },
})
