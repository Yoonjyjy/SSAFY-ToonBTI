import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/configStore.js";
import { asyncLogin, userActions } from "../../redux/Modules/User";

interface HomeModalProps{
    type: string;
    modal: boolean;
    setModal?: (value:boolean) => void;
}
/**
  Modal창을 만드는 모듈입니다. 
  @param(string) type : 모달의 종류
  @param(boolean) modal : 모달의 개폐 여부
*/ 

function Modal({ type, modal } : HomeModalProps){ 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleLoginClick(val : string) {
    console.log(val)
    dispatch(asyncLogin(val))
    .then(() => {
      navigate('/');
    })
    
  }

  if (type === 'login'){
    return (
      <Wrapper modal={modal}>
        <ModalDiv onClick={(e) => e.stopPropagation()}>
          <div>
            <div onClick={() => handleLoginClick('kakao')}> 
              {/* 카카오 로고 */}
              <p>카카오</p>
            </div>
          </div>
          <div>
            <div onClick={() => handleLoginClick('naver')}>
              <p>네이버</p>
            </div>
          </div>
          <div>
              <div onClick={() => handleLoginClick('google')}> 
              {/* <a href={GOOGLE_AUTH_URL}> */}
                {/* 구글 로고 */}
              <p>구글</p>
              </div>
          </div>
        </ModalDiv>
      </Wrapper>
    )
  }

  return (
    <>
    </>
  )
}


const Wrapper = styled.div<{ modal: boolean }>`  
  width: 100%;
  height: 100%;
  overflow: ${(props) => props.modal? "hidden" : "auto" }
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
`
export default Modal;