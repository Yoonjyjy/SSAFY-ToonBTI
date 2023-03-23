import React from "react";
import { Typography } from "antd";
import styled from "styled-components";

interface PropType {
  children: React.ReactNode;
  type?: string;
}

export default function Text(props: PropType) {
  if (props.type === "keyword") {
    return <KeywordText>{props.children}</KeywordText>;
  }
  return <StyledText>{props.children}</StyledText>;
}

const KeywordText = styled(Typography.Text)`
  display: block;
`;
const StyledText = styled(Typography.Text)`
  line-height: 1rem;
`;
