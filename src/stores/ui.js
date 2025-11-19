import { defineStore } from 'pinia';

const updateRootClass = (theme) => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

export const useUiStore = defineStore('ui', {
  state: () => ({
    theme: (localStorage.getItem('blog:theme') || 'system')
  }),
  getters: {
    resolvedTheme(state) {
      if (state.theme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return state.theme;
    }
  },
  actions: {
    setTheme(theme) {
      this.theme = theme;
      if (theme === 'system') {
        localStorage.removeItem('blog:theme');
        updateRootClass(this.resolvedTheme);
        return;
      }
      localStorage.setItem('blog:theme', theme);
      updateRootClass(theme);
    },
    toggleTheme() {
      const next = this.resolvedTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(next);
    }
  }
});
