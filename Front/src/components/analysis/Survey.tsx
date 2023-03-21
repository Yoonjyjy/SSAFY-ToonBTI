import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ItemList from "./ItemList";
// import SearchBar from "../common/SearchBar";

const mockdata = [
  {
    id: 1,
    name: "호랑이행님1",
    imgUrl: "imgUrl",
  },
  {
    id: 2,
    name: "호랑이행님2",
    imgUrl: "imgUrl",
  },
  {
    id: 3,
    name: "호랑이행님3",
    imgUrl: "imgUrl",
  },
  {
    id: 4,
    name: "호랑이행님4",
    imgUrl: "imgUrl",
  },
  {
    id: 5,
    name: "호랑이행님5",
    imgUrl: "imgUrl",
  },
  {
    id: 6,
    name: "호랑이행님5",
    imgUrl: "imgUrl",
  },
];

/**
 * 독자 유형 테스트 페이지
 * @returns
 */

interface SurveyProps {
  setComp: React.Dispatch<React.SetStateAction<number>>;
}

export default function Survey({ setComp }: SurveyProps) {
  const [list, setList] = useState<SurveyItemType[]>(
    mockdata.map((e) => ({ ...e, clicked: false }))
  );

  const [cnt, setCnt] = useState<number>(0);
  function handleClick() {
    setComp((prev) => prev + 1);
  }

  useEffect(() => {
    let cnt = 0;
    list.map((item) => {
      if (item.clicked === true) {
        cnt += 1;
      }
    });
    setCnt(cnt);
  }, [list]);

  return (
    <>
      <Title>웹툰 취향 분석 테스트</Title>
      <p>지금까지 재미있게 봤던 웹툰들을 선택해주세요.</p>
      <RightDiv>
        <RightP>
          선택한 웹툰 <CountSpan>{cnt}</CountSpan>개
        </RightP>
      </RightDiv>
      <ItemList itemList={list} setList={setList} />
      <button onClick={() => handleClick()}>다음으로</button>
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
  font-size: 3rem;
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
