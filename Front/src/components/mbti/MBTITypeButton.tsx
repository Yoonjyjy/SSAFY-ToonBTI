import React from "react";
import { Button, Space, Typography } from "antd";
import styled from "styled-components";
import { SwapRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
export default function MBTITypeButton() {
  const navigate = useNavigate();

  function clickSurveyHandler() {
    navigate("/survey");
  }

  function clickHomeHandler() {
    navigate("/");
  }
  return (
    <StyledDiv>
      <TextContainer direction="vertical" size={5}>
        <StyledContent>
          잠깐!
          <br />
          지금까지 본 웹툰을 알려주시면
          <br />
          <b>나의 웹툰 취향 분석 결과</b>를 알 수 있어요!
        </StyledContent>
      </TextContainer>

      <BtnContainer direction="vertical">
        <StyledButton onClick={clickSurveyHandler} color="yellow">
          <StyledStrong>웹툰 취향 분석하기</StyledStrong>
          <SwapRightOutlined />
        </StyledButton>
        <StyledButton onClick={clickHomeHandler}>
          독자 유형 테스트 다시하기
        </StyledButton>
      </BtnContainer>
    </StyledDiv>
  );
}
const BtnContainer = styled(Space)`
  line-height: 3rem;
  width: 100%;
`;

const TextContainer = styled(Space)`
  line-height: 1rem;
  width: 100%;
  color: black;
  // padding: 20px 10px 0px 10px;
`;

const StyledButton = styled(Button)<{ color?: string }>`
  width: 100%;
  height: 50px;
  background-color: ${(props) =>
    props.color ? ({ theme }) => theme.colors.yellow : null};
  border-color: ${(props) =>
    props.color ? ({ theme }) => theme.colors.yellow : null};
  border-radius: 10px;
`;

const StyledContent = styled(Text)`
  text-align: center;
  // font-weight: bold;
  white-space: pre-wrap;
  line-height: 1.3rem;

  span {
    font-weight: 600;
    line-height: 2rem;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledStrong = styled.strong`
  font-size: 1rem;
`;
