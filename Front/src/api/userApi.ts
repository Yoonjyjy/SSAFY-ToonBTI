import api from '.'

// user api
export default {
  // 카카오 로그인
  kakaoLogin: () => api.get(`카카오 로그인 be url`),

  // 네이버 로그인
  naverLogin: () => api.get(`네이버 로그인 be url`),

  // 구글 로그인
  googleLogin: () => api.get(`구글 로그인 be url`),

  signUp: (token: string | null, formData: any) =>
    api.post(`소셜 유저 회원가입 be url`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    }),
}
