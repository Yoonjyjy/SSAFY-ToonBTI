import axios from 'axios';
axios.defaults.withCredentials = true;

// server url
const api = axios.create({
    baseURL: '',
})

// user api
export const UserAPI = {

  // 카카오 로그인
  kakaoLogin:(code) => api.get(`/auth/kakao/callback?code=${code}`),

  // 네이버 로그인
  naverLogin:(code) => api.get(`/auth/naver/callback?code=${code}`),

  // 구글 로그인
  googleLogin:(code) => api.get(`/auth/google/callback?code=${code}`)

}