<template>
  <footer class="border-t border-slate-200 bg-white/80 py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-400">
    <p>© {{ year }} 旅途笔记 · 用 Vue3 记录每一次灵感</p>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>
