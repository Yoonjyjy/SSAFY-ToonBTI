const VITE_APP_KAKAO_REDIRECT_URI = "http://localhost:5173/oauth2/code/kakao";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_APP_KAKAO_API_KEY}&redirect_uri=${VITE_APP_KAKAO_REDIRECT_URI}&response_type=code`;

const VITE_APP_NAVER_REDIRET_URI = "http://localhost:5173/oauth2/code/naver";
const VITE_APP_STATE = encodeURI(VITE_APP_NAVER_REDIRET_URI)
export const NAVER_AUTH_URL = `	https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.CLIENT_ID}&state=${VITE_APP_STATE}&redirect_uri=${VITE_APP_NAVER_REDIRET_URI}`