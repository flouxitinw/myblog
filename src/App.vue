<template>
  <div class="flex min-h-screen flex-col bg-white transition-colors duration-300 dark:bg-slate-950">
    <SiteHeader />
    <main class="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-4 sm:px-6 lg:px-8">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>
