import axios from 'axios'
import { API_URL } from './config'

let csrfFetched = false

axios.defaults.withCredentials = true // ← WAŻNE

// Prefetch CSRF przy starcie
axios.get(`${API_URL}/api/csrf-token`, { withCredentials: true })
  .then(res => {
    axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrfToken
    csrfFetched = true
  })
  .catch(err => console.error('CSRF prefetch error', err))

// Interceptor
axios.interceptors.request.use(async config => {
  const method = config.method?.toLowerCase()
  const needsCsrf = ['post', 'put', 'delete', 'patch'].includes(method)

  if (needsCsrf && !csrfFetched) {
    try {
      const res = await axios.get(`${API_URL}/api/csrf-token`, { withCredentials: true })
      axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrfToken
      csrfFetched = true
    } catch (err) {
      console.error('CSRF fetch error:', err)
    }
  }

  return config
}, error => Promise.reject(error))
