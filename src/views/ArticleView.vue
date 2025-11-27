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
      <div class="space-y-6">
        <div class="flex flex-wrap gap-3 rounded-3xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-medium text-primary transition hover:bg-primary/15 disabled:cursor-not-allowed disabled:opacity-70"
            @click="handleLike"
            :disabled="!auth.isAuthenticated"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35 10.45 20C5.4 15.36 2 12.27 2 8.5A3.5 3.5 0 0 1 5.5 5 4.38 4.38 0 0 1 9 6.91 4.38 4.38 0 0 1 12.5 5 3.5 3.5 0 0 1 16 8.5c0 3.77-3.4 6.86-8.45 11.5z" />
            </svg>
            赞 {{ stats.likes }}
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-100 px-4 py-2 font-medium text-emerald-600 transition hover:bg-emerald-200/80 disabled:cursor-not-allowed disabled:opacity-70 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-200"
            @click="handleFavorite"
            :disabled="!auth.isAuthenticated"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            收藏 {{ stats.favorites }}
          </button>
          <span class="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-500 dark:border-slate-700 dark:text-slate-300">
            评论 {{ stats.comments }}
          </span>
          <RouterLink
            v-if="!auth.isAuthenticated"
            :to="{ name: 'login', query: { redirect: $route.fullPath } }"
            class="inline-flex items-center text-xs text-primary underline-offset-2 hover:underline"
          >
            登录后可点赞、收藏、评论
          </RouterLink>
        </div>

        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">评论</h2>
          <form
            v-if="auth.isAuthenticated"
            class="space-y-3 rounded-3xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/40"
            @submit.prevent="submitComment"
          >
            <textarea
              v-model="commentText"
              rows="3"
              placeholder="写下你的想法..."
              class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              required
            ></textarea>
            <button
              type="submit"
              class="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
            >
              发布评论
            </button>
          </form>
          <p v-else class="rounded-3xl border border-dashed border-slate-200 bg-white p-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
            登录后可以发表你的评论。
          </p>

          <ul v-if="comments.length" class="space-y-3">
            <li
              v-for="comment in comments"
              :key="comment.id"
              class="rounded-3xl border border-slate-100 bg-white p-4 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              <div class="flex items-center justify-between text-xs text-slate-400">
                <span class="font-medium text-slate-500 dark:text-slate-200">{{ comment.author }}</span>
                <span>{{ formatCommentDate(comment.createdAt) }}</span>
              </div>
              <p class="mt-2 leading-relaxed">{{ comment.content }}</p>
            </li>
          </ul>
          <p v-else class="text-xs text-slate-400">还没有评论，来发表第一条吧。</p>
        </section>

      </div>
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
import { computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useBlogStore } from '../stores/blog.js';
import MarkdownRenderer from '../components/MarkdownRenderer.vue';
import { useAuthStore } from '../stores/auth.js';

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
});

const router = useRouter();
const blog = useBlogStore();
const auth = useAuthStore();

const article = computed(() => blog.findBySlug(props.slug));

const stats = computed(() => blog.getArticleStats(props.slug));
const comments = computed(() => blog.getComments(props.slug));
const commentText = ref('');

const formattedDate = computed(() => {
  if (!article.value?.date) return '';
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(article.value.date));
});

const formatCommentDate = (isoString) => {
  if (!isoString) {
    return '';
  }
  try {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(isoString));
  } catch (error) {
    return isoString;
  }
};


const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }
  router.push({ name: 'home' });
};

const ensureLogin = () => {
  if (!auth.isAuthenticated) {
    router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
    return false;
  }
  return true;
};

const handleLike = () => {
  if (!ensureLogin()) {
    return;
  }
  blog.toggleLike(props.slug, auth.user.username);
};

const handleFavorite = () => {
  if (!ensureLogin()) {
    return;
  }
  blog.toggleFavorite(props.slug, auth.user.username);
};

const submitComment = () => {
  if (!ensureLogin() || !commentText.value.trim()) {
    return;
  }
  blog.addComment(props.slug, {
    author: auth.user.displayName || auth.user.username,
    content: commentText.value.trim()
  });
  commentText.value = '';
};

</script>
