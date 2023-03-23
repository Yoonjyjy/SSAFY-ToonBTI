import { Button, Input, Space } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import Text from "../common/Text";

interface KeywordSurveyProps {
  keywordList: KeywordType[];
  addKeyword: (value: KeywordType) => void;
}

export default function KeywordSurvey({
  keywordList,
  addKeyword,
}: KeywordSurveyProps) {
  const [value, setValue] = useState("");
  function addList() {
    addKeyword({
      id: 1,
      keyword: value,
    });
    setValue("");
  }

  function handleSubmit(arr: KeywordType[]) {
    arr.map((item) => {
      console.log(item.keyword);
    });
  }
  function handleEnter(event: React.KeyboardEvent) {
    if (event.key === "Enter" && value !== "") {
      addKeyword({
        id: 1,
        keyword: value,
      });
      setValue("");
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    handleSubmit(keywordList);
  }
  return (
    <>
      <Text type="desc">
        즐겨보는 웹툰의 분위기나 장르를 입력해보세요.
        <br />더 자세한 결과를 얻을 수 있어요.
      </Text>
      <form onSubmit={submit} style={{ marginTop: "2rem" }}>
        <StyledInput
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
              <div
                key={idx}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Text type="keyword">{item.keyword}</Text>
                <Button danger>del</Button>
              </div>
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

const StyledInput = styled(Input)`
  width: 80%;
  margin: 0 0.25rem 0 0;
`;
const AddButton = styled(Button)`
  background-color: #1890ff;
  color: #ffffff;
  margin: 0;
  height: 2rem;
`;
const KeywordListBox = styled(Space)`
  width: 100%;
  gap: 0.5rem;
  margin: 1.5rem auto 0 auto;
  height: 53vh;
  overflow-y: scroll;
  @media (min-width: 320px) and (max-width: 380px) {
    height: 40vh;
  }
  @media (min-width: 380px) and (max-width: 390px) {
    height: 54vh;
  }
  @media (min-width: 400px) and (max-width: 500px) {
    height: 56vh;
  }
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
