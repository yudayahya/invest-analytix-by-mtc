import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    name: 'Yuda Yahya',
    logged_in_status: false
  })

  const setLogin = () => {
    user.value.logged_in_status = true
  }

  const setLogout = () => {
    user.value.logged_in_status = false
  }

  return { user, setLogin, setLogout }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
