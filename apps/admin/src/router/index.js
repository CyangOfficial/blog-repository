import { createRouter, createWebHashHistory } from 'vue-router'
import { routes as basicRoutes } from './routes'
import Layout from '@/views/layout'
export const userManager = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: { hidden: true }
  }
]
export const routes = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard'),
        meta: { title: '首页', icon: 'home', affix: true }
      }
    ]
  },
  ...basicRoutes
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...userManager]
})

export default router
