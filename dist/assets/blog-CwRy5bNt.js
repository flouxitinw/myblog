import{y as C}from"./index-K87GO5ZW.js";const D=`# Vue3 + Tailwind 打造移动端体验的心得\r
\r
> “设计不是堆砌，而是精简到只剩必要。”\r
\r
## 1. 起心动念\r
\r
最近准备把个人博客重写，目标是“手机先行”。于是我给自己列了三个关键词：**手势顺滑**、**暗色友好**、**阅读沉浸**。\r
\r
## 2. 组件拆分策略\r
\r
- 头部采用 *Sticky Header*，保证随时切换页面\r
- 列表卡片使用 \`flex\` + \`gap\` 布局，避免复杂的栅格\r
- Markdown 内容交给 \`@tailwindcss/typography\`，拿到即用\r
\r
## 3. 深色模式状态同步\r
\r
\`\`\`ts\r
const ui = useUiStore();\r
watch(() => ui.resolvedTheme, theme => {\r
  document.documentElement.classList.toggle('dark', theme === 'dark');\r
});\r
\`\`\`\r
\r
## 4. 下一步规划\r
\r
- 引入 PWA 能力，支持离线阅读\r
- 增加短文模式，配合卡片滑动\r
\r
如果你也在探索移动端的 Vue 博客，希望这些笔记能帮你少走弯路。\r
`,M=`# Markdown 写作流：让灵感先落地\r
\r
## 我的问题\r
\r
灵感稍纵即逝，原来的写作方式总是慢半拍。\r
\r
## 解决方案\r
\r
1. **语音速记**：使用手机语音输入先记录大纲\r
2. **结构化**：回到电脑快速转换为 Markdown 标记\r
3. **即时预览**：Vite + Vue 的热更新让反馈即时可见\r
\r
> 与其追求一次写好，不如追求“随时可写”。\r
\r
## 模板片段\r
\r
\`\`\`md\r
# 标题\r
\r
## Why\r
- 痛点\r
\r
## How\r
- 做法\r
\r
## Next\r
- 下一步\r
\`\`\`\r
\r
欢迎留言告诉我你的写作秘籍。\r
`,O=`# Pinia 在个人项目中的轻量实践\r
\r
## 为什么选择 Pinia\r
\r
- TypeScript 友好\r
- 模块组织灵活\r
- 开发者工具体验直观\r
\r
## 应用场景\r
\r
- 主题状态：跟随系统 or 自定义\r
- 文章缓存：一次获取，多处复用\r
\r
## 简洁的 Store 定义\r
\r
\`\`\`ts\r
export const useBlogStore = defineStore('blog', {\r
  state: () => ({\r
    articles\r
  }),\r
  getters: {\r
    findBySlug: (state) => (slug) => state.articles.find(item => item.slug === slug)\r
  }\r
});\r
\`\`\`\r
\r
## 小结\r
\r
Pinia 的核心就是“按需即取”。在个人项目里，保持简单就是王道。\r
`,T=[{id:"1",slug:"vue3-mobile-design-notes",title:"Vue3 + Tailwind 打造移动端体验的心得",date:"2025-06-12",tags:["Vue3","Tailwind","移动端"],excerpt:"记录一次从零搭建移动端博客的过程，涵盖设计思路、组件拆分以及性能优化策略。",content:D},{id:"2",slug:"markdown-workflow-inspiration",title:"Markdown 写作流：让灵感先落地",date:"2025-07-01",tags:["Markdown","写作","效率"],excerpt:"分享我在灵感捕捉、Markdown 标记和发布之间的闭环流程。",content:M},{id:"3",slug:"pinia-state-sharing-guide",title:"Pinia 在个人项目中的轻量实践",date:"2025-08-19",tags:["Pinia","状态管理"],excerpt:"Pinia 不只是 Vuex 的替代，它在中小型项目里同样值得一试。",content:O}],A="blog:interactions",k="blog:custom-articles",f=()=>typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():`id-${Date.now()}-${Math.random().toString(16).slice(2)}`,z=(t={})=>({id:t.id||f(),name:t.name||"未命名文件",type:t.type||(t.url?"image":"markdown"),url:t.url||"",content:t.content||"",uploader:t.uploader||"作者",uploadedAt:t.uploadedAt||new Date().toISOString()}),w=()=>({likes:[],favorites:[],comments:[],attachments:[]}),x=(t={})=>({likes:Array.isArray(t.likes)?t.likes:[],favorites:Array.isArray(t.favorites)?t.favorites:[],comments:Array.isArray(t.comments)?t.comments:[],attachments:Array.isArray(t.attachments)?t.attachments.map(r=>z(r)):[]}),g=(t=[],r=[])=>{const n=new Set,e=[];return t.forEach(s=>{!s||!s.slug||n.has(s.slug)||(n.add(s.slug),e.push(s))}),r.forEach(s=>{!s||!s.slug||n.has(s.slug)||(n.add(s.slug),e.push(s))}),e},B=t=>String(t||"").trim().toLowerCase().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"")||`article-${Date.now()}`,V=(t,r)=>{const n=r||`article-${Date.now()}`;let e=n,s=1;for(;t.has(e);)e=`${n}-${s++}`;return e},P=t=>{const r=t.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);if(!r)return{data:{},body:t};const n=r[1].split(/\r?\n/),e={};n.forEach(o=>{const i=o.trim();if(!i||i.startsWith("#"))return;const[l,...d]=i.split(":");if(!l||d.length===0)return;const c=d.join(":").trim(),a=l.trim().toLowerCase();if(a){if(!c){e[a]="";return}if(c.startsWith("[")&&c.endsWith("]")){const m=c.slice(1,-1).split(",").map(p=>p.trim().replace(/^['"]|['"]$/g,"")).filter(Boolean);e[a]=m;return}e[a]=c.replace(/^['"]|['"]$/g,"")}});const s=t.slice(r[0].length);return{data:e,body:s}},W=(t,r)=>{const n=t.match(/^#\s+(.+)$/m);if(n)return n[1].trim();if(r){const e=r.replace(/\.[^/.]+$/,"").trim();if(e)return e}return"未命名文章"},b=t=>{const r=t.split(/\r?\n/).map(n=>n.trim()).filter(n=>n&&!n.startsWith("#")&&!n.startsWith("```"));return r.length===0?t.slice(0,140):r[0].slice(0,140)},E=t=>{const r=["随笔"];if(!t&&t!==0)return r;const e=(Array.isArray(t)?t:String(t).split(",").map(s=>s.trim())).map(s=>String(s).trim()).filter(Boolean);return e.length?e:r},I=t=>{if(t){const r=new Date(t);if(!Number.isNaN(r.getTime()))return r.toISOString().slice(0,10)}return new Date().toISOString().slice(0,10)},v=t=>{if(!t||typeof t!="object")return null;const r=typeof t.slug=="string"?t.slug.trim():"",n=typeof t.title=="string"?t.title.trim():"",e=typeof t.content=="string"?t.content:"";if(!r||!n||!e)return null;const s=E(t.tags),o=I(t.date),i=typeof t.excerpt=="string"&&t.excerpt.trim()?t.excerpt.trim():b(e);return{id:t.id||f(),slug:r,title:n,date:o,tags:s,excerpt:i,content:e}},N=()=>{if(typeof window>"u")return[];try{const t=window.localStorage.getItem(k);if(!t)return[];const r=JSON.parse(t);return Array.isArray(r)?r.map(n=>v(n)).filter(Boolean):[]}catch(t){return console.warn("读取自定义文章失败",t),[]}},S=t=>{typeof window>"u"||window.localStorage.setItem(k,JSON.stringify(t))},L=()=>{if(typeof window>"u")return{};try{const t=window.localStorage.getItem(A);if(!t)return{};const r=JSON.parse(t);return Object.keys(r).reduce((n,e)=>(n[e]=x(r[e]),n),{})}catch(t){return console.warn("读取互动数据失败",t),{}}},u=t=>{typeof window>"u"||window.localStorage.setItem(A,JSON.stringify(t))},F=C("blog",{state:()=>({baseArticles:[...T],customArticles:N(),interactions:L()}),getters:{articles:t=>g(t.customArticles,t.baseArticles),findBySlug:t=>r=>g(t.customArticles,t.baseArticles).find(e=>e.slug===r),findByTag:t=>r=>{const n=g(t.customArticles,t.baseArticles);if(!r)return n;const e=r.toLowerCase();return n.filter(s=>(s.tags||[]).some(o=>String(o).toLowerCase()===e))},allTags:t=>{const r=new Set;return g(t.customArticles,t.baseArticles).forEach(e=>{(e.tags||[]).forEach(s=>r.add(s))}),Array.from(r).sort((e,s)=>e.localeCompare(s,"zh-CN"))},interactionsFor:t=>r=>{const n=t.interactions[r];return n?x(n):w()}},actions:{ensureEntry(t){this.interactions[t]||(this.interactions[t]=w())},toggleLike(t,r){if(!r)return;this.ensureEntry(t);const n=this.interactions[t],e=n.likes.indexOf(r);e>-1?n.likes.splice(e,1):n.likes.push(r),u(this.interactions)},toggleFavorite(t,r){if(!r)return;this.ensureEntry(t);const n=this.interactions[t],e=n.favorites.indexOf(r);e>-1?n.favorites.splice(e,1):n.favorites.push(r),u(this.interactions)},addComment(t,{author:r,content:n}){if(!r||!n)return null;this.ensureEntry(t);const e=this.interactions[t],s={id:f(),author:r,content:n,createdAt:new Date().toISOString()};return e.comments.unshift(s),u(this.interactions),s},getArticleStats(t){const r=this.interactionsFor(t);return{likes:r.likes.length,favorites:r.favorites.length,comments:r.comments.length}},getComments(t){return this.interactionsFor(t).comments.slice()},importMarkdownArticle({fileName:t,content:r}){const e=(typeof r=="string"?r:String(r||"")).trim();if(!e)return null;const{data:s,body:o}=P(e),i=(o||e).trim(),l=s.title?String(s.title).trim():W(i,t),d=new Set(this.articles.map($=>$.slug)),c=s.slug||l||t||`article-${Date.now()}`,a=V(d,B(c)),h=E(s.tags),m=I(s.date),p=s.excerpt?String(s.excerpt).trim():b(i),y={id:f(),slug:a,title:l,date:m,tags:h,excerpt:p,content:i};return this.customArticles.unshift(y),S(this.customArticles),this.ensureEntry(a),u(this.interactions),y},deleteArticle(t){const r=this.customArticles.findIndex(n=>n.slug===t);return r===-1?!1:(this.customArticles.splice(r,1),S(this.customArticles),this.interactions[t]&&(delete this.interactions[t],u(this.interactions)),!0)}}});export{F as u};
