import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  AnalysisResult,
  AnalysisTest,
  Home,
  MBTIResult,
  MBTITest,
} from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mbti" element={<MBTITest />} />
      <Route path="/mbti/result" element={<MBTIResult />} />
      <Route path="/analysis" element={<AnalysisTest />} />
      <Route path="/analysis/result" element={<AnalysisResult />} />
    </Routes>
  );
}
