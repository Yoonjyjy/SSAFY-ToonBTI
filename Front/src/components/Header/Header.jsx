import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";

// type HomeProps = {
//     modal: boolean;
//     setModal: (value: boolean) => void;
//     setType: (value: String) => void;
//     setUrl: (value: String) => void;
// };

// function Header ({ modal, setModal, setType, setUrl } : HomeProps){
function Header ({ modal, setModal, setType }){

  return (
    <HeaderDiv>
      <LoginButton modal={modal} setModal={setModal} setType={setType}/>
    </HeaderDiv>
  )
}

const HeaderDiv = styled.div`
    width:'100%';
    height: '200px';
    border: '1px solid black';
`

export default Header;
