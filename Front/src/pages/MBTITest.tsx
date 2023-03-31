import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Space, Progress, Typography } from "antd";
import { Layout } from "../components/common";
import { useNavigate } from "react-router-dom";
// import { useQuery } from "@apollo/client";
// import { GET_QUESTIONS } from "../api/mbti";
import { Player } from "@lottiefiles/react-lottie-player";
import { useLocation } from "react-router";

const { Text } = Typography;

export default function MBTITest() {
  const navigate = useNavigate();
  //FIXME: 데이터 관리
  // const { error, data: datasth } = useQuery(GET_QUESTIONS);
  // console.log("data", datasth);

  const { state } = useLocation();
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);

  // console.log(state);

  useEffect(() => {
    console.log("answers: ", answers);
  }, [answers]);

  const handleSelect = (answer: string) => {
    if (step == 9) {
      setAnswers([...answers, answer.charAt(0)]);
      clickHandler();
    } else if (step == 0 || step == 2) {
      setStep(step + 1);
    } else {
      setAnswers([...answers, answer.charAt(0)]);
      setStep(step + 1);
    }
  };

  function clickHandler() {
    /** TODO: */
    // console.log(answers);
    navigate("/mbti/result");
  }

  // if (error) {
  //   navigate("/404");
  // }

  return (
    <Layout
      title="나의 웹툰 독자 유형 테스트"
      hasPrevious
      // type="MbtiTest"
    >
      <StyledDiv>
        <StyledProgress>
          <StyleSpan>{state[step].questionNo} / 10</StyleSpan>
        </StyledProgress>
        <Progress
          percent={state[step].questionNo * 10}
          showInfo={false}
          strokeColor="#FFB202"
        />
      </StyledDiv>
      <StyleSpan>
        {state[step].question.split("\\n").map((line: string) => {
          return <div key={line}>{line}</div>;
        })}
      </StyleSpan>
      <StyledPlayer
        autoplay
        loop
        src={"/" + state[step].questionNo + ".json"}
      ></StyledPlayer>
      <BtnContainer direction="vertical">
        {state[step].answersList.map((el: string) => {
          return (
            <StyledButton
              key={el}
              onClick={() => {
                handleSelect(el);
              }}
            >
              {el
                .split(". ")[1]
                .split("\\n")
                .map((line: string) => {
                  return <div key={line}>{line}</div>;
                })}
            </StyledButton>
          );
        })}
      </BtnContainer>
    </Layout>
  );
}

const StyledPlayer = styled(Player)`
  width: 75vw;
  height: 40vw;
  max-width: 800px;
  max-height: 800px;
`;

const BtnContainer = styled(Space)`
  height: 100%
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 50px;
  white-space: pre-wrap;
  border-radius: 10px;
`;

const StyledProgress = styled(Text)`
  text-align: right;
  word-break: keep-all;

  span {
    font-weight: 600;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  // gap: 0.5rem;
`;

const StyleSpan = styled.span`
  white-space: pre-line;
  display: block;
`;
