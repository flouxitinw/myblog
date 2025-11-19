<template>
  <nav class="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
    <RouterLink
      v-if="showAllLink"
      :to="{ name: 'home' }"
      class="whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm transition hover:border-primary hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
    >
      全部
    </RouterLink>
    <RouterLink
      v-for="tag in tags"
      :key="tag"
      :to="{ name: 'tag', params: { tag } }"
      class="whitespace-nowrap rounded-full border border-slate-200 px-3 py-1 text-xs font-medium shadow-sm transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-300"
      :class="{
        'border-primary bg-primary/10 text-primary dark:border-primary/60 dark:bg-primary/20':
          tag.toLowerCase() === (activeTag || '').toLowerCase()
      }"
    >
      #{{ tag }}
    </RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  tags: {
    type: Array,
    default: () => []
  },
  activeTag: {
    type: String,
    default: ''
  },
  showAllLink: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
