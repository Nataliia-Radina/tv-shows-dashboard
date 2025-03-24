<template>
  <div class="placeholder" :style="{ height }" role="img" :aria-label="alt">
    <div class="placeholder__content">
      <svg
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4 4h16v16H4V4zm2 2v12h12V6H6zm3 3a1 1 0 110 2 1 1 0 010-2zm-2 7l2-2 2 2 4-4 3 3v2H7v-1z"
          fill="currentColor"
        />
      </svg>
      <span>No Image Available</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  height: {
    type: String,
    default: 'auto'
  },
  alt: {
    type: String,
    default: 'No image available'
  }
})
</script>

<style>
.placeholder {
  background: rgba(255, 255, 255, 0.05);
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--secondary-accent);
}

.placeholder__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.7;
}

.placeholder__content span {
  font-size: 0.9rem;
}
</style>
