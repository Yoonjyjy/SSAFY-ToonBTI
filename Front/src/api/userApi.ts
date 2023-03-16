import axios from 'axios'
axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: 'http://localhost:8080',
})
// user api
export default {
  // 카카오 로그인
  kakaoLogin: () => api.get(``),

  // 네이버 로그인
  naverLogin: () => api.get(`/oauth2/authorization/naver`),

  // 구글 로그인
  googleLogin: () => api.get(`/oauth2/authorization/google`),

  signUp: (token: string | null, formData: any) =>
    api.post(`소셜 유저 회원가입 be url`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    }),
}
