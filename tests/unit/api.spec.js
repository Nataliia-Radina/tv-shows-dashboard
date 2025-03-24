import { tvShowsService, api } from '@/services/api'

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn()
  }))
}))

jest.spyOn(console, 'error').mockImplementation(() => {})

describe('TV Shows API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches all shows', async () => {
    const shows = [{ id: 1, name: 'Show 1' }, { id: 2, name: 'Show 2' }]
    api.get.mockResolvedValueOnce({ data: shows })

    const result = await tvShowsService.getAllShows()

    expect(result).toEqual(shows)
    expect(api.get).toHaveBeenCalledWith('/shows')
  })

  it('searches shows by query', async () => {
    const searchResults = [
      { show: { id: 1, name: 'Show 1' } },
      { show: { id: 2, name: 'Show 2' } }
    ]
    api.get.mockResolvedValueOnce({ data: searchResults })

    const result = await tvShowsService.searchShows('test')

    expect(result).toEqual(searchResults.map(item => item.show))
    expect(api.get).toHaveBeenCalledWith('/search/shows?q=test')
  })

  it('fetches show details with cast', async () => {
    const show = { id: 1, name: 'Show 1' }
    const cast = [{ person: { name: 'Actor 1' }, character: { name: 'Character A' } }]

    api.get
      .mockResolvedValueOnce({ data: show })
      .mockResolvedValueOnce({ data: cast })

    const result = await tvShowsService.getShowDetails(1)

    expect(result).toEqual({ show, cast })
    expect(api.get).toHaveBeenCalledWith('/shows/1')
    expect(api.get).toHaveBeenCalledWith('/shows/1/cast')
  })

  it('handles error when fetching all shows', async () => {
    const error = new Error('API Error')
    api.get.mockRejectedValueOnce(error)

    await expect(tvShowsService.getAllShows()).rejects.toThrow('API Error')
    expect(api.get).toHaveBeenCalledWith('/shows')
  })

  it('handles error when searching shows', async () => {
    const error = new Error('Search failed')
    api.get.mockRejectedValueOnce(error)

    await expect(tvShowsService.searchShows('query')).rejects.toThrow('Search failed')
    expect(api.get).toHaveBeenCalledWith('/search/shows?q=query')
  })

  it('handles error when fetching show details', async () => {
    const error = new Error('Network Error')
    api.get
      .mockRejectedValueOnce(error)
      .mockRejectedValueOnce(error)

    await expect(tvShowsService.getShowDetails(123)).rejects.toThrow('Network Error')
    expect(api.get).toHaveBeenCalledWith('/shows/123')
  })
})
