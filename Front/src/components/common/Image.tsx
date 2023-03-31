import React from "react";
import styled from "styled-components";

interface PropType {
  type?: string;
  width?: string;
  height?: string;
  borderRadius?: number;
  url: string;
}

export default function Image(props: PropType) {
  return (
    <StyledImage
      height={props.height}
      width={props.width}
      url={props.url}
      borderRadius={props.borderRadius}
    ></StyledImage>
  );
}

const StyledImage = styled.div<{
  width?: string;
  height?: string;
  borderRadius?: number;
  url: string;
}>`
  height: ${(props) => (props.height ? props.height : "200px")};
  width: ${(props) => (props.width ? props.width : "200px")};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : 10)}px;
  background-color: #eeeeee;
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: cover;
  margin: 0 auto;
`;
