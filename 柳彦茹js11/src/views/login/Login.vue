<script setup lang="ts">
import {ref} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const username = ref('')
const pwd = ref('')
const route = useRoute()
const router = useRouter()
const toHome = () => {
  if (username.value !=='admin' || pwd.value !== '123'){
    ElMessage.error('用户名或密码不正确')
    username.value = ''
    pwd.value = ''
    return
  }
  localStorage.setItem('token', JSON.stringify({username: username.value, pwd: pwd.value}))
  // const path = decodeURIComponent(route.query.id) || '/'
  router.push('/')
}
</script>

<template>
  <div class="loginView">
    <div class="login">
      <input type="text" placeholder="账户名" v-model="username">
      <input type="password" placeholder="密码" v-model="pwd">
      <p><button @click="toHome">登录</button></p>
    </div>
  </div>
</template>

<style lang='scss' scoped>
  .loginView {
    width: 100%;
    height: 100%;
    background: #4890E6;
  }

  .login {
    width: 340px;
    height: 280px;
    background: white;
    position: fixed;
    top: 200px;
    right: 100px;
    border-radius: 8px;
    padding: 80px 16px 0 16px;
    input, button{
      width: 100%;
      padding-left: 20px;
      height: 30px;
      margin: 10px 0;
      outline: none;
    }
    button {
      background: skyblue;
      color: white;
    }
  }
</style>
