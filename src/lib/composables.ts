import { ref, onBeforeUnmount } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

dayjs.locale('id')

export const useDigitalClock = () => {
  const currentTime = ref(dayjs().format('dddd, DD MMMM YYYY HH:mm:ss'))
  const updateCurrentTime = () =>
    (currentTime.value = dayjs().format('dddd, DD MMMM YYYY HH:mm:ss'))
  const updateTimeInterval = setInterval(updateCurrentTime, 1000)
  onBeforeUnmount(() => clearInterval(updateTimeInterval))

  return currentTime
}

export const formatDateTime = (dateTime: string) => dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss')

export const formatDollar = (amount: number) => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)

  return formatted
}

export const formatRupiah = (amount: number) => {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount)

  return formatted
}
