import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import styled from "styled-components";
import "./App.css";
import { GoogleOauth2Login, Header, KakaoOauth2Login, NaverOauth2Login } from './components';
import { Home } from "./pages";

function App() {

  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className="app">
      <Header modal={modal} setModal={setModal} />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/oauth2/code/kakao" element={<KakaoOauth2Login />} />
        <Route path="/oauth2/code/naver" element={<NaverOauth2Login />} />
        <Route path="/oauth2/code/google" element={<GoogleOauth2Login />} /> */}
      </Routes>
    </div>
  );
}


export default App;
