import React from "react";
import styled from "styled-components";
import kakaoImg from "../../assets/kakao.png";
import urlImg from "../../assets/url.png";
import { Mbti } from "../../gql/graphql";

/**
 * type
 * ex) 유형 결과 테스트에서는 "LSEA"
 * 최종 취향 분석 결과는 uuid
 */
interface PropType {
  text: string;
  src: string;
  param: string;
  type: Mbti | number;
}

export default function ShareButton(props: PropType) {
  const url = props.src + "/" + props.param + "/" + props.type;
  const newParam = props.param + "/" + props.type;

  function clickCopyHandler() {
    navigator.clipboard.writeText(url).then((res) => {
      alert("주소가 복사되었습니다!");
    });
  }

  const shareKakao = () => {
    window.Kakao.Link.sendCustom({
      templateId: 91723, // 내가 만든 템플릿 아이디를 넣어주면 된다
      templateArgs: {
        param: newParam,
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
