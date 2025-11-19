# Pinia 在个人项目中的轻量实践

## 为什么选择 Pinia

- TypeScript 友好
- 模块组织灵活
- 开发者工具体验直观

## 应用场景

- 主题状态：跟随系统 or 自定义
- 文章缓存：一次获取，多处复用

## 简洁的 Store 定义

```ts
export const useBlogStore = defineStore('blog', {
  state: () => ({
    articles
  }),
  getters: {
    findBySlug: (state) => (slug) => state.articles.find(item => item.slug === slug)
  }
});
```

## 小结

Pinia 的核心就是“按需即取”。在个人项目里，保持简单就是王道。
