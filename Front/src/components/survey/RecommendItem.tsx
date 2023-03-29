import React from "react";
import styled from "styled-components";

interface ItemProps {
  item: RecommListItemType;
}

export default function RecommendItem({ item }: ItemProps) {
  return (
    <StyledDiv>
      <img src={item.imgUrl} height="150px" />
      <StyledText>{item.name}</StyledText>
      <StyledTextBlue>취향저격율 {item.per}%</StyledTextBlue>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  height: auto;
  margin: 8px;
  gap: 0px;
  text-align: left;
`;

const StyledText = styled.p`
  font-size: 0.7rem;
  line-height: 0.5rem;
  justify-content: left;
`;
const StyledTextBlue = styled.p`
  font-size: 0.7rem;
  line-height: 0.5rem;
  color: #4096ff;
`;