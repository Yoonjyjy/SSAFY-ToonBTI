import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch } from '../../redux/configStore.js'
import { asyncLogin, userActions } from '../../redux/Modules/User'
import google_btn from '../../assets/LoginBtn/google_btn.svg'
import naver_btn from '../../assets/LoginBtn/naver_btn.svg'
import kakao_btn from '../../assets/LoginBtn/kakao_btn.svg'

interface HomeModalProps {
  type: string
  modal: boolean
  setModal?: (value: boolean) => void
}
/**
  Modal창을 만드는 모듈입니다. 
  @param(string) type : 모달의 종류
  @param(boolean) modal : 모달의 개폐 여부
*/

function Modal({ type, modal }: HomeModalProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function handleLoginClick(val: string) {
    dispatch(asyncLogin(val)).then((res) => {
      // response가 넘어올지 ?
      if (res.payload.singup) {
        navigate('/signup')
      }
      navigate('/')
    })
  }

  if (type === 'login') {
    return (
      <Wrapper modal={modal}>
        <ModalDiv onClick={(e) => e.stopPropagation()}>
          <h4>소셜 로그인</h4>
          <p>간편하게 가지고 계신 소셜 계정으로 이용하세요!</p>
          <div onClick={() => handleLoginClick('kakao')}>
            <LoginButton src={kakao_btn} />
          </div>
          <div onClick={() => handleLoginClick('naver')}>
            <LoginButton src={naver_btn} />
          </div>
          <div onClick={() => handleLoginClick('google')}>
            <LoginButton src={google_btn} />
          </div>
        </ModalDiv>
      </Wrapper>
    )
  }

  return <></>
}

const Wrapper = styled.div<{ modal: boolean }>`
  width: 100%;
  height: 100%;
  overflow: ${(props) => (props.modal ? 'hidden' : 'auto')};
`
const ModalDiv = styled.div`
  width: fit-content;
  height: fit-content;
  z-index: 300;
  position: absolute;
  right: 0;
  left: 40%;
  top: 30%;
  bottom: 0;
  background-color: white;
  border-radius: 12px;
  padding: 16px 8px;
`
const LoginButton = styled.img<{ src: string }>`
  width: 200px;
  src: ${(props) => props.src};
`

export default Modal
