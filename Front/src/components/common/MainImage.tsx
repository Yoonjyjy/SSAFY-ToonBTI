import React from "react";
import styled from "styled-components";

interface PropType {
  src: string;
  size: number;
}

export default function MainImage(props: PropType) {
  return (
    <div>
      <Image src={props.src} size={props.size} />
    </div>
  );
}

const Image = styled.img<{ size: number }>`
  // width: ${(props) => props.size}%;
  height: ${(props) => props.size}vw;
  border-radius: 10px;
`;
