import React from "react";
import { Typography } from "antd";

const { Title } = Typography;
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
      <StyledHeader level={5}>{props.text}</StyledHeader>
      <StyledImage onClick={clickCopyHandler} src="/url.png" />
      <StyledImage onClick={shareKakao} src="/kakao.png" />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  line-height: 4rem;
  // margin: 30px;
`;

const StyledImage = styled.img`
  height: 3rem;
  margin: 5px;
`;

const StyledHeader = styled(Title)`
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  margin: 20px;
  // height: 3rem;
`;
