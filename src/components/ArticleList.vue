<template>
  <section class="space-y-4">
    <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
  </section>
</template>

<script setup>
import ArticleCard from './ArticleCard.vue';

defineProps({
  articles: {
    type: Array,
    default: () => []
  }
});
</script>
