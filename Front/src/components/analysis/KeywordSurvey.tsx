import React, { useState } from "react";
import styled from "styled-components";

export default function KeywordSurvey() {
  return (
    <>
      <Title>웹툰 취향 분석 테스트</Title>
      <p>
        즐겨보는 웹툰의 분위기나 장르를 입력해보세요.
        <br />더 자세한 결과를 얻을 수 있어요.
      </p>
      <form>
        <Input type="text" placeholder="ex) 잔잔한, 힐링" />
        <AddButton>추가</AddButton>
      </form>
    </>
  );
}

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 500;
`;
const Input = styled.input`
  border-radius: 4px;
  background-color: lightgrey;
  border: none;
  margin: 0;
  padding: 2px 1rem;
`;
const AddButton = styled.button`
  color: #1890ff;
  margin: 0;
`;
