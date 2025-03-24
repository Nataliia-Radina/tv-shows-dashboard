<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <router-link to="/" class="header__logo">TV Shows</router-link>
      </div>
    </header>
    <main>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useShowsStore } from './stores/shows'
import { storeToRefs } from 'pinia'

const store = useShowsStore()
const { searchResults } = storeToRefs(store)
const searchQuery = ref('')
</script>

<style>
@import './assets/styles/main.css';

.header {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1.5rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.header__logo {
  color: var(--secondary-accent);
  margin: 0;
  text-decoration: none;
  font-size: 2.25rem;
  font-weight: bold;
  transition: color 0.2s;
  padding: 0.5rem 0;
}

.header__logo:hover {
  color: var(--accent);
}

.header .nav-link {
  color: var(--text);
  text-decoration: none;
  transition: color 0.2s;
}

.header .nav-link:hover {
  color: var(--secondary-accent);
}

@media (max-width: 480px) {
  .header {
    padding: 1rem 0;
  }

  .header .container {
    flex-direction: column;
    gap: 1rem;
  }

  .header__logo {
    font-size: 2rem;
  }
}
</style>
