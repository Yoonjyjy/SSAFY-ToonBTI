import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import styled from "styled-components";
import "./App.css";
import { GoogleOauth2Login, Header, KakaoOauth2Login, NaverOauth2Login, SocialLogin } from './components';
import { Home } from "./pages";

function App() {

  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className="app">
      <Header modal={modal} setModal={setModal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/kakao/callback" element={<KakaoOauth2Login />} />
        <Route path="/auth/naver/callback" element={<NaverOauth2Login />} />
        <Route path="/auth/google/callback" element={<GoogleOauth2Login />} />
      </Routes>
    </div>
  );
}


export default App;
