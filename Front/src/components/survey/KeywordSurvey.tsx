import { Button, Space } from "antd";
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
  const [value, setValue] = useState("");
  function addList() {
    setKeywordList((prev) => [
      ...prev,
      { id: keywordList.length + 1, keyword: value },
    ]);
    setValue("");
  }

  function handleSubmit() {
    keywordList.map((item) => {
      console.log(item.keyword);
    });
  }
  function handleEnter(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      setKeywordList((prev) => [
        ...prev,
        { id: keywordList.length + 1, keyword: value },
      ]);
      setValue("");
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
  }
  return (
    <>
      <Title>웹툰 취향 분석 테스트</Title>
      <p>
        즐겨보는 웹툰의 분위기나 장르를 입력해보세요.
        <br />더 자세한 결과를 얻을 수 있어요.
      </p>
      <form onSubmit={submit}>
        <Input
          type="text"
          placeholder="ex) 잔잔한, 힐링"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={(e) => handleEnter(e)}
        />
        <AddButton type="button" onClick={addList}>
          추가
        </AddButton>
        <div>
          {keywordList?.map((item) => {
            return <p key={item.id}>{item.keyword}</p>;
          })}
        </div>
        <BtnContainer>
          <StyledButton onClick={submit}>건너뛰기</StyledButton>
          <StyledButton onClick={submit}>다음으로</StyledButton>
        </BtnContainer>
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
const BtnContainer = styled(Space)`
  line-height: 4rem;
  width: 100%;
  position: fixed;
  bottom: 20px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 3rem;
`;
