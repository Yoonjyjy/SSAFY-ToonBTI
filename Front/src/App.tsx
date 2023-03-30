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
} from "./pages";
import { ThemeProvider } from "styled-components";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Pretendard",
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mbti" element={<MBTITest />} />
          <Route path="/mbti/result" element={<MBTIResult />} />
          <Route path="/mbti/result/all" element={<MBTIResultAll />} />
          <Route path="/survey" element={<SurveyTest />} />
          <Route path="/survey/result" element={<SurveyResult />} />
        </Routes>
      </ThemeProvider>
    </ConfigProvider>
  );
}
