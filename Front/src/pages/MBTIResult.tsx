import React, { useEffect } from "react";
import { Button, Space, Row, Col, Typography } from "antd";
import styled from "styled-components";
import { Layout, MainImage } from "../components/common";
import { SwapRightOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import ShareButton from "../components/common/ShareButton";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_USER_RESPONSE, COUNT_ALL_USERS, GET_ALL_TYPES } from "../api/mbti";
import { Mbti } from "../gql/graphql";
import { Player } from "@lottiefiles/react-lottie-player";

const { Title, Text } = Typography;

function percent(part: number, total: number): number {
  return Math.round((part / total) * 100);
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
    localStorage.setItem("nbtiPk", data?.addUserResponse?.myType?.nbtiId);
    localStorage.setItem("uuid", data?.addUserResponse?.uuid as string);
    localStorage.setItem("userId", data?.addUserResponse?.userId);
    navigate("/survey");
  }

  function clickHomeHandler() {
    navigate("/");
  }

  function clickResultAllHandler() {
    localStorage.setItem("nbtiPk", data?.addUserResponse?.myType?.nbtiId);
    localStorage.setItem("uuid", data?.addUserResponse?.uuid as string);
    localStorage.setItem("userId", data?.addUserResponse?.userId);
    navigate("/mbti/result/all");
  }

  return (
    <Layout title="웹툰 독자 유형 결과" hasPrevious>
      <StyledDiv>
        <StyledHeader level={3}>당신의 독자 유형은?</StyledHeader>

        {res?.myType?.image ? (
          <MainImage
            src={`${import.meta.env.VITE_IMAGE_URL}${res?.myType?.image}`}
            size={80}
          />
        ) : (
          <StyledPlayer
            autoplay
            loop
            src={`/simple-spinner.json`}
          ></StyledPlayer>
        )}

        <TextContainer direction="vertical" size={5}>
          <StyledTypeName>
            <StyledHeader level={4}>
              {res?.myType?.userType}
              <br></br>
              {res?.myType?.thumbnailTitle} {" - "}
              {res?.myType?.thumbnailCharacter}
            </StyledHeader>
          </StyledTypeName>

          <StyledList>
            {res?.myType?.description?.split("\\n").map((line: string) => {
              return <StyledLi key={line}>{line}</StyledLi>;
            })}
          </StyledList>
          <br />
        </TextContainer>
      </StyledDiv>

      <Row gutter={[16, 16]}>
        {[
          {
            text: "나와 잘 맞는 유형",
            mbti: res?.bestType?.userType,
            typeName: res?.bestType?.thumbnailCharacter,
            img: res?.bestType?.image,
          },
          {
            text: "나와 안 맞는 유형",
            mbti: res?.worstType?.userType,
            typeName: res?.worstType?.thumbnailCharacter,
            img: res?.worstType?.image,
          },
        ].map(
          (el) =>
            el.mbti && (
              <StyledCol key={el.mbti + "me"} span={12}>
                <b>{el.text}</b>

                {el.img ? (
                  <MainImage
                    src={`${import.meta.env.VITE_IMAGE_URL}${el.img}`}
                    size={40}
                  />
                ) : (
                  <StyledPlayer
                    autoplay
                    loop
                    src={`/simple-spinner.json`}
                  ></StyledPlayer>
                )}

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
              typeName: res?.firstType?.thumbnailCharacter,
              img: res?.firstType?.image,
              per: percent(first, total),
            },
            {
              text: "2위",
              mbti: res?.secondType?.userType,
              typeName: res?.secondType?.thumbnailCharacter,
              img: res?.secondType?.image,
              per: percent(second, total),
            },
          ].map(
            (el) =>
              el.mbti && (
                <StyledCol key={el.mbti + "popularity"} span={12}>
                  <b>{el.text}</b>
                  {el.img ? (
                    <MainImage
                      src={`${import.meta.env.VITE_IMAGE_URL}${el.img}`}
                      size={40}
                    />
                  ) : (
                    <StyledPlayer
                      autoplay
                      loop
                      src={`/simple-spinner.json`}
                    ></StyledPlayer>
                  )}
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
        src={`${import.meta.env.VITE_TEST_URL}`}
        param="mbti/result"
        type={res?.myType?.userType as Mbti}
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
  white-space: pre-line;
  display: block;

  span {
    font-weight: 600;
    line-height: 2rem;
  }
`;

const StyledList = styled(Text)`
  text-align: left;
  line-height: 1.5rem;
  word-break: keep-all;
  white-space: pre-line;
  display: block;
  /* gap: 50px; */
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

const StyledPlayer = styled(Player)`
  width: 75vw;
  height: 40vw;
  max-width: 800px;
  max-height: 800px;
`;

const StyledLi = styled.li`
  /* list-style-position: inside;
  text-indent: -20px; */
  padding-left: 30px;
  text-indent: -20px;
`;
