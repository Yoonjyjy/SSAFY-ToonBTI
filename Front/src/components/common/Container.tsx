import React, { ReactNode } from "react";
import styled from "styled-components";

interface ContainerProps {
  type?: string, 
  children: ReactNode
}

function Container ({ type, children } : ContainerProps) {

  if( type === '' ){
    return (
      <>
      <div>
        {children}
      </div>
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
export default Container;