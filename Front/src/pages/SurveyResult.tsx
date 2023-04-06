import React, { useEffect, useState } from "react";
import { Button, Space } from "antd";
import styled from "styled-components";
import {
  DoughnutChart,
  Layout,
  MainImage,
  ProgressiveBar,
} from "../components/common";
import Image from "../components/common/Image";
import Text from "../components/common/Text";
import RecommendItemList from "../components/survey/RecommendItemList";
import ShareButton from "../components/common/ShareButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  SAVE_WEBTOON,
  GET_SURVEY_RESULT_1,
  GET_SURVEY_RESULT_2,
  SAVE_RESULT_JSON_FILE,
} from "../api/survey";
import { django } from "../api";
import { Player } from "@lottiefiles/react-lottie-player";
import { COUNT_ALL_USERS } from "../api/mbti";
import theme from "../theme";

type ColorType = "kakao" | "naver" | "ongoing" | "finished";

const colorPalette = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "#1ec997",
  "rgb(75, 192, 192)",
  "rgb(54, 162, 235)",
  "rgb(153, 102, 255)",
  "rgb(237, 204, 255)",
  "rgb(248, 202, 255)",
  "rgb(255, 204, 207)",
];

const GENRE = [
  "판타지",
  "드라마",
  "로맨스",
  "로맨스판타지",
  "현대판타지",
  "액션/무협",
  "소년/감성",
  "일상/개그",
  "공포/추리",
  "스포츠",
];

interface GenreListType {
  id: number;
  name: string;
  count: number;
}

export interface RecomWebtoonType {
  endFlag: number;
  genreId: number;
  image: string;
  likeRate: number;
  platform: string;
  rate: number;
  title: string;
  view: number;
  webtoonId: number;
}

const topN = 5;

export default function AnalysisResult() {
  const userPk = Number(localStorage.getItem("userId"));
  const uuid = localStorage.getItem("uuid");
  const nbtiPk = Number(localStorage.getItem("nbtiPk"));
  const navigate = useNavigate();
  const { state: webtoonPk } = useLocation();

  const [result, setResult] = useState<any>(); // TODO: type 지정
  const [kakaoRatio, setKaKaoRatio] = useState<number>(0);
  const [naverRatio, setNaverRatio] = useState<number>(0);
  const [finishedRatio, setFinishedRatio] = useState<number>(0);
  const [unfinishedRatio, setUnfinishedRatio] = useState<number>(0);
  const [genreAnalysis, setGenreAnalysis] = useState<GenreListType[]>([]);
  const [rankList, setRankList] = useState<GenreListType[]>([]);

  // 비율 계산
  function calRatio(c: string, a: number, b: number): void {
    const ratio = Math.round((a / (a + b)) * 10000) / 100;
    if (c === "kakao") {
      setKaKaoRatio(ratio);
    }
    if (c === "naver") {
      setNaverRatio(ratio);
    }
    if (c === "finished") {
      setFinishedRatio(ratio);
    }
    if (c === "unfinished") {
      setUnfinishedRatio(ratio);
    }
  }

  // 전체 유저 cnt 호출
  const { data: userCount, error } = useQuery(COUNT_ALL_USERS);
  if (error) {
    console.log(error);
  }

  const [saveWebtoonDB, { loading: saveWebtoonLoading }] = useMutation(
    SAVE_WEBTOON,
    {
      variables: {
        webtoonPk: webtoonPk,
        userPk: userPk,
      },
      client: django,
    }
  );

  const [fetchTestResult2, { loading: fetchTestResult2Loading }] = useLazyQuery(
    GET_SURVEY_RESULT_2,
    {
      client: django,
      onCompleted(data) {
        setResult({ ...result, ...data });
        if (genreAnalysis.length < 10) {
          const temp: GenreListType[] = [];
          // const tempAll: GenreListType[] = [];
          for (let i = 1; i < 11; i++) {
            // tempAll.push({
            //   id: i,
            //   name: GENRE[i - 1],
            //   count: result?.getFromSpring[0].genreRatio[i],
            // });
            if (result?.getFromSpring[0].genreRatio[i] !== 0) {
              temp.push({
                id: i,
                name: GENRE[i - 1],
                count: result?.getFromSpring[0].genreRatio[i],
              });
            }
          }
          // setGenreAnalysis(tempAll);
          setGenreAnalysis(temp);
          setRankList(
            temp
              .slice()
              .sort((a, b) => b.count - a.count)
              .splice(0, 3)
          );
        }
      },
    }
  );

  const [fetchTestResult1, { loading: fetchTestResult1Loading }] = useLazyQuery(
    GET_SURVEY_RESULT_1,
    {
      variables: {
        nbtiPk: nbtiPk,
        userPk: userPk,
        webtoonPk: webtoonPk,
      },
      client: django,
      onCompleted(data) {
        setResult(data);
        if (
          data?.getFromSpring?.[0]?.platformRatio &&
          data?.getFromSpring?.[0]?.doneRatio
        ) {
          calRatio(
            "kakao",
            data?.getFromSpring[0].platformRatio[0] as number,
            data?.getFromSpring[0].platformRatio[1] as number
          );
          calRatio(
            "naver",
            data?.getFromSpring[0].platformRatio[1] as number,
            data?.getFromSpring[0].platformRatio[0] as number
          );
          calRatio(
            "finished",
            data?.getFromSpring[0].doneRatio[0] as number,
            data?.getFromSpring[0].doneRatio[1] as number
          );
          calRatio(
            "unfinished",
            data?.getFromSpring[0].doneRatio[1] as number,
            data?.getFromSpring[0].doneRatio[0] as number
          );
        }

        const keywordsList = data?.myKeyword?.[0]?.myKeywordId;
        const genrePk = data?.myGenre?.[0]?.genreId;
        // console.log(keywordsList, genrePk, webtoonPk);
        fetchTestResult2({
          variables: {
            keywords: keywordsList as number[],
            topN: topN, //고정 값
            genrePk: genrePk as number,
            webtoonPk: webtoonPk,
          },
        });
      },
    }
  );

  const reader_expert_value = [
    {
      id: 1,
      title:
        (rankList[0]?.name == "로맨스판타지" ? "로판" : rankList[0]?.name) +
        " 전문가",
      color: "#99CCFF",
    },
    {
      id: 2,
      title: (kakaoRatio > naverRatio ? "카카오" : "네이버") + " 매니아",
      color: kakaoRatio > naverRatio ? theme.colors.kakao : theme.colors.green,
    },
    {
      id: 3,
      title: (finishedRatio > unfinishedRatio ? "완결작" : "연재작") + " 킬러",
      color: "#757575",
    },
  ];

  //data fetch
  useEffect(() => {
    saveWebtoonDB({
      variables: {
        webtoonPk: webtoonPk,
        userPk: userPk,
      },
    });
    fetchTestResult1({
      variables: {
        nbtiPk: nbtiPk,
        userPk: userPk,
        webtoonPk: webtoonPk,
      },
    });
  }, []);

  // useEffect(() => {
  //   console.log(result);
  // }, [result]);

  const loading =
    saveWebtoonLoading || fetchTestResult1Loading || fetchTestResult2Loading;

  function calPercent(count: number, total: number) {
    return ((count / total) * 100).toFixed(2);
  }

  const [saveResultJSONFile] = useMutation(SAVE_RESULT_JSON_FILE, {
    // onCompleted(data) {
    //   console.log("fin data", data);
    // },
  });

  function shareHandler() {
    const root = {
      RATIO: {
        kakaoRatio: kakaoRatio,
        naverRatio: naverRatio,
        finishedRatio: finishedRatio,
        unfinishedRatio: unfinishedRatio,
      },
      USER: {
        countAllUsers: userCount?.countAllUsers,
        topN,
        webtoonPk,
        rankList,
        genreAnalysis,
      },
      RESULT: {
        getFromSpring: result.getFromSpring,
        getFromSpring2: result.getFromSpring2,
        resultNbtiWebtoon: result.resultNbtiWebtoon,
        myKeyword: result.myKeyword,
        authorWebtoon: result.authorWebtoon,
        keywordSimilarWebtoon: result.keywordSimilarWebtoon,
        myGenre: result.myGenre,
      },
    };

    saveResultJSONFile({
      variables: { data: JSON.stringify(root), uuid: uuid },
    });
    // console.log(`/survey/result/${uuid}`);
  }

  if (loading) {
    return (
      <Layout hasPrevious type="home">
        <StyledText>
          당신의 TooNBTI를 분석중이에요.
          <br /> 잠시만 기다려주세요.
        </StyledText>
        <StyledPlayer autoplay loop src={`/simple-spinner.json`}></StyledPlayer>
      </Layout>
    );
  }

  console.log("chart? ", result?.getFromSpring?.[0].genreRatio);

  return (
    <Layout
      // type="survey"
      title="웹툰 취향 분석 테스트"
      hasPrevious
    >
      <TitleText>당신의 독자 유형은?</TitleText>
      {result?.getFromSpring?.[0].myType?.image ? (
        // <Image type="userType" url={result?.getFromSpring[0].myType.image} />
        <MainImage
          src={
            "https://j8a302.p.ssafy.io/images/" +
            result?.getFromSpring[0].myType.image
          }
          size={80}
        />
      ) : (
        <StyledPlayer autoplay loop src={`/simple-spinner.json`}></StyledPlayer>
      )}
      <article>
        <StyledSection2>
          <Text>웹툰 취향 분석 결과는...</Text>
          <Text bold="true" size="1rem">
            {result?.getFromSpring[0]?.myType?.thumbnailTitle +
              " - " +
              result?.getFromSpring[0]?.myType?.thumbnailCharacter}
          </Text>
          <Text bold="true" size="1.7rem">
            {result?.getFromSpring[0].myType.userType}
          </Text>
        </StyledSection2>
        <StyledSection>
          <Text>내가 지금까지 읽은 웹툰의 수는?</Text>
          <CallOutDiv>
            <Text size="1.5rem">
              <PointSpan>{webtoonPk.length}</PointSpan>개
            </Text>
          </CallOutDiv>
          {webtoonPk.length < 10 ? (
            <Text>재밌는 웹툰들을 더 추천해드릴게요!</Text>
          ) : webtoonPk.length < 30 ? (
            <Text>제법 많이 보셨군요!</Text>
          ) : webtoonPk.length < 50 ? (
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
            <PointSpan>{userCount?.countAllUsers}</PointSpan>명의 분석 독자들
            중...
          </Text>
          <div style={{ width: "90%", margin: "auto" }}>
            <ProgressiveBar
              type="top"
              progress={
                100 -
                Math.round(
                  (result?.getFromSpring2?.[0].myRank /
                    result?.getFromSpring2?.[0].allUser) *
                    100
                )
              }
            ></ProgressiveBar>
          </div>
          <Text>
            <GradientText>
              상위{" "}
              {Math.round(
                (result?.getFromSpring2?.[0].myRank /
                  result?.getFromSpring2?.[0].allUser) *
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
              <RatioText color="kakao">카카오페이지 {kakaoRatio}%</RatioText>
              <RatioText color="naver">네이버 {naverRatio}%</RatioText>
            </RatioTextBox>
            <ProgressiveBar
              type="platform"
              progress={kakaoRatio}
            ></ProgressiveBar>
            <RatioTextBox>
              {kakaoRatio == naverRatio ? (
                <RatioText>두 곳 모두 재밌게 즐기고 계시네요.</RatioText>
              ) : kakaoRatio > naverRatio ? (
                <RatioText color="kakao">카카오페이지</RatioText>
              ) : (
                <RatioText color="naver">네이버</RatioText>
              )}
              {kakaoRatio != naverRatio ? (
                <RatioText>의 웹툰을 더 많이 읽고 있어요.</RatioText>
              ) : null}
            </RatioTextBox>
          </div>
        </StyledSection>
        <StyledSection>
          <Text size="1.3rem">완결작 비율</Text>
          <div>
            <RatioTextBox space>
              <RatioText color="finished">완결작 {finishedRatio}%</RatioText>
              <RatioText color="ongoing">연재작 {unfinishedRatio}%</RatioText>
            </RatioTextBox>
            <ProgressiveBar
              type="endedOrOngoin"
              progress={finishedRatio}
            ></ProgressiveBar>
            {finishedRatio < unfinishedRatio ? (
              <RatioTextBox>
                <RatioText color="finished"> 완결작</RatioText>
                <RatioText>보다 더&nbsp;</RatioText>
                <RatioText color="ongoing"> 연재작</RatioText>
                <RatioText>을 더 선호해요.</RatioText>
              </RatioTextBox>
            ) : finishedRatio == unfinishedRatio ? (
              <RatioTextBox>
                <RatioText>골고루 즐기고 계시네요.</RatioText>
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
            {result?.getFromSpring?.[0] && (
              <GenreGraphSection className="genre_graph">
                <DoughnutChart dataList={result.getFromSpring[0].genreRatio} />
              </GenreGraphSection>
            )}
            {/* <GenreGraphSection className="genre_graph">
              <DoughnutChart dataList={result?.getFromSpring[0].genreRatio} />
            </GenreGraphSection> */}
            <section className="genre_table">
              <GenreTableTitleDiv>
                <GenreTableTitle>장르 성분표</GenreTableTitle>
              </GenreTableTitleDiv>
              <GenreSect>
                {genreAnalysis?.map((item, idx) => {
                  if (item.count === 0) {
                    return null;
                  }
                  return (
                    <GenreDiv key={item.id}>
                      <GenreText color={colorPalette[idx]}>
                        #{item.name}
                      </GenreText>
                      <GenreHr color={colorPalette[idx]} />
                      <GenreText color={colorPalette[idx]}>
                        {item.count} (
                        {calPercent(
                          item.count,
                          result?.getFromSpring[0].webtoonCounts
                        )}
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
                {rankList.map((item, idx) => {
                  return (
                    <PointSpan key={item.id}>
                      {item.name} {idx !== rankList.length - 1 && ", "}
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
              {result?.getFromSpring[0].myType.userType}
            </BoldSpan>
            &nbsp; 유형의 독자들이 좋아하는 작품
          </Text>
          <section style={{ marginTop: "16px" }}>
            <RecommendItemList
              text="완결작 중 추천 웹툰"
              dataList={result?.resultNbtiWebtoon?.filter(
                (item: RecomWebtoonType) => item.endFlag === 1
              )}
            ></RecommendItemList>
          </section>
          <section>
            <RecommendItemList
              text="연재작 중 추천 웹툰"
              dataList={result?.resultNbtiWebtoon?.filter(
                (item: RecomWebtoonType) => item.endFlag === 0
              )}
            ></RecommendItemList>
          </section>
        </StyledSection>
        <StyledSection>
          <Text size="1.1rem">사용자가 즐겨보는 키워드</Text>
          <StyledKeywordDiv>
            {result?.myKeyword[0].myKeywordName.map((el: string) => {
              return <StyledKeyword key={el}>#{el}</StyledKeyword>;
            })}
          </StyledKeywordDiv>
        </StyledSection>
        <StyledSection>
          <RecommendItemList
            type="keyword"
            keyword={result?.myKeyword[0].myKeywordName[0]}
            text="내가 선호하는 키워드의 작품"
            dataList={result?.keywordSimilarWebtoon}
          ></RecommendItemList>
        </StyledSection>
        {result?.authorWebtoon?.[0] && (
          <StyledSection>
            <Text bold="true">
              {result?.myGenre?.genreName} 장르 독자들이 선호하는 대표 작가
            </Text>
            <Image
              url={result?.authorWebtoon[0].image}
              width="10rem"
              height="14rem"
              borderRadius={4}
            ></Image>
            <Text>
              <BoldSpan>{result?.authorWebtoon[0].authorName}</BoldSpan>
              &nbsp;작가
            </Text>
            <Text size="0.9rem">대표작 -{result?.authorWebtoon[0].title}</Text>
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
            <StyledButton
              onClick={() => {
                navigate("/survey");
              }}
            >
              웹툰 취향 분석 다시하기
            </StyledButton>
          </BtnContainer>
        </StyledSection>
        <StyledSection onClick={shareHandler}>
          <ShareButton
            text="웹툰 취향 분석 결과 공유하기"
            src={`${import.meta.env.VITE_TEST_URL}`}
            param="survey/result"
            type={uuid as string}
          />
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
const GenreText = styled.p<{ color?: string }>`
  color: ${({ color }) => color};
  font-weight: 700;
  margin: auto 0.5rem;
`;
const GenreHr = styled.hr<{ color?: string }>`
  background: ${({ color }) => color};
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
const StyledText = styled.p`
  color: black;
  font-size: 1.2rem;
  font-weight: 700;
`;

const StyledPlayer = styled(Player)`
  width: 75vw;
  max-width: 800px;
  max-height: 800px;
`;

const StyledKeywordDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  justify-content: center;
`;

const StyledKeyword = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 14px;
  border-radius: 10px;
  background-color: #eeeeee;
  padding: 4px 10px;
`;
