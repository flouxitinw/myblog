import articleVue3Mobile from './article-vue3-mobile.md?raw';
import articleMarkdownWorkflow from './article-markdown-workflow.md?raw';
import articlePiniaGuide from './article-pinia-guide.md?raw';

export const articles = [
  {
    id: '1',
    slug: 'vue3-mobile-design-notes',
    title: 'Vue3 + Tailwind 打造移动端体验的心得',
    date: '2025-06-12',
    tags: ['Vue3', 'Tailwind', '移动端'],
    excerpt: '记录一次从零搭建移动端博客的过程，涵盖设计思路、组件拆分以及性能优化策略。',
    content: articleVue3Mobile
  },
  {
    id: '2',
    slug: 'markdown-workflow-inspiration',
    title: 'Markdown 写作流：让灵感先落地',
    date: '2025-07-01',
    tags: ['Markdown', '写作', '效率'],
    excerpt: '分享我在灵感捕捉、Markdown 标记和发布之间的闭环流程。',
    content: articleMarkdownWorkflow
  },
  {
    id: '3',
    slug: 'pinia-state-sharing-guide',
    title: 'Pinia 在个人项目中的轻量实践',
    date: '2025-08-19',
    tags: ['Pinia', '状态管理'],
    excerpt: 'Pinia 不只是 Vuex 的替代，它在中小型项目里同样值得一试。',
    content: articlePiniaGuide
  }
];
