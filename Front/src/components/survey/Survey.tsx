import React from "react";
import styled from "styled-components";
import ItemList from "./ItemList";
// import SearchBar from "../common/SearchBar";

/**
 * 독자 유형 테스트 페이지
 * @returns
 */

interface SurveyProps {
  onClickNext: () => void;
  onClickItem: (itemId: number) => void;
  dataList: SurveyItemType[];
}

export default function Survey(props: SurveyProps) {
  const cnt: number = props.dataList
    .map((el) => (el.clicked ? 1 : 0))
    .reduce((a: number, b) => a + b, 0);

  return (
    <>
      <Title>웹툰 취향 분석 테스트</Title>
      <p>지금까지 재미있게 봤던 웹툰들을 선택해주세요.</p>
      <RightDiv>
        <RightP>
          선택한 웹툰 <CountSpan>{cnt}</CountSpan>개
        </RightP>
      </RightDiv>
      <ItemList dataList={props.dataList} onClickItem={props.onClickItem} />
      <button onClick={props.onClickNext}>다음으로</button>
    </>
  );
}

/**
 * 아이템을 누르면 해당 아이템과 관련된 아이템들 가져오기
 * - 이미 선택한 아이템들은 가져오면 안된다? 중복 안돼
 * - 몇개의 아이템을 가져올 것인가?  3개
 * - 부드러운 애니메이션 필요(추가되는 부분에 대한 슬라이드 animation)
 * - 연관 아이템이란 무엇인가? 장르인가 상세 태그인가
 */
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
`;
const RightDiv = styled.div`
  display: flex;
  justify-content: end;
`;
const RightP = styled.p`
  padding: 0;
  margin: 0;
`;
const CountSpan = styled.span`
  color: #1890ff;
  font-weight: 700;
`;
