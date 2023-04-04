import React from "react";
import styled from "styled-components";

interface PropType {
  src: string;
  size: number;
}

export default function MainImage(props: PropType) {
  return (
    <StyledDiv size={props.size}>
      <Image src={props.src} size={props.size} />
    </StyledDiv>
  );
}

const Image = styled.img<{ size: number }>`
  // width: ${(props) => props.size}%;
  /* width: 100% */
  height: ${(props) => props.size}vw;
  border-radius: 10px;
`;

const StyledDiv = styled.div<{ size: number }>`
  line-height: 0px;
  position: relative;
  text-align: center;
  /* width: 100px; // 자를 사이즈를 명시해준다. */
  max-width: 100%;
  object-fit: cover;
  height: ${(props) => props.size}vw;
  overflow: hidden;
`;
