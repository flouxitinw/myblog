<template>
  <article
    class="prose prose-slate max-w-none text-sm leading-relaxed prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary/80 dark:prose-invert"
    v-html="compiled"
  />
</template>

<script setup>
import { computed } from 'vue';
import { renderMarkdown } from '../utils/markdown.js';

const props = defineProps({
  content: {
    type: String,
    required: true
  }
});

const compiled = computed(() => renderMarkdown(props.content));
</script>
