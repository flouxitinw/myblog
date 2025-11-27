import { defineStore } from 'pinia';

const DEMO_USERS = [
  {
    id: 'demo-author',
    username: 'author',
    password: '123456',
    role: 'author',
    displayName: '作者账号'
  },
  {
    id: 'demo-reader',
    username: 'reader',
    password: '123456',
    role: 'user',
    displayName: '读者账号'
  }
];

const sessionStorageKey = 'blog:auth';
const customUsersKey = 'blog:users';

const makeId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `user-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const sanitizeUser = (input) => {
  if (!input || typeof input !== 'object') {
    return null;
  }
  const username = typeof input.username === 'string' ? input.username.trim() : '';
  const password = typeof input.password === 'string' ? input.password : '';
  if (!username || !password) {
    return null;
  }
  return {
    id: typeof input.id === 'string' ? input.id : makeId(),
    username,
    password,
    role: input.role === 'author' ? 'author' : 'user',
    displayName:
      typeof input.displayName === 'string' && input.displayName.trim()
        ? input.displayName.trim()
        : username
  };
};

const loadSession = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(sessionStorageKey);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('无法读取登录状态', error);
    return null;
  }
};

const persistSession = (payload) => {
  if (typeof window === 'undefined') {
    return;
  }
  if (!payload) {
    window.localStorage.removeItem(sessionStorageKey);
    return;
  }
  window.localStorage.setItem(sessionStorageKey, JSON.stringify(payload));
};

const loadCustomUsers = () => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(customUsersKey);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.map((item) => sanitizeUser(item)).filter(Boolean);
  } catch (error) {
    console.warn('无法读取用户列表', error);
    return [];
  }
};

const persistCustomUsers = (list) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(customUsersKey, JSON.stringify(list));
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: loadSession(),
    customUsers: loadCustomUsers()
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.user),
    isAuthor: (state) => state.user?.role === 'author',
    allUsers: (state) => [...state.customUsers, ...DEMO_USERS]
  },
  actions: {
    login({ username, password }) {
      const account = this.allUsers.find((item) => item.username === username.trim());
      if (!account || account.password !== password) {
        throw new Error('用户名或密码不正确');
      }
      this.user = {
        id: account.id,
        username: account.username,
        role: account.role,
        displayName: account.displayName
      };
      persistSession(this.user);
      return this.user;
    },
    register({ username, password, confirmPassword, displayName }) {
      const trimmedUsername = typeof username === 'string' ? username.trim() : '';
      const trimmedDisplayName =
        typeof displayName === 'string' && displayName.trim() ? displayName.trim() : trimmedUsername;
      if (!trimmedUsername) {
        throw new Error('用户名不能为空');
      }
      if (!password || password.length < 6) {
        throw new Error('密码至少需要 6 个字符');
      }
      if (password !== confirmPassword) {
        throw new Error('两次输入的密码不一致');
      }
      const exists = this.allUsers.some((item) => item.username === trimmedUsername);
      if (exists) {
        throw new Error('该用户名已被占用');
      }
      const newUser = {
        id: makeId(),
        username: trimmedUsername,
        password,
        role: 'user',
        displayName: trimmedDisplayName || trimmedUsername
      };
      this.customUsers.push(newUser);
      persistCustomUsers(this.customUsers);
      this.user = {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        displayName: newUser.displayName
      };
      persistSession(this.user);
      return this.user;
    },
    logout() {
      this.user = null;
      persistSession(null);
    }
  }
});
