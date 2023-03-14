import React from "react";
import styled from "styled-components";
import { KAKAO_AUTH_URL } from "../../shared/OAuthKakao.js";
import { NAVER_AUTH_URL } from "../../shared/OAuthNaver.js";
import { GOOGLE_AUTH_URL } from "../../shared/OAuthGoogle.js";

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

  if (type === 'login'){
    return (
      <Wrapper modal={modal}>
        <ModalDiv onClick={(e) => e.stopPropagation()}>
          <div>
            <a href={KAKAO_AUTH_URL}> {/* BACKEND 카카오 로그인 url */}
              {/* 카카오 로고 */}
            </a>
          </div>
          <div>
            <a href={NAVER_AUTH_URL}> {/* BACKEND 네이버 로그인 url */}
              {/* 네이버 로고 */}
            </a>
          </div>
          <div>
              <a href={GOOGLE_AUTH_URL}> {/* BACKEND 구글 로그인 url */}
                {/* 구글 로고 */}
              </a>
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