# Vue3 + Tailwind 打造移动端体验的心得

> “设计不是堆砌，而是精简到只剩必要。”

## 1. 起心动念

最近准备把个人博客重写，目标是“手机先行”。于是我给自己列了三个关键词：**手势顺滑**、**暗色友好**、**阅读沉浸**。

## 2. 组件拆分策略

- 头部采用 *Sticky Header*，保证随时切换页面
- 列表卡片使用 `flex` + `gap` 布局，避免复杂的栅格
- Markdown 内容交给 `@tailwindcss/typography`，拿到即用

## 3. 深色模式状态同步

```ts
const ui = useUiStore();
watch(() => ui.resolvedTheme, theme => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
});
```

## 4. 下一步规划

- 引入 PWA 能力，支持离线阅读
- 增加短文模式，配合卡片滑动

如果你也在探索移动端的 Vue 博客，希望这些笔记能帮你少走弯路。
