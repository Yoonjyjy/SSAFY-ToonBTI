import React, { useState } from "react";
import { Survey, KeywordSurvey } from "../components/survey";

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

export default function SurveyPage() {
  const [comp, setComp] = useState<number>(0);
  const [dataList, setDataList] = useState<SurveyItemType[]>(
    mockdata.map((e) => ({ ...e, clicked: false }))
  );
  const [keywordList, setKeywordList] = useState<KeywordType[]>([]);
  return (
    <>
      {comp === 0 && (
        <>
          <Survey
            setComp={setComp}
            dataList={dataList}
            setDataList={setDataList}
          />
        </>
      )}
      {comp === 1 && (
        <>
          <KeywordSurvey
            keywordList={keywordList}
            setKeywordList={setKeywordList}
          />
        </>
      )}
    </>
  );
}
