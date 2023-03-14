import axios from 'axios'
axios.defaults.withCredentials = true

// server url
const api = axios.create({
  baseURL: '',
})

export default api
