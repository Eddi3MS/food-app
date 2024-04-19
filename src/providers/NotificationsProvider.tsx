import { registerForPushNotificationsAsync } from '@/lib/notifications'
import * as Notifications from 'expo-notifications'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<String | undefined>()
  console.log('🚀 ~ NotificationProvider ~ expoPushToken:', expoPushToken)
  const [notification, setNotification] = useState<Notifications.Notification>()
  console.log('🚀 ~ NotificationProvider ~ notification:', notification)
  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()

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
