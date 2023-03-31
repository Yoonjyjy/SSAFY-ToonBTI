import React, { useEffect } from "react";
import { Button, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "../components/common";
import { Player } from "@lottiefiles/react-lottie-player";
import { useQuery } from "@apollo/client";
import { GET_QUESTIONS } from "../api/mbti";

const { Title } = Typography;

export default function Home() {
  const navigate = useNavigate();
  const { data, error } = useQuery(GET_QUESTIONS);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  }, [data, error]);

  return (
    <StyledLayout type="home">
      <StyledHeader level={3}>당신의 독자 유형은?</StyledHeader>
      <StyledPlayer autoplay loop src="/home.json"></StyledPlayer>
      <BtnContainer direction="vertical">
        {/* //TODO: question data fetch -> 저장해... surveypage reducer 참고... */}
        <StyledButton
          onClick={() => navigate("/mbti", { state: data.getQuestions })}
        >
          <SpanTitle>시작하기</SpanTitle>
          <br />
          지금까지 NNN,NNN 명이 참여 했어요!
        </StyledButton>
      </BtnContainer>

      <StyleSpan>
        @SSAFY 8기 특화 3반 A302
        <br></br>
        FE: 김태원 노현정 윤지영 / BE: 권성은 김진호 전주영
      </StyleSpan>
    </StyledLayout>
  );
}

const StyledPlayer = styled(Player)`
  width: 80vw;
  height: 80vw;
  max-width: 800px;
  max-height: 800px;
`;

const SpanTitle = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const BtnContainer = styled(Space)`
  line-height: 4rem;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 5rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.yellow};
  border-radius: 10px;
`;

const StyledLayout = styled(Layout)`
  width: 100%;
  height: 5rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledHeader = styled(Title)`
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  margin: 10px;
`;

const StyleSpan = styled.span`
  margin-top: 2rem;
  white-space: pre-line;
  display: block;
  color: gray;
`;
