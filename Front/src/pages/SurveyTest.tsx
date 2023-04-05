import React, { useRef, useState } from "react";
import { InputRef, Typography } from "antd";
import styled from "styled-components";
import { Layout, SearchBar } from "../components/common";
import { GET_ADDITIONAL_3_WEBTOONS, NBTI_WEBTOON } from "../api/survey";
import { Survey } from "../components/survey";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_WEBTOON } from "../api/survey";
import { django } from "../api";
import { GetAdditional3WebtoonsQuery, Webtoon } from "../gql/graphql";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function SurveyTest() {
  const navigate = useNavigate();
  const keywordRef = useRef<InputRef>(null);
  const [webtoons, setWebtoons] = useState<Webtoon[]>([]);
  const [webtoonsByKeyword, setWebtoonsByKeyword] = useState<Webtoon[]>([]);
  const [result, setResult] = useState<Map<number, boolean>>(new Map());
  const prevClickedItemId = useRef<number | null>(null);

  const [searchWebtoons] = useLazyQuery(SEARCH_WEBTOON, {
    client: django,
    onCompleted(data) {
      setWebtoonsByKeyword(data.searchWebtoon as Webtoon[]);
    },
  });

  const [getWebtoons, { error: webtoonsError }] = useLazyQuery(NBTI_WEBTOON, {
    client: django,
    onCompleted(data) {
      setWebtoons((prev) => {
        const newResult = new Map();
        const newWebtoons = [...prev];
        for (const item of prev) {
          newResult.set(item.webtoonId, false);
        }
        for (const item of data.nbtiWebtoon as Webtoon[]) {
          if (item.webtoonId && !newResult.has(item.webtoonId)) {
            newResult.set(item.webtoonId, false);
            newWebtoons.push(item);
          }
        }
        setResult(newResult);
        return newWebtoons;
      });
    },
  });

  const [getRelative3Webtoons] = useLazyQuery(GET_ADDITIONAL_3_WEBTOONS, {
    client: django,
    onCompleted(data) {
      if (keywordRef.current?.input?.value) {
        addRelatives(setWebtoonsByKeyword, data, webtoonsByKeyword);
        return;
      }
      addRelatives(setWebtoons, data, webtoons);
    },
  });

  function addRelatives(
    setter: React.Dispatch<React.SetStateAction<Webtoon[]>>,
    data: GetAdditional3WebtoonsQuery,
    toons: Webtoon[]
  ) {
    setter((prev) => {
      const newRelatives = [];
      const newResult = new Map(result);
      for (let i = 0; i < toons.length; i++) {
        if (
          toons[i].webtoonId &&
          toons[i].webtoonId === prevClickedItemId.current
        ) {
          for (const item of data.additionalWebtoon as Webtoon[]) {
            if (newResult.has(item.webtoonId as number)) continue;

            newRelatives.push(item);
            newResult.set(item.webtoonId as number, false);
          }
          setResult(newResult);
          const newWebtoons = [...prev];
          newWebtoons.splice(i + 1, 0, ...newRelatives);
          return newWebtoons;
        }
      }
      return prev;
    });
  }

  function loadWebtoonsHandler(offset: number) {
    getWebtoons({
      variables: {
        nbtiPk: Number(localStorage.getItem("nbtiPk")),
        offset: offset,
      },
    });
  }

  function clickItemHandler(itemId: number, genreId: number) {
    prevClickedItemId.current = itemId;
    setResult((prev) => {
      return new Map(prev).set(itemId, !prev.get(itemId));
    });
    getRelative3Webtoons({
      variables: { webtoonPk: itemId, genrePk: genreId },
    });
    console.log("click item item: ", prevClickedItemId.current, genreId);
  }

  if (webtoonsError) navigate("/404");

  const cnt = (() => {
    let count = 0;
    const it = result.values();
    for (const clicked of it) count += clicked ? 1 : 0;
    return count;
  })();

  return (
    <Layout type="survey" title="웹툰 취향 분석 테스트" hasPrevious>
      <StyledHeader level={3} style={{ margin: "0px" }}>
        웹툰 취향 분석 테스트
      </StyledHeader>
      <p style={{ margin: "0px" }}>
        지금까지 재미있게 봤던 웹툰들을 선택해주세요.
      </p>
      <SearchBar
        ref={keywordRef}
        searchData={(keyword) =>
          searchWebtoons({ variables: { searchName: keyword } })
        }
      />
      <Survey
        cnt={cnt}
        surveyList={
          keywordRef.current?.input?.value ? webtoonsByKeyword : webtoons
        }
        result={result}
        onClickItem={clickItemHandler}
        onScroll={loadWebtoonsHandler}
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
