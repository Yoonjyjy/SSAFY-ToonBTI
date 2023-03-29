import React from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
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

export default function App() {
  return (
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
  );
}
