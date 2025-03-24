<template>
  <div class="lazy-image" :class="{ loaded: isLoaded || !src }">
    <template v-if="src">
      <img
        ref="img"
        :alt="alt"
        @load="onLoad"
        @error="onError"
        class="lazy-image__img"
        :style="{ height }"
      />
      <div v-if="!isLoaded && !hasError" class="lazy-image__placeholder" aria-hidden="true">
        <div class="lazy-image__loading"></div>
      </div>
    </template>
    <Placeholder v-else :height="height" :alt="alt" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Placeholder from './Placeholder.vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    required: true
  },
  height: {
    type: String,
    default: 'auto'
  }
})

const img = ref(null)
const isLoaded = ref(false)
const hasError = ref(false)
const observer = ref(null)

const onLoad = () => {
  isLoaded.value = true
  hasError.value = false
}

const onError = () => {
  hasError.value = true
  isLoaded.value = false
}

const handleIntersection = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      img.value.src = props.src
      observer.value?.unobserve(img.value)
    }
  })
}

const observeImage = () => {
  if (!img.value || !props.src) return

  observer.value = new IntersectionObserver(handleIntersection, {
    rootMargin: '50px'
  })

  observer.value.observe(img.value)
}

onMounted(() => {
  if ('IntersectionObserver' in window && props.src) {
    img.value?.removeAttribute('src')
    observeImage()
  }
})

watch(() => props.src, (newSrc) => {
  isLoaded.value = false
  hasError.value = false
  if (observer.value) {
    observer.value.disconnect()
    if (newSrc) {
      observeImage()
    }
  }
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})
</script>

<style>
.lazy-image {
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  border-radius: inherit;
  width: 100%;
}

.lazy-image__img {
  width: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lazy-image.loaded .lazy-image__img {
  opacity: 1;
}

.lazy-image__placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lazy-image__loading {
  width: 30px;
  height: 30px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--secondary-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
