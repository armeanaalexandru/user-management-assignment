import { createRouter, createWebHistory } from 'vue-router'
import { useRootStore } from '@/stores/store'
import { supabase } from '@/lib/supabaseClient'
import Home from '@/components/Home.vue'
import Unauthorized from '@/components/Unauthorized.vue'
import Login from '@/domain/auth/components/Login.vue'
import Register from '@/domain/auth/components/Register.vue'
import UserDashboard from '@/domain/management/components/UserDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/authentication/login',
      name: 'login',
      component: Login
    },
    {
      path: '/authentication/register',
      name: 'register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: UserDashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: Unauthorized
    }
  ]
})

async function getUser(next) {
  const store = useRootStore()
  const currentUser = await supabase.auth.getSession()
  if (currentUser.data.session == null) {
    next('/unauthorized')
    store.systemStore.addToastMessage('ERROR', 'You are not authorized')
  } else {
    next()
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    getUser(next)
  } else {
    next()
  }
})

export default router
