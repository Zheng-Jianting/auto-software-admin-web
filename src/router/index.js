import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const createRouter = () => new Router({
  routes: constantRoutes
})

const router = createRouter()

export default router