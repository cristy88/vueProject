<template>
  <swiper
    :slidesPerView="1"
    :spaceBetween="30"
    :pagination="{
      clickable: true,
    }"
    :autoplay="{
      delay: 3000,
      pauseOnMouseEnter: true
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="item in banners" :key="item.targetId">
      <img :src="item.imageUrl" alt="">
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue'

  // Import Swiper styles
  import 'swiper/css'

  import 'swiper/css/pagination'
  import 'swiper/css/navigation'
  import 'swiper/css/autoplay'

  import { getBanners } from '@/api'
  import type { bannersItem } from  '@/api'
  // import required modules
  import { Pagination,  Autoplay } from 'swiper/modules'
  import { ref } from 'vue'

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const banners = ref<bannersItem[]>([])
      getBanners().then(res => {
        console.log(res.data)
        banners.value = res.data.banners
      })
      return {
        modules: [Pagination,  Autoplay],
        banners
      }
    }
  }
</script>

<style lang="scss" scoped>
  .swiper {
    width: 100%;
    img {
      width: 100%;
    }
  }
</style>
