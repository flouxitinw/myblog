<template>
  <div class="flex flex-col gap-8">
    <section class="rounded-3xl border border-transparent bg-gradient-to-br from-primary/15 via-white to-white p-6 text-slate-800 shadow-sm dark:from-primary/10 dark:via-slate-950 dark:to-slate-950 dark:text-slate-100 sm:p-8">
      <h1 class="text-2xl font-semibold leading-snug sm:text-3xl">
        你好，我是 <span class="text-primary">Qi</span>。欢迎来到我的移动端 Vue 博客。
      </h1>
      <p class="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        这里记录我的前端实战心得、设计灵感以及写作工作流。所有界面均以手机体验为起点，你可以随时切换亮/暗模式，并在 Markdown 渲染中沉浸阅读。
      </p>
      <div class="mt-6">
        <TagScroller :tags="tags" />
      </div>
    </section>

    <SearchBar v-model="searchQuery" />

    <ArticleList v-if="filteredArticles.length" :articles="filteredArticles" />

    <section
      v-else
      class="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900"
    >
      <h2 class="text-lg font-semibold">没有找到符合条件的文章</h2>
      <p class="mt-2 text-sm">换个关键词试试，或者从标签中挑选你感兴趣的内容。</p>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import ArticleList from '../components/ArticleList.vue';
import SearchBar from '../components/SearchBar.vue';
import TagScroller from '../components/TagScroller.vue';
import { useBlogStore } from '../stores/blog.js';

const blog = useBlogStore();
const { articles } = storeToRefs(blog);

const searchQuery = ref('');

const filteredArticles = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase();
  if (!keyword) {
    return articles.value;
  }
  return articles.value.filter((article) => {
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

const tags = computed(() => blog.allTags);
</script>
