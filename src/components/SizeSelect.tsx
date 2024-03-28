import Colors from '@/constants/Colors'
import { PizzaSize } from '@/types'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

type SizeSelectProps = {
  selectedSize: PizzaSize
  setSelectedSize: React.Dispatch<React.SetStateAction<PizzaSize>>
  sizes: PizzaSize[]
}

const SizeSelect = ({
  sizes,
  setSelectedSize,
  selectedSize,
}: SizeSelectProps) => {
  return (
    <View>
      <Text style={styles.title}>Escolha o tamanho:</Text>
      <View style={styles.sizesContainer}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => {
              setSelectedSize(size)
            }}
            style={[
              styles.size,
              {
                backgroundColor:
                  selectedSize === size ? 'gainsboro' : '#00000005',
              },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? Colors.light.text : 'gray',
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

export default SizeSelect

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
  sizesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
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
