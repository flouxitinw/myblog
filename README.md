# MyBlog

Mobile-first blog starter built with Vue 3, Vite, Tailwind CSS, and Pinia. It renders Markdown posts, offers instant search and tagging, and keeps interaction data (likes, favorites, comments) in the browser so the project can run without a backend.

## Features

- Mobile-oriented layout with dark/light theme toggle
- Markdown-driven content pipeline and live search
- Pinia-powered interaction store for likes, favorites, and comments
- Local account system with demo users plus self-registration
- Author dashboard for uploading Markdown files as new posts

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build production bundle into dist/
npm run build

# Preview built bundle (http://localhost:4173)
npm run preview
```

## Project Structure

```
 src
    assets/            # Tailwind entry styles
    components/        # Reusable UI parts (cards, search, headers)
    content/           # Markdown articles and articles.js index
    router/            # Vue Router configuration
    stores/            # Pinia stores (auth, blog, ui)
    utils/markdown.js  # Markdown-it renderer helper
    views/             # Route pages (Home, Article, Tag, Login, Register, Dashboard)
 public/                # Static assets (optional)
 index.html             # Vite HTML entry
 package.json
 postcss.config.js
 tailwind.config.js
 vite.config.js
```

## Accounts

- Author demo: `author / 123456`
- Reader demo: `reader / 123456`
- New visitors can sign up on `/register`; credentials are stored in `localStorage` on the current browser only.

## Custom Articles

1. Open `/dashboard` while logged in as an author.
2. Upload a Markdown file. Optional YAML front matter (`title`, `date`, `tags`, `excerpt`) is parsed automatically.
3. Generated posts are persisted in `localStorage` and appear alongside bundled articles.

## Deployment (Vercel)

1. Run `npm run build` locally to confirm the bundle passes.
2. Commit and push to GitHub with the included `vercel.json` rewrite (SPA fallback to `index.html`).
3. Import the repository in Vercel; keep the default build command `npm run build`.
4. Once deployed, verify deep links such as `/article/...` work through the generated `.vercel.app` domain.

> This project is front-end only. Interaction data and registered users never leave the browserclear `localStorage` to reset the demo.

## License

MIT
