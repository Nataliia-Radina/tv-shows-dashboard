<template>
  <article class="show-card">
    <router-link
      :to="{ name: 'show-details', params: { id: show.id } }"
      class="show-card__link"
      :aria-label="'View details for ' + show.name"
    >
      <LazyImage
        :src="show.image?.medium || '/placeholder.jpg'"
        :alt="show.name + ' poster'"
        class="show-card__image"
      />
      <div class="show-card__header">
        <h3 class="show-card__title">{{ show.name }}</h3>
        <div class="show-card__rating" aria-label="Rating">
          <span aria-hidden="true" class="star">★</span>
          <span>{{ show.rating?.average || 'N/A' }}</span>
        </div>
      </div>
    </router-link>
  </article>
</template>

<script setup>
import LazyImage from './LazyImage.vue'

defineProps({
  show: {
    type: Object,
    required: true
  }
})
</script>

<style>
.show-card {
  flex: 0 0 200px;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  transition: transform 0.2s;
}

.show-card:hover {
  transform: translateY(-5px);
}

.show-card__link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.show-card__image {
  width: 100%;
  height: 270px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
  display: block;
}

.show-card__header {
  padding: 1rem;
}

.show-card__title {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text);
}

.show-card__rating {
  margin-top: 0.5rem;
  color: var(--text);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  opacity: 0.6;
}

.show-card__rating .star {
  color: var(--accent);
  opacity: 1;
}

@media (max-width: 768px) {
  .show-card {
    flex: 0 0 150px;
  }

  .show-card__image {
    height: 200px;
  }

  .show-card__header {
    padding: 0.75rem;
  }

  .show-card__title {
    font-size: 1rem;
  }
}
</style>
