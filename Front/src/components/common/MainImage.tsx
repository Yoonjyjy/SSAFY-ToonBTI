import React from "react";
import styled from "styled-components";

interface PropType {
  src: string;
  size: number;
}

export default function MainImage(props: PropType) {
  return (
    <StyledDiv>
      <Image src={props.src} size={props.size} />
    </StyledDiv>
  );
}

const Image = styled.img<{ size: number }>`
  // width: ${(props) => props.size}%;
  height: ${(props) => props.size}vw;
  border-radius: 10px;
`;

const StyledDiv = styled.div`
  line-height: 0px;
`;
