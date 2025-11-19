<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
    <div class="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="flex items-center gap-3">
        <span class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v16l-8-4-8 4z" />
          </svg>
        </span>
        <div class="flex flex-col">
          <span class="text-lg font-semibold tracking-tight">旅途笔记</span>
          <span class="text-xs text-slate-500 dark:text-slate-400">Vue3 移动端个人博客</span>
        </div>
      </RouterLink>
      <DarkModeToggle />
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import DarkModeToggle from './DarkModeToggle.vue';
</script>
