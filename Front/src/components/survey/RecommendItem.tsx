/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import styled from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";
import { Webtoon } from "../../gql/graphql";

interface ItemProps {
  type?: string;
  item: Webtoon;
}

export default function RecommendItem({ type, item }: ItemProps) {
  if (type === "keyword") {
    return (
      <StyledDiv>
        {item.image ? (
          <img src={item.image} height="150px" />
        ) : (
          <StyledPlayer
            autoplay
            loop
            src={`/simple-spinner.json`}
          ></StyledPlayer>
        )}
        {item.title!.length > 11 ? (
          <StyledText>
            <b>{item.title!.slice(0, 11) + "..."}</b>
          </StyledText>
        ) : (
          <StyledText>
            <b>{item.title}</b>
          </StyledText>
        )}
      </StyledDiv>
    );
  }
  return (
    <StyledDiv>
      {item.image ? (
        <img src={item.image} height="150px" />
      ) : (
        <StyledPlayer autoplay loop src={`/simple-spinner.json`}></StyledPlayer>
      )}

      {item.title!.length > 11 ? (
        <StyledText>
          <b>{item.title!.slice(0, 11) + "..."}</b>
        </StyledText>
      ) : (
        <StyledText>
          <b>{item.title}</b>
        </StyledText>
      )}
      <StyledTextColor>취향저격율 {item.likeRate!.toFixed(2)}%</StyledTextColor>
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
