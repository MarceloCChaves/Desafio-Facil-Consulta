import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../pages/Professional/professional.vue')
  },
  {
    path: '/attendance',
    component: () => import('../pages/Attendance/attendance.vue')
  },
  {
    path: '/register',
    component: () => import('../pages/Register/register.vue')
  },
  {
    path: '/final',
    component: () => import('../pages/Final/final.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
