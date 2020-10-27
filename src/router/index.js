import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/platform/main-window',
    component: () => import('../platform/MainWindow.vue')
  },
  {
    path: '/platform/group-window',
    component: () => import('../platform/GroupWindow.vue')
  },
  {
    path: '/platform/tab-window',
    component: () => import('../platform/TabWindow.vue')
  },
  {
    path: '/platform/temp-demo',
    component: () => import('../platform/TempDemo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
