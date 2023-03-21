import React, { useState } from "react";
import styled from "styled-components";
import { Survey } from "../components/analysis";
import capture from "../assets/capture.png";

// const isLogin = localStorage.getItem('token') ? true : false
export default function Home() {
  const [comp, setComp] = useState(0);

  const handleClick = () => {
    setComp(comp + 1);
  };

  return (
    <div className="Home">
      <>
        {comp === 0 && (
          <div>
            <Title>웹툰 독자 유형 테스트</Title>
            <ImageLogo imgUrl={capture} />
            <button onClick={handleClick}>
              <b>시작하기</b>
              <p>지금까지 {}명이 참여했어요!</p>
            </button>
          </div>
        )}
        {comp === 1 && <Survey />}
      </>
    </div>
  );
}
//FIXME: 
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`

const ImageLogo = styled.div<{ imgUrl: string }>`
  width: 300px;
  background-image: url(${(props) => props.imgUrl});
  background-size: contain;
  background-position: center;
`;
