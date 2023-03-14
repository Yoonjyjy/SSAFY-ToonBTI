import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import styled from "styled-components";
import "./App.css";
import { Header, SocialLogin } from './components';
import { Home } from "./pages";

function App() {

  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className="app">
      <Header modal={modal} setModal={setModal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="redirect" element={<SocialLogin />} />
      </Routes>
    </div>
  );
}


export default App;
