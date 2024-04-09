import { Image, StyleSheet } from 'react-native'
import React, { ComponentProps, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'

type RemoteImageProps = {
  path: string | null
  fallback: string
} & Omit<ComponentProps<typeof Image>, 'source'>

const RemoteImage = ({
  path,
  fallback,
  style,
  ...imageProps
}: RemoteImageProps) => {
  const [image, setImage] = useState('')

  useEffect(() => {
    if (!path) return

    if (path.startsWith('file://')) {
      setImage(path)
      return
    }

    const loadImageFromSupabase = async () => {
      setImage('')
      const { data, error } = await supabase.storage
        .from('product-images')
        .download(path)

      if (data) {
        const fr = new FileReader()
        fr.readAsDataURL(data)
        fr.onload = () => {
          setImage(fr.result as string)
        }
      }
    }

    loadImageFromSupabase()
  }, [path])

  return (
    <Image
      source={{ uri: image || fallback }}
      {...imageProps}
      style={[styles.image, style]}
    />
  )
}

export default RemoteImage

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 6,
  },
})
