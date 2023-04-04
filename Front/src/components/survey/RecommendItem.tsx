//FIXME:
import React from "react";
import styled from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";
import { Webtoon } from "../../gql/graphql";

interface ItemProps {
  item: RecommListItemType;
}

interface RecommListItemType extends Webtoon {
  per: number;
}

export default function RecommendItem({ item }: ItemProps) {
  return (
    <StyledDiv>
      {item.image ? (
        <img src={item.image} height="150px" />
      ) : (
        <StyledPlayer autoplay loop src={`/simple-spinner.json`}></StyledPlayer>
      )}

      <StyledText>{item.title}</StyledText>
      <StyledTextColor>취향저격율 {item.per}%</StyledTextColor>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  height: auto;
  margin: 8px;
  gap: 0px;
`;

const StyledText = styled.p`
  font-size: 0.7rem;
  line-height: 0.5rem;
  justify-content: left;
  text-align: left;
`;

const StyledTextColor = styled.p`
  font-size: 0.7rem;
  line-height: 0.5rem;
  color: ${({ theme }) => theme.colors.orange};
  text-align: left;
`;

const StyledPlayer = styled(Player)`
  width: 75vw;
  height: 40vw;
  max-width: 800px;
  max-height: 800px;
`;
