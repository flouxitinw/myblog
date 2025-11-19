<template>
  <div class="flex flex-col gap-8">
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

    <section class="space-y-6">
      <div class="space-y-4">
        <div class="space-y-2">
          <p class="text-xs uppercase tracking-widest text-primary/80">标签</p>
          <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            #{{ displayTag }}
          </h1>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            共 {{ filteredArticles.length }} 篇文章包含该标签。
          </p>
        </div>
        <TagScroller :tags="allTags" :active-tag="displayTag" :show-all-link="true" />
        <SearchBar v-model="searchQuery" placeholder="在该标签内搜索..." />
      </div>

      <ArticleList v-if="filteredArticles.length" :articles="filteredArticles" />

      <section
        v-else
        class="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900"
      >
        <h2 class="text-lg font-semibold">暂无匹配结果</h2>
        <p class="mt-2 text-sm">换个关键词试试，或返回查看全部文章。</p>
        <RouterLink
          to="/"
          class="mt-4 inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary/90"
        >
          回到首页
        </RouterLink>
      </section>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useBlogStore } from '../stores/blog.js';
import ArticleList from '../components/ArticleList.vue';
import SearchBar from '../components/SearchBar.vue';
import TagScroller from '../components/TagScroller.vue';

const props = defineProps({
  tag: {
    type: String,
    required: true
  }
});

const router = useRouter();
const blog = useBlogStore();
const searchQuery = ref('');

const decodedTag = computed(() => decodeURIComponent(props.tag));
const displayTag = computed(() => {
  const target = decodedTag.value.toLowerCase();
  return blog.allTags.find((tag) => tag.toLowerCase() === target) || decodedTag.value;
});
const tagArticles = computed(() => blog.findByTag(decodedTag.value));
const filteredArticles = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase();
  if (!keyword) {
    return tagArticles.value;
  }
  return tagArticles.value.filter((article) => {
    const haystack = [
      article.title,
      article.excerpt,
      article.content,
      ...(article.tags || [])
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(keyword);
  });
});

const allTags = computed(() => blog.allTags);

const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }
  router.push({ name: 'home' });
};
</script>
