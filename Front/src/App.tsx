import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
