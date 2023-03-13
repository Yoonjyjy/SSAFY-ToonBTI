import React from "react";
import styled from "styled-components";

type HomeProps = {
    modal: boolean;
    setModal: (value: boolean) => void;
};

function Header ({ modal, setModal} : HomeProps){

  function handleClick(){
    setModal(true);
  }

  return (
    <HeaderDiv>
      <div onClick={handleClick}>
        <p>Login</p>
      </div>
    </HeaderDiv>
  )
}

const HeaderDiv = styled.div`
    width:'100%';
    height: '200px';
    border: '1px solid black';
`

export default Header;
