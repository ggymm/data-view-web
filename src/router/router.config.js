import { BasicLayout, BlankLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        redirect: '/dashboard/index',
        name: 'Dashboard',
        component: RouteView,
        hideChildrenInMenu: true,
        meta: {
          title: '首页',
          icon: 'home'
        },
        children: [
          {
            path: 'index',
            component: () => import('@/views/dashboard/index')
          }
        ]
      },
      // 数据源管理
      {
        path: '/dataSource',
        redirect: '/dataSource/index',
        name: 'DataSource',
        component: RouteView,
        hideChildrenInMenu: true,
        meta: {
          title: '数据源管理',
          icon: 'database'
        },
        children: [
          {
            path: 'index',
            component: () => import('@/views/dataSource/index'),
            meta: {
              title: '数据源管理'
            }
          }
        ]
      },
      // 可视化大屏管理
      {
        path: '/dataView',
        redirect: '/dataView/index',
        name: 'DataView',
        component: RouteView,
        hideChildrenInMenu: true,
        meta: {
          title: '可视化大屏管理',
          icon: 'dashboard'
        },
        children: [
          {
            path: 'index',
            component: () => import('@/views/dataView/index'),
            meta: {
              title: '可视化大屏管理'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/',
    name: 'blankIndex',
    component: BlankLayout,
    children: [
      {
        path: '/dataViewInstance',
        redirect: '/dataViewInstance/index',
        name: 'DataViewInstance',
        component: RouteView,
        hidden: true,
        children: [
          {
            path: 'index',
            component: () => import('@/views/dataView/instance/index'),
            meta: {
              title: '可视化大屏编辑'
            }
          },
          {
            path: 'index/:instance_id/:is_copy',
            component: () => import('@/views/dataView/instance/index'),
            meta: {
              title: '可视化大屏编辑'
            }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
