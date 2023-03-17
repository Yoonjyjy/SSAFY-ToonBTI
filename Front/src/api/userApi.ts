import axios from 'axios'
axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: 'http://localhost:8080',
})
// user api
export default {
  signUp: async (token: string | null, formData: any) =>
    await api.post(`/api/user/social`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    }),
  getUser: async () =>
    await api.get('/api/user', {
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    }),
}
