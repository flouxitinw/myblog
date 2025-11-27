<template>
  <div class="space-y-8">
    <header class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-widest text-primary/80">作者后台</p>
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">互动概览</h1>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          在这里可以查看每篇文章的点赞、收藏、评论情况，并维护自定义 Markdown 文章。
        </p>
      </div>
      <RouterLink
        to="/"
        class="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-primary hover:text-primary dark:border-slate-800 dark:text-slate-300"
      >
        返回前台
      </RouterLink>
    </header>

    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">上传文章</h2>
          <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
            上传 Markdown 文件即可生成新的文章，支持携带 Front Matter 元数据。
          </p>
        </div>
        <input
          type="file"
          accept=".md,.markdown,text/markdown"
          @change="onArticleUploadChange"
          class="block w-full cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-xs text-slate-500 transition focus:border-primary focus:outline-none dark:border-slate-700 dark:bg-slate-950"
        />
        <p class="text-[11px] text-slate-400 dark:text-slate-500">
          示例 Front Matter：<code>--- title: 我的文章 tags: [Vue3, 随笔] ---</code>
        </p>
      </div>

      <div class="mt-6 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-200">自定义文章</h3>
          <p class="text-xs text-slate-400 dark:text-slate-500">本地存储，不会上传服务器</p>
        </div>
        <p v-if="!customArticles.length" class="text-xs text-slate-400 dark:text-slate-500">
          暂无自定义文章，上传 Markdown 后会出现在此处。
        </p>
        <ul v-else class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li
            v-for="item in customArticles"
            :key="item.slug"
            class="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="min-w-0 flex-1">
              <p class="truncate font-medium text-slate-700 dark:text-slate-200">{{ item.title }}</p>
              <p class="text-[11px] text-slate-400">{{ item.slug }} · {{ formatDate(item.date) }}</p>
            </div>
            <div class="flex flex-shrink-0 items-center gap-2">
              <RouterLink
                :to="{ name: 'article', params: { slug: item.slug } }"
                class="rounded-full border border-primary/40 px-3 py-1 text-[11px] font-medium text-primary hover:bg-primary/10"
              >
                查看
              </RouterLink>
              <button
                type="button"
                class="rounded-full border border-red-200 px-3 py-1 text-[11px] font-medium text-red-500 transition hover:bg-red-50 dark:border-red-500/40 dark:text-red-300 dark:hover:bg-red-500/10"
                @click="removeArticle(item.slug)"
              >
                删除
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-2">
      <article
        v-for="article in articleCards"
        :key="article.slug"
        class="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{{ article.title }}</h2>
          <p class="mt-1 text-xs text-slate-400">发布时间：{{ article.date }}</p>
        </div>

        <div class="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
          <span class="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">点赞 {{ article.stats.likes }}</span>
          <span class="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">收藏 {{ article.stats.favorites }}</span>
          <span class="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">评论 {{ article.stats.comments }}</span>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-200">最新评论</h3>
          <p v-if="!article.latestComment" class="text-xs text-slate-400">暂无评论</p>
          <div v-else class="rounded-2xl bg-slate-100/70 p-3 text-xs text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
            <p class="font-medium">{{ article.latestComment.author }}</p>
            <p class="mt-1 leading-relaxed">{{ article.latestComment.content }}</p>
            <p class="mt-2 text-[11px] text-slate-400">{{ formatDate(article.latestComment.createdAt) }}</p>
          </div>
        </div>

      </article>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.js';
import { useBlogStore } from '../stores/blog.js';

const auth = useAuthStore();
const blog = useBlogStore();
const router = useRouter();

onMounted(() => {
  if (!auth.isAuthor) {
    router.replace({ name: 'home' });
  }
});

const articleCards = computed(() =>
  blog.articles.map((item) => {
    const stats = blog.getArticleStats(item.slug);
    const comments = blog.getComments(item.slug);
    return {
      ...item,
      stats,
      latestComment: comments[0] || null
    };
  })
);

const customArticles = computed(() => blog.customArticles);

const formatDate = (isoString) => {
  if (!isoString) {
    return '';
  }
  try {
    const hasTime = /T\d/.test(isoString);
    const options = hasTime
      ? {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }
      : {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        };
    return new Intl.DateTimeFormat('zh-CN', options).format(new Date(isoString));
  } catch (error) {
    return isoString;
  }
};

const readMarkdownFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file, 'utf-8');
  });

const onArticleUploadChange = async (event) => {
  const file = event.target?.files?.[0];
  event.target.value = '';
  if (!file || !auth.isAuthor) {
    return;
  }
  try {
    const data = await readMarkdownFile(file);
    const article = blog.importMarkdownArticle({
      fileName: file.name,
      content: String(data)
    });
    if (article) {
      router.push({ name: 'article', params: { slug: article.slug } });
    }
  } catch (error) {
    console.warn('读取 Markdown 失败', error);
  }
};

const removeArticle = (slug) => {
  if (!auth.isAuthor) {
    return;
  }
  const confirmed = window.confirm('确定删除这篇文章吗？操作不可撤销。');
  if (!confirmed) {
    return;
  }
  const removed = blog.deleteArticle(slug);
  if (removed && router.currentRoute.value.name === 'article' && router.currentRoute.value.params?.slug === slug) {
    router.push({ name: 'home' });
  }
};
</script>
