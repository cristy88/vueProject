<script setup lang="ts">
import Swipers from '../components/Swipers.vue'
import Product from '../components/Product.vue'
import { ref } from 'vue'
import { useAddressStore } from '@/stores/addressStore'

const addressStoreT = useAddressStore()
const active = ref(0)


</script>

<template>
  <div class="tohome">
    <van-cell :title="addressStoreT.curAddress" icon="location-o" is-link to="/listAddress"/>
    <van-tabs v-model:active="active" sticky title-active-color="#D36A39" color="#D36A39">
      <van-tab title="多点买菜">
        <Swipers />
        <div class="con">
          <Product />
        </div>
      </van-tab>
      <van-tab title="全球精选">
        <h2>这是全球精选</h2>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang='scss' scoped>
  .tohome {
    height: 100%;
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
  }
</style>
