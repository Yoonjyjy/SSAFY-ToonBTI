// Redux User
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import UserAPI from '../../api/userApi'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    is_login: false,
    is_loading: false,
    error: false,
  },
  reducers: {},
})

export const asyncLogin = createAsyncThunk(
  // type
  'userSlice/asyncLogin',
  // function
  async (type: string) => {
    if (type === 'kakao') {
      const response = await UserAPI.kakaoLogin()
      if (!response) {
        throw new Error('err')
      }
      return response.data
    } else if (type === 'naver') {
      const response = await UserAPI.naverLogin()
      if (!response) {
        throw new Error('err')
      }
      return response.data
    } else if (type === 'google') {
      const response = await UserAPI.naverLogin()
      if (!response) {
        throw new Error('err')
      }
      return response.data
    }
  },
)

// reducer

export const userActions = userSlice.actions
export default userSlice.reducer
