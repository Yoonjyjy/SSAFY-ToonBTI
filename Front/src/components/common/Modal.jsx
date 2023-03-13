import React, { ReactNode } from "react";
import styled from "styled-components";

// interface HomeModalProps{
//     type: String;
//     // children: ReactNode;
//     modal: boolean;
//     url: String;
//     setModal?: (value:boolean) => void;
// }
/**
  Modal창 
  @param(string) type : 모달의 종류
  @param(boolean) modal : 모달의 개폐 여부
*/ 
function Modal({ type, modal }){ 

  if (type === 'login'){
    return (
      <Wrapper modal={modal}>
        <ModalDiv onClick={(e) => e.stopPropagation()}>
          <div>
            <a href="">
              {/* 카카오 로고 */}
              <p>카카오 로그인</p>
            </a>
          </div>
          <div>
            <a href="">
              {/* 네이버 로고 */}
              <p>네이버 로그인</p>
            </a>
          </div>
          <div>
              <a href="">
                {/* 구글 로고 */}
                <p>구글 로그인</p>
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


const Wrapper = styled.div`
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