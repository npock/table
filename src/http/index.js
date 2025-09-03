import axios from 'axios'

const api = axios.create({
  baseURL: 'http://94.228.114.203:3004/api/',
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export const http = {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
}
