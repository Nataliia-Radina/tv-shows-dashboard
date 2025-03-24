import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { tvShowsService } from '../services/api'

export const useShowsStore = defineStore('shows', () => {
  const shows = ref([])
  const searchResults = ref([])
  const error = ref(null)
  const genres = ref([])

  const showsByGenre = computed(() => {
    const grouped = {}
    shows.value.forEach(show => {
      if (!show.genres) return
      show.genres.forEach(genre => {
        if (!grouped[genre]) {
          grouped[genre] = []
        }
        grouped[genre].push(show)
      })
    })

    Object.keys(grouped).forEach(genre => {
      grouped[genre].sort((a, b) => {
        const ratingA = a.rating?.average || 0
        const ratingB = b.rating?.average || 0
        return ratingB - ratingA
      })
    })
    return grouped
  })

  async function fetchShows() {
    try {
      error.value = null
      const data = await tvShowsService.getAllShows()
      shows.value = data
      const uniqueGenres = new Set()
      data.forEach(show => {
        if (show.genres) {
          show.genres.forEach(genre => uniqueGenres.add(genre))
        }
      })
      genres.value = Array.from(uniqueGenres).sort()
    } catch (e) {
      error.value = e.message
      shows.value = []
      genres.value = []
    }
  }

  async function searchShows(query) {
    if (!query) {
      searchResults.value = []
      return
    }

    try {
      error.value = null
      const data = await tvShowsService.searchShows(query)
      searchResults.value = data
    } catch (e) {
      error.value = e.message
      searchResults.value = []
    }
  }

  return {
    shows,
    searchResults,
    error,
    genres,
    showsByGenre,
    fetchShows,
    searchShows
  }
})
