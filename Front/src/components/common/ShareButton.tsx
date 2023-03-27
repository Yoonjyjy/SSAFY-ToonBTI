import React from "react";
import { Button } from "antd";
import styled from "styled-components";

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
      {props.text}
      <StyledButton onClick={clickCopyHandler}>텍스트 복사</StyledButton>
      <StyledButton onClick={shareKakao}>카카오톡 공유</StyledButton>
      {/* <button onClick={shareKakao}>
        <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
          alt="카카오링크 보내기 버튼"
        />
      </button> */}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  line-height: 4rem;
`;

const StyledButton = styled(Button)`
  width: 50%;
  height: 3rem;
`;
