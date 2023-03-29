import React from "react";
import { Typography } from "antd";
import styled from "styled-components";

interface PropType {
  children: React.ReactNode;
  type?: string;
  color?: string;
  size?: string;
  bold?: string;
}

export default function Text(props: PropType) {
  if (props.type === "desc") {
    return <DescText>{props.children}</DescText>;
  }
  if (props.type === "keyword") {
    return <KeywordText bold={props.bold}>{props.children}</KeywordText>;
  }
  if (props.type === "responsive") {
    return (
      <ResponsiveText color={props.color} bold={props.bold}>
        {props.children}
      </ResponsiveText>
    );
  }
  return (
    <StyledText bold={props.bold} color={props.color} size={props.size}>
      {props.children}
    </StyledText>
  );
}
const ResponsiveText = styled.p<{ bold?: string; color?: string }>`
  margin: 0;
  display: flex;
  word-wrap: break-word;
  font-size: calc(1vw + 1vh + 1vmin);
  font-weight: ${(props) => (props.bold ? "700" : "500")};
  color: ${(props) => (props.color ? props.color : "black")};
`;
const KeywordText = styled(Typography.Text)<{ bold?: string }>`
  display: flex;
  margin: 0.25rem;
  font-weight: ${(props) => (props.bold ? "600" : "500")};
`;
const StyledText = styled.p<{
  color?: string;
  size?: string;
  bold?: string;
}>`
  font-size: ${(props) => (props.size ? props.size : "1rem")};
  font-weight: ${(props) => (props.bold ? "700" : "500")};
  margin: 0.75rem auto;
  color: ${(props) => (props.color ? props.color : "black")};
  /* line-height: 1rem; */
  align-items: center;
  word-wrap: break-word;
`;
const DescText = styled(Typography.Text)`
  line-height: 1rem;
  word-wrap: break-word;
`;
