import React from "react";
import { Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HomeBackgroundImage, Layout } from "../components/common";
import { useQuery } from "@apollo/client";
import { COUNT_ALL_USERS } from "../api/mbti";
import { Button } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();
  const { data, error } = useQuery(COUNT_ALL_USERS);

  if (error) navigate("/404");

  return (
    <div style={{ overflow: "hidden", height: "100vw", width: "100vw" }}>
      <HomeBackgroundImage />
      <Layout type="home">
        <StyledBox>
        <StyledHeader>
          당신이
          <br /> 웹툰 주인공이라면?
        </StyledHeader>
        {/* <StyledPlayer autoplay loop src="/home.json"></StyledPlayer> */}
        <StyledP>
          독자 유형 테스트를 통해 <br />
          당신에게 어울리는 웹툰 캐릭터와 웹툰을 <br />
          추천해드릴게요!{" "}
        </StyledP>
        </StyledBox>
        <BtnContainer>
          <Button
            onClick={() => navigate("/mbti")}
            variant="contained"
            sx={{
              width: "100%",
              height: "80px",
              backgroundColor: `#FF6C6C`,
              borderRadius: "50px",
              zIndex: "300",
              fontSize: "0.8rem",
              display: "block",
              color: "white",
              ":active": {
                backgroundColor: `#ff4646`,
              },
            }}
          >
            <SpanTitle>시작하기</SpanTitle>
            <div>지금까지 {data?.countAllUsers} 명이 참여 했어요!</div>
          </Button>
          {/* </StyledButton> */}
        </BtnContainer>

        {/* <StyleSpan>
          @SSAFY 8기 특화 3반 A302
          <br></br>
          FE: 김태원 노현정 윤지영 / BE: 권성은 김진호 전주영
        </StyleSpan> */}
      </Layout>
    </div>
  );
}


const StyledBox = styled.div`
<<<<<<< HEAD
  position: absolute;
  right: 0;
  left: 0;
  top: 30%;
`;
=======
position: absolute;
right: 0;
left: 0;
top: 40%;
`
>>>>>>> fd73f39 (style : design 작업중)
const StyledP = styled.p`
  color: white;
  font-size: 12px;
  z-index: 300;
  line-height: 1.2rem;
`;

const SpanTitle = styled(Space)`
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 300;
`;

const BtnContainer = styled.div`
  line-height: 4rem;
  width: 80%;
  margin: 0 auto;
  position: fixed;
  bottom: 7%;
  left: 0;
  right: 0;
`;
const StyledHeader = styled.h1`
  color: white;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 10px;
  line-height: 2rem;
  z-index: 300;
`;

const StyleSpan = styled.span`
  margin-top: 2rem;
  white-space: pre-line;
  display: block;
  color: lightgrey;
  z-index: 300;

  position: fixed;
  bottom: 3%;
  left: 0;
  right: 0;
`;
