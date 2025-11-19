import { defineStore } from 'pinia';
import { articles } from '../content/articles.js';

export const useBlogStore = defineStore('blog', {
  state: () => ({
    articles
  }),
  getters: {
    findBySlug: (state) => (slug) => state.articles.find((item) => item.slug === slug),
    findByTag: (state) => (tag) => {
      if (!tag) {
        return state.articles;
      }
      const normalized = tag.toLowerCase();
      return state.articles.filter((item) =>
        item.tags.some((entry) => entry.toLowerCase() === normalized)
      );
    },
    allTags: (state) => {
      const pool = new Set();
      state.articles.forEach((article) => {
        article.tags.forEach((tag) => pool.add(tag));
      });
      return Array.from(pool).sort((a, b) => a.localeCompare(b, 'zh-CN'));
    }
  }
});
