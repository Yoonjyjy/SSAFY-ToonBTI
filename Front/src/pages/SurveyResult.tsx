import { Button, Space } from "antd";
import React from "react";
import styled from "styled-components";
import { DoughnutChart, Layout, ProgressiveBar } from "../components/common";
import Image from "../components/common/Image";
import Text from "../components/common/Text";
import RecommendItemList from "../components/survey/RecommendItemList";
import ShareButton from "../components/common/ShareButton";
import { useNavigate } from "react-router-dom";
import test1 from "/test1.png";

type ColorType = "kakao" | "naver" | "ongoing" | "finished";

//TODO: data fetch
const data = {
  reader_category_img: test1,
  reader_category_name: "LSEA",
  read_books_num: 77,
  total_reader_cnt: 3023,
  reader_percentage: 23.5,
  reader_title_list: [
    {
      id: 1,
      title: "로판 전문가",
      color: "#99CCFF",
    },
    { id: 2, title: "카카오 매니아", color: "#FFD45B" },
    { id: 3, title: "완결작 킬러", color: "#757575" },
  ],
  platform_ratio: {
    Kakao: 63.5,
    Naver: 36.5,
  },
  finished_ratio: {
    finished: 43.7,
    ongoing: 57.3,
  },
  genre_analysis: [
    { id: 1, name: "판타지", count: 31 },
    { id: 2, name: "드라마", count: 21 },
    { id: 3, name: "로맨스", count: 10 },
    { id: 4, name: "로맨스판타지", count: 30 },
    { id: 5, name: "현대판타지", count: 9 },
    { id: 6, name: "액션/무협", count: 33 },
    { id: 7, name: "소년/감성", count: 11 },
    { id: 8, name: "일상/개그", count: 50 },
    { id: 9, name: "공포/추리", count: 3 },
    { id: 10, name: "스포츠", count: 0 },
  ],
  favorite_genre: "판타지",
  favorite_genre_author: {
    name: "판타지",
    main_author: "SIU",
    author_list: ["SIU", "Omin", "테미스"],
    main_work_title: ["신의 탑", "언니", "그만훼"],
    main_genre: ["판타지"],
    main_author_img: "/tiger.jpg",
  },
  accuracy: 73.2,
};
export default function AnalysisResult() {
  const navigate = useNavigate();

  function calPercent(count: number, total: number) {
    return ((count / total) * 100).toFixed(2);
  }

  const rankList = data.genre_analysis
    .slice()
    .sort((a, b) => b.count - a.count)
    .splice(0, 3);

  const data2 = {
    type: "bar",
    labels: ["카카오페이지", "네이버"],
    datasets: [
      {
        data: [68, 32],
        borderColor: ["rgb(255, 205, 86)", "rgb(75, 192, 192"],
        backgroundColor: ["rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: false,
        text: "Platform Ratio",
      },
    },
    responsive: true,
    scales: {
      y: {
        stacked: true,
      },
    },
  };
  const CompleRecomData = [
    {
      name: "작품1",
      id: 1,
      imgUrl: "/tiger.jpg",
      per: 89.4,
    },
    {
      name: "작품2",
      id: 2,
      imgUrl: "/tiger.jpg",
      per: 79.4,
    },
    {
      name: "작품3",
      id: 3,
      imgUrl: "/tiger.jpg",
      per: 69.4,
    },
    {
      name: "작품4",
      id: 4,
      imgUrl: "/tiger.jpg",
      per: 59.4,
    },
    {
      name: "작품5",
      id: 5,
      imgUrl: "/tiger.jpg",
      per: 49.4,
    },
  ];
  return (
    <Layout
      // type="survey"
      title="웹툰 취향 분석 테스트"
      hasPrevious
    >
      <TitleText>당신의 독자 유형은?</TitleText>
      <Image url={data.reader_category_img} /> {/* data */}
      <article>
        <StyledSection>
          <Text>웹툰 취향 분석 결과는...</Text>
          <Text bold="true" size="1.7rem">
            {data.reader_category_name}
          </Text>
        </StyledSection>
        <StyledSection>
          <Text>내가 지금까지 읽은 웹툰의 수는?</Text>
          <CallOutDiv>
            <Text size="1.5rem">
              <PointSpan>{data.read_books_num}</PointSpan>개
            </Text>
          </CallOutDiv>
          <Text>제법 많이 보셨군요!</Text> {/* 읽은 권수에 따른 다른 text */}
        </StyledSection>
        <StyledSection>
          <Text>
            현재&nbsp;
            <PointSpan>{data.total_reader_cnt}</PointSpan>명의 분석 독자들 중...
          </Text>
          <div style={{ width: "90%", margin: "auto" }}>
            <ProgressiveBar
              type="top"
              progress={data.reader_percentage}
            ></ProgressiveBar>
          </div>
          <Text>
            <GradientText>상위 {data.reader_percentage}%</GradientText>에
            해당해요!
          </Text>
        </StyledSection>
        <StyledSection>
          <Text size="1.3rem">나의 전문가 수치</Text>
          <RoundBoxDiv>
            {data.reader_title_list.map((item) => (
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
                카카오페이지 {data.platform_ratio.Kakao}%
              </RatioText>
              <RatioText color="naver">
                네이버 {data.platform_ratio.Naver}%
              </RatioText>
            </RatioTextBox>
            <ProgressiveBar
              type="platform"
              progress={data.platform_ratio.Kakao}
            ></ProgressiveBar>
            <RatioTextBox>
              {data.platform_ratio.Kakao > data.platform_ratio.Naver ? (
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
                완결작 {data.finished_ratio.finished}%
              </RatioText>
              <RatioText color="ongoing">
                연재작 {data.finished_ratio.ongoing}%
              </RatioText>
            </RatioTextBox>
            <ProgressiveBar
              type="endedOrOngoin"
              progress={data.finished_ratio.finished}
            ></ProgressiveBar>
            {data.finished_ratio.finished < data.finished_ratio.ongoing ? (
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
              <DoughnutChart dataList={data.genre_analysis} />
            </GenreGraphSection>
            <section className="genre_table">
              <GenreTableTitleDiv>
                <GenreTableTitle>장르 성분표</GenreTableTitle>
              </GenreTableTitleDiv>
              <GenreSect>
                {data.genre_analysis.map((item) => {
                  return (
                    <GenreDiv key={item.id}>
                      <GenreText preferred={rankList.includes(item)}>
                        #{item.name}
                      </GenreText>
                      <GenreHr preferred={rankList.includes(item)} />
                      <GenreText preferred={rankList.includes(item)}>
                        {item.count} (
                        {calPercent(item.count, data.read_books_num)}%)
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
                })}
                &nbsp;장르를 <br />더 선호하시네요!
              </Text>
            </RatioTextBox>
          </div>
        </StyledSection>
        <StyledSection>
          <Text size="1.1rem">
            {/* <BoldSpan>{data.favorite_genre}</BoldSpan> 장르를 좋아하는 독자들의 */}
            <BoldSpan color="yellow">{data.reader_category_name}</BoldSpan>{" "}
            유형의 독자들이 좋아하는 작품
          </Text>
          <section>
            <RecommendItemList
              text="완결작 중 추천 웹툰"
              dataList={CompleRecomData}
            ></RecommendItemList>
          </section>
          <section>
            <RecommendItemList
              text="연재작 중 추천 웹툰"
              dataList={CompleRecomData}
            ></RecommendItemList>
          </section>
        </StyledSection>
        <StyledSection>
          <RecommendItemList
            text="#호랑이 키워드와 유사한 키워드의 작품"
            dataList={CompleRecomData}
          ></RecommendItemList>
        </StyledSection>
        <StyledSection>
          <Text bold="true">
            {data.favorite_genre} 장르 독자들이 선호하는 대표 작가
          </Text>
          <Image
            url={data.favorite_genre_author.main_author_img}
            width="10rem"
            height="14rem"
            borderRadius={4}
          ></Image>
          <Text bold="true">
            <PointSpan>취향저격율 {data.accuracy}%</PointSpan>
          </Text>
          <Text>
            <BoldSpan>
              {data.favorite_genre_author.author_list.map((item, idx) => {
                let res = item;
                if (idx != data.favorite_genre_author.author_list.length - 1) {
                  res += " / ";
                }
                return res;
              })}
            </BoldSpan>
            &nbsp;작가
          </Text>
          <Text>
            대표작 -
            {data.favorite_genre_author.main_work_title.map((item, idx) => {
              let res = item;
              if (idx != data.favorite_genre_author.author_list.length - 1) {
                res += ", ";
              }
              return res;
            })}
          </Text>
          <Text>
            주요 연재 장르 -{" "}
            {data.favorite_genre_author.main_genre.map((item, idx) => {
              let res = item;
              if (idx != data.favorite_genre_author.main_genre.length - 1) {
                res += ", ";
              }
              return res;
            })}
          </Text>
        </StyledSection>
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
        <StyledSection>
          <ShareButton
            text="웹툰 취향 분석 결과 공유하기"
            // text=""
            src="http://localhost:5173"
            param="survey/result"
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
`;
const RoundUpperDiv = styled.div`
  width: 100%;
  padding-bottom: 100%;
  position: relative;
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
const BoldSpan = styled.span`
  font-weight: 700;
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
