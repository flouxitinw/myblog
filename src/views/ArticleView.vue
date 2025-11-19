<template>
  <div class="flex flex-col gap-6">
    <button
      type="button"
      class="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm transition hover:-translate-x-0.5 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
      @click="goBack"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.707 5.293a1 1 0 0 1 0 1.414L11.414 11H20a1 1 0 0 1 0 2h-8.586l4.293 4.293a1 1 0 1 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0z" />
      </svg>
      返回
    </button>

    <section
      v-if="article"
      class="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div class="flex flex-col gap-3">
        <div class="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
          <span>{{ formattedDate }}</span>
          <RouterLink
            v-for="tag in article.tags"
            :key="tag"
            :to="{ name: 'tag', params: { tag } }"
            class="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary transition hover:bg-primary/20"
          >
            #{{ tag }}
          </RouterLink>
        </div>
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          {{ article.title }}
        </h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          {{ article.excerpt }}
        </p>
      </div>
      <MarkdownRenderer :content="article.content" />
    </section>

    <section
      v-else
      class="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900"
    >
      <h2 class="text-lg font-semibold">未找到文章</h2>
      <p class="mt-2 text-sm">可能已经被移动或删除，返回首页看看其他内容吧。</p>
      <RouterLink
        to="/"
        class="mt-4 inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary/90"
      >
        去首页
      </RouterLink>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useBlogStore } from '../stores/blog.js';
import MarkdownRenderer from '../components/MarkdownRenderer.vue';

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
});

const router = useRouter();
const blog = useBlogStore();

const article = computed(() => blog.findBySlug(props.slug));

const formattedDate = computed(() => {
  if (!article.value?.date) return '';
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(article.value.date));
});

const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }
  router.push({ name: 'home' });
};
</script>
