import React from "react";
import { Button, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Layout, MainImage } from "../components/common";
import tiger from "/tiger.jpg";

const { Title } = Typography;

export default function Home() {
  const navigate = useNavigate();

  return (
    <StyledLayout title="나의 웹툰 독자 유형 테스트" type="home">
      <StyledHeader level={3}>당신의 독자 유형은?</StyledHeader>
      <MainImage src={tiger} size={100} />
      <BtnContainer direction="vertical">
        <StyledButton onClick={() => navigate("/mbti")}>
          <SpanTitle>시작하기</SpanTitle>
          <br />
          지금까지 NNN,NNN 명이 참여 했어요!
        </StyledButton>
      </BtnContainer>
    </StyledLayout>
  );
}

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
