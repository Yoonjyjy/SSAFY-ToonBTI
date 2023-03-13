import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import styled from "styled-components";
import "./App.css";
import { Header, Modal } from "./components";
import { Home } from "./pages";
function App() {
  const [modal, setModal] = useState<boolean>(false);
  const [type, setType] = useState<String>("");
  const [url, setUrl] = useState<String>("");

  return (
    <AppDiv>
      <Header modal={modal} setModal={setModal}/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {modal && 
        <Modal 
          type={type} 
          modal={modal} 
          setModal={setModal} 
          url={url}/>
      }
    </AppDiv>
  );
}

const AppDiv = styled.div`

`

export default App;
