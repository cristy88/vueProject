import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/login/Login.vue'
import Home from '@/views/Home/Home.vue'

import FundSource from '@/views/Home/fundSource/FundSource.vue'
import Fund from '@/views/Home/fund/Fund.vue'
import MoneyFlow from '@/views/Home/moneyFlow/MoneyFlow.vue'
import System from '@/views/Home/system/System.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/fund',
      meta: {
        isLogin: true
      },
      children: [
        {
          path: '/fund',
          name: 'fund',
          component: Fund
        },
        {
          path: '/fundSource',
          name: 'fundSource',
          component: FundSource
        },
        {
          path: '/moneyFlow',
          name: 'moneyFlow',
          component: MoneyFlow
        },
        {
          path: '/system',
          name: 'system',
          component: System
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from) => {
  if (to.matched.some(v => v.meta.isLogin)) {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push({
        path: '/login',
        query: {
          id: encodeURIComponent(to.fullPath)
        }
      })
    }
  }
})

export default router
