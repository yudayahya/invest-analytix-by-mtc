import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import LoginView from '../views/login/LoginView.vue'
import { useUserStore } from '@/stores/user'
import DashboardLayout from '@/components/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      meta: {
        needAuth: true
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        needAuth: false
      }
    }
  ]
})

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()

  if (to.meta.needAuth && !userStore.user.logged_in_status) return next({ name: 'login' })
  return next()
})

export default router
