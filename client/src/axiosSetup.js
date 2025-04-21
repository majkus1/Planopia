// import axios from 'axios'
// import { API_URL } from './config.js'

// axios.defaults.withCredentials = true // ważne do obsługi cookie

// // Prefetch CSRF token
// const fetchCsrfToken = async () => {
//   try {
//     const res = await axios.get(`${API_URL}/api/csrf-token`, { withCredentials: true });
//     axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrfToken;
//   } catch (err) {
//     console.error('CSRF prefetch error', err);
//   }
// };

// fetchCsrfToken();

// // Interceptor
// axios.interceptors.request.use(async config => {
//   const method = config.method?.toLowerCase();
//   const needsCsrf = ['post', 'put', 'delete', 'patch'].includes(method);

//   if (needsCsrf && !axios.defaults.headers.common['X-CSRF-Token']) {
//     try {
//       const res = await axios.get(`${API_URL}/api/csrf-token`, { withCredentials: true });
//       axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrfToken;
//     } catch (err) {
//       console.error('CSRF fetch error:', err);
//     }
//   }

//   return config;
// }, error => Promise.reject(error));
import axios from 'axios'
import { API_URL } from './config.js'

axios.defaults.withCredentials = true

// Prefetch CSRF token
const fetchCsrfToken = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/csrf-token`, { withCredentials: true })
    axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrfToken
  } catch (err) {
    console.error('CSRF prefetch error', err)
  }
}
fetchCsrfToken()

// Request interceptor – CSRF token
axios.interceptors.request.use(async config => {
  const method = config.method?.toLowerCase()
  const needsCsrf = ['post', 'put', 'delete', 'patch'].includes(method)

  if (needsCsrf && !axios.defaults.headers.common['X-CSRF-Token']) {
    try {
      const res = await axios.get(`${API_URL}/api/csrf-token`, { withCredentials: true })
      axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrfToken
    } catch (err) {
      console.error('CSRF fetch error:', err)
    }
  }

  return config
}, error => Promise.reject(error))

// Response interceptor – handle refresh token
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

axios.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config

    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => axios(originalRequest))
          .catch(error => Promise.reject(error))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await axios.post(`${API_URL}/api/users/refresh-token`, {}, { withCredentials: true })
        processQueue(null)
        return axios(originalRequest)
      } catch (refreshErr) {
        processQueue(refreshErr, null)
        return Promise.reject(refreshErr)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(err)
  }
)
