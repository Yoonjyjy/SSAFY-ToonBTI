import React, { useState } from "react";
import styled from "styled-components";
import { Button, Space, Progress, Typography } from "antd";
import { Layout } from "../components/common";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_QUESTIONS } from "../api/mbti";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";

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
          strokeColor="#FF6C6C"
        />
      </StyledDiv>
      <StyleSpan>
        {data?.getQuestions?.[step].question
          ?.split("\\n")
          .map((line: string) => {
            return <div key={line}>{line}</div>;
          })}
      </StyleSpan>
      {step === 2 ? (
        <img
          src={`/test${step + 1}.jpg`}
          style={{ width: "80%", margin: "auto" }}
        ></img>
      ) : step === 1 || step === 3 || step === 8 || step === 6 ? (
        <img
          src={`/test${step + 1}.jpeg`}
          style={{ width: "80%", margin: "auto" }}
        ></img>
      ) : step === 4 ? (
        <img src={`/test${step + 1}.gif`} style={{}}></img>
      ) : (
        <img src={`/test${step + 1}.png`} style={{}}></img>
      )}

      <BtnContainer direction="vertical">
        {data?.getQuestions?.[step].answersList?.map((el) => {
          if (!el) return <></>;

          return (
            <motion.div key={el} whileTap={{ scale: 1.1 }}>
              <StyledButton
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
            </motion.div>
          );
        })}
      </BtnContainer>
    </Layout>
  );
}

const StyledImage = styled.img<{ url: string }>`
  /* width: 80%; */
  /* height: 100px; */
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: none;
`;

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
  height: 60px;
  white-space: pre-wrap;
  border-radius: 10px;
  //FIXME: 포커싱 이슈 해결 안 됨
  &:focus {
    border: 1px solid #ff6c6c;
  }
  &:active {
    border: 1px solid #ff6c6c;
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
