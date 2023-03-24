import React from "react";
import { Button, Space } from "antd";
import styled from "styled-components";
import { Layout, MainImage } from "../components/common";
import tiger from "/tiger.jpg";
import { SwapRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function MBTIResult() {
  const navigate = useNavigate();

  function clickHandler() {
    navigate("/survey");
  }

  function clickResultAllHandler() {
    navigate("/mbti/result/all");
  }
  return (
    <Layout title="당신의 독자 유형은?" hasPrevious>
      <MainImage src={tiger} size={75} />
      <BtnContainer direction="vertical">
        <StyledButton onClick={clickHandler}>
          웹툰 취향 분석하기
          <SwapRightOutlined />
        </StyledButton>
        <StyledButton onClick={clickResultAllHandler}>
          독자 유형 전체 보기
        </StyledButton>
        <StyledButton onClick={clickHandler}>
          독자 유형 테스트 다시하기
        </StyledButton>
      </BtnContainer>
    </Layout>
  );
}

const BtnContainer = styled(Space)`
  line-height: 4rem;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 3rem;
`;
