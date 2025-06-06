import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserEdit from '../views/UserEdit.vue'
import AdminSearch from '../views/AdminSearch.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/edit', component: UserEdit, meta: { requiresAuth: false } },
  { path: '/admin', component: AdminSearch, meta: { requiresAuth: false, requiresAdmin: false} }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isAdmin = user.email === 'admin@example.com'

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next('/login')
  } else {
    next()
  }
})

export default router