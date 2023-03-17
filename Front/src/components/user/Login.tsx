import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import google_btn from '../../assets/LoginBtn/google_btn.svg'
import naver_btn from '../../assets/LoginBtn/naver_btn.svg'
import kakao_btn from '../../assets/LoginBtn/kakao_btn.svg'
import { useAppDispatch } from '../../redux/configStore'
// import { asyncLogin } from '../../redux/Modules/User'

/**
  OAuth2 Login 컴포넌트 
  실질적인 비동기 통신로그인이 이루어지는 곳은 redux/modules/user.ts 에서 이루어 집니다. 
*/

const base_url = 'http://localhost:8080/oauth2/authorization/'

// const GET_USER_INFO = gql``

function Login() {
  return (
    <>
      <h4>RecoDeli</h4>
      <h6>소셜 로그인</h6>
      <p>간편하게 소셜로그인을 하고 나에게 맞는 추천을 받아보세요!</p>
      <div>
        <a href={base_url + 'kakao'}>
          <LoginButton src={kakao_btn} />
        </a>
      </div>
      <div>
        <a href={base_url + 'naver'}>
          <LoginButton src={naver_btn} />
        </a>
      </div>
      <div>
        <a href={base_url + 'google'}>
          <LoginButton src={google_btn} />
        </a>
      </div>
    </>
  )
}

const LoginButton = styled.img<{ src: string }>`
  width: 200px;
  src: ${(props) => props.src};
`

export default Login
