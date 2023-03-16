import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import google_btn from '../../assets/LoginBtn/google_btn.svg'
import naver_btn from '../../assets/LoginBtn/naver_btn.svg'
import kakao_btn from '../../assets/LoginBtn/kakao_btn.svg'
import { useAppDispatch } from '../../redux/configStore'
import { asyncLogin } from '../../redux/Modules/User'

/**
  OAuth2 Login 컴포넌트 
  실질적인 로그인이 이루어지는 곳은 redux/modules/user.ts asyncLogin 에서 이루어 집니다. 
*/

const base_url = 'http://localhost:8080/oauth2/authorization/'

const GET_USER_INFO = gql``

function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loading, error, data } = useQuery(GET_USER_INFO)

  function handleLoginClick(val: string) {
    dispatch(asyncLogin(val)).then((res) => {
      // response가 넘어올지 ?
      if (res.payload.singup) {
        navigate('/signup')
      }
      navigate('/')
    })
  }
  return (
    <>
      <h4>소셜 로그인</h4>
      <p>간편하게 가지고 계신 소셜 계정으로 이용하세요!</p>
      {/* <div onClick={() => handleLoginClick('kakao')}> */}
      <a href={base_url + 'kakao'}>
        <LoginButton src={kakao_btn} />
      </a>
      {/* </div> */}
      {/* <div onClick={() => handleLoginClick('naver')}> */}
      <a href={base_url + 'naver'}>
        <LoginButton src={naver_btn} />
      </a>
      {/* </div> */}
      {/* <div onClick={() => handleLoginClick('google')}> */}
      <a href={base_url + 'google'}>
        <LoginButton src={google_btn} />
      </a>
      {/* </div> */}
    </>
  )
}

const LoginButton = styled.img<{ src: string }>`
  width: 200px;
  src: ${(props) => props.src};
`

export default Login
