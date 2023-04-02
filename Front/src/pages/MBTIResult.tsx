import React, { useEffect } from "react";
import { Button, Space, Row, Col, Typography } from "antd";
import styled from "styled-components";
import { Layout, MainImage } from "../components/common";
import tiger from "/tiger.jpg";
import { SwapRightOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import ShareButton from "../components/common/ShareButton";
import { useMutation } from "@apollo/client";
import { ADD_USER_RESPONSE } from "../api/mbti";

const { Title, Text } = Typography;

// FIXME: 나의 유형 desc, 잘 맞는 & 안 맞는 유형 percent, 유형에 대한 이미지 필요
// FIXME: createResult() api 에 userId 필요
export default function MBTIResult() {
  const { state: answers } = useLocation();
  const navigate = useNavigate();
  const [addUserResponse, { data, error }] = useMutation(ADD_USER_RESPONSE); // TODO: handle while loading

  useEffect(() => {
    addUserResponse({
      variables: { input: { answers } },
    });
  }, []);

  function clickHandler() {
    navigate("/survey");
  }

  function clickHomeHandler() {
    navigate("/");
  }

  function clickResultAllHandler() {
    navigate("/mbti/result/all");
  }

  if (error) navigate("/404");

  const res = data?.addUserResponse;

  return (
    <Layout title="웹툰 독자 유형 결과" hasPrevious>
      <StyledDiv>
        <StyledHeader level={3}>당신의 독자 유형은?</StyledHeader>
        <MainImage src={tiger} size={80} />
        <TextContainer direction="vertical" size={5}>
          <StyledHeader level={4}>{res?.myType?.userType}</StyledHeader>

          <StyledContent>
            유형에 대한 설명이 들어갈 자리 유형에 대한 설명이 들어갈 자리 유형에
            대한 설명이 들어갈 자리 유형에 대한 설명이 들어갈 자리 유형에 대한
            설명이 들어갈 자리
          </StyledContent>
          <br />
        </TextContainer>
      </StyledDiv>

      <Row gutter={[16, 16]}>
        {[
          {
            text: "나와 잘 맞는 유형",
            mbti: res?.bestType?.userType,
            per: 40.6,
          },
          {
            text: "나와 안 맞는 유형",
            mbti: res?.worstType?.userType,
            per: 11.0,
          },
        ].map((el) => (
          <StyledCol key={el.mbti} span={12}>
            <b>{el.text}</b>
            <MainImage src={tiger} size={40} />
            <strong>{el.mbti}</strong>
          </StyledCol>
        ))}
      </Row>

      <TextContainer direction="vertical" size={5}>
        <StyledHeader level={4}>지금까지 가장 많은 유형은?</StyledHeader>
        <Row gutter={[16, 16]}>
          {[
            { text: "1위", mbti: res?.firstType?.userType, per: 40.6 },
            { text: "2위", mbti: res?.secondType?.userType, per: 11.0 },
          ].map((el) => (
            <StyledCol key={el.mbti} span={12}>
              {el.text}
              <MainImage src={tiger} size={40} />
              <strong>
                {el.mbti} ({el.per} %)
              </strong>
            </StyledCol>
          ))}
        </Row>
        <StyledButton onClick={clickResultAllHandler} height={7}>
          나와 같은 유형은 몇 %일까요?
          <br />
          <StyledStrong>전체 유형 순위 보기</StyledStrong>
        </StyledButton>
      </TextContainer>

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
          <StyledButton onClick={clickHandler} color="yellow">
            <StyledStrong>웹툰 취향 분석하기</StyledStrong>
            <SwapRightOutlined />
          </StyledButton>
          <StyledButton onClick={clickHomeHandler}>
            독자 유형 테스트 다시하기
          </StyledButton>
        </BtnContainer>
      </StyledDiv>

      <ShareButton
        text="웹툰 독자 유형 공유하기"
        src="http://localhost:5173"
        param="mbti/result"
      />
    </Layout>
  );
}

const BtnContainer = styled(Space)`
  line-height: 3rem;
  width: 100%;
  // margin-bottom: 60px;
`;

const StyledButton = styled(Button)<{ color?: string; height?: number }>`
  width: 100%;
  height: 50px;
  height: ${(props) => (props.height ? props.height + "0px" : "50px")};
  background-color: ${(props) =>
    props.color ? ({ theme }) => theme.colors.yellow : null};
  border-color: ${(props) =>
    props.color ? ({ theme }) => theme.colors.yellow : null};
  border-radius: 10px;
`;

const StyledHeader = styled(Title)`
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  margin: 10px;
`;

const StyledContent = styled(Text)`
  text-align: center;
  line-height: 1.5rem;
  word-break: keep-all;

  span {
    font-weight: 600;
    line-height: 2rem;
  }
`;

const StyledCol = styled(Col)`
  text-align: center;
  line-height: 3rem;
  margin: 10px 0px;
`;

const TextContainer = styled(Space)`
  line-height: 1rem;
  width: 100%;
  color: black;
  padding-bottom: 0px;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledStrong = styled.strong`
  font-size: 1rem;
`;
