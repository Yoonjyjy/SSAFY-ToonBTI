import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import ItemList from "../common/ItemList";
import SearchBar from "../common/SearchBar";

const getResults = gql`
  query getResults {
    results {
      id
    }
  }
`;

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
];

/**
 * 독자 유형 테스트 페이지
 * @returns
 */
const Survey = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [list, setList] = useState<SurveyItemType[]>(
    mockdata.map((e) => ({ ...e, clicked: false }))
  ); 

  return (
    <>
      {/* <SearchBar
        type="keyword_search"
        keyword={keyword}
        setKeyword={setKeyword}
      /> */}
      <ItemList itemList={list} setList={setList} />
    </>
  );
};

export default Survey;

/**
 * 아이템을 누르면 해당 아이템과 관련된 아이템들 가져오기
 * - 이미 선택한 아이템들은 가져오면 안된다? 중복 안돼
 * - 몇개의 아이템을 가져올 것인가?  3개
 * - 부드러운 애니메이션 필요(추가되는 부분에 대한 슬라이드 animation)
 * - 연관 아이템이란 무엇인가? 장르인가 상세 태그인가
 */
