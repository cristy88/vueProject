<script setup lang="ts">
import { useGoodStore } from '@/stores/goodStore'
import { useRouter } from 'vue-router'

const goodStore = useGoodStore()
const router = useRouter()
if (goodStore.proList.length === 0) {
  goodStore.setProList()
}

const toDetail = (id: string) => {
  router.push({
    path: '/detail',
    query:{
      id
    }
  })
}

</script>

<template>
  <van-grid :border="false" :column-num="3">
    <van-grid-item v-for="item in goodStore.proList" :key="item.id" @click="toDetail(item.id)">
      <van-image :src="item.imgUrl"/>
      <p class="User">{{ item.name }}</p>
      <p>￥<span class="price">{{ item.price }}</span>
        <button class="add" @click.stop="goodStore.changeCount(item.id, 1)"></button>
      </p>
    </van-grid-item>
  </van-grid>
</template>

<style lang="scss" scoped>
img {
  width: 100%;
}
.User {
  font-size: 14px;
}
.price {
  color: red;
  font-weight: 900;
}
.add {
  width: 20px;
  height: 20px;
  background: url(data:image/svg+xml;base64,PHN2ZyB0PSIxNzExNzEwNTE5OTg5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjU5MjkiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PHBhdGggZD0iTTAgMGwwIDEwMjQgMTAyNCAwTDEwMjQgMCAwIDB6TTgzMiA1NTcuNjk2IDU1Ny42OTYgNTU3LjY5NiA1NTcuNjk2IDgzMiA0NjYuMzA0IDgzMiA0NjYuMzA0IDU1Ny42OTYgMTkyIDU1Ny42OTYgMTkyIDQ2Ni4zMDRsMjc0LjMwNCAwTDQ2Ni4zMDQgMTkybDkxLjQ1NiAwIDAgMjc0LjMwNEw4MzIgNDY2LjMwNCA4MzIgNTU3LjY5NnoiIHAtaWQ9IjU5MzAiIGZpbGw9IiMxMjk2ZGIiPjwvcGF0aD48L3N2Zz4=) no-repeat center;
  background-size: 100%;
  border: none;
}
</style>