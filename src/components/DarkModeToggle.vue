<template>
  <div class="flex items-center gap-2">
    <button
      type="button"
      class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:scale-105 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
      @click="ui.toggleTheme()"
      :aria-label="`切换${ui.resolvedTheme === 'dark' ? '亮色' : '暗色'}模式`"
    >
      <svg v-if="ui.resolvedTheme === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36 6.36-1.41-1.41M7.05 7.05 5.64 5.64m12.02 0-1.41 1.41M7.05 16.95l-1.41 1.41M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
      </svg>
    </button>
    <select
      class="hidden rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 shadow-sm focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 sm:block"
      v-model="ui.theme"
      @change="onManualChange"
    >
      <option value="light">亮色</option>
      <option value="dark">暗色</option>
      <option value="system">跟随系统</option>
    </select>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUiStore } from '../stores/ui.js';

const ui = useUiStore();

const { theme } = storeToRefs(ui);

const onManualChange = () => {
  ui.setTheme(theme.value);
};
</script>
