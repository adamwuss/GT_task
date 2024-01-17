import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'

const routes: Array<RouteRecordRaw> = []

routes.push({ path: '/', component: () => import( '@/views/BusBoard.vue') })
routes.push({ path: '/lines', component: () => import('@/views/BusBoard.vue') })
routes.push({ path: '/stops', component: () => import('@/views/BusStops.vue') })

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
