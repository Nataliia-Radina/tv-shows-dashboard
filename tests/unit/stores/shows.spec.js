import { setActivePinia, createPinia } from 'pinia'
import { useShowsStore } from '@/stores/shows'
import { tvShowsService } from '@/services/api'

jest.mock('@/services/api', () => ({
  tvShowsService: {
    getAllShows: jest.fn(),
    searchShows: jest.fn()
  }
}))

describe('shows store', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useShowsStore()
    jest.clearAllMocks()
  })

  describe('fetchShows', () => {
    it('fetches and stores shows', async () => {
      const mockShows = [
        { id: 1, name: 'Show 1', genres: ['Drama', 'Action'], rating: { average: 8.5 } },
        { id: 2, name: 'Show 2', genres: ['Drama'], rating: { average: 9.0 } }
      ]
      tvShowsService.getAllShows.mockResolvedValueOnce(mockShows)

      await store.fetchShows()

      expect(store.shows).toEqual(mockShows)
      expect(store.error).toBeNull()
    })

    it('extracts and sorts unique genres', async () => {
      const mockShows = [
        { id: 1, name: 'Show 1', genres: ['Drama', 'Action'] },
        { id: 2, name: 'Show 2', genres: ['Drama'] }
      ]
      tvShowsService.getAllShows.mockResolvedValueOnce(mockShows)

      await store.fetchShows()

      expect(store.genres).toEqual(['Action', 'Drama'])
    })

    it('handles shows with no genres', async () => {
      const mockShows = [
        { id: 1, name: 'Show 1' },
        { id: 2, name: 'Show 2', genres: ['Drama'] }
      ]
      tvShowsService.getAllShows.mockResolvedValueOnce(mockShows)

      await store.fetchShows()

      expect(store.genres).toEqual(['Drama'])
      expect(store.showsByGenre).toEqual({ Drama: [mockShows[1]] })
    })

    it('handles error when fetching shows', async () => {
      const error = new Error('API Error')
      tvShowsService.getAllShows.mockRejectedValueOnce(error)

      await store.fetchShows()

      expect(store.error).toBe(error.message)
      expect(store.shows).toEqual([])
      expect(store.genres).toEqual([])
    })
  })

  describe('searchShows', () => {
    it('searches and stores results', async () => {
      const mockResults = [
        { id: 1, name: 'Show 1' },
        { id: 2, name: 'Show 2' }
      ]
      tvShowsService.searchShows.mockResolvedValueOnce(mockResults)

      await store.searchShows('test')

      expect(store.searchResults).toEqual(mockResults)
      expect(store.error).toBeNull()
    })

    it('clears results when query is empty', async () => {
      store.searchResults = [{ id: 1, name: 'Show 1' }]

      await store.searchShows('')

      expect(store.searchResults).toEqual([])
      expect(tvShowsService.searchShows).not.toHaveBeenCalled()
    })

    it('preserves empty results from valid search', async () => {
      tvShowsService.searchShows.mockResolvedValueOnce([])

      await store.searchShows('nonexistent')

      expect(store.searchResults).toEqual([])
      expect(store.error).toBeNull()
    })

    it('handles error when searching shows', async () => {
      const error = new Error('Search Error')
      tvShowsService.searchShows.mockRejectedValueOnce(error)

      await store.searchShows('test')

      expect(store.error).toBe(error.message)
      expect(store.searchResults).toEqual([])
    })
  })

  describe('showsByGenre', () => {
    it('groups and sorts shows by genre and rating', () => {
      store.shows = [
        { id: 1, name: 'Show 1', genres: ['Drama'], rating: { average: 8.5 } },
        { id: 2, name: 'Show 2', genres: ['Drama'], rating: { average: 9.0 } },
        { id: 3, name: 'Show 3', genres: ['Action'], rating: { average: 7.5 } }
      ]

      const result = store.showsByGenre
      expect(result.Drama[0].rating.average).toBe(9.0)
      expect(result.Drama[1].rating.average).toBe(8.5)
      expect(result.Action[0].rating.average).toBe(7.5)
    })

    it('handles shows with missing ratings', () => {
      store.shows = [
        { id: 1, name: 'Show 1', genres: ['Drama'], rating: { average: 8.5 } },
        { id: 2, name: 'Show 2', genres: ['Drama'] },
        { id: 3, name: 'Show 3', genres: ['Drama'], rating: { average: null } }
      ]

      const result = store.showsByGenre
      expect(result.Drama[0].rating?.average).toBe(8.5)
      expect(result.Drama).toHaveLength(3)
    })

    it('handles empty shows array', () => {
      store.shows = []
      expect(store.showsByGenre).toEqual({})
    })
  })
})
