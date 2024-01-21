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
