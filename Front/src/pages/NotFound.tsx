import React from "react";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "../components/common";
import { Player } from "@lottiefiles/react-lottie-player";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Layout hasPrevious type="home">
      <Title>페이지를 찾을 수 없어요!</Title>
      <StyledPlayer autoplay loop src="/404-error.json"></StyledPlayer>
      <BtnContainer direction="vertical">
        <StyledButton onClick={() => navigate("/", { replace: true })}>
          처음으로 돌아가기
        </StyledButton>
      </BtnContainer>
    </Layout>
  );
}

const StyledPlayer = styled(Player)`
  width: 75vw;
  height: 75vw;
  max-width: 800px;
  max-height: 800px;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 1.5rem;
`;

const BtnContainer = styled(Space)`
  line-height: 4rem;
  width: 100%;
  position: relative;
  transform: translateY(-20%);
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.colors.yellow};
`;
