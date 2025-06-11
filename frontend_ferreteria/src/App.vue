<script setup lang="ts">
import '@/assets/js/jquery.min.js'
import '@/assets/js/popper.min.js'
import '@/assets/js/bootstrap.bundle.min.js'
import '@/assets/js/jquery-3.0.0.min.js'
import '@/assets/js/plugin.js'
import '@/assets/js/jquery.mCustomScrollbar.concat.min.js'
import '@/assets/js/custom.js'
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <MainHeader />
    <RouterView />
  </main>
  <MainFooter />
</template>

<style>
@import '@assets/css/bootstrap.min.css';
@import '@assets/css/style.css';
@import '@assets/css/responsive.css';
@import '@assets/css/jquery.mCustomScrollbar.min.css';
</style>
