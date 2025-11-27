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
      <div class="flex items-center gap-3">
        <DarkModeToggle />
        <RouterLink
          v-if="!auth.isAuthenticated"
          to="/login"
          class="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-300"
        >
          登录
        </RouterLink>
        <div v-else class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
          <RouterLink
            v-if="auth.isAuthor"
            to="/dashboard"
            class="hidden rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-medium text-primary transition hover:bg-primary/15 sm:inline-flex"
          >
            作者后台
          </RouterLink>
          <span class="hidden sm:inline">{{ displayName }}</span>
          <button
            type="button"
            class="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium transition hover:border-red-400 hover:text-red-500 dark:border-slate-800"
            @click="handleLogout"
          >
            退出
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import DarkModeToggle from './DarkModeToggle.vue';
import { useAuthStore } from '../stores/auth.js';

const auth = useAuthStore();
const router = useRouter();

const displayName = computed(() => auth.user?.displayName || auth.user?.username || '');

const handleLogout = () => {
  auth.logout();
  router.push({ name: 'home' });
};
</script>
