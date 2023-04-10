import React, { useEffect, useState } from "react";
import { Button, Space } from "antd";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  DoughnutChartResult,
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
import {
  GetFromSpring,
  GetFromSpring2,
  MyGenre,
  MyKeyword,
  Webtoon,
} from "../gql/graphql";

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

interface TempResultType {
  getFromSpring: GetFromSpring[];
  getFromSpring2: GetFromSpring2[];
  resultNbtiWebtoon: Webtoon[];
  myKeyword: MyKeyword[];
  myGenre: MyGenre[];
}

interface ResultType {
  getFromSpring: GetFromSpring[];
  getFromSpring2: GetFromSpring2[];
  resultNbtiWebtoon: Webtoon[];
  myKeyword: MyKeyword[];
  authorWebtoon: Webtoon[];
  keywordSimilarWebtoon: Webtoon[];
  myGenre: MyGenre[];
}

interface Result2Type {
  authorWebtoon: Webtoon[];
  keywordSimilarWebtoon: Webtoon[];
}

const TEMP: TempResultType = {
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

const RESULT: ResultType = {
  getFromSpring: [
    {
      doneRatio: [43, 22],
      __typename: "GetFromSpring",
      genreRatio: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

const topN = 5;

export default function AnalysisResult() {
  const userPk = Number(localStorage.getItem("userId"));
  const uuid = localStorage.getItem("uuid");
  const nbtiPk = Number(localStorage.getItem("nbtiPk"));
  const navigate = useNavigate();
  const { state: webtoonPk } = useLocation();

  const [tempResult, setTempResult] = useState(TEMP);
  const [result, setResult] = useState(RESULT); // TODO: type 지정
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
      onCompleted(data: Result2Type) {
        setResult({ ...tempResult, ...data });
        const temp: GenreListType[] = [];
        console.log(result.getFromSpring[0].genreRatio);
        for (let i = 1; i < 11; i++) {
          if ((result.getFromSpring[0].genreRatio?.[i] as number) !== 0) {
            temp.push({
              id: i,
              name: GENRE[i - 1],
              count: result?.getFromSpring?.[0]?.genreRatio?.[i] as number,
            });
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
        setTempResult(data as TempResultType);
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
  }

  if (loading) {
    return (
      <Layout type="home">
        <StyledText>
          당신의 TooNBTI를 분석중이에요.
          <br /> 잠시만 기다려주세요.
        </StyledText>
        <StyledPlayer autoplay loop src={`/spinner.json`}></StyledPlayer>
      </Layout>
    );
  }

  return (
    <Layout
      // type="survey"
      title="웹툰 취향 분석 테스트"
      hasPrevious
    >
      <TitleText>당신의 독자 유형은?</TitleText>
      {result?.getFromSpring?.[0].myType?.image ? (
        <MainImage
          src={
            "https://j8a302.p.ssafy.io/images/" +
            result?.getFromSpring[0].myType.image
          }
          size={80}
        />
      ) : (
        <StyledPlayer autoplay loop src={`/spinner.json`}></StyledPlayer>
      )}
      <article>
        <StyledSection2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Text>웹툰 취향 분석 결과는...</Text>
            <Text bold="true" size="1.7rem" color="#FF6C6C">
              {result?.getFromSpring?.[0]?.myType?.userType}
            </Text>
          </motion.div>
        </StyledSection2>

        {/* 내가 지금까지 읽은 웹툰의 수 */}
        <StyledSection>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Text size="0.9rem">내가 지금까지 읽은 웹툰의 수는?</Text>
            <div>
              <Text size="1.5rem">
                <PointSpan>{webtoonPk.length}</PointSpan>개
              </Text>
            </div>
            {webtoonPk.length < 10 ? (
              <Text>
                유명한 것만 보셨나요?
                <br />
                저희 추천작도 한 번 보실래요?
              </Text>
            ) : webtoonPk.length < 30 ? (
              <Text>제법 많이 보셨군요!</Text>
            ) : webtoonPk.length < 50 ? (
              <Text>이제는 현생을 사시길 바라요.</Text>
            ) : (
              <Text>혹시 예일대 웹툰학과 교수신가요?</Text>
            )}
          </motion.div>
        </StyledSection>
        {/* 상위 n 퍼센트 */}
        <StyledSection>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Text>
              현재&nbsp;
              <PointSpan>{userCount?.countAllUsers}</PointSpan>명의 분석 독자들
              중
            </Text>
            <div style={{ width: "90%", margin: "auto" }}>
              {result.getFromSpring2[0].allUser && (
                <ProgressiveBar
                  type="top"
                  progress={
                    100 -
                    Math.round(
                      (((result?.getFromSpring2?.[0]?.myRank as number) /
                        result?.getFromSpring2?.[0]?.allUser) as number) * 100
                    )
                  }
                ></ProgressiveBar>
              )}
            </div>
            {result.getFromSpring2[0].allUser && (
              <Text>
                <GradientText>
                  상위{" "}
                  {Math.round(
                    (((result?.getFromSpring2?.[0]?.myRank as number) /
                      result?.getFromSpring2?.[0]?.allUser) as number) * 100
                  )}
                  %
                </GradientText>
                에 해당해요!
              </Text>
            )}
          </motion.div>
        </StyledSection>
        {/* 전문가 수치 */}
        <StyledSection>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Text size="1.2rem">나의 전문가 수치</Text>
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
          </motion.div>
        </StyledSection>
        {/* 플랫폼 비율 */}
        <StyledSection>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Text size="1.2rem">플랫폼 비율</Text>
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
          </motion.div>
        </StyledSection>
        {/* 완결작 비율 */}
        <StyledSection>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Text size="1.2rem">완결작 비율</Text>
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
                  <RatioText>보다&nbsp;</RatioText>
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
          </motion.div>
        </StyledSection>
        {/* 사용자가 많이 본 장르 - 파이차트 */}
        <StyledSection>
          <Text size="1.2rem">사용자가 많이 본 장르</Text>
          <div>
            {result.getFromSpring[0].genreRatio && (
              <GenreGraphSection className="genre_graph">
                <DoughnutChartResult dataList={genreAnalysis} />
              </GenreGraphSection>
            )}
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
                          result?.getFromSpring?.[0].webtoonCounts as number
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
          {/* </motion.div> */}
        </StyledSection>
        {/* 추전 작품 리스트 */}
        <StyledSection>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Text size="1.1rem">
              <BoldSpan color="pink">
                {result?.getFromSpring?.[0]?.myType?.userType}
              </BoldSpan>
              &nbsp; 유형의 독자들이 좋아하는 작품
            </Text>
          </motion.div>
          <section style={{ marginTop: "16px" }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <RecommendItemList
                text="완결작 중 추천 웹툰"
                dataList={result?.resultNbtiWebtoon?.filter(
                  (item: Webtoon) => item.endFlag === 1
                )}
              ></RecommendItemList>
            </motion.div>
          </section>
          <section>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <RecommendItemList
                text="연재작 중 추천 웹툰"
                dataList={result?.resultNbtiWebtoon?.filter(
                  (item: Webtoon) => item.endFlag === 0
                )}
              ></RecommendItemList>
            </motion.div>
          </section>
        </StyledSection>
        {/* 사용자가 즐겨보는 키워드 */}
        <StyledSection>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Text size="1.2rem">사용자가 즐겨보는 키워드</Text>
            <StyledKeywordDiv>
              {result?.myKeyword?.[0].myKeywordName?.map(
                (el: string | null) => {
                  return <StyledKeyword key={el}>#{el}</StyledKeyword>;
                }
              )}
            </StyledKeywordDiv>
          </motion.div>
        </StyledSection>
        {/* 사용자가 선호하는 키워드의 작품 */}
        <StyledSection>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <RecommendItemList
              type="keyword"
              keyword={result?.myKeyword?.[0]?.myKeywordName?.[0] as string}
              text="내가 선호하는 키워드의 작품"
              dataList={result?.keywordSimilarWebtoon}
            ></RecommendItemList>
          </motion.div>
        </StyledSection>
        {/* 사용자가 좋아할 것 같은 작가 */}
        {result?.authorWebtoon?.[0] && (
          <StyledSection>
            <Text bold="true">
              {result?.myGenre[0].genreName} 장르 독자들이 선호하는 대표 작가
            </Text>
            <Image
              url={result?.authorWebtoon[0].image as string}
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
        {/* 하단 버튼 */}
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
  margin: 0 auto;
  font-size: 1.5rem;
`;
const StyledButton = styled(Button)`
  width: 100%;
  height: 50px;
  border-radius: 10px;
`;
const PointSpan = styled.span`
  color: ${({ theme }) => theme.colors.pink};
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
  background: linear-gradient(to right, #ff7b7b 0%, #ffd7d7 100%);
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
  color: ${({ color, theme }) => (color ? theme.colors.pink : "black")};
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
  font-size: 1.1rem;
  font-weight: 700;
  animation: motion 1s /* 속도 */ linear 0s
    /* 처음부터 끝까지 일정 속도로 진행 */ infinite alternate; /* 무한 반복 */

  @keyframes motion {
    0% {
      transform: translateY(10px);
    }

    50% {
      transform: translateY(-10px);
    }

    100% {
      transform: translateY(10px);
    }
  }
`;

const StyledPlayer = styled(Player)`
  width: 30vw;
  max-width: 600px;
  max-height: 600px;
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
