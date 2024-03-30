import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GoodItem } from '@/api'
import { getGoods } from '@/api'

export  type Goods = GoodItem & { count?: number}
export const useGoodStore = defineStore('goods', () => {
  // 购物车列表
  const cartList = ref<Goods[]>([])
  // 商品列表
  const proList = ref<Goods[]>([])

  const setProList = async () => {
    const res = await getGoods()
    proList.value = res.data
  }
  const total = computed(() => {
    return cartList.value.reduce((prev, val) => {
      return {
        sum : prev.sum + val.count!,
        countPrice: prev.countPrice + (val.checked ? val.count! * val.price *100 : 0)
      }
    }, { sum: 0, countPrice: 0 })
  })

  const changeCount = (id: string, n: number) => {
    const index = cartList.value.findIndex(v => v.id === id)
    if (index > -1) {
      (cartList.value[index].count as number) += n
      if (cartList.value[index].count === 0) {
        cartList.value.splice(index, 1)
      }
    } else {
      const item = proList.value.find(v => v.id === id)!
      cartList.value.push({
        ...item,
        count: 1
      })
    }
  }

  const changeAll = (all: boolean) => {
    cartList.value.forEach((item) => {item.checked = all})
  }
  return {
    cartList,
    proList,
    total,
    setProList,
    changeCount,
    changeAll
  }
})