import React from "react";
import { Button, Space, Row, Col, Typography, Divider } from "antd";
import styled from "styled-components";
import { Layout, MBTILayout } from "../components/common";
import { SwapRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export default function MBTIResultAll() {
  const navigate = useNavigate();

  function clickSurveyHandler() {
    navigate("/survey");
  }

  function clickHomeHandler() {
    navigate("/");
  }

  return (
    <Layout title="전체 독자 유형" hasPrevious>
      <Row gutter={[16, 16]}>
        <StyledCol span={12}>
          <MBTILayout mbti="LSEA" per={40.6} />
        </StyledCol>
        <StyledCol span={12}>
          <MBTILayout mbti="LWEA" per={11.0} />
        </StyledCol>

        <StyledCol span={12}>
          <MBTILayout mbti="HSEA" per={9.0} />
        </StyledCol>
        <StyledCol span={12}>
          <MBTILayout mbti="LSRA" per={7.7} />
        </StyledCol>

        <StyledCol span={12}>
          <MBTILayout mbti="HSET" per={6.5} />
        </StyledCol>
        <StyledCol span={12}>
          <MBTILayout mbti="LSET" per={5.8} />
        </StyledCol>

        <StyledCol span={12}>
          <MBTILayout mbti="LWET" per={5.2} />
        </StyledCol>
        <StyledCol span={12}>
          <MBTILayout mbti="HWEA" per={3.9} />
        </StyledCol>

        <StyledCol span={12}>
          <MBTILayout mbti="LWRA" per={2.6} />
        </StyledCol>
        <StyledCol span={12}>
          <MBTILayout mbti="HSRT" per={1.9} />
        </StyledCol>

        <StyledCol span={12}>
          <MBTILayout mbti="HWET" per={1.9} />
        </StyledCol>
        <StyledCol span={12}>
          <MBTILayout mbti="HSRA" per={1.3} />
        </StyledCol>

        <StyledCol span={12}>
          <MBTILayout mbti="LSRT" per={1.3} />
        </StyledCol>
        <StyledCol span={12}>
          <MBTILayout mbti="LWRT" per={0} />
        </StyledCol>
      </Row>

      <TextContainer direction="vertical" size={5}>
        <StyledHeader level={4}>독자 유형은 어떻게 나뉘나요?</StyledHeader>
      </TextContainer>
      <InfoContainer direction="vertical" size={0}>
        <InfoDesContainer direction="vertical">
          <StyledHeader level={2}>L & H</StyledHeader>
          <StyledContent strong>Light vs Heavy</StyledContent>
          <StyledContent>라이트 유저와 헤비 유저예요.</StyledContent>
          <StyledContent>
            보는 작품 수와 유료 결제 유형으로 나누었어요.
          </StyledContent>
        </InfoDesContainer>
        <Divider />
        <InfoDesContainer direction="vertical">
          <StyledHeader level={2}>S & W</StyledHeader>
          <StyledContent strong>Strong vs Weak</StyledContent>
          <StyledContent>
            자신만의 확고한 취향이 있는지 알 수 있어요.
          </StyledContent>
          <StyledContent>작품을 고를 때 중요한 요소와</StyledContent>
          <StyledContent>추천 받은 후의 반응으로 나누었어요.</StyledContent>
        </InfoDesContainer>
        <Divider />
        <InfoDesContainer direction="vertical">
          <StyledHeader level={2}>R & E</StyledHeader>
          <StyledContent strong>Romance vs Event</StyledContent>
          <StyledContent>로맨스와 사건 전개 중</StyledContent>
          <StyledContent>무엇에 중점을 두는지 알 수 있어요.</StyledContent>
          <StyledContent>
            좋아하는 작품의 장르와 선택으로 나누었어요.
          </StyledContent>
        </InfoDesContainer>
        <Divider />
        <InfoDesContainer direction="vertical">
          <StyledHeader level={2}>A & T</StyledHeader>
          <StyledContent strong>Alone vs Together</StyledContent>
          <StyledContent>작품을 감상할 때 혼자 즐기는지,</StyledContent>
          <StyledContent>다른 사람과 함께 즐기는지 알 수 있어요.</StyledContent>
          <StyledContent>
            전파 유형과 감상을 나누는 유형으로 나누었어요.
          </StyledContent>
        </InfoDesContainer>
      </InfoContainer>

      <TextContainer direction="vertical" size={5}>
        <StyledContent>잠깐!</StyledContent>
        <StyledContent>지금까지 본 웹툰을 알려주시면</StyledContent>
        <StyledContent strong>
          나의 웹툰 취향 분석 결과를 알 수 있어요!
        </StyledContent>
      </TextContainer>

      <BtnContainer direction="vertical">
        <StyledButton onClick={clickSurveyHandler}>
          웹툰 취향 분석하기
          <SwapRightOutlined />
        </StyledButton>
        <StyledButton onClick={clickHomeHandler}>
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

const InfoContainer = styled(Space)`
  line-height: 1rem;
  width: 100%;
  display: flexwrap;
  background-color: #f5f5f5;
  padding: 30px 10px 30px 10px;
  border-radius: 10px;
`;

const InfoDesContainer = styled(Space)`
  line-height: 1rem;
  width: 100%;
  color: black;
`;

const TextContainer = styled(Space)`
  line-height: 1rem;
  width: 100%;
  color: black;
  padding: 20px 10px 0px 10px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 3rem;
`;

const StyledCol = styled(Col)`
  text-align: center;
`;

const StyledHeader = styled(Title)`
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  margin: 0px;
  // height: 3rem;
`;

const StyledContent = styled(Text)`
  text-align: center;
  // font-weight: bold;
  white-space: pre-wrap;
  line-height: 1rem;
`;
