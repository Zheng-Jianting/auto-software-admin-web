import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/login')
  },

  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    children: [{
      path: 'index',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/management/login',
    component: Layout,
    redirect: '/management/login/index',
    children: [
      {
        path: 'index',
        name: 'LoginManagement',
        component: () => import('@/views/management/login/index'),
        meta: { title: '登录管理', icon: 'el-icon-tickets' }
      }
    ]
  },

  {
    path: '/management/user',
    component: Layout,
    redirect: '/management/user/userlist',
    name: 'UserManagement',
    meta: { title: '用户管理', icon: 'el-icon-user' },
    children: [
      {
        path: 'userList',
        name: 'UserList',
        component: () => import('@/views/management/user/userlist/index'),
        meta: { title: '用户列表', icon: 'el-icon-s-custom' }
      },
      {
        path: 'roleList',
        name: 'RoleList',
        component: () => import('@/views/management/user/rolelist/index'),
        meta: { title: '角色列表', icon: 'el-icon-s-promotion' }
      }
    ]
  },

  {
    path: '/management/project',
    component: Layout,
    redirect: '/management/project/index',
    children: [
      {
        path: 'index',
        name: 'ProjectManagement',
        component: () => import('@/views/management/project/index'),
        meta: { title: '项目管理', icon: 'el-icon-folder' }
      }
    ]
  },

  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/index',
    children: [
      {
        path: 'index',
        name: 'Statistics',
        component: () => import('@/views/statistics/index'),
        meta: { title: '数据统计', icon: 'el-icon-data-analysis' }
      }
    ]
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router