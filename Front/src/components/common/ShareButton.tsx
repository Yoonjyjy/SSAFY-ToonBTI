import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import kakaoImg from "../../assets/kakao.png";
import urlImg from "../../assets/url.png";

interface PropType {
  text: string;
  src: string;
  param: string;
}

export default function ShardButton(props: PropType) {
  const url = props.src + "/" + props.param;

  function clickCopyHandler() {
    navigator.clipboard.writeText(url).then((res) => {
      alert("주소가 복사되었습니다!");
    });
  }

  const shareKakao = () => {
    window.Kakao.Link.sendCustom({
      templateId: 91723, // 내가 만든 템플릿 아이디를 넣어주면 된다
      templateArgs: {
        param: `${props.param}`,
      },
    });
  };

  return (
    <StyledDiv>
      <b>{props.text}</b>
      <StyledDiv>
        <StyledImg src={urlImg} onClick={clickCopyHandler} />
        <StyledImg src={kakaoImg} onClick={shareKakao} />
      </StyledDiv>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  line-height: 3rem;
`;

const StyledImg = styled.img`
  height: 50px;
  padding: 0px 5px;
`;
