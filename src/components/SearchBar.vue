<template>
  <label class="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 dark:border-slate-800 dark:bg-slate-900">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm7.707 11.293a1 1 0 0 1 0 1.414l-2 2a1 1 0 1 1-1.414-1.414l2-2a1 1 0 0 1 1.414 0z" />
    </svg>
    <input
      type="search"
      :value="modelValue"
      :placeholder="placeholder"
      class="h-8 flex-1 border-none bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400 dark:text-slate-200"
      @input="onInput"
      @keyup.enter="emit('submit')"
    />
    <button
      v-if="modelValue"
      type="button"
      class="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
      @click="emit('update:modelValue', '')"
    >
      清除
    </button>
  </label>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '搜索文章、标签或关键词...'
  }
});

const emit = defineEmits(['update:modelValue', 'submit']);

const modelValue = computed(() => props.modelValue);
const placeholder = computed(() => props.placeholder);

const onInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>
