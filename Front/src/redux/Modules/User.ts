// Redux User

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { gql, useQuery } from '@apollo/client'
import UserAPI from '../../api/userApi'

export const asyncLogin = createAsyncThunk(
  // type
  'userSlice/asyncLogin',
  // function
  async (type: string) => {
    let response

    if (type === 'kakao') {
      response = await UserAPI.kakaoLogin()
    } else if (type === 'naver') {
      response = await UserAPI.naverLogin()
    } else if (type === 'google') {
      response = await UserAPI.naverLogin()
    }

    if (!response) {
      throw new Error('err')
    }
    // 로그인한거라면
    localStorage.setItem('token', response.data.token)
    return response.data.token
  },
)

export const asyncSignUp = createAsyncThunk(
  // type
  'userSlice/asyncSignUp',
  // function
  async (userData: FormData) => {
    const token = localStorage.getItem('token')
    const signUpRes = await UserAPI.signUp(token, userData)
    if (!signUpRes) {
      throw new Error('err')
    }
    return signUpRes.data
  },
)
// reducer

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: null,
    is_login: false,
    is_loading: 'idle', // 'pending', 'succeeded', 'failed'
  },
  reducers: {},
  extraReducers: (builder) => {
    //async login
    builder.addCase(asyncLogin.pending, (state) => {
      state.is_loading = 'pending'
    })
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      state.is_loading = 'succeeded'
      state.user = action.payload
    })
    builder.addCase(asyncLogin.rejected, (state) => {
      state.is_loading = 'failed'
    })
    //async signup
    builder.addCase(asyncSignUp.pending, (state) => {
      state.is_loading = 'pending'
    })
    builder.addCase(asyncSignUp.fulfilled, (state, action) => {
      state.is_loading = 'succeeded'
      state.user = action.payload
    })
    builder.addCase(asyncSignUp.rejected, (state) => {
      state.is_loading = 'failed'
    })
  },
})
export const userActions = userSlice.actions
export default userSlice.reducer
