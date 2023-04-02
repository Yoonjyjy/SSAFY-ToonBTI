import React from "react";
import { Button, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "../components/common";
import { Player } from "@lottiefiles/react-lottie-player";
import { useQuery } from "@apollo/client";
import { COUNT_ALL_USERS } from "../api/mbti";

const { Title } = Typography;

export default function Home() {
  const navigate = useNavigate();
  const { data, error } = useQuery(COUNT_ALL_USERS);

  if (error) navigate("/404");

  return (
    <Layout type="home">
      <StyledHeader level={3}>당신의 독자 유형은?</StyledHeader>
      <StyledPlayer autoplay loop src="/home.json"></StyledPlayer>
      <BtnContainer direction="vertical">
        <StyledButton onClick={() => navigate("/mbti")}>
          <SpanTitle>시작하기</SpanTitle>
          <br />
          지금까지 {data?.countAllUsers} 명이 참여 했어요!
        </StyledButton>
      </BtnContainer>

      <StyleSpan>
        @SSAFY 8기 특화 3반 A302
        <br></br>
        FE: 김태원 노현정 윤지영 / BE: 권성은 김진호 전주영
      </StyleSpan>
    </Layout>
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
  height: 80px;
  border: none;
  background-color: ${({ theme }) => theme.colors.yellow};
  border-radius: 10px;
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
