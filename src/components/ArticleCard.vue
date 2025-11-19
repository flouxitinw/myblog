<template>
  <article
    class="relative flex flex-col gap-3 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    role="link"
    tabindex="0"
    @click="goToArticle"
    @keyup.enter.prevent="goToArticle"
    @keyup.space.prevent="goToArticle"
  >
    <div class="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
      <span>{{ article.date }}</span>
      <div class="flex flex-wrap gap-1">
        <RouterLink
          v-for="tag in article.tags"
          :key="tag"
          :to="{ name: 'tag', params: { tag } }"
          class="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary transition hover:bg-primary/20"
          @click.stop
        >
          #{{ tag }}
        </RouterLink>
      </div>
    </div>
    <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
      {{ article.title }}
    </h3>
    <p class="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
      {{ article.excerpt }}
    </p>
    <div class="flex items-center justify-between text-xs text-primary dark:text-primary/80">
      <span>查看全文</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 12a1 1 0 0 1 1-1h10.586l-3.293-3.293a1 1 0 0 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414-1.414L16.586 13H6a1 1 0 0 1-1-1z" />
      </svg>
    </div>
  </article>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const goToArticle = () => {
  router.push({ name: 'article', params: { slug: props.article.slug } });
};
</script>
