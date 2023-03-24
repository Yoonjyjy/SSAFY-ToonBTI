import React from "react";
import { Typography } from "antd";
import styled from "styled-components";

interface PropType {
  children: React.ReactNode;
  type?: string;
  color?: string;
  size?: string;
  bold?: boolean;
}

export default function Text(props: PropType) {
  if (props.type === "desc") {
    return <DescText>{props.children}</DescText>;
  }
  if (props.type === "keyword") {
    return <KeywordText>{props.children}</KeywordText>;
  }
  return (
    <StyledText bold={props.bold} color={props.color} size={props.size}>
      {props.children}
    </StyledText>
  );
}

const KeywordText = styled(Typography.Text)`
  display: block;
`;
const StyledText = styled.p<{
  color?: string;
  size?: string;
  bold?: boolean;
}>`
  font-size: ${(props) => (props.size ? props.size : "1rem")};
  font-weight: ${(props) => (props.bold ? "700" : "500")};
  margin: 0.75rem auto;
  color: ${(props) => (props.color ? props.color : "black")};
  /* line-height: 1rem; */
  align-items: center;
`;
const DescText = styled(Typography.Text)`
  line-height: 1rem;
`;
