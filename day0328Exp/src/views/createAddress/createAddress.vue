<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { showConfirmDialog } from 'vant'
import type { address } from '@/stores/addressStore'
import { areaList } from '@vant/area-data'
import { useAddressStore } from '@/stores/addressStore'
import { showNotify } from 'vant'

const addressStore = useAddressStore()
const route = useRoute()
const router = useRouter()
const sinAddress = addressStore.addressList.find(v => v.id === route.query.id)

const onSave = (info: address) => {
  if (route.query.id) {
    // 是修改
    addressStore.updateAddress(info)
    showNotify({ type: 'success', message: '修改成功' })
  } else {
    console.log(info)
    addressStore.createAddress(info)
    showNotify({ type: 'success', message: '添加成功' })
  }
  history.back()
}
const onDelete = (info: address) => {
  showConfirmDialog({
    title: '标题',
    message: '确定要删除吗',
  })
    .then(() => {
      addressStore.del(info.id)
      history.back()
    })
    .catch(() => {
      // on cancel
    })
}

</script>

<template>
  <van-nav-bar
    :title="sinAddress ? '编辑地址' : '新增地址'"
    left-text="返回"
    left-arrow
    @click-left="router.back()"
  />
  <div class="createAdd">
    <van-address-edit
      :address-info="sinAddress"
      :area-list="areaList"
      :show-delete="!!sinAddress"
      :show-detail="true"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<style lang='scss' scoped>

</style>
