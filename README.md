# MyBlog

基于 Vue 3、Vite、Tailwind CSS 和 Pinia 打造的移动端优先博客模板。支持 Markdown 文章上传与渲染、即时搜索与标签筛选、本地互动数据（点赞 / 收藏 / 评论）以及本地用户注册登录，无需后端即可体验完整写作与阅读流程。

## 功能亮点

- 📱 **移动端体验优先**：界面布局针对手机端设计，内置亮 / 暗色模式切换。
- 📝 **Markdown 写作流程**：文章以 `.md` 文件存储，通过 `markdown-it` 渲染，兼容代码块、引用等常用语法。
- 🔍 **全文搜索 + 标签筛选**：首页提供关键字实时搜索，标签页可按标签筛选并再次搜索。
- 💬 **互动数据演示**：点赞、收藏、评论均保存在 `localStorage`，模拟前后端分离场景。
- 🧑‍🤝‍🧑 **本地账户体系**：内置作者 / 读者演示账号，访客可自行注册并立即登录。
- 🗂️ **后台上传 Markdown**：作者后台支持上传 Markdown 文件生成文章，自动解析 Front Matter 填充标题、标签等信息。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173/）
npm run dev

# 构建生产包（输出 dist/ 目录）
npm run build

# 预览构建产物（默认 http://localhost:4173/）
npm run preview
```

## 项目结构

```
src/
  assets/            # Tailwind 入口样式
  components/        # 复用组件（文章卡片、搜索栏、头部等）
  content/           # Markdown 文章与 articles.js 索引
  router/            # Vue Router 配置
  stores/            # Pinia Store（auth / blog / ui）
  utils/markdown.js  # markdown-it 渲染封装
  views/             # 路由页面（首页 / 文章 / 标签 / 登录 / 注册 / 后台）
public/
index.html
package.json
postcss.config.js
tailwind.config.js
vite.config.js
```

## 账号与权限

- 作者演示账号：`author / 123456`（可访问后台、上传文章）
- 读者演示账号：`reader / 123456`
- `/register` 页面可注册新账号，信息仅存放于当前浏览器的 `localStorage`。

## 自定义文章上传流程

1. 使用作者账号登录后台（`/dashboard`）。
2. 上传 Markdown 文件：
   - 支持 YAML Front Matter（`title`、`date`、`tags`、`excerpt` 等）；
   - 缺少 Front Matter 时自动提取首个标题与首段文字补全信息。
3. 新文章保存在 `localStorage`，与内置示例内容一并展示。

## 部署到 Vercel

1. 本地执行 `npm run build` 确认构建通过。
2. 推送仓库到 GitHub，并保留根目录 `vercel.json`（保证单页路由回退到 `index.html`）。
3. 在 Vercel 控制台导入仓库，使用默认构建命令 `npm run build`。
4. 部署完成后，通过生成的 `.vercel.app` 域名测试深链接（如 `/article/...`）。

> 本项目为纯前端示例；互动数据和注册信息仅存在访问者浏览器中，清空 `localStorage` 即可重置体验。

## License

MIT
