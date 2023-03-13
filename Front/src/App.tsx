import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import styled from "styled-components";
import "./App.css";
import { Header, Modal } from './components';
import { Home } from "./pages";
function App() {
  const [modal, setModal] = useState<boolean>(false);
  const [type, setType] = useState<String>("");
  const [url, setUrl] = useState<String>("");

  return (
    <AppDiv>
      <Header modal={modal} setModal={setModal} setType={setType} setUrl={setUrl}/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AppDiv>
  );
}

const AppDiv = styled.div`

`

export default App;
