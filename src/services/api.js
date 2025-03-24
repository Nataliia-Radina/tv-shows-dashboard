import axios from 'axios'

const API_BASE_URL = 'https://api.tvmaze.com'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const tvShowsService = {
  async getAllShows() {
    try {
      const response = await api.get('/shows')
      return response.data
    } catch (error) {
      console.error('Error fetching shows:', error)
      throw error
    }
  },

  async searchShows(query) {
    try {
      const response = await api.get(
        `/search/shows?q=${encodeURIComponent(query)}`
      )
      return response.data.map(item => item.show)
    } catch (error) {
      console.error('Error searching shows:', error)
      throw error
    }
  },

  async getShowDetails(id) {
    try {
      const [showResponse, castResponse] = await Promise.all([
        api.get(`/shows/${id}`),
        api.get(`/shows/${id}/cast`)
      ])
      return {
        show: showResponse.data,
        cast: castResponse.data
      }
    } catch (error) {
      console.error('Error fetching show details:', error)
      throw error
    }
  }
}
