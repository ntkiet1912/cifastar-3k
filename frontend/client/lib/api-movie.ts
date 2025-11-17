import axios from 'axios'

// API base URL - Bao gồm context-path từ backend
const API_BASE_URL = 'http://localhost:8080/api/theater-mgnt'

// Tạo axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => {
    console.log('📦 Raw API Response:', response.data)

    // Nếu response có cấu trúc { result: [...] }
    if (response.data && typeof response.data === 'object' && 'result' in response.data) {
      console.log('✅ Unwrapping result field')
      return {
        ...response,
        data: response.data.result
      }
    }

    // Nếu response có cấu trúc { data: [...] }
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      console.log('✅ Unwrapping data field')
      return {
        ...response,
        data: response.data.data
      }
    }

    // Trả về response.data nguyên bản
    console.log('✅ Returning raw response.data')
    return response
  },
  (error) => {
    console.error('❌ API Error:', error)
    return Promise.reject(error)
  }
)
// ==================== MOVIE APIs ====================
export async function getMovieById(id: string) {
  try {
    console.log('🔍 API Call: GET', `${API_BASE_URL}/movies/${id}`)

    // ✅ Validate ID trước khi gọi API
    if (!id || id === 'undefined' || id === 'null') {
      console.error('❌ Invalid movie ID:', id)
      return null
    }

    const response = await api.get(`/movies/${id}`)
    console.log('✅ API Response (unwrapped):', response.data)

    if (!response.data) {
      console.error('❌ Response data is null or undefined')
      return null
    }

    return response.data
  } catch (error: any) {
    console.error('❌ API Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
    })

    // ✅ Trả về null thay vì throw để tránh crash page
    return null
  }
}

// Các API functions khác
export async function getAllMovies() {
  try {
    const response = await api.get('/movies')
    return response.data
  } catch (error) {
    console.error('Error fetching movies:', error)
    throw error
  }
}

export async function getNowShowingMovies() {
  try {
    const response = await api.get('/movies/now-showing')
    return response.data
  } catch (error) {
    console.error('Error fetching now showing movies:', error)
    throw error
  }
}

export async function getComingSoonMovies() {
  try {
    const response = await api.get('/movies/coming-soon')
    return response.data
  } catch (error) {
    console.error('Error fetching coming soon movies:', error)
    throw error
  }
}

export async function searchMovies(query: string) {
  try {
    const response = await api.get('/movies/search', {
      params: { title: query }
    })
    return response.data
  } catch (error) {
    console.error('Error searching movies:', error)
    throw error
  }
}

export function mapMovieForDisplay(movie: any) {
  if (!movie) {
      console.warn('⚠️ mapMovieForDisplay: movie is null/undefined')
      return null
}

console.log('🎬 Mapping movie:', movie)
console.log('📝 Genres from API:', movie.genres)


let genreNames: string[] = []

if (movie.genres && Array.isArray(movie.genres) && movie.genres.length > 0) {
  genreNames = movie.genres.map((g: any) => g.name || g.genreName || g)
}

console.log('✅ Mapped genres:', genreNames)

return {
  id: movie.id,
  title: movie.title || 'Untitled',
  description: movie.description || '',
  poster: movie.posterUrl || '/placeholder.svg',
  rating: movie.ageRating?.code || movie.ageRating?.ratingCode || 'NR',
  duration: movie.durationMinutes || 0,
  releaseDate: movie.releaseDate || null,
  director: movie.director || 'Unknown',
  cast: movie.cast || [],
  genre: genreNames, // ✅ Dùng biến đã map
  trailerUrl: movie.trailerUrl || null,
  status: movie.status || 'COMING_SOON'
}
}

/**
 * Check if backend is reachable
 */
export const checkBackendHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/movies`, { timeout: 3000 })
    console.log('✅ Backend is reachable')
    return true
  } catch (error) {
    console.error('❌ Backend is NOT reachable')
    console.error('Please make sure:')
    console.error('1. Backend is running: mvnw spring-boot:run')
    console.error('2. Backend is on port 8080')
    console.error('3. CORS is configured')
    return false
  }
}

export default api