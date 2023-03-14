import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";

interface HomeProps {
    modal: boolean;
    setModal: (value: boolean) => void;
    // setType: (value: string) => void;
    // setUrl: (value: string) => void;
};

function Header ({ modal, setModal } : HomeProps){

  return (
    <HeaderDiv>
      <LogoDiv>

      </LogoDiv>
      <NavBar>

        <LoginButton modal={modal} setModal={setModal}/>
      </NavBar>
    </HeaderDiv>
  )
}

const HeaderDiv = styled.div`
width:100%;
height: 200px;
border: 1px solid black;
`
const LogoDiv = styled.div`

`
const NavBar = styled.nav`

`
export default Header;
