import React, { useEffect, useReducer, useRef, useState } from "react";
import { Typography } from "antd";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { Layout, SearchBar } from "../components/common";
import { NBTI_WEBTOON } from "../api/survey";
import { Survey } from "../components/survey";
import Text from "../components/common/Text";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_WEBTOON } from "../api/survey";
import { django } from "../api";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

enum ActionKind {
  FETCH_DATA_LIST = "fetchdatalist",
  CLICK_AN_ITEM = "clickanitem",
  FETCH_RELATIVE_ITEM_LIST = "fetchrelativeitemlist",
  FETCH_ADDITIONAL_DATA_LIST = "fetchqadditionaldatalist",
}
interface FormDataType {
  addedDataList: SurveyItemType[];
  dataList: SurveyItemType[];
  keywordList: KeywordType[];
  clickedList: SurveyItemType[];
}

interface ActionType {
  type: ActionKind;
  payload?: {
    offset?: number;
    addedDataList?: SurveyItemType[];
    dataList?: SurveyItemType[];
    itemId?: string;
    keyword?: KeywordType;
  };
}

function reducer(state: FormDataType, action: ActionType): FormDataType {
  const { type, payload } = action;

  switch (type) {
    // 첫번째 데이터 불러오기
    case ActionKind.FETCH_DATA_LIST: {
      if (!payload?.dataList) return state;
      return {
        ...state,
        dataList: [...payload.dataList.map((e) => ({ ...e, clicked: false }))],
      };
    }
    // 웹툰 클릭시 데이터 클릭 표시
    case ActionKind.CLICK_AN_ITEM: {
      if (!payload?.itemId) return state;
      const newDataList = [...state.dataList].map((el) => {
        if (el.webtoonId === payload.itemId) {
          el = { ...el, clicked: !el.clicked };
        }
        return el;
      });
      // clickedList에서 삭제 / push
      return { ...state, dataList: newDataList };
    }

    // 웹툰 클릭시 관련 웹툰 불러오기
    // case ActionKind.FETCH_RELATIVE_ITEM_LIST: {
    //   if (!payload?.itemId) return state;
    //   const newDataList = [...state.dataList];
    //   const clickedIndex = newDataList.findIndex(
    //     (el) => el.webtoonId === payload.itemId
    //   );
    //   // TODO: fetch relative item list
    //   if (state.dataList[clickedIndex].clicked === true) {
    //     newDataList.splice(
    //       clickedIndex + 1,
    //       0,
    //       ...payload?.addedDataList.map((e) => ({
    //         ...e,
    //         webtoonId: Math.random.toString(),
    //         clicked: false,
    //       }))
    //     );
    //   }
    //   return { ...state, dataList: newDataList };
    // }

    // 웹툰 추가로 받아오기
    case ActionKind.FETCH_ADDITIONAL_DATA_LIST: {
      if (!payload?.addedDataList) {
        return state;
      }
      const new_data = payload?.addedDataList.map((el) => ({
        ...el,
        clicked: false,
      }));
      const newDataList = [...state.dataList, ...new_data];
      console.log(newDataList);
      return { ...state, dataList: newDataList };
    }

    default:
      return state;
  }
}

const initialFormData: FormDataType = {
  dataList: [],
  addedDataList: [],
  keywordList: [],
  clickedList: [],
};

export default function SurveyTest() {
  const navigate = useNavigate();
  const [formData, dispatch] = useReducer(reducer, { ...initialFormData });
  const offsetRef = useRef<number>(0);
  const [getWebtoons, { error: errorSearch, data: dataSearch }] = useLazyQuery(
    SEARCH_WEBTOON,
    {
      client: django,
    }
  );

  const [
    getMoreWebtoons,
    {
      error: fetchMoreDataError,
      loading: fetchMoreDataLoading,
      data: fetchMoreData,
    },
  ] = useLazyQuery(NBTI_WEBTOON, {
    variables: {
      nbtiPk: 17,
      offset: offsetRef.current,
    },
    client: django,
  });

  // FIXME: too many re-renders
  if (fetchMoreDataError) {
    console.log("fetchMoreDataError", fetchMoreDataError);
  }
  if (fetchMoreDataLoading) {
    console.log("fetchMoreDataLoading", fetchMoreDataLoading);
  }
  if (fetchMoreData) {
    fetchAdditionalData(fetchMoreData?.nbtiWebtoon as SurveyItemType[]);
  }

  const { data, error, loading } = useQuery(NBTI_WEBTOON, {
    variables: {
      nbtiPk: 17,
      offset: offsetRef.current,
    },
    client: django,
  });
  if (error) {
    console.log("err", error);
  }
  if (loading) {
    console.log("loading");
  }

  useEffect(() => {
    if (data?.nbtiWebtoon) {
      console.log("useEffec", data?.nbtiWebtoon);
      fetchDataList(data?.nbtiWebtoon as SurveyItemType[]);
    }
  }, [data]);

  function fetchDataList(dataList: SurveyItemType[]) {
    dispatch({ type: ActionKind.FETCH_DATA_LIST, payload: { dataList } });
  }

  function nextHandler() {
    console.log("Next handler");
  }

  function itemClickHandler(itemId: string) {
    dispatch({ type: ActionKind.CLICK_AN_ITEM, payload: { itemId } });
    //TODO: relative는 내일~
    // dispatch({
    //   type: ActionKind.FETCH_RELATIVE_ITEM_LIST,
    //   payload: { itemId },
    // });
  }

  //FIXME: 여기서 리렌더링 계속됨
  function fetchAdditionalData(addedDataList: SurveyItemType[]) {
    dispatch({
      type: ActionKind.FETCH_ADDITIONAL_DATA_LIST,
      payload: { addedDataList },
    });
  }

  // 키워드 통해 검색한 웹툰 리스트 데이터 체크용입니다
  // 아래 fetchSearchedData 함수를 마저 작성해주세요
  useEffect(() => {
    console.log("data from keyword", data);
  }, [data]);

  // TODO: add item list to dataList
  function fetchSearchedData(keyword: string) {
    getWebtoons({ variables: { searchName: keyword } });
  }

  // useEffect(() => {
  //   getAdditionalData(offsetRef.current);
  // }, [offsetRef.current]);

  function getAdditionalData(offset: number) {
    console.log("더줘! ", offsetRef.current);
    // const nbtiPk: number | null = Number(localStorage.getItem("nbtiPk"));
    const nbtiPk = 17;
    offsetRef.current = offsetRef.current + 1;
    // TODO: 여기에서 데이터를 불러온 다음에 dispatch를 해야돼
    getMoreWebtoons({
      variables: { nbtiPk: nbtiPk, offset: offsetRef.current },
    });
  }

  if (error) navigate("/404");
  return (
    <Layout
      // type="survey"
      title="웹툰 취향 분석 테스트"
      hasPrevious
    >
      <StyledHeader level={3} style={{ margin: "0px" }}>
        웹툰 취향 분석 테스트
      </StyledHeader>
      <p style={{ margin: "0px" }}>
        지금까지 재미있게 봤던 웹툰들을 선택해주세요.
      </p>
      <SearchBar searchData={fetchSearchedData} />
      <Survey
        dataList={formData.dataList}
        onClickNext={nextHandler}
        onClickItem={itemClickHandler}
        offsetRef={offsetRef}
        fetchAdditionalData={getAdditionalData}
      />
      <button onClick={() => getAdditionalData(offsetRef.current)}>TEST</button>
    </Layout>
  );
}

const StyledHeader = styled(Title)`
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  margin: 0px;
`;
