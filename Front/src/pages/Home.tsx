import React from "react";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Layout, MainImage } from "../components/common";
import tiger from "/tiger.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout title="나의 웹툰 독자 유형 테스트">
      <MainImage src={tiger} size={100} />
      <BtnContainer direction="vertical">
        <StyledButton onClick={() => navigate("/mbti")}>
          <SpanTitle>시작하기</SpanTitle>
          <br />
          지금까지 NNN,NNN 명이 참여 했어요!
        </StyledButton>
      </BtnContainer>
    </Layout>
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
  background: ${({ theme }) => theme.colors.yellow};
  border: none;
`;
