import React, { useRef, useState } from "react";
import styled from "styled-components";

interface KeywordSurveyProps {
  keywordList: KeywordType[];
  setKeywordList: React.Dispatch<React.SetStateAction<KeywordType[]>>;
}

export default function KeywordSurvey({
  keywordList,
  setKeywordList,
}: KeywordSurveyProps) {
  const inputRef = useRef<string>(null);
  function addList() {
    const keyword = inputRef.current?.value;
    setKeywordList((prev) => [
      ...prev,
      { id: keywordList.length + 1, keyword: keyword },
    ]);
  }
  return (
    <>
      <Title>웹툰 취향 분석 테스트</Title>
      <p>
        즐겨보는 웹툰의 분위기나 장르를 입력해보세요.
        <br />더 자세한 결과를 얻을 수 있어요.
      </p>
      <form>
        <Input type="text" placeholder="ex) 잔잔한, 힐링" ref={inputRef} />
        <AddButton onClick={addList}>추가</AddButton>
        <div>{}</div>
        <ButtonOuterBox>
          <Buttons>건너뛰기</Buttons>
          <Buttons>다음으로</Buttons>
        </ButtonOuterBox>
      </form>
    </>
  );
}

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
`;
const Input = styled.input`
  border-radius: 4px;
  background-color: #e3e4e6;
  border: none;
  width: 60%;
  margin: 0 0.25rem 0 0;
  padding: 0.74rem 1rem;
`;
const AddButton = styled.button`
  background-color: #1890ff;
  color: #e3e4e6;
  margin: 0;
`;
const ButtonOuterBox = styled.div`
  width: 100%;
  position: fixed;
  bottom: 20px;
`;
const Buttons = styled.button`
  width: 90%;
  margin: 0.55rem 0;
`;
