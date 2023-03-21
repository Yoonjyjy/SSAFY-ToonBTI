import React, { useState } from "react";
import styled from "styled-components";
import { Layout } from "../components/common";
import capture from "../assets/capture.png";
import SurveyPage from "./SurveyPage";

// const isLogin = localStorage.getItem('token') ? true : false
export default function Home() {
  const [comp, setComp] = useState(0);

  const handleClick = () => {
    setComp(comp + 1);
  };

  return (
    <Layout title="웹툰 취향 분석 테스트">
      {comp === 0 && (
        <div>
          <Title>웹툰 독자 유형 테스트</Title>
          <ImageLogo imgUrl={capture} />
          <button onClick={handleClick}>
            <b>시작하기</b>
            <p>지금까지 {}명이 참여했어요!</p>
          </button>
        </div>
      )}
      {comp === 1 && <SurveyPage />}
    </Layout>
  );
}

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

const ImageLogo = styled.div<{ imgUrl: string }>`
  width: 300px;
  background-image: url(${(props) => props.imgUrl});
  background-size: contain;
  background-position: center;
`;
