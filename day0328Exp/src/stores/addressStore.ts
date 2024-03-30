import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { AddressEditInfo } from 'vant'

export type address = AddressEditInfo & { id: string, address: string }

export const useAddressStore = defineStore('address', () => {
  const curI = ref('')
  const addressList = ref<address[]>([])

  // 现在地址
  const curAddress = computed(() => {
    const current = addressList.value.find(v => v.id === curI.value)
    // console.log('改变了，找到了',current)
    return current ? current.address : '请选择地址'
  })

  // 找到个人信息
  const findInfo = computed(() => {
    return addressList.value.find(v => v.id === curI.value)
  })

  // 新增地址
  const createAddress = (info: address) => {
    addressList.value.push({
      ...info,
      id: Date.now() + '',
      address: `${info.province} ${info.city} ${info.county} ${info.addressDetail}`
    })
  }

  // 地址更新
  const updateAddress = (info: address) => {
    const index = addressList.value.findIndex(v=> v.id === info.id)
    const id = info.id
    addressList.value.splice(index, 1, {
      ...info,
      address: `${info.province} ${info.city} ${info.county} ${info.addressDetail}`
    })
  }

  const del = (id: string) => {
    const index = addressList.value.findIndex(v=> v.id === id)
    addressList.value.splice(index, 1)
  }
  
  return {
    curI,
    addressList,
    createAddress,
    curAddress,
    updateAddress,
    del,
    findInfo
  }
})
