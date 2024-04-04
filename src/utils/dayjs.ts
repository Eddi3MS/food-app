import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'

dayjs.locale('pt-br')
dayjs.extend(relativeTime)

export function formatToRelativeTime(createdAt: string) {
  return dayjs(createdAt).fromNow()
}
