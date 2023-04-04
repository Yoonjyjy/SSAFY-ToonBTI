import React, { useEffect, useRef, useState } from "react";
import { InputRef, Typography } from "antd";
import styled from "styled-components";
import { Layout, SearchBar } from "../components/common";
import { NBTI_WEBTOON } from "../api/survey";
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

// TODO: infinite scroll & fetch 3 relative items
export default function SurveyTest() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const offsetRef = useRef<number>(0);
  const keywordRef = useRef<InputRef>(null);
  const [surveyList, setSurveyList] = useState<SurveyItemType[]>([]);
  const [surveyListByKeyword, setSurveyListByKeyword] = useState<
    SurveyItemType[]
  >([]);

  useEffect(() => {
    getWebtoons({
      variables: {
        nbtiPk: state.nbtiPk,
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
      nbtiPk: state.nbtiPk,
      offset: offsetRef.current,
    },
    client: django,
    onCompleted(data) {
      const newSurveyList = data.nbtiWebtoon?.map((el) => ({
        ...el,
        clicked: false,
      })) as SurveyItemType[];

      setSurveyList((prev) => [...prev, ...newSurveyList]);
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
      variables: { nbtiPk: nbtiPk, offset: offsetRef.current },
    });
  }

  function clickItemHandler(itemId: number) {
    setSurveyList((prev) =>
      prev.map((el) => {
        if (el.webtoonId === itemId) el.clicked != el.clicked;
        return el;
      })
    );
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

const StyledHeader = styled(Title)`
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  margin: 0px;
`;
