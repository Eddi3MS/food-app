import ButtonSelection from '@/components/ButtonSelection'
import CenteredFeedback from '@/components/CenteredFeedback'
import OrderListCard from '@/components/OrderListCard'
import OrderProductCard from '@/components/OrderProductCard'
import Colors from '@/constants/Colors'
import { sendPushNotification } from '@/lib/notifications'
import { useAdminOrderDetails, useUpdateOrder } from '@/queries/orders'
import { Enums, OrderStatusList } from '@/types'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function OrderDetailsScreen() {
  const [loading, setLoading] = useState(false)
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, error, isLoading } = useAdminOrderDetails(+id)
  const { mutate: handleUpdateOrder } = useUpdateOrder()

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} color={Colors.primary} />
  }

  if (error) {
    return <CenteredFeedback text="Erro ao listar produto." />
  }

  if (!data) {
    return <CenteredFeedback text="Produto não encontrado." />
  }

  const handleUpdateStatus = async (status: Enums<'statuses'>) => {
    setLoading(true)
    handleUpdateOrder(
      {
        id: +id,
        updatedFields: { status },
      },
      {
        onSettled: () => setLoading(false),
        onSuccess: () => {
          if (data.profiles?.expo_push_token) {
            sendPushNotification({
              expoPushToken: data.profiles.expo_push_token,
              title: `Pedido ${data.id}`,
              body: `Status atualizado: ${status}`,
            })
          }
        },
      }
    )
  }

  const address = data.profiles?.address?.[0]
    ? data.profiles?.address?.[0]
    : null

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: '' }} />

      <FlatList
        data={data.order_items}
        renderItem={({ item }) => (
          <OrderProductCard item={{ ...item, products: item.products! }} />
        )}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListCard order={data} />}
        ListFooterComponent={() => (
          <>
            {address && (
              <View style={styles.addressContainer}>
                <Text style={styles.title}>Endereço de entrega:</Text>

                <View style={styles.addressContainer}>
                  <Text style={styles.text}>
                    <Text style={styles.label}>Rua:</Text> {address.street}, num{' '}
                    {address.number}.
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.label}>Bairro:</Text> {address.district}
                  </Text>

                  <Text style={styles.text}>
                    <Text style={styles.label}>Complemento:</Text>{' '}
                    {address.complement}
                  </Text>
                </View>
              </View>
            )}
            <ButtonSelection
              title={<Text style={{ fontWeight: 'bold' }}>Status</Text>}
              options={OrderStatusList}
              optionsContainerClasses={{ flexDirection: 'row', gap: 5 }}
              keyExtractor={(option) => option}
            >
              {(status) => (
                <Pressable
                  key={status}
                  onPress={handleUpdateStatus.bind(null, status)}
                  style={{
                    borderColor: Colors.primary,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      data.status === status ? Colors.primary : 'transparent',
                    ...(loading && { opacity: 0.5 }),
                  }}
                  disabled={loading}
                >
                  <Text
                    style={{
                      color:
                        data.status === status ? Colors.white : Colors.primary,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              )}
            </ButtonSelection>
          </>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 10 },
  title: { fontSize: 20, fontWeight: '600' },
  addressContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 6,
  },
  label: { fontSize: 16, color: Colors.primary },
  text: { fontSize: 14, fontWeight: '500' },
})

