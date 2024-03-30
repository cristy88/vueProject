<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAddressStore } from '@/stores/addressStore'

const addressStore = useAddressStore()
const router = useRouter()
const onAdd = () => router.push('/createAddress')
const onEdit = (item: any) => {
  router.push({
    path: '/createAddress',
    query:{
      id: item.id
    }
  })
}
const onSelect = () => {
  console.log(addressStore.curI)
  onClickLeft()
}
const onClickLeft = () => history.back()

</script>

<template>
  <div class="hisAddress">
    <van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <van-empty description="还不存在地址"  v-if="addressStore.addressList.length === 0"/>
    <van-address-list
      v-model="addressStore.curI"
      :list="addressStore.addressList"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<style lang='scss' scoped>
  .hisAddress {
    width: 100%;
    height: 100%;
    background: #F7F8FA;
  }
</style>
