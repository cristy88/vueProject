import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/Home.vue'
import Detail from '@/views/detail/Detail.vue'
import CreateAddress from '@/views/createAddress/createAddress.vue'
import ListAddress from '@/views/listAddress/ListAddress.vue'

import ToHome from '../views/home/Tohome/ToHome.vue'
import Cart from '../views/home/cart/Cart.vue'
import Mine from '../views/home/mine/Mine.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/tohome',
      meta: {
        isLogin: true
      },
      children: [
        {
          path: '/tohome',
          name: 'tohome',
          component: ToHome
        },
        {
          path: '/cart',
          name: 'cart',
          component: Cart
        },
        {
          path: '/mine',
          name: 'mine',
          component: Mine
        }
      ]
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/createAddress',
      name: 'createAddress',
      meta: {
        isLogin: true
      },
      component: CreateAddress
    },
    {
      path: '/listAddress',
      name: 'listAddress',
      meta: {
        isLogin: true
      },
      component: ListAddress
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  if (to.matched.some(v => v.meta.isLogin)) {
    const token = localStorage.getItem('token')
    if (!token) {
      return {
        path: '/login',
        query:{
          fullpath: encodeURIComponent(to.fullPath)
        }
      }
    }
  }
  return 
})

export default router
