<template>
  <div class="flex min-h-[70vh] items-center justify-center px-4">
    <section class="w-full max-w-sm space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">账号登录</h1>
        <p class="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          体验互动功能可使用演示账号：<br />
          作者 <code class="rounded bg-slate-100 px-1 dark:bg-slate-800">author / 123456</code>，读者
          <code class="rounded bg-slate-100 px-1 dark:bg-slate-800">reader / 123456</code>。<br />
          没有账户？<RouterLink to="/register" class="text-primary underline-offset-2 hover:underline">立即注册</RouterLink>
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <label class="block space-y-2 text-sm">
          <span class="font-medium text-slate-600 dark:text-slate-300">用户名</span>
          <input
            v-model="form.username"
            type="text"
            required
            autocomplete="username"
            class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </label>

        <label class="block space-y-2 text-sm">
          <span class="font-medium text-slate-600 dark:text-slate-300">密码</span>
          <input
            v-model="form.password"
            type="password"
            required
            autocomplete="current-password"
            class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </label>

        <p v-if="error" class="rounded-2xl bg-red-50 px-3 py-2 text-xs text-red-500 dark:bg-red-500/10 dark:text-red-200">
          {{ error }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="flex w-full items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <p class="text-center text-xs text-slate-400 dark:text-slate-500">
        注册信息会保存在本地浏览器中。
      </p>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.js';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const form = reactive({
  username: '',
  password: ''
});

const loading = ref(false);
const error = ref('');

const handleSubmit = async () => {
  if (loading.value) {
    return;
  }
  error.value = '';
  loading.value = true;
  try {
    await auth.login(form);
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/';
    router.replace(redirect);
  } catch (err) {
    error.value = err?.message || '登录失败，请稍后再试';
  } finally {
    loading.value = false;
  }
};
</script>
