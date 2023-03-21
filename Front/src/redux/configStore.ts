// redux store 연결 파일
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import user from './Modules/User';

const rootReducer = combineReducers({ 
    user: user, 
});
const store = configureStore({ reducer: rootReducer });

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // dispatch type 추출

export type RootState = ReturnType<typeof rootReducer>;  // state type 추출

export default store;