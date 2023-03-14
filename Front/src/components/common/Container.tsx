import React, { ReactNode } from "react";
import styled from "styled-components";

interface ContainerProps {
  type?: string, 
  children: ReactNode
}

function Container ({ type, children } : ContainerProps) {

  if (type === 'nav'){
    return (
      <>
        <NavContainerBox>
          {children}
        </NavContainerBox>
      </>
    )
  }
  return (
    <>
      <ContainerBox>
        {children}
      </ContainerBox>
    </>
)
}

Container.defaultProps = {
  children: null,
  type: null,
  bg: 'transparent',
}

const ContainerBox = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
  min-width: 360px;
`
const NavContainerBox = styled.div`
  min-width: 360px;
  width: 100%;
  height: 56px;
`
export default Container;