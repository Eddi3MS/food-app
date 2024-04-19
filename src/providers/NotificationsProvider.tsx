import { registerForPushNotificationsAsync } from '@/lib/notifications'
import { supabase } from '@/lib/supabase'
import * as Notifications from 'expo-notifications'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { useAuth } from './AuthProvider'

type PushTokenType = string | undefined

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const { profile } = useAuth()

  const [expoPushToken, setExpoPushToken] = useState<PushTokenType>()

  const [notification, setNotification] = useState<Notifications.Notification>()

  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()

  useEffect(() => {
    if (!profile || !expoPushToken || profile.expo_push_token === expoPushToken)
      return

    const updateProfile = async () => {
      await supabase
        .from('profiles')
        .update({ expo_push_token: expoPushToken })
        .eq('id', profile.id)
    }

    updateProfile()
  }, [expoPushToken, profile?.id])

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token)
    })

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        )
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }
  }, [])

  return <>{children}</>
}

export default NotificationProvider
