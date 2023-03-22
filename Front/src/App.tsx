import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SurveyResult, SurveyTest, Home, MBTIResult, MBTITest } from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mbti" element={<MBTITest />} />
      <Route path="/mbti/result" element={<MBTIResult />} />
      <Route path="/survey" element={<SurveyTest />} />
      <Route path="/survey/result" element={<SurveyResult />} />
    </Routes>
  );
}
