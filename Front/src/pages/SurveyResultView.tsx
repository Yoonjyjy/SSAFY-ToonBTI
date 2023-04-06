/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { Button, Space } from "antd";
import styled from "styled-components";
import { DoughnutChart, Layout, ProgressiveBar } from "../components/common";
import Image from "../components/common/Image";
import Text from "../components/common/Text";
import RecommendItemList from "../components/survey/RecommendItemList";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import theme from "../theme";
import {
  GetFromSpring2,
  GetFromSpring,
  Webtoon,
  MyKeyword,
  MyGenre,
} from "../gql/graphql";

type ColorType = "kakao" | "naver" | "ongoing" | "finished";

interface GenreListType {
  id: number;
  name: string;
  count: number;
}

const RATIO = {
  kakaoRatio: 1,
  naverRatio: 1,
  finishedRatio: 1,
  unfinishedRatio: 1,
};

const USER: {
  countAllUsers: number;
  topN: number;
  webtoonPk: number[];
  rankList: GenreListType[];
  genreAnalysis: GenreListType[];
} = {
  countAllUsers: 21414,
  topN: 5,
  webtoonPk: [1],
  rankList: [{ name: "", count: 4, id: 2514 }],
  genreAnalysis: [{ name: "", count: 4, id: 2514 }],
};

const RESULT: {
  getFromSpring: GetFromSpring[];
  getFromSpring2: GetFromSpring2[];
  resultNbtiWebtoon: Webtoon[];
  myKeyword: MyKeyword[];
  authorWebtoon: Webtoon[];
  keywordSimilarWebtoon: Webtoon[];
  myGenre: MyGenre[];
} = {
  getFromSpring: [
    {
      doneRatio: [43, 22],
      __typename: "GetFromSpring",
      genreRatio: [0, 31, 0, 24, 0, 0, 2, 0, 8, 0, 0],
      myType: {
        __typename: "MyType",
        userType: "LSEA",
        image: "/usertype/LSEA.jpg",
        count: null,
      },
      platformRatio: [6, 59],
      webtoonCounts: 65,
    },
  ],
  getFromSpring2: [{ __typename: "GetFromSpring2", myRank: 17, allUser: 232 }],
  keywordSimilarWebtoon: [
    {
      endFlag: 1,
      genreId: null,
      image:
        "https://dn-img-page.kakao.com/download/resource?kid=MxYbp/hyLjbtRLPx/TVBct5PxlBNKPmUDi6oP91&filename=th3",
      platform: "KAKAO",
      rate: 9.9,
      title: "며느라기",
      view: 2824000,
      webtoonId: 5729,
      __typename: "Webtoon",
    },
    {
      endFlag: 0,
      genreId: null,
      image:
        "https://dn-img-page.kakao.com/download/resource?kid=6IPnH/hzhOmXFiUj/0V6UGF1R1EbSpgqSVkost0&filename=th3",
      platform: "KAKAO",
      rate: 9.9,
      title: "사장님의 특별지시",
      view: 12002000,
      webtoonId: 4458,
      __typename: "Webtoon",
    },
  ],
  authorWebtoon: [],
  myGenre: [{ __typename: "MyGenre", genreId: 8 }],
  myKeyword: [
    { __typename: "MyKeyword", myKeywordName: Array(4), myKeywordId: Array(4) },
  ],
  resultNbtiWebtoon: [
    {
      endFlag: 1,
      genreId: 3,
      image:
        "https://image-comic.pstatic.net/webtoon/720121/thumbnail/thumbnail_IMAG21_7221302526240580196.jpg",
      likeRate: 80.59701492537314,
      platform: "NAVER",
      rate: 9.98,
      title: " 치즈인더트랩",
      view: 0,
      webtoonId: 256,
      __typename: "Webtoon",
    },
  ],
};

export default function SurveyResultView() {
  const navigate = useNavigate();

  const reader_expert_value = [
    {
      id: 1,
      title:
        (USER.rankList[0]?.name == "로맨스판타지"
          ? "로판"
          : USER.rankList[0]?.name) + " 전문가",
      color: "#99CCFF",
    },
    {
      id: 2,
      title:
        (RATIO.kakaoRatio > RATIO.naverRatio ? "카카오" : "네이버") + " 매니아",
      color:
        RATIO.kakaoRatio > RATIO.naverRatio
          ? theme.colors.kakao
          : theme.colors.green,
    },
    {
      id: 3,
      title:
        (RATIO.finishedRatio > RATIO.unfinishedRatio ? "완결작" : "연재작") +
        " 킬러",
      color: "#757575",
    },
  ];

  // useEffect(() => {
  //   console.log(result);
  // }, [result]);

  function calPercent(count: number, total: number) {
    return ((count / total) * 100).toFixed(2);
  }

  return (
    <Layout
      // type="survey"
      title="웹툰 취향 분석 테스트"
      hasPrevious
    >
      <TitleText>당신의 독자 유형은?</TitleText>
      {RESULT.getFromSpring[0].myType?.image ? (
        <Image type="userType" url={RESULT.getFromSpring[0].myType.image} />
      ) : (
        <StyledPlayer autoplay loop src={`/simple-spinner.json`}></StyledPlayer>
      )}
      <article>
        <StyledSection2>
          <Text>웹툰 취향 분석 결과는...</Text>
          <Text bold="true" size="1.7rem">
            {RESULT.getFromSpring[0].myType?.userType}
          </Text>
        </StyledSection2>
        <StyledSection>
          <Text>내가 지금까지 읽은 웹툰의 수는?</Text>
          <CallOutDiv>
            <Text size="1.5rem">
              <PointSpan>{USER.webtoonPk.length}</PointSpan>개
            </Text>
          </CallOutDiv>
          {USER.webtoonPk.length < 10 ? (
            <Text>웹툰에 더 관심을 가져보시는 건 어떨까요?</Text>
          ) : USER.webtoonPk.length < 30 ? (
            <Text>제법 많이 보셨군요!</Text>
          ) : USER.webtoonPk.length < 50 ? (
            <Text>웹툰계의 대학원생이에요.</Text>
          ) : (
            <Text>혹시 웹툰학과 교수신가요?</Text>
          )}

          {/* 읽은 권수에 따른 다른 text */}
          {/* <Text>제법 많이 보셨군요!</Text>  */}
        </StyledSection>
        <StyledSection>
          <Text>
            현재&nbsp;
            <PointSpan>{USER.countAllUsers}</PointSpan>명의 분석 독자들 중...
          </Text>
          <div style={{ width: "90%", margin: "auto" }}>
            <ProgressiveBar
              type="top"
              progress={
                100 -
                Math.round(
                  (RESULT.getFromSpring2[0].myRank! /
                    RESULT.getFromSpring2[0].allUser!) *
                    100
                )
              }
            ></ProgressiveBar>
          </div>
          <Text>
            <GradientText>
              상위{" "}
              {Math.round(
                (RESULT.getFromSpring2[0].myRank! /
                  RESULT.getFromSpring2[0].allUser!) *
                  100
              )}
              %
            </GradientText>
            에 해당해요!
          </Text>
        </StyledSection>
        <StyledSection>
          <Text size="1.3rem">나의 전문가 수치</Text>
          <RoundBoxDiv>
            {/* TODO: 전문가 수치 */}
            {reader_expert_value.map((item) => (
              <RoundUpperDiv key={item.id}>
                <RoundDiv color={item.color}>
                  <Text color="#ffffff" bold="true" type="responsive">
                    {item.title}
                  </Text>
                </RoundDiv>
              </RoundUpperDiv>
            ))}
          </RoundBoxDiv>
        </StyledSection>
        <StyledSection>
          <Text size="1.3rem">플랫폼 비율</Text>
          <div>
            <RatioTextBox space>
              <RatioText color="kakao">
                카카오페이지 {RATIO.kakaoRatio}%
              </RatioText>
              <RatioText color="naver">네이버 {RATIO.naverRatio}%</RatioText>
            </RatioTextBox>
            <ProgressiveBar
              type="platform"
              progress={RATIO.kakaoRatio}
            ></ProgressiveBar>
            <RatioTextBox>
              {RATIO.kakaoRatio > RATIO.naverRatio ? (
                <RatioText color="kakao">카카오페이지</RatioText>
              ) : (
                <RatioText color="naver">네이버</RatioText>
              )}
              <RatioText>의 웹툰을 더 많이 읽고 있어요.</RatioText>
            </RatioTextBox>
          </div>
        </StyledSection>
        <StyledSection>
          <Text size="1.3rem">완결작 비율</Text>
          <div>
            <RatioTextBox space>
              <RatioText color="finished">
                완결작 {RATIO.finishedRatio}%
              </RatioText>
              <RatioText color="ongoing">
                연재작 {RATIO.unfinishedRatio}%
              </RatioText>
            </RatioTextBox>
            <ProgressiveBar
              type="endedOrOngoin"
              progress={RATIO.finishedRatio}
            ></ProgressiveBar>
            {RATIO.finishedRatio < RATIO.unfinishedRatio ? (
              <RatioTextBox>
                <RatioText color="finished"> 완결작</RatioText>
                <RatioText>보다 더&nbsp;</RatioText>
                <RatioText color="ongoing"> 연재작</RatioText>
                <RatioText>을 더 선호해요.</RatioText>
              </RatioTextBox>
            ) : (
              <RatioTextBox>
                <RatioText color="ongoing">연재작 </RatioText>
                <RatioText>보다 더&nbsp;</RatioText>
                <RatioText color="finished"> 완결작</RatioText>
                <RatioText>을 더 선호해요.</RatioText>
              </RatioTextBox>
            )}
          </div>
        </StyledSection>
        <StyledSection>
          <Text size="1.3rem">사용자가 많이 본 장르</Text>
          <div>
            <GenreGraphSection className="genre_graph">
              <DoughnutChart
                dataList={RESULT.getFromSpring[0].genreRatio as number[]}
              />
            </GenreGraphSection>
            <section className="genre_table">
              <GenreTableTitleDiv>
                <GenreTableTitle>장르 성분표</GenreTableTitle>
              </GenreTableTitleDiv>
              <GenreSect>
                {USER.genreAnalysis?.map((item) => {
                  return (
                    <GenreDiv key={item.id}>
                      <GenreText preferred={USER.rankList.includes(item)}>
                        #{item.name}
                      </GenreText>
                      <GenreHr preferred={USER.rankList.includes(item)} />
                      <GenreText preferred={USER.rankList.includes(item)}>
                        {item.count} (
                        {calPercent(item.count, USER.webtoonPk.length)}
                        %)
                      </GenreText>
                    </GenreDiv>
                  );
                })}
              </GenreSect>
            </section>
            <RatioTextBox>
              <Text bold="true" size="1.1rem">
                주로&nbsp;
                {USER.rankList.map((item, idx) => {
                  return (
                    <PointSpan key={item.id}>
                      {item.name} {idx !== USER.rankList.length - 1 && ", "}
                    </PointSpan>
                  );
                })}{" "}
                <br />
                &nbsp;장르를 더 선호하시네요!
              </Text>
            </RatioTextBox>
          </div>
        </StyledSection>
        <StyledSection>
          <Text size="1.1rem">
            <BoldSpan color="yellow">
              {RESULT.getFromSpring[0].myType!.userType}
            </BoldSpan>
            &nbsp; 유형의 독자들이 좋아하는 작품
          </Text>
          <section style={{ marginTop: "16px" }}>
            <RecommendItemList
              text="완결작 중 추천 웹툰"
              dataList={RESULT.resultNbtiWebtoon?.filter(
                (item) => item.endFlag === 1
              )}
            ></RecommendItemList>
          </section>
          <section>
            <RecommendItemList
              text="연재작 중 추천 웹툰"
              dataList={RESULT.resultNbtiWebtoon?.filter(
                (item) => item.endFlag === 0
              )}
            ></RecommendItemList>
          </section>
        </StyledSection>
        <StyledSection>
          <Text size="1.1rem">사용자가 즐겨보는 키워드</Text>
          <StyledKeywordDiv>
            {/* {rankList.map} */}
            {/* mykeyword */}
            {RESULT.myKeyword[0].myKeywordName!.map((el) => {
              return <StyledKeyword key={el}>#{el}</StyledKeyword>;
            })}
          </StyledKeywordDiv>
        </StyledSection>
        <StyledSection>
          <RecommendItemList
            type="keyword"
            keyword={RESULT.myKeyword[0].myKeywordName![0]!}
            text="내가 선호하는 키워드의 작품"
            // text="# 키워드와 유사한 키워드의 작품"
            dataList={RESULT.keywordSimilarWebtoon}
          ></RecommendItemList>
        </StyledSection>
        {RESULT.authorWebtoon?.[0] && (
          <StyledSection>
            <Text bold="true">
              {RESULT.myGenre[0].genreName} 장르 독자들이 선호하는 대표 작가
            </Text>
            <Image
              url={RESULT.authorWebtoon[0].image as string}
              width="10rem"
              height="14rem"
              borderRadius={4}
            ></Image>
            <Text>
              <BoldSpan>{RESULT.authorWebtoon[0].authorName}</BoldSpan>
              &nbsp;작가
            </Text>
            <Text size="0.9rem">대표작 -{RESULT.authorWebtoon[0].title}</Text>
          </StyledSection>
        )}
        <StyledSection>
          <BtnContainer direction="vertical">
            <StyledButton
              onClick={() => {
                navigate("/");
              }}
            >
              독자 유형 테스트 다시하기
            </StyledButton>
          </BtnContainer>
        </StyledSection>
        <StyledSection>
          <StyleSpan>
            @SSAFY 8기 특화 3반 A302
            <br></br>
            FE: 김태원 노현정 윤지영 / BE: 권성은 김진호 전주영
          </StyleSpan>
        </StyledSection>
      </article>
    </Layout>
  );
}
const StyledSection2 = styled.section`
  display: block;
  margin: 2rem auto;
`;
const StyledSection = styled.section`
  display: block;
  margin: 5rem auto;
`;
const TitleText = styled.h1`
  margin: 0 auto 2rem auto;
  font-size: 1.5rem;
`;
const CallOutDiv = styled.div`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.yellowbg};
  min-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledButton = styled(Button)`
  width: 100%;
  height: 50px;
  border-radius: 10px;
`;
const PointSpan = styled.span`
  color: ${({ theme }) => theme.colors.orange};
`;

const RoundBoxDiv = styled.div`
  /* display: flex; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.5rem;
  width: 100%;
  justify-content: center;
  justify-items: center;
`;
const RoundUpperDiv = styled.div`
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  max-width: 200px;
  max-height: 200px;
`;
const RoundDiv = styled.div<{ color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${(props) => props.color};
  padding: 0.5rem;
  word-break: keep-all;
  margin: 0.25rem;
  max-width: 200px;
  max-height: 200px;
`;

const RatioTextBox = styled.div<{ space?: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.space ? "space-between" : "center")};
  font-size: 1rem;
`;

//TODO: color에 다른 다른 theme불러와야됑
const RatioText = styled.p<{ color?: ColorType }>`
  color: ${({ color, theme }) =>
    color === "kakao"
      ? theme.colors.kakao
      : color === "naver"
      ? theme.colors.green
      : color === "finished"
      ? theme.colors.pink
      : color === "ongoing"
      ? theme.colors.blue
      : "infinite"};
  font-weight: 700;
  display: flex;
  margin: 0.2rem;
  font-size: 0.9rem;
  line-height: 0.9rem;
`;
const GradientText = styled.span`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  display: block;
  background: linear-gradient(#72e5ec 0%, #a7ffba 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;
const GenreText = styled.p<{ preferred?: boolean }>`
  color: ${({ preferred, theme }) =>
    preferred ? theme.colors.orange : "black"};
  margin: auto 0.5rem;
`;
const GenreHr = styled.hr<{ preferred?: boolean }>`
  background: ${({ preferred, theme }) =>
    preferred ? theme.colors.orange : "black"};
  border: 1px;
  height: 1px;
  flex-grow: 1;
`;
const GenreDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const GenreSect = styled.section`
  background-color: #eeeeee;
  padding: 0.75rem;
`;
const GenreTableTitleDiv = styled.div`
  border-top: 1.5px solid black;
  border-bottom: 1.5px solid black;
  padding: 0.25rem 0 0.25rem 1rem;
`;
const GenreTableTitle = styled.h4`
  margin: 0;
  text-align: start;
`;
const GenreGraphSection = styled.section`
  display: flex;
  justify-content: center;
`;
const BoldSpan = styled.span<{ color?: string }>`
  font-weight: 700;
  color: ${({ color, theme }) => (color ? theme.colors.orange : "black")};
`;

const BtnContainer = styled(Space)`
  line-height: 3rem;
  width: 100%;
`;

const StyleSpan = styled.span`
  margin-top: 2rem;
  white-space: pre-line;
  display: block;
  color: gray;
`;

const StyledPlayer = styled(Player)`
  width: 75vw;
  max-width: 800px;
  max-height: 800px;
`;

const StyledKeywordDiv = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: center;
`;

const StyledKeyword = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 10px;
  background-color: #eeeeee;
  padding: 4px 10px;
`;
