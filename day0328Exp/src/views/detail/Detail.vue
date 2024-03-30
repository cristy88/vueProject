<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useGoodStore } from '@/stores/goodStore'
import { showSuccessToast } from 'vant'
import { computed } from 'vue'

const goodStore = useGoodStore()
const route = useRoute()
const router = useRouter()
const pro = computed(() => {
  return goodStore.proList.find(v => v.id === route.query.id)
})
const add = () => {
  goodStore.changeCount(String(route.query.id!), 1)
  showSuccessToast('添加成功')
}
</script>

<template>
  <van-nav-bar
    title="商品详情"
    left-text="返回"
    left-arrow
    @click-left="router.back()"
  />
  <van-swipe class="my-swipe" indicator-color="white">
    <van-swipe-item v-for="item in pro?.images" :key="item">
      <van-image :src="item"></van-image>
    </van-swipe-item>
  </van-swipe>
  <p>{{ pro?.name }}</p>
  <p>{{ pro?.price }}</p>
  <van-action-bar>
    <van-action-bar-icon icon="chat-o" text="客服" dot />
    <van-action-bar-icon icon="cart-o" text="购物车" :badge="goodStore.total.sum" @click="router.push('/cart')" />
    <van-action-bar-icon icon="shop-o" text="店铺"/>
    <van-action-bar-button type="warning" text="加入购物车" @click="add"/>
    <van-action-bar-button type="danger" text="立即购买"/>
  </van-action-bar>
</template>

<style lang='scss' scoped>

</style>
