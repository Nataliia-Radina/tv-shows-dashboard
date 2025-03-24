<template>
  <main class="container">
    <div v-if="isLoading" class="loading-state">
      Loading...
    </div>
    
    <div v-else-if="hasError" class="error-state">
      <p>Sorry, we couldn't load the show details.</p>
      <button @click="$router.push('/')" class="back-button">
        ← Back to Shows
      </button>
    </div>

    <article v-else class="show-details__header">
      <div class="show-details__image-container">
        <img
          :src="show.image?.original || show.image?.medium"
          :alt="show.name + ' poster'"
          class="show-details__image"
        />
      </div>
      <div class="show-details__info">
        <h1>{{ show.name }}</h1>
        <div class="show-details__meta">
          <div class="show-details__rating" v-if="show.rating?.average">
            <span class="star">★</span> {{ show.rating.average }}
          </div>
          <div class="show-details__genres">
            {{ show.genres?.join(', ') }}
          </div>
        </div>
        <div class="show-details__schedule" v-if="show.schedule">
          <p>
            {{ show.schedule.days.join(', ') }} at {{ show.schedule.time }}
            <span v-if="show.network">({{ show.network.name }})</span>
          </p>
        </div>
        <div class="show-details__summary">
          <div v-html="show.summary"></div>
        </div>
        <button 
          @click="$router.push('/')" 
          class="back-button"
        >
          ← Back to Shows
        </button>
      </div>
    </article>

    <!-- Cast Section -->
    <section class="show-details__cast" v-if="cast.length">
      <h2>Cast</h2>
      <div class="cast-grid" role="list">
        <article 
          v-for="actor in cast" 
          :key="actor.person.id" 
          class="cast-member"
          role="listitem"
        >
          <LazyImage
            :src="actor.person.image?.medium || '/placeholder.jpg'"
            :alt="actor.person.name"
            class="cast-member__image"
          />
          <div class="cast-member__info">
            <h3 class="cast-member__name">{{ actor.person.name }}</h3>
            <p class="cast-member__character">as {{ actor.character.name }}</p>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { tvShowsService } from '../services/api'
import LazyImage from '../components/LazyImage.vue'

const route = useRoute()
const show = ref(null)
const cast = ref([])
const isLoading = ref(true)
const hasError = ref(false)

onMounted(async () => {
  try {
    const { show: showData, cast: castData } = await tvShowsService.getShowDetails(route.params.id)
    show.value = showData
    cast.value = castData
  } catch (error) {
    hasError.value = true
    console.error('Error fetching show details:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style>
.show-details {
  padding: 2rem 0;
}

.show-details__header {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.show-details__image {
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.show-details__info {
  flex: 1;
  padding-top: 1rem;
}

.show-details__info h1 {
  color: var(--text);
  margin: 0;
  font-size: 2rem;
  opacity: 0.6;
}

.show-details__meta {
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.show-details__rating {
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  opacity: 0.6;
}

.show-details__rating .star {
  color: var(--accent);
  opacity: 1;
}

.show-details__genres {
  display: flex;
  align-items: center;
  color: var(--text);
  opacity: 0.6;
}

.show-details__schedule {
  color: var(--text);
  font-size: 0.9rem;
  margin: 0.5rem 0;
  opacity: 0.6;
}

.show-details__summary {
  line-height: 1.6;
  color: var(--text);
  opacity: 0.6;
}

/* Cast Section Styles */
.show-details__cast {
  margin-top: 2rem;
}

.show-details__cast h2 {
  color: var(--text);
  margin-bottom: 1.5rem;
  opacity: 0.6;
}

.cast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.cast-member {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.cast-member:hover {
  transform: translateY(-5px);
}

.cast-member__image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.cast-member__info {
  padding: 1rem;
}

.cast-member__name {
  color: var(--text);
  margin: 0.5rem 0 0.25rem;
  font-size: 1rem;
  opacity: 0.6;
}

.cast-member__character {
  color: var(--text);
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .show-details__header {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .show-details__image {
    width: 100%;
    height: auto;
    max-height: 450px;
  }

  .show-details__info {
    padding-top: 0;
  }
  
  .cast-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .cast-member__image {
    height: 200px;
  }
}

.back-button {
  margin-bottom: 1rem;
}
</style>
