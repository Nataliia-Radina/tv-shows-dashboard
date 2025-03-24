<template>
  <main class="container">
    <div class="search-container" role="search">
      <input
        ref="searchInput"
        id="search"
        type="text"
        v-model="searchQuery"
        @input="debouncedSearch"
        @keydown.esc="clearSearch"
        placeholder="Search TV shows..."
        class="search-bar"
        autofocus
      />
      <button 
        v-if="searchQuery" 
        @click="clearSearch"
        @keydown.enter="clearSearch"
        tabindex="0"
        class="search-clear"
        title="Clear search"
        aria-label="Clear search"
      >
        ×
      </button>
    </div>

    <div v-if="initialLoading" class="loading">
      <span>Loading shows...</span>
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <template v-else>
      <div v-if="searchQuery" class="search-results">
        <div v-if="searchResults.length" class="genre-row">
          <h2 class="genre-row__title">Search Results</h2>
          <div 
            class="genre-row__content" 
            role="list"
          >
            <ShowCard
              v-for="show in searchResults"
              :key="show.id"
              :show="show"
              role="listitem"
            />
          </div>
        </div>
        
        <div v-else-if="hasSearched" class="no-results">
          <p v-if="searchLoading">Searching...</p>
          <p v-else>No shows found for "{{ searchQuery }}"</p>
        </div>
      </div>
      
      <template v-else v-for="(shows, genre) in showsByGenre" :key="genre">
        <section class="genre-row">
          <h2 class="genre-row__title">{{ genre }}</h2>
          <div 
            class="genre-row__content" 
            role="list"
          >
            <ShowCard
              v-for="show in shows"
              :key="show.id"
              :show="show"
              role="listitem"
            />
          </div>
        </section>
      </template>
    </template>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useShowsStore } from '../stores/shows'
import { storeToRefs } from 'pinia'
import debounce from 'lodash.debounce'
import ShowCard from '../components/ShowCard.vue'

const store = useShowsStore()
const { shows, loading, error, showsByGenre, searchResults } = storeToRefs(store)
const searchQuery = ref('')
const hasSearched = ref(false)
const searchLoading = ref(false)
const initialLoading = ref(true)
const searchInput = ref(null)

const debouncedSearch = debounce(async () => {
  if (!searchQuery.value.trim()) {
    store.searchResults = []
    hasSearched.value = false
    return
  }
  
  searchLoading.value = true
  hasSearched.value = true
  await store.searchShows(searchQuery.value)
  searchLoading.value = false
}, 300)

const clearSearch = () => {
  searchQuery.value = ''
  store.searchResults = []
  hasSearched.value = false
  searchInput.value?.focus()
}

onMounted(async () => {
  if (!shows.value.length) {
    await store.fetchShows()
  }
  initialLoading.value = false
})

onUnmounted(() => {
  debouncedSearch.cancel()
})
</script>

<style>
.search-container {
  position: relative;
  width: 100%;
  margin: 1.5rem 0;
  display: flex;
  justify-content: flex-end;
}

.search-bar {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--secondary-accent);
  border-radius: 20px;
  padding: 0.5rem 2rem 0.5rem 1rem;
  max-width: 400px;
  width: 100%;
  color: var(--text);
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.search-bar:focus {
  outline: none;
  border-color: var(--accent);
  background: rgba(255, 255, 255, 0.15);
}

.search-bar::placeholder {
  color: var(--text);
  opacity: 0.4;
}

.search-clear {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity 0.2s;
  padding: 0.2rem;
  border-radius: 4px;
}

.search-clear:hover {
  opacity: 1;
}

.search-clear:focus {
  outline: 1px solid var(--secondary-accent);
  outline-offset: 1px;
  opacity: 1;
}

@media (max-width: 768px) {
  .search-container {
    justify-content: center;
  }
  
  .search-bar {
    font-size: 16px; 
    padding: 0.4rem 2rem 0.4rem 1rem;
    max-width: 100%;
  }
}
</style>
