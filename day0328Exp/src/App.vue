<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="app">
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

  img {
    display: block;
  }
  html, body ,.app{
    height: 100vh;
    width: 100vw;
  }
  .app {
    display: flex;
    flex-direction: column;
  }

</style>
