import { Button } from "antd";
import React from "react";
import { Bar } from "react-chartjs-2";
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

ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale);
//TODO: data fetch

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
              <span style={{ color: "#1890ff", fontWeight: "700" }}>77</span>개
              {/* data */}
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
            <ProgressiveBar progress={50}></ProgressiveBar>
          </div>
          <Text>
            <span>상위 NN.N%</span>에 해당해요!
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
            <RoundDiv color="#4a4b4c">
              <Text color="#ffffff" size="1.2rem" bold>
                완결작 킬러
              </Text>
            </RoundDiv>
          </RoundUpperDiv>
        </StyledSection>
        <StyledSection>
          <Text size="1.3rem">플랫폼 비율</Text>
          <div>
            <Bar data={data} options={options} />
          </div>
        </StyledSection>
        <StyledSection>
          <Text size="1.3rem">완결작 비율</Text>
          <div></div>
        </StyledSection>
        <StyledSection>
          <Text size="1.3rem">사용자가 많이 본 장르</Text>
          <div>
            <div>육각형 그래프</div>
            <div>장르 성분표</div>
            <Text>
              주로 <span>&quot;로맨스 판타지, 판타지, 일상/개그&quot;</span>
              장르를 더 선호하시네요!
            </Text>
            {/* data */}
          </div>
        </StyledSection>
        <StyledSection>
          <Text>
            <b>&quot;로맨스판타지&quot;</b> 장르를 좋아하는 독자들의 선택
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
          <section style={{ display: "flex" }}>
            <div>
              <Text>#&quot;잔잔한&quot;</Text>
            </div>
            <div>
              <Text>#&quot;힐링&quot;</Text>
            </div>
            <div>
              <Text>#&quot;일상&quot;</Text>
            </div>
            <div>
              <Text>#&quot;호랑이&quot;</Text>
            </div>
          </section>
        </StyledSection>
        <StyledSection>
          <RecommendItemList
            text="#호랑이 키워드와 유사한 키워드의 작품"
            dataList={CompleRecomData}
          ></RecommendItemList>
        </StyledSection>
        <StyledSection>
          <Text>
            &quot;로맨스 판타지&quot; 장르 독자들이 선호하는 대표 작가
          </Text>
          <Image url="" width="14rem" height="14rem" borderRadius={4}></Image>
          <Text>
            <span>취향저격율 &quot;NN.N%&quot;</span>
          </Text>
          <Text>&quot;작가1 / 작가2 / 작가3&quot; 작가</Text>
          <Text>대표작 - &quot;작품1, 작품2&quot;</Text>
          <Text>주요 연재 장르 - &quot;장르1, 장르2&quot;</Text>
        </StyledSection>
        <StyledSection>
          <Text>&quot;로맨스 판타지&quot; 장르 독자들이 선호하는 작가들</Text>
          <div>작가1</div>
          <div>작가2</div>
          <div>작가3</div>
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
  grid-template-columns: 1fr 1fr 1fr;
  height: 108px;
`;
const RoundDiv = styled.div<{ color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 100px;
  background-color: ${(props) => props.color};
  padding: 0.5rem;
  word-break: keep-all;
  margin: 0.25rem;
`;
