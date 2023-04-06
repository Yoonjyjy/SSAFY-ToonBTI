import React from "react";
import { Divider, Space, Typography } from "antd";
import styled from "styled-components";

const { Title, Text } = Typography;

export default function MBTITypeDesc() {
  return (
    <StyledDiv>
      <TextContainer direction="vertical" size={5}>
        <StyledHeader level={4}>독자 유형은 어떻게 나뉘나요?</StyledHeader>
      </TextContainer>
      <InfoContainer direction="vertical" size={0}>
        <InfoDesContainer direction="vertical">
          <StyledHeader level={2}>L & H</StyledHeader>
          <StyledContent>
            <span>Light vs Heavy</span>
            <br />
            라이트 유저와 헤비 유저예요.
            <br />
            보는 작품 수와 유료 결제 유형으로 나누었어요.
          </StyledContent>
        </InfoDesContainer>
        <Divider />
        <InfoDesContainer direction="vertical">
          <StyledHeader level={2}>S & W</StyledHeader>
          <StyledContent>
            <span>Strong vs Weak</span>
            <br />
            자신만의 확고한 취향이 있는지 알 수 있어요.
            <br />
            작품을 고를 때 중요한 요소와
            <br />
            추천 받은 후의 반응으로 나누었어요.
          </StyledContent>
        </InfoDesContainer>
        <Divider />
        <InfoDesContainer direction="vertical">
          <StyledHeader level={2}>R & E</StyledHeader>
          <StyledContent>
            <span>Romance vs Event</span>
            <br />
            로맨스와 사건 전개 중
            <br />
            무엇에 중점을 두는지 알 수 있어요.
            <br />
            좋아하는 작품의 장르와 선택으로 나누었어요.
          </StyledContent>
        </InfoDesContainer>
        <Divider />
        <InfoDesContainer direction="vertical">
          <StyledHeader level={2}>A & T</StyledHeader>
          <StyledContent>
            <span>Alone vs Together</span>
            <br />
            작품을 감상할 때 혼자 즐기는지,
            <br />
            다른 사람과 함께 즐기는지 알 수 있어요.
            <br />
            전파 유형과 감상을 나누는 유형으로 나누었어요.
          </StyledContent>
        </InfoDesContainer>
      </InfoContainer>
    </StyledDiv>
  );
}

const InfoContainer = styled(Space)`
  line-height: 1rem;
  width: 100%;
  display: flexwrap;
  background-color: ${({ theme }) => theme.colors.yellowbg};
  padding: 30px 10px 30px 10px;
  border-radius: 10px;
`;

const InfoDesContainer = styled(Space)`
  line-height: 1rem;
  width: 100%;
  color: black;
  background-color: ${({ theme }) => theme.colors.yellowbg};
`;

const TextContainer = styled(Space)`
  line-height: 1rem;
  width: 100%;
  color: black;
  // padding: 20px 10px 0px 10px;
`;

const StyledHeader = styled(Title)`
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  margin: 0px;
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
