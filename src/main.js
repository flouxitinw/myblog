import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/main.css';

const pinia = createPinia();

const applyStoredTheme = () => {
  const root = document.documentElement;
  const storedPreference = localStorage.getItem('blog:theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (storedPreference === 'dark' || (!storedPreference && prefersDark)) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

applyStoredTheme();

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
if (typeof mediaQuery.addEventListener === 'function') {
  mediaQuery.addEventListener('change', applyStoredTheme);
} else if (typeof mediaQuery.addListener === 'function') {
  mediaQuery.addListener(applyStoredTheme);
}

createApp(App).use(pinia).use(router).mount('#app');
