import React, { useEffect } from "react";
import { Button, Space, Row, Col, Typography } from "antd";
import styled from "styled-components";
import { Layout, MainImage } from "../components/common";
import tiger from "/tiger.jpg";
import { SwapRightOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import ShareButton from "../components/common/ShareButton";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_USER_RESPONSE, COUNT_ALL_USERS, GET_ALL_TYPES } from "../api/mbti";
import { Mbti } from "../gql/graphql";

const { Title, Text } = Typography;

// FIXME: 나의 유형 desc, 잘 맞는 & 안 맞는 유형 percent, 유형에 대한 이미지 필요
// FIXME: createResult() api 에 userId 필요

function percent(part: number, total: number): number {
  return Math.round((part / total) * 100);
}

function getTypeName(type: Mbti): string {
  switch (type) {
    case "LSRA":
      return "이태원 클라스 - 조이서";
    case "LSRT":
      return "유미의 세포들 - 응큼이";
    case "LSEA":
      return "신과 함께 - 변호사";
    case "LSET":
      return "천리마마트 - 문석구";
    case "LWRA":
      return "연애 혁명 - 왕자림";
    case "LWRT":
      return "연애 혁명 - 공주영";
    case "LWEA":
      return "신과 함께 - 김자홍";
    case "LWET":
      return "미생 - 과장님";
    case "HSRA":
      return "나 혼자만 레벨업 - 성진우";
    case "HSRT":
      return "유미의 세포들 - 사랑세포";
    case "HSEA":
      return "하이브 - 개장수";
    case "HSET":
      return "프리드로우 - 동까";
    case "HWRA":
      return "치즈인더트랩 - 백인호";
    case "HWRT":
      return "패션왕 - 우기명";
    case "HWEA":
      return "노블레스 - 라이제르";
    case "HWET":
      return "이태원 클라스 - 박새로이";
    default:
      return "";
  }
}

export default function MBTIResult() {
  const { state: answers } = useLocation();
  const navigate = useNavigate();
  const [addUserResponse, { data, error }] = useMutation(ADD_USER_RESPONSE); // TODO: handle while loading
  const { data: totalData, error: totalErr } = useQuery(COUNT_ALL_USERS); // TODO: handle while loading
  const { data: allTypesData, error: allTypesErr } = useQuery(GET_ALL_TYPES); // TODO: handle while loading

  const total = totalData?.countAllUsers;
  const sortedAllTypes = allTypesData?.getAllTypes
    ? [...allTypesData.getAllTypes].sort((a, b) => b?.count - a?.count)
    : [];

  const res = data?.addUserResponse;

  const first = sortedAllTypes?.[0]?.count;
  const second = sortedAllTypes?.[1]?.count;

  if (error || totalErr || allTypesErr) navigate("/404");

  useEffect(() => {
    addUserResponse({
      variables: { input: { answers } },
    });
  }, []);

  function clickHandler() {
    navigate("/survey", {
      state: { nbtiPk: data?.addUserResponse?.myType?.nbtiId },
    });
  }

  function clickHomeHandler() {
    navigate("/");
  }

  function clickResultAllHandler() {
    navigate("/mbti/result/all");
  }

  return (
    <Layout title="웹툰 독자 유형 결과" hasPrevious>
      <StyledDiv>
        <StyledHeader level={3}>당신의 독자 유형은?</StyledHeader>
        <MainImage
          src={
            res?.myType?.image
              ? `${import.meta.env.VITE_IMAGE_URL}${res?.myType?.image}`
              : tiger
          }
          size={80}
        />
        <TextContainer direction="vertical" size={5}>
          <StyledTypeName>
            <StyledHeader level={4}>
              {res?.myType?.userType}
              <br></br>
              {getTypeName(res?.myType?.userType as Mbti)}
            </StyledHeader>
          </StyledTypeName>

          <StyledContent>{res?.myType?.description}</StyledContent>
          <br />
        </TextContainer>
      </StyledDiv>

      <Row gutter={[16, 16]}>
        {[
          {
            text: "나와 잘 맞는 유형",
            mbti: res?.bestType?.userType,
            typeName: getTypeName(res?.bestType?.userType as Mbti),
            img: res?.bestType?.image,
          },
          {
            text: "나와 안 맞는 유형",
            mbti: res?.worstType?.userType,
            typeName: getTypeName(res?.worstType?.userType as Mbti),
            img: res?.worstType?.image,
          },
        ].map(
          (el) =>
            el.mbti && (
              <StyledCol key={el.mbti + "me"} span={12}>
                <b>{el.text}</b>
                <MainImage
                  src={
                    el.img
                      ? `${import.meta.env.VITE_IMAGE_URL}${el.img}`
                      : tiger
                  }
                  size={40}
                />
                <StyledTypeName>
                  <StyledStrong>{el.mbti}</StyledStrong>
                  {el.typeName}
                </StyledTypeName>
              </StyledCol>
            )
        )}
      </Row>

      <TextContainer direction="vertical" size={5}>
        <StyledHeader level={4}>지금까지 가장 많은 유형은?</StyledHeader>
        <Row gutter={[16, 16]}>
          {[
            {
              text: "1위",
              mbti: res?.firstType?.userType,
              typeName: getTypeName(res?.firstType?.userType as Mbti),
              img: res?.firstType?.image,
              per: percent(first, total),
            },
            {
              text: "2위",
              mbti: res?.secondType?.userType,
              typeName: getTypeName(res?.secondType?.userType as Mbti),
              img: res?.secondType?.image,
              per: percent(second, total),
            },
          ].map(
            (el) =>
              el.mbti && (
                <StyledCol key={el.mbti + "popularity"} span={12}>
                  <b>{el.text}</b>
                  <MainImage
                    src={
                      el.img
                        ? `${import.meta.env.VITE_IMAGE_URL}${el.img}`
                        : tiger
                    }
                    size={40}
                  />
                  <StyledTypeName>
                    <StyledStrong>
                      {el.mbti} ({el.per} %)
                    </StyledStrong>
                    {el.typeName}
                  </StyledTypeName>
                </StyledCol>
              )
          )}
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
  line-height: 2rem;
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

const StyledTypeName = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 2rem;
  margin: 10px 0px;
`;

const StyledStrong = styled.strong`
  font-size: 1rem;
`;
