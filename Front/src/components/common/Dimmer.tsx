import React from "react";
import styled from "styled-components";

interface ModalProps {
    onClick: () => void;
}

function Dimmer({ onClick } : ModalProps){
   
  return (
    <DimmerDiv onClick={onClick}></DimmerDiv>
  )
}

const DimmerDiv = styled.div`
  position: 'absolute';
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  width: '100%',
  height: '100vh',
  opacity: '60%',
  background-color: 'rgb(38, 38, 38)',
  z-index: '200',
  overflow: 'hidden'
`
export default Dimmer;
