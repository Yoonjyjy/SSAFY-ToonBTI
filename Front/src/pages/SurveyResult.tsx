import { Button } from "antd";
import React from "react";
import styled from "styled-components";
import { Layout, ProgressiveBar } from "../components/common";
import Image from "../components/common/Image";
import Text from "../components/common/Text";
import RecommendItemList from "../components/survey/RecommendItemList";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import tiger from "/tiger.jpg";

//TODO: data fetch
const data = {};
export default function AnalysisResult() {
  const navigate = useNavigate();

  const data = {
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
    <Layout type="survey" title="웹툰 취향 분석 테스트" hasPrevious>
      <TitleText>당신의 독자 유형은?</TitleText>
      <Image url="" /> {/* data */}
      <article>
        <StyledSection>
          <Text>웹툰 취향 분석 결과는...</Text>
          <Text bold size="1.7rem">
            개척하는 모험가
          </Text>
          {/* data */}
        </StyledSection>
        <StyledSection>
          <Text>내가 지금까지 읽은 웹툰의 수는?</Text>
          <CallOutDiv>
            <Text size="1.5rem">
              <PointSpan>77</PointSpan>개{/* data */}
            </Text>
          </CallOutDiv>
          <Text>제법 많이 보셨군요!</Text> {/* 읽은 권수에 따른 다른 text */}
        </StyledSection>
        <StyledSection>
          <Text>
            현재
            <PointSpan>N명</PointSpan>의 분석 독자들 중...
          </Text>
          <div style={{ width: "90%", margin: "auto" }}>
            <ProgressiveBar type="top" progress={90}></ProgressiveBar>
          </div>
          <Text>
            <GradientText>상위 NN.N%</GradientText>에 해당해요!
          </Text>
        </StyledSection>
        <StyledSection>
          <Text size="1.3rem">나의 전문가 수치</Text>
          <RoundUpperDiv>
            <RoundDiv color="#99CCFF">
              <Text color="#ffffff" size="1.2rem" bold>
                로판 전문가
              </Text>
            </RoundDiv>
            <RoundDiv color="#FFD400">
              <Text color="#ffffff" size="1.2rem" bold>
                카카오 매니아
              </Text>
            </RoundDiv>
            <RoundDiv color="#5a5b5c">
              <Text color="#ffffff" size="1.2rem" bold>
                완결작 킬러
              </Text>
            </RoundDiv>
          </RoundUpperDiv>
        </StyledSection>
        <StyledSection>
          <Text size="1.3rem">플랫폼 비율</Text>
          <div>
            <RatioTextBox space>
              <RatioText color="#FFBC00">카카오페이지 NN%</RatioText>
              <RatioText color="#2DB400">네이버 NN%</RatioText>
            </RatioTextBox>
            <ProgressiveBar type="platform" progress={73}></ProgressiveBar>
            <RatioTextBox>
              {/* {data.kakao > data.naver ? (
                <RatioText color="#FFBC00">카카오페이지</RatioText>
              ) : (
                <RatioText color="#2DB400">네이버</RatioText>
              )} */}
              <RatioText color="#FFBC00">카카오페이지</RatioText>
              <RatioText>의 웹툰을 더 많이 읽고 있어요.</RatioText>
            </RatioTextBox>
          </div>
        </StyledSection>
        <StyledSection>
          <Text size="1.3rem">완결작 비율</Text>
          <div>
            <RatioTextBox space>
              <RatioText color="#FF6C6C">완결작 NN%</RatioText>
              <RatioText color="#1E9EFF">연재작 NN%</RatioText>
            </RatioTextBox>
            <ProgressiveBar type="endedOrOngoin" progress={43}></ProgressiveBar>

            <RatioTextBox>
              <RatioText color="#1E9EFF">연재작 </RatioText>
              <RatioText>보다 더&nbsp;</RatioText>
              <RatioText color="#FF6C6C"> 완결작</RatioText>
              <RatioText>을 더 선호해요.</RatioText>
            </RatioTextBox>
          </div>
        </StyledSection>
        <StyledSection>
          <Text size="1.3rem">사용자가 많이 본 장르</Text>
          <div>
            <section className="genre_graph">육각형 그래프</section>
            <section className="genre_table">
              <GenreTableTitleDiv>
                <GenreTableTitle>장르 성분표</GenreTableTitle>
              </GenreTableTitleDiv>
              <GenreSect>
                <GenreDiv>
                  <GenreText preferred>#판타지</GenreText>
                  <GenreHr preferred />
                  <GenreText preferred>38 (13.9%)</GenreText>
                </GenreDiv>
                <GenreDiv>
                  <GenreText>#드라마</GenreText>
                  <GenreHr />
                  <GenreText>21 (7.7%)</GenreText>
                </GenreDiv>
                <GenreDiv>
                  <GenreText>#로맨스</GenreText>
                  <GenreHr />
                  <GenreText>10 (3.6%)</GenreText>
                </GenreDiv>
                <GenreDiv>
                  <GenreText preferred>#판타지</GenreText>
                  <GenreHr preferred />
                  <GenreText preferred>38 (13.9%)</GenreText>
                </GenreDiv>
                <GenreDiv>
                  <GenreText>#드라마</GenreText>
                  <GenreHr />
                  <GenreText>21 (7.7%)</GenreText>
                </GenreDiv>
                <GenreDiv>
                  <GenreText preferred>#로맨스</GenreText>
                  <GenreHr preferred />
                  <GenreText preferred>10 (3.6%)</GenreText>
                </GenreDiv>
                <GenreDiv>
                  <GenreText preferred>#판타지</GenreText>
                  <GenreHr preferred />
                  <GenreText preferred>38 (13.9%)</GenreText>
                </GenreDiv>
                <GenreDiv>
                  <GenreText>#드라마</GenreText>
                  <GenreHr />
                  <GenreText>21 (7.7%)</GenreText>
                </GenreDiv>
                <GenreDiv>
                  <GenreText>#로맨스</GenreText>
                  <GenreHr />
                  <GenreText>10 (3.6%)</GenreText>
                </GenreDiv>
                <GenreDiv>
                  <GenreText>#로맨스</GenreText>
                  <GenreHr />
                  <GenreText>10 (3.6%)</GenreText>
                </GenreDiv>
              </GenreSect>
            </section>
            <RatioTextBox>
              <Text bold size="1.1rem">
                주로
                <span style={{ color: "#FF6C6C" }}>
                  로맨스 판타지, 판타지, 일상/개그
                </span>
                장르를 <br />더 선호하시네요!
              </Text>
            </RatioTextBox>
          </div>
        </StyledSection>
        <StyledSection>
          <Text size="1.1rem">
            <BoldSpan>로맨스판타지</BoldSpan> 장르를 좋아하는 독자들의 선택
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
          <Text>사용자가 즐겨보는 키워드</Text>
          <KeywordSection>
            <KeywordDiv>
              <Text type="keyword" bold>
                #잔잔한
              </Text>
            </KeywordDiv>
            <KeywordDiv>
              <Text type="keyword" bold>
                #힐링
              </Text>
            </KeywordDiv>
            <KeywordDiv>
              <Text type="keyword" bold>
                #일상
              </Text>
            </KeywordDiv>
            <KeywordDiv>
              <Text type="keyword" bold>
                #호랑이
              </Text>
            </KeywordDiv>
          </KeywordSection>
        </StyledSection>
        <StyledSection>
          <RecommendItemList
            text="#호랑이 키워드와 유사한 키워드의 작품"
            dataList={CompleRecomData}
          ></RecommendItemList>
        </StyledSection>
        <StyledSection>
          <Text bold>로맨스 판타지 장르 독자들이 선호하는 대표 작가</Text>
          <Image url="" width="10rem" height="14rem" borderRadius={4}></Image>
          <Text bold>
            <PointSpan>취향저격율 89.4%</PointSpan>
          </Text>
          <Text>
            <BoldSpan>박태준주식회사 / 송펄 / 마이노 </BoldSpan>
            작가
          </Text>
          <Text>대표작 - 작품1, 작품2</Text>
          <Text>주요 연재 장르 - 장르1, 장르2</Text>
        </StyledSection>
        <StyledSection>
          <Text bold>로맨스 판타지 장르 독 자들이 선호하는 작가들</Text>
          <section>
            <AuthorsDiv>
              <Image url={tiger} width="6rem" height="8rem" />
              <DescAuthorDiv>
                <Text>
                  <BoldSpan>삼</BoldSpan> 작가
                </Text>
                <Text>
                  대표작 - <span>김부장</span>
                </Text>
              </DescAuthorDiv>
            </AuthorsDiv>
            <AuthorsDiv>
              <Image url={tiger} width="6rem" height="8rem" />
              <DescAuthorDiv>
                <Text>
                  <BoldSpan>삼</BoldSpan> 작가
                </Text>
                <Text>
                  대표작 - <span>신의 탑</span>
                </Text>
              </DescAuthorDiv>
            </AuthorsDiv>
            <AuthorsDiv>
              <Image url={tiger} width="6rem" height="8rem" />
              <DescAuthorDiv>
                <Text>
                  <BoldSpan>삼</BoldSpan> 작가
                </Text>
                <Text>
                  대표작 - <span>전지적 독자 시점</span>
                </Text>
              </DescAuthorDiv>
            </AuthorsDiv>
          </section>
        </StyledSection>
        <StyledButton
          onClick={() => {
            navigate("/");
          }}
        >
          웹툰 취향 분석 다시하기
        </StyledButton>
      </article>
      <StyledSection>결과 공유하기</StyledSection>
    </Layout>
  );
}
const StyledSection = styled.section`
  display: block;
  margin: 5rem auto;
`;
const TitleText = styled.h1`
  margin: 0 auto 2rem auto;
`;
const CallOutDiv = styled.div`
  border-radius: 10px;
  background-color: #eeeeee;
  min-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledButton = styled(Button)`
  width: 100%;
  height: 3rem;
`;
const PointSpan = styled.span`
  color: #1890ff;
`;

const RoundUpperDiv = styled.div`
  /* display: flex;
  justify-content: space-evenly; */
  display: flex;
  /* grid-template-columns: 1fr 1fr 1fr; */
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  width: 100%;
  justify-content: center;
`;
const RoundDiv = styled.div<{ color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  background-color: ${(props) => props.color};
  padding: 0.5rem;
  word-break: keep-all;
  margin: 0.25rem;
  @media (min-width: 320px) and (max-width: 380px) {
    width: 80px;
    height: 80px;
  }
  @media (min-width: 380px) and (max-width: 390px) {
    width: 100px;
    height: 100px;
  }
  @media (min-width: 391px) {
    width: 120px;
    height: 120px;
  }
`;

const RatioTextBox = styled.div<{ space?: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.space ? "space-between" : "center")};
  font-size: 1rem;
`;

const RatioText = styled.p<{ color?: string }>`
  color: ${(props) => (props.color ? props.color : "black")};
  font-weight: 700;
  display: flex;
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
  color: ${(props) => (props.preferred ? "#FF6C6C" : "black")};
  margin: auto 0.5rem;
`;
const GenreHr = styled.hr<{ preferred?: boolean }>`
  background: ${(props) => (props.preferred ? "#FF6C6C" : "black")};
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
const KeywordDiv = styled.div`
  border-radius: 4px;
  background-color: #eeeeee;
  width: fit-content;
`;
const KeywordSection = styled.section`
  justify-content: center;
  gap: 0.5rem;
  display: flex;
`;
const AuthorsDiv = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  background-color: #eeeeee;
  border-radius: 8px;
`;
const DescAuthorDiv = styled.div`
  width: 60%;
`;
const BoldSpan = styled.span`
  font-weight: 700;
`;
