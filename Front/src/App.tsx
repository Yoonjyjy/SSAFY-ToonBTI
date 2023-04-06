import React from "react";
import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import theme from "./theme";
import {
  SurveyResult,
  SurveyTest,
  Home,
  MBTIResult,
  MBTITest,
  MBTIResultAll,
  NotFound,
  MBTIResultShared,
  SurveyResultView,
} from "./pages";
import styled, { ThemeProvider } from "styled-components";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Pretendard",
          colorText: "#000",
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <Wrap>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/mbti" element={<MBTITest />} />
            <Route path="/mbti/result" element={<MBTIResult />} />
            <Route path="/mbti/result/:nbti" element={<MBTIResultShared />} />
            <Route path="/mbti/result/all" element={<MBTIResultAll />} />
            <Route path="/survey" element={<SurveyTest />} />
            <Route path="/survey/result" element={<SurveyResult />} />
            <Route path="/survey/result/:uuid" element={<SurveyResultView />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Wrap>
      </ThemeProvider>
    </ConfigProvider>
  );
}

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("");
  background-repeat: no-repeat;
  background-size: cover;
  @media ${({ theme }) => theme.device.laptop} {
    background-image: url("");
    background-repeat: no-repeat;
    background-size: cover;
  }
  @media ${({ theme }) => theme.device.tablet} {
    background-image: url("");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .MobileFramePage {
    z-index: 999;
  }
`;
