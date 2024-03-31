<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
<div class="box">
  <RouterView />
</div>
</template>

<style lang='scss'>
  *{
    padding: 0;
    margin: 0;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }

  html, body, #app, .box {
    width: 100%;
    height: 100%;
  }
</style>
