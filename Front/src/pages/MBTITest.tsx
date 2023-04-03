import React, { useState } from "react";
import styled from "styled-components";
import { Button, Space, Progress, Typography } from "antd";
import { Layout } from "../components/common";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_QUESTIONS } from "../api/mbti";
import { Player } from "@lottiefiles/react-lottie-player";

const { Text } = Typography;

export default function MBTITest() {
  const navigate = useNavigate();
  const { error, data } = useQuery(GET_QUESTIONS);

  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);

  function handleSelect(answer: string) {
    if (step == 9) {
      navigate("/mbti/result", { state: [...answers, answer.charAt(0)] });
    } else if (step == 0 || step == 2) {
      setStep(step + 1);
    } else {
      setAnswers([...answers, answer.charAt(0)]);
      setStep(step + 1);
    }
  }

  function clickHandler() {
    /** TODO: */
    navigate("/mbti/result");
  }

  if (error) {
    navigate("/404");
  }

  return (
    <Layout
      title="나의 웹툰 독자 유형 테스트"
      hasPrevious
      // type="MbtiTest"
    >
      <StyledDiv>
        <StyledProgress>
          <StyleSpan>{step + 1} / 10</StyleSpan>
        </StyledProgress>
        <Progress
          percent={(step + 1) * 10}
          showInfo={false}
          strokeColor="#FFB202"
        />
      </StyledDiv>
      <StyleSpan>
        {data?.getQuestions?.[step].question
          ?.split("\\n")
          .map((line: string) => {
            return <div key={line}>{line}</div>;
          })}
      </StyleSpan>
      <StyledPlayer autoplay loop src={`/${step + 1}.json`}></StyledPlayer>
      <BtnContainer direction="vertical">
        {data?.getQuestions?.[step].answersList?.map((el) => {
          if (!el) return <></>;

          return (
            <StyledButton
              key={el}
              className="testButtons"
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
  height: 100%;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 50px;
  white-space: pre-wrap;
  border-radius: 10px;
  //FIXME: 포커싱 이슈 해결 안 됨
  &:focus {
    outline: none;
  }
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
