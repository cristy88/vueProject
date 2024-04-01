<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAddressStore } from '@/stores/addressStore'
import { useGoodStore } from '@/stores/goodStore'
import { showToast, showConfirmDialog } from 'vant'
const router = useRouter()
const addressStore = useAddressStore()
const goodStore = useGoodStore()


const Allcheck = ref(false)
const onSubmit = () => showToast('点击按钮')

const reduceCount = (id: string, count: number) => {
  if (count - 1 < 1) {
    showConfirmDialog({
      title: '标题',
      message:'确定要删除该商品吗？'
    })
      .then(() => {
        goodStore.changeCount(id, -1)
      })
      .catch(() => {})
    return
  }
  goodStore.changeCount(id, -1)
}

watch(goodStore.cartList, () => {
  if (goodStore.cartList.length > 0 ) {
    Allcheck.value = goodStore.cartList.every(v => v.checked)
  }
},{
  immediate: true,
  deep: true
})

</script>

<template>
  <!-- <van-contact-card v-if="!!addressStore.findInfo" type="add" @click="router.push('/listAddress')" /> -->
  <div class="cart">
    <van-contact-card 
      :type="addressStore.findInfo ? 'edit' : 'add'"
      :tel="addressStore.findInfo?.tel"
      :name="addressStore.findInfo?.name"
      @click="router.push('/listAddress')"
    />
    <van-empty v-if="goodStore.cartList.length===0" image="./src/assets/emptyCart.png" image-size="80" description="购物车为空，请添加商品"/>
    <div class="pro">
      <van-row v-for="item in goodStore.cartList" :key="item.id" justify="center" align="center">
        <van-col span="3">
          <van-checkbox v-model="item.checked"></van-checkbox>
        </van-col>
        <van-col span="15">
          <p>{{ item.name }}</p>
          <p>￥{{  item.price }}</p>
        </van-col>
        <van-col span="6">
          <p>
            <button class="cut" @click="reduceCount(item.id, item.count!)">-</button>
            <span>{{ item.count }}</span>
            <button class="add" @click="goodStore.changeCount(item.id, 1)">+</button>
          </p>
        </van-col>
      </van-row>
    </div>
    <van-submit-bar :price="goodStore.total.countPrice" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="Allcheck" @click="goodStore.changeAll(Allcheck)">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<style lang='scss' scoped>
.cart {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: var(--van-tabbar-height);
}
.pro {
  flex: 1;
  overflow: auto;
}
.van-row {
  margin: 5px 0;
}
.van-col {
  button {
    width: 20px;
    height: 20px;
    margin: 0 5px;
  }
}
.van-submit-bar {
  bottom: var(--van-tabbar-height);
}
.van-row {
  height: 40px;
}
</style>
