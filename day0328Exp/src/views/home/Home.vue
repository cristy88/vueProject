<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useGoodStore } from '@/stores/goodStore'

const goodStore = useGoodStore()
</script>

<template>
  <main>
    <RouterView />
  </main>
  <van-tabbar route active-color="#29A1F7">
    <van-tabbar-item icon="wap-home-o" to="/tohome">商品</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="/cart" :badge="goodStore.total.sum">购物车</van-tabbar-item>
    <van-tabbar-item icon="contact-o" to="/mine">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style lang='scss' scoped>
  main {
    flex: 1;
    overflow: hidden;
    padding-bottom: var(--van-tabbar-height);
  }
</style>
