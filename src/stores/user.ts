import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

type UserType = {
  email: string | null
  created_at: string | null
  logged_in_status: boolean
}

export const useUserStore = defineStore('user', () => {
  const user = ref<UserType>({
    email: null,
    created_at: null,
    logged_in_status: false
  })

  const setLogin = (email: string | null, created_at?: string) => {
    user.value.email = email
    user.value.created_at = created_at || null
    user.value.logged_in_status = true
  }

  const setLogout = () => {
    user.value.email = null
    user.value.logged_in_status = false
  }

  return { user, setLogin, setLogout }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
