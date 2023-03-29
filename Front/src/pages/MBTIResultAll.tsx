import React from "react";
import { Button, Space, Row, Col, Typography, Divider } from "antd";
import styled from "styled-components";
import { Layout, MBTILayout } from "../components/common";
import { SwapRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ShareButton from "../components/common/ShareButton";

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
      <TextContainer direction="vertical" size={5}>
        <StyledHeader level={4}>나의 독자 유형은?</StyledHeader>
      </TextContainer>
      <Row gutter={[16, 16]}>
        {[
          { mbti: "LSEA", per: 40.6 },
          { mbti: "LWEA", per: 11.0 },
          { mbti: "HSEA", per: 9.0 },
          { mbti: "LSRA", per: 7.7 },
          { mbti: "HSET", per: 6.5 },
          { mbti: "LSET", per: 5.8 },
          { mbti: "LWET", per: 5.2 },
          { mbti: "HWEA", per: 3.9 },
          { mbti: "HWET", per: 1.9 },
          { mbti: "LWRA", per: 2.6 },
          { mbti: "HSRT", per: 1.9 },
          { mbti: "HSRA", per: 1.3 },
          { mbti: "LSRT", per: 1.3 },
          { mbti: "LWRT", per: 0 },
        ].map((el) => (
          <StyledCol key={el.mbti} span={12}>
            <MBTILayout mbti={el.mbti} per={el.per} />
          </StyledCol>
        ))}
      </Row>
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

      <TextContainer direction="vertical" size={5}>
        <StyledContent>
          잠깐!
          <br />
          지금까지 본 웹툰을 알려주시면
          <br />
          <span>나의 웹툰 취향 분석 결과를 알 수 있어요!</span>
        </StyledContent>
      </TextContainer>

      <BtnContainer direction="vertical">
        <StyledButton color="yellow" onClick={clickSurveyHandler}>
          웹툰 취향 분석하기
          <SwapRightOutlined />
        </StyledButton>
        <StyledButton onClick={clickHomeHandler}>
          독자 유형 테스트 다시하기
        </StyledButton>
        <ShareButton
          text="웹툰 독자 유형만 공유하기"
          src="http://localhost:5173"
          param="mbti/result"
        />
      </BtnContainer>
    </Layout>
  );
}

const BtnContainer = styled(Space)`
  line-height: 4rem;
  width: 100%;
  margin-bottom: 60px;
`;

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
`;

const TextContainer = styled(Space)`
  line-height: 1rem;
  width: 100%;
  color: black;
  padding: 20px 10px 0px 10px;
`;

const StyledButton = styled(Button)<{ color?: string }>`
  width: 100%;
  height: 3rem;
  background-color: ${(props) =>
    props.color ? ({ theme }) => theme.colors.yellow : null};
  border-color: ${(props) =>
    props.color ? ({ theme }) => theme.colors.yellow : null};
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
  line-height: 1.3rem;

  span {
    font-weight: 600;
    line-height: 2rem;
  }
`;
