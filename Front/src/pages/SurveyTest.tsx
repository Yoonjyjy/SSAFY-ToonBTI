import React, { useEffect, useRef, useState } from "react";
import { InputRef, Typography } from "antd";
import styled from "styled-components";
import { Layout, SearchBar } from "../components/common";
import { GET_ADDITIONAL_3_WEBTOONS, NBTI_WEBTOON } from "../api/survey";
import { Survey } from "../components/survey";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_WEBTOON } from "../api/survey";
import { django } from "../api";
import { Webtoon } from "../gql/graphql";
import { useLocation, useNavigate } from "react-router-dom";

const { Title } = Typography;

interface SurveyItemType extends Webtoon {
  clicked: boolean;
}

// TODO: infinite scroll
export default function SurveyTest() {
  const navigate = useNavigate();
  const { state: nbtiPk = 17 } = useLocation(); // default val is 17
  const offsetRef = useRef<number>(0);
  const keywordRef = useRef<InputRef>(null);
  const [surveyList, setSurveyList] = useState<SurveyItemType[]>([]);
  const [surveyListByKeyword, setSurveyListByKeyword] = useState<
    SurveyItemType[]
  >([]);
  const prevClickedItemId = useRef<number | null>(null);

  useEffect(() => {
    getWebtoons({
      variables: {
        nbtiPk,
        offset: offsetRef.current,
      },
    });
  }, []);

  const [searchWebtoons] = useLazyQuery(SEARCH_WEBTOON, {
    client: django,
    onCompleted(data) {
      const newSurveyList = data.searchWebtoon?.map((el) => ({
        ...el,
        clicked: false,
      })) as SurveyItemType[];
      setSurveyListByKeyword(newSurveyList);
    },
  });

  const [getWebtoons, { error: webtoonsError }] = useLazyQuery(NBTI_WEBTOON, {
    variables: {
      nbtiPk,
      offset: offsetRef.current,
    },
    client: django,
    onCompleted(data) {
      const newSurveyList = data.nbtiWebtoon?.map((el) => ({
        ...el,
        clicked: false,
      })) as SurveyItemType[];

      setSurveyList((prev) => uniqueWebtoons([...prev, ...newSurveyList]));
    },
  });

  const [getRelative3Webtoons] = useLazyQuery(GET_ADDITIONAL_3_WEBTOONS, {
    client: django,
    onCompleted(data) {
      if (prevClickedItemId.current) {
        setSurveyList((prev) => {
          const newSurveyList = [...surveyList];
          for (let i = 0; i < newSurveyList.length; i++) {
            if (
              data.additionalWebtoon &&
              newSurveyList[i].webtoonId === prevClickedItemId.current
            ) {
              return uniqueWebtoons(
                newSurveyList,
                data.additionalWebtoon as Webtoon[],
                i + 1
              );
            }
          }
          return prev;
        });
      }
    },
  });

  function fetchSearchedData(keyword: string) {
    // console.log("keyword: ", keyword);
    searchWebtoons({ variables: { searchName: keyword } });
  }

  //FIXME: 여기서 리렌더링 계속됨
  function getAdditionalData(offset: number) {
    console.log("더줘! ", offsetRef.current);
    // const nbtiPk: number | null = Number(localStorage.getItem("nbtiPk"));
    const nbtiPk = 17;
    offsetRef.current = offsetRef.current + 1;
    getWebtoons({
      variables: { nbtiPk, offset: offsetRef.current },
    });
  }

  // FIXME: click a webtoon resulted in by searching (feat. setSurveyListByKeyword)
  function clickItemHandler(itemId: number, genreId: number) {
    setSurveyList((prev) => {
      return prev.map((el) => {
        if (el.webtoonId === itemId) el.clicked = !el.clicked;
        return el;
      });
    });
    prevClickedItemId.current = itemId;
    console.log("click item item: ", prevClickedItemId.current, genreId);
    getRelative3Webtoons({
      variables: { webtoonPk: itemId, genrePk: genreId },
    });
  }

  if (webtoonsError) navigate("/404");

  return (
    <Layout type="survey" title="웹툰 취향 분석 테스트" hasPrevious>
      <StyledHeader level={3} style={{ margin: "0px" }}>
        웹툰 취향 분석 테스트
      </StyledHeader>
      <p style={{ margin: "0px" }}>
        지금까지 재미있게 봤던 웹툰들을 선택해주세요.
      </p>
      <SearchBar ref={keywordRef} searchData={fetchSearchedData} />
      <Survey
        cnt={count(surveyList) + count(surveyListByKeyword)}
        surveyList={
          keywordRef.current?.input?.value ? surveyListByKeyword : surveyList
        }
        onClickItem={clickItemHandler}
        offsetRef={offsetRef}
        fetchAdditionalData={getAdditionalData}
      />
    </Layout>
  );
}

function count(arr: SurveyItemType[]) {
  return arr
    ?.map((el) => (el.clicked ? 1 : 0))
    ?.reduce((a: number, b) => a + b, 0);
}

function uniqueWebtoons(
  arr: SurveyItemType[],
  arrTobeSpliced?: Webtoon[],
  at?: number
): SurveyItemType[] {
  const result = [];
  const set = new Set();
  for (const item of arr) {
    if (set.has(item.webtoonId)) continue;
    set.add(item.webtoonId);
    result.push(item);
  }
  if (arrTobeSpliced && at) {
    const toBe: SurveyItemType[] = [];
    for (const item of arrTobeSpliced) {
      if (set.has(item.webtoonId)) continue;
      set.add(item.webtoonId);
      toBe.push({ ...item, clicked: false });
    }
    result.splice(at, 0, ...toBe);
  }

  // console.log("result: ", result);
  return result;
}

const StyledHeader = styled(Title)`
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  margin: 0px;
`;
