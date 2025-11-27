import { defineStore } from 'pinia';
import { articles as seedArticles } from '../content/articles.js';

const storageKey = 'blog:interactions';
const customArticlesKey = 'blog:custom-articles';

const makeId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const defaultAttachment = (item = {}) => ({
  id: item.id || makeId(),
  name: item.name || '未命名文件',
  type: item.type || (item.url ? 'image' : 'markdown'),
  url: item.url || '',
  content: item.content || '',
  uploader: item.uploader || '作者',
  uploadedAt: item.uploadedAt || new Date().toISOString()
});

const emptyEntry = () => ({
  likes: [],
  favorites: [],
  comments: [],
  attachments: []
});

const normalizeEntry = (entry = {}) => ({
  likes: Array.isArray(entry.likes) ? entry.likes : [],
  favorites: Array.isArray(entry.favorites) ? entry.favorites : [],
  comments: Array.isArray(entry.comments) ? entry.comments : [],
  attachments: Array.isArray(entry.attachments)
    ? entry.attachments.map((item) => defaultAttachment(item))
    : []
});

const combineArticles = (custom = [], base = []) => {
  const seen = new Set();
  const result = [];
  custom.forEach((article) => {
    if (!article || !article.slug || seen.has(article.slug)) {
      return;
    }
    seen.add(article.slug);
    result.push(article);
  });
  base.forEach((article) => {
    if (!article || !article.slug || seen.has(article.slug)) {
      return;
    }
    seen.add(article.slug);
    result.push(article);
  });
  return result;
};

const slugify = (value) => {
  const base = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return base || `article-${Date.now()}`;
};

const ensureUniqueSlug = (existingSlugs, baseSlug) => {
  const base = baseSlug || `article-${Date.now()}`;
  let candidate = base;
  let counter = 1;
  while (existingSlugs.has(candidate)) {
    candidate = `${base}-${counter++}`;
  }
  return candidate;
};

const parseMarkdownSource = (raw) => {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
  if (!match) {
    return { data: {}, body: raw };
  }
  const lines = match[1].split(/\r?\n/);
  const data = {};
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      return;
    }
    const [key, ...rest] = trimmed.split(':');
    if (!key || rest.length === 0) {
      return;
    }
    const rawValue = rest.join(':').trim();
    const normalizedKey = key.trim().toLowerCase();
    if (!normalizedKey) {
      return;
    }
    if (!rawValue) {
      data[normalizedKey] = '';
      return;
    }
    if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
      const inner = rawValue.slice(1, -1);
      const items = inner
        .split(',')
        .map((entry) => entry.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
      data[normalizedKey] = items;
      return;
    }
    data[normalizedKey] = rawValue.replace(/^['"]|['"]$/g, '');
  });
  const body = raw.slice(match[0].length);
  return { data, body };
};

const extractTitle = (body, fileName) => {
  const heading = body.match(/^#\s+(.+)$/m);
  if (heading) {
    return heading[1].trim();
  }
  if (fileName) {
    const fallback = fileName.replace(/\.[^/.]+$/, '').trim();
    if (fallback) {
      return fallback;
    }
  }
  return '未命名文章';
};

const extractExcerpt = (body) => {
  const lines = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && !line.startsWith('```'));
  if (lines.length === 0) {
    return body.slice(0, 140);
  }
  return lines[0].slice(0, 140);
};

const normalizeTags = (value) => {
  const fallback = ['随笔'];
  if (!value && value !== 0) {
    return fallback;
  }
  const pool = Array.isArray(value)
    ? value
    : String(value)
        .split(',')
        .map((entry) => entry.trim());
  const normalized = pool
    .map((entry) => String(entry).trim())
    .filter(Boolean);
  return normalized.length ? normalized : fallback;
};

const normalizeDate = (value) => {
  if (value) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date.toISOString().slice(0, 10);
    }
  }
  return new Date().toISOString().slice(0, 10);
};

const sanitizeCustomArticle = (item) => {
  if (!item || typeof item !== 'object') {
    return null;
  }
  const slug = typeof item.slug === 'string' ? item.slug.trim() : '';
  const title = typeof item.title === 'string' ? item.title.trim() : '';
  const content = typeof item.content === 'string' ? item.content : '';
  if (!slug || !title || !content) {
    return null;
  }
  const tags = normalizeTags(item.tags);
  const date = normalizeDate(item.date);
  const excerpt = typeof item.excerpt === 'string' && item.excerpt.trim()
    ? item.excerpt.trim()
    : extractExcerpt(content);
  return {
    id: item.id || makeId(),
    slug,
    title,
    date,
    tags,
    excerpt,
    content
  };
};

const loadCustomArticles = () => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(customArticlesKey);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.map((item) => sanitizeCustomArticle(item)).filter(Boolean);
  } catch (error) {
    console.warn('读取自定义文章失败', error);
    return [];
  }
};

const persistCustomArticles = (value) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(customArticlesKey, JSON.stringify(value));
};

const loadInteractions = () => {
  if (typeof window === 'undefined') {
    return {};
  }
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return Object.keys(parsed).reduce((acc, key) => {
      acc[key] = normalizeEntry(parsed[key]);
      return acc;
    }, {});
  } catch (error) {
    console.warn('读取互动数据失败', error);
    return {};
  }
};

const persistInteractions = (value) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(storageKey, JSON.stringify(value));
};

export const useBlogStore = defineStore('blog', {
  state: () => ({
    baseArticles: [...seedArticles],
    customArticles: loadCustomArticles(),
    interactions: loadInteractions()
  }),
  getters: {
    articles: (state) => combineArticles(state.customArticles, state.baseArticles),
    findBySlug: (state) => (slug) => {
      const collection = combineArticles(state.customArticles, state.baseArticles);
      return collection.find((item) => item.slug === slug);
    },
    findByTag: (state) => (tag) => {
      const collection = combineArticles(state.customArticles, state.baseArticles);
      if (!tag) {
        return collection;
      }
      const normalized = tag.toLowerCase();
      return collection.filter((item) =>
        (item.tags || []).some((entry) => String(entry).toLowerCase() === normalized)
      );
    },
    allTags: (state) => {
      const pool = new Set();
      const collection = combineArticles(state.customArticles, state.baseArticles);
      collection.forEach((article) => {
        (article.tags || []).forEach((tag) => pool.add(tag));
      });
      return Array.from(pool).sort((a, b) => a.localeCompare(b, 'zh-CN'));
    },
    interactionsFor: (state) => (slug) => {
      const current = state.interactions[slug];
      return current ? normalizeEntry(current) : emptyEntry();
    }
  },
  actions: {
    ensureEntry(slug) {
      if (!this.interactions[slug]) {
        this.interactions[slug] = emptyEntry();
      }
    },
    toggleLike(slug, username) {
      if (!username) {
        return;
      }
      this.ensureEntry(slug);
      const entry = this.interactions[slug];
      const position = entry.likes.indexOf(username);
      if (position > -1) {
        entry.likes.splice(position, 1);
      } else {
        entry.likes.push(username);
      }
      persistInteractions(this.interactions);
    },
    toggleFavorite(slug, username) {
      if (!username) {
        return;
      }
      this.ensureEntry(slug);
      const entry = this.interactions[slug];
      const position = entry.favorites.indexOf(username);
      if (position > -1) {
        entry.favorites.splice(position, 1);
      } else {
        entry.favorites.push(username);
      }
      persistInteractions(this.interactions);
    },
    addComment(slug, { author, content }) {
      if (!author || !content) {
        return null;
      }
      this.ensureEntry(slug);
      const entry = this.interactions[slug];
      const comment = {
        id: makeId(),
        author,
        content,
        createdAt: new Date().toISOString()
      };
      entry.comments.unshift(comment);
      persistInteractions(this.interactions);
      return comment;
    },
    getArticleStats(slug) {
      const entry = this.interactionsFor(slug);
      return {
        likes: entry.likes.length,
        favorites: entry.favorites.length,
        comments: entry.comments.length
      };
    },
    getComments(slug) {
      const entry = this.interactionsFor(slug);
      return entry.comments.slice();
    },
    importMarkdownArticle({ fileName, content }) {
      const source = typeof content === 'string' ? content : String(content || '');
      const trimmed = source.trim();
      if (!trimmed) {
        return null;
      }
      const { data, body } = parseMarkdownSource(trimmed);
      const markdownBody = (body || trimmed).trim();
      const title = data.title ? String(data.title).trim() : extractTitle(markdownBody, fileName);
      const existingSlugs = new Set(this.articles.map((item) => item.slug));
      const desired = data.slug || title || fileName || `article-${Date.now()}`;
      const slug = ensureUniqueSlug(existingSlugs, slugify(desired));
      const tags = normalizeTags(data.tags);
      const date = normalizeDate(data.date);
      const excerpt = data.excerpt ? String(data.excerpt).trim() : extractExcerpt(markdownBody);
      const article = {
        id: makeId(),
        slug,
        title,
        date,
        tags,
        excerpt,
        content: markdownBody
      };
      this.customArticles.unshift(article);
      persistCustomArticles(this.customArticles);
      this.ensureEntry(slug);
      persistInteractions(this.interactions);
      return article;
    },
    deleteArticle(slug) {
      const index = this.customArticles.findIndex((item) => item.slug === slug);
      if (index === -1) {
        return false;
      }
      this.customArticles.splice(index, 1);
      persistCustomArticles(this.customArticles);
      if (this.interactions[slug]) {
        delete this.interactions[slug];
        persistInteractions(this.interactions);
      }
      return true;
    }
  }
});
