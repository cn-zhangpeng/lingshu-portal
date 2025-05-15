import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('../layout/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard/index.vue'),
        meta: { title: '仪表盘' }
      },
      {
        path: 'projects',
        name: 'Projects',
        component: () => import('../views/projects/index.vue'),
        meta: { title: '项目列表' }
      },
      {
        path: 'project/:id',
        name: 'ProjectDetail',
        component: () => import('../views/projects/detail.vue'),
        meta: { title: '项目详情' }
      },
      {
        path: 'gantt/:id',
        name: 'ProjectGantt',
        component: () => import('../views/projects/gantt.vue'),
        meta: { title: '项目甘特图' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 灵枢项目管理系统` : '灵枢项目管理系统'
  
  // 开发环境下跳过登录认证
  if (process.env.NODE_ENV === 'development') {
    return next()
  }
  
  // 检查是否需要登录认证
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router