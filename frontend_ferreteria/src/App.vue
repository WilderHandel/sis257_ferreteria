<script setup lang="ts">
import { RouterView } from 'vue-router'
import '@/assets/js/jquery.min.js'
import '@/assets/js/custom.js'
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
</script>

<template>
  <main>
    <MainHeader />
    <RouterView />
  </main>
  <MainFooter />
</template>

<style>
@import '@/assets/css/jquery-ui.css';
@import '@/assets/css/bootstrap.min.css';
@import '@/assets/css/style.css';
@import '@/assets/css/responsive.css';
@import '@/assets/css/jquery.mCustomScrollbar.min.css';
@import '@/assets/css/swiper.min.css';
</style>
