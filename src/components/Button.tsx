import { Pressable, StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import { forwardRef } from 'react'

type ButtonProps = {
  text: string
} & React.ComponentPropsWithoutRef<typeof Pressable>

const variations = {
  primary: {
    backgroundColor: Colors.primary,
  },
  danger: {
    backgroundColor: Colors.red,
  },
}

const Button = forwardRef<
  View | null,
  ButtonProps & { variant?: 'primary' | 'danger' }
>(({ text, variant = 'primary', ...pressableProps }, ref) => {
  return (
    <View
      style={[
        styles.container,
        { ...variations[variant] },
        pressableProps.disabled && styles.disabled,
      ]}
    >
      <Pressable
        ref={ref}
        style={({ pressed }) =>
          pressed ? [styles.pressable, styles.pressed] : styles.pressable
        }
        android_ripple={{ color: Colors.primaryDark }}
        {...pressableProps}
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    overflow: 'hidden',
    borderRadius: 100,
  },
  pressable: {
    alignItems: 'center',
    padding: 10,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
})

export default Button
