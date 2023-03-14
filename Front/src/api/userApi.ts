import api from '.'

// user api
export default {
  // 카카오 로그인
  kakaoLogin: () => api.get(`카카오 로그인 be url`),

  // 네이버 로그인
  naverLogin: () => api.get(`네이버 로그인 be url`),

  // 구글 로그인
  googleLogin: () => api.get(`구글 로그인 be url`),
}
