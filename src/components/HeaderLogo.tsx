import React from 'react'
import { Image } from 'react-native'

const HeaderLogo = () => {
  return (
    <Image
      source={{
        uri: 'https://firebasestorage.googleapis.com/v0/b/haven-imoveis-74ece.appspot.com/o/nm_haven_dark.png?alt=media&token=03f67bd7-a9be-491a-bd9c-cb4f79e5bfa3',
      }}
      resizeMode="contain"
      style={{
        maxWidth: 60,
        minHeight: 30,
        width: '100%',
        borderRadius: 6,
      }}
    />
  )
}

export default HeaderLogo
