import React from 'react'
import { Image } from 'react-native'

const logo = {
  black:
    'https://firebasestorage.googleapis.com/v0/b/haven-imoveis-74ece.appspot.com/o/nm_haven_light.png?alt=media&token=c7c96ed0-f4ad-4d4f-a54f-58e349b8f0cf',
  white:
    'https://firebasestorage.googleapis.com/v0/b/haven-imoveis-74ece.appspot.com/o/nm_haven_dark.png?alt=media&token=03f67bd7-a9be-491a-bd9c-cb4f79e5bfa3',
}

const sizes = {
  sm: {
    maxWidth: 60,
    minHeight: 30,
  },
  lg: {
    maxWidth: 120,
    minHeight: 60,
    alignSelf: 'center',
    marginVertical: 20,
  },
} as const

const HeaderLogo = ({
  mode = 'white',
  size = 'sm',
}: {
  mode?: 'white' | 'black'
  size?: 'sm' | 'lg'
}) => {
  return (
    <Image
      source={{
        uri: logo[mode],
      }}
      resizeMode="contain"
      style={{
        ...sizes[size],
        width: '100%',
        borderRadius: 6,
      }}
    />
  )
}

export default HeaderLogo
