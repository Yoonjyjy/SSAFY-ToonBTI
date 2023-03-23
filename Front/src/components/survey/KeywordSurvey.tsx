import { Button, Space } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import Text from "../common/Text";

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

  function handleSubmit(arr: KeywordType[]) {
    arr.map((item) => {
      console.log(item.keyword);
    });
  }
  function handleEnter(event: React.KeyboardEvent) {
    if (event.key === "Enter" && value !== "") {
      setKeywordList((prev) => [
        ...prev,
        { id: keywordList.length + 1, keyword: value },
      ]);
      setValue("");
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    handleSubmit(keywordList);
  }
  return (
    <>
      <p style={{ color: "black" }}>
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
        <AddButton type="text" onClick={addList}>
          추가
        </AddButton>
        <KeywordListBox direction="vertical">
          {keywordList?.map((item, idx) => {
            return (
              <Text type="keyword" key={idx}>
                {item.keyword}
              </Text>
            );
          })}
        </KeywordListBox>
        <BtnContainer direction="vertical">
          {keywordList.length === 0 ? (
            <StyledButton onClick={submit}>건너뛰기</StyledButton>
          ) : (
            <StyledButton disabled>건너뛰기</StyledButton>
          )}
          {keywordList.length === 0 ? (
            <StyledButton disabled>다음으로</StyledButton>
          ) : (
            <StyledButton onClick={submit}>다음으로</StyledButton>
          )}
        </BtnContainer>
      </form>
    </>
  );
}

const Input = styled.input`
  border-radius: 4px;
  background-color: #f5f5f5;
  border: none;
  width: 80%;
  margin: 0 0.25rem 0 0;
  padding: 0.74rem 1rem;
`;
const AddButton = styled(Button)`
  background-color: #1890ff;
  color: #e3e4e6;
  margin: 0;
  height: 2.5rem;
`;
const KeywordListBox = styled(Space)`
  width: 100%;
  gap: 0.5rem;
  margin: 1.5rem auto 0 auto;
  max-height: 450px;
  overflow-y: scroll;
`;
const BtnContainer = styled(Space)`
  line-height: 4rem;
  width: 90%;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 3rem;
`;
