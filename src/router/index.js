import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '餐饮管理预约', icon: 'dashboard' }
    }]
  },
  {
    path: '/waiter',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'waiter',
        component: () => import('@/views/waiter/index'),
        meta: { title: '员工管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'category',
        component: () => import('@/views/category/index'),
        meta: { title: '栏目管理', icon: 'form' }
      },
    ]
  },
  {
    path: '/product',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'product',
        component: () => import('@/views/product/index'),
        meta: { title: '产品管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'customer',
        component: () => import('@/views/customer/index'),
        meta: { title: '用户管理', icon: 'form' }
      }
    ]
  },


  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'order',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/evaluate',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'evaluate',
        component: () => import('@/views/evaluate/index'),
        meta: { title: '评价管理', icon: 'form' }
      }
    ]
  },
  

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
