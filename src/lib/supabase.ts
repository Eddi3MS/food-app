import 'react-native-url-polyfill/auto'
import * as SecureStore from 'expo-secure-store'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as aes from 'aes-js'
import 'react-native-get-random-values'

class LargeSecureStore {
  private async _encrypt(key: string, value: string) {
    const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8))

    const cipher = new aes.ModeOfOperation.ctr(
      encryptionKey,
      new aes.Counter(1)
    )
    const encryptedBytes = cipher.encrypt(aes.utils.utf8.toBytes(value))

    await SecureStore.setItemAsync(key, aes.utils.hex.fromBytes(encryptionKey))

    return aes.utils.hex.fromBytes(encryptedBytes)
  }

  private async _decrypt(key: string, value: string) {
    const encryptionKeyHex = await SecureStore.getItemAsync(key)
    if (!encryptionKeyHex) {
      return encryptionKeyHex
    }

    const cipher = new aes.ModeOfOperation.ctr(
      aes.utils.hex.toBytes(encryptionKeyHex),
      new aes.Counter(1)
    )
    const decryptedBytes = cipher.decrypt(aes.utils.hex.toBytes(value))

    return aes.utils.utf8.fromBytes(decryptedBytes)
  }

  async getItem(key: string) {
    const encrypted = await AsyncStorage.getItem(key)
    if (!encrypted) {
      return encrypted
    }

    return await this._decrypt(key, encrypted)
  }

  async removeItem(key: string) {
    await AsyncStorage.removeItem(key)
    await SecureStore.deleteItemAsync(key)
  }

  async setItem(key: string, value: string) {
    const encrypted = await this._encrypt(key, value)

    await AsyncStorage.setItem(key, encrypted)
  }
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: new LargeSecureStore(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
