<template>
  <div class="flex min-h-[70vh] items-center justify-center px-4">
    <section class="w-full max-w-sm space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">创建新账户</h1>
        <p class="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          注册信息仅保存在浏览器本地，可用于体验评论、点赞等互动功能。
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
          <span class="font-medium text-slate-600 dark:text-slate-300">昵称（可选）</span>
          <input
            v-model="form.displayName"
            type="text"
            autocomplete="nickname"
            placeholder="默认使用用户名"
            class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </label>

        <label class="block space-y-2 text-sm">
          <span class="font-medium text-slate-600 dark:text-slate-300">密码</span>
          <input
            v-model="form.password"
            type="password"
            required
            minlength="6"
            autocomplete="new-password"
            class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </label>

        <label class="block space-y-2 text-sm">
          <span class="font-medium text-slate-600 dark:text-slate-300">确认密码</span>
          <input
            v-model="form.confirmPassword"
            type="password"
            required
            minlength="6"
            autocomplete="new-password"
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
          {{ loading ? '注册中...' : '立即注册' }}
        </button>
      </form>

      <p class="text-center text-xs text-slate-400 dark:text-slate-500">
        已有账户？
        <RouterLink to="/login" class="text-primary underline-offset-2 hover:underline">返回登录</RouterLink>
      </p>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.js';

const auth = useAuthStore();
const router = useRouter();

const form = reactive({
  username: '',
  displayName: '',
  password: '',
  confirmPassword: ''
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
    await auth.register({
      username: form.username,
      password: form.password,
      confirmPassword: form.confirmPassword,
      displayName: form.displayName
    });
    router.replace('/');
  } catch (err) {
    error.value = err?.message || '注册失败，请稍后再试';
  } finally {
    loading.value = false;
  }
};
</script>
