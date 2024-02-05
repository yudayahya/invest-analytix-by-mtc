import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import LoginView from '../views/login/LoginView.vue'
import { useUserStore } from '@/stores/user'
import DashboardLayout from '@/components/DashboardLayout.vue'
import PageLayout from '@/components/PageLayout.vue'

//account routes
import AccountView from '@/views/account/AccountView.vue'
import AccountCreateView from '@/views/account/AccountCreateView.vue'
//end account routes

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
          component: HomeView,
          meta: {
            title: 'Dashboard'
          }
        }
      ]
    },
    {
      path: '/',
      component: PageLayout,
      meta: {
        needAuth: true
      },
      children: [
        {
          path: '/akun',
          name: 'account',
          component: AccountView,
          meta: {
            title: 'Akun',
            subtitle: 'Berisi daftar akun yang terdaftar di sistem.'
          }
        },
        {
          path: '/akun/tambah',
          name: 'account-create',
          component: AccountCreateView,
          meta: {
            title: 'Tambah Akun',
            subtitle: 'Tambahkan akun baru ke dalam sistem.'
          }
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
