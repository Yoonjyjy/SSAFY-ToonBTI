import React, { useEffect, useReducer } from "react";
import { Typography } from "antd";
import styled from "styled-components";
import { Layout, SearchBar } from "../components/common";
import { Survey } from "../components/survey";
import Text from "../components/common/Text";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_WEBTOON } from "../api/survey";
import { django } from "../api";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const mockdata = [
  { id: 1, name: "호랑이행님1", imgUrl: "imgUrl" },
  { id: 2, name: "호랑이행님2", imgUrl: "imgUrl" },
  { id: 3, name: "호랑이행님3", imgUrl: "imgUrl" },
  { id: 4, name: "호랑이행님4", imgUrl: "imgUrl" },
  { id: 5, name: "호랑이행님5", imgUrl: "imgUrl" },
  { id: 6, name: "호랑이행님5", imgUrl: "imgUrl" },
  { id: 10, name: "호랑이행님1", imgUrl: "imgUrl" },
  { id: 11, name: "호랑이행님2", imgUrl: "imgUrl" },
  { id: 12, name: "호랑이행님3", imgUrl: "imgUrl" },
  { id: 14, name: "호랑이행님4", imgUrl: "imgUrl" },
  { id: 15, name: "호랑이행님5", imgUrl: "imgUrl" },
  { id: 16, name: "호랑이행님5", imgUrl: "imgUrl" },
  { id: 21, name: "호랑이행님1", imgUrl: "imgUrl" },
  { id: 22, name: "호랑이행님2", imgUrl: "imgUrl" },
  { id: 23, name: "호랑이행님3", imgUrl: "imgUrl" },
  { id: 24, name: "호랑이행님4", imgUrl: "imgUrl" },
  { id: 25, name: "호랑이행님5", imgUrl: "imgUrl" },
  { id: 26, name: "호랑이행님5", imgUrl: "imgUrl" },
];

const addedMockData = [
  { id: 7, name: "호랑이행님7", imgUrl: "imgUrl" },
  { id: 8, name: "호랑이행님8", imgUrl: "imgUrl" },
  { id: 9, name: "호랑이행님9", imgUrl: "imgUrl" },
];

enum ActionKind {
  FETCH_DATA_LIST = "fetchdatalist",
  CLICK_AN_ITEM = "clickanitem",
  FETCH_RELATIVE_ITEM_LIST = "fetchrelativeitemlist",
  FETCH_ADDITIONAL_DATA_LIST = "fetchqadditionaldatalist",
}
interface FormDataType {
  dataList: SurveyItemType[];
  keywordList: KeywordType[];
  valid: {
    dataList: boolean;
    keyword: boolean;
  };
  confirmed: boolean;
}

interface ActionType {
  type: ActionKind;
  payload?: {
    dataList?: SurveyItemType[];
    itemId?: number;
    keyword?: KeywordType;
  };
}

function reducer(state: FormDataType, action: ActionType): FormDataType {
  const { type, payload } = action;
  switch (type) {
    case ActionKind.FETCH_DATA_LIST: {
      if (!payload?.dataList) return state;
      // TODO: fetch data list
      // 무슨 용돈지 ? FIXME: 모르겠음
      const isValidated = payload?.dataList.length >= 10;
      const isConfirmed = state.confirmed && isValidated;
      return {
        ...state,
        dataList: { ...payload?.dataList },
        valid: { ...state.valid, dataList: isValidated },
        confirmed: isConfirmed,
      };
    }

    case ActionKind.CLICK_AN_ITEM: {
      if (!payload?.itemId) return state;
      const newDataList = [...state.dataList].map((el) => {
        if (el.id === payload.itemId) {
          el = { ...el, clicked: !el.clicked };
        }
        return el;
      });
      return { ...state, dataList: newDataList };
    }

    case ActionKind.FETCH_RELATIVE_ITEM_LIST: {
      if (!payload?.itemId) return state;
      const newDataList = [...state.dataList];
      const clickedIndex = newDataList.findIndex(
        (el) => el.id === payload.itemId
      );
      // TODO: fetch relative item list
      if (state.dataList[clickedIndex].clicked === true) {
        newDataList.splice(
          clickedIndex + 1,
          0,
          ...addedMockData.map((e) => ({
            ...e,
            id: Math.random(),
            clicked: false,
          }))
        );
      }
      return { ...state, dataList: newDataList };
    }

    case ActionKind.FETCH_ADDITIONAL_DATA_LIST: {
      const new_data = addedMockData.map((el) => ({ ...el, clicked: false }));
      const newDataList = [...state.dataList, ...new_data];
      // TODO: fetch additional data list
      return { ...state, dataList: newDataList };
    }

    default:
      return state;
  }
}

const initialFormData: FormDataType = {
  dataList: mockdata.map((e) => ({ ...e, clicked: false })),
  keywordList: [],
  valid: {
    dataList: false,
    keyword: true,
  },
  confirmed: false,
};

export default function SurveyTest() {
  const navigate = useNavigate();
  const [formData, dispatch] = useReducer(reducer, { ...initialFormData });
  const [getWebtoons, { error, data }] = useLazyQuery(SEARCH_WEBTOON, {
    client: django,
  });

  function nextHandler() {
    console.log("Next handler");
  }

  function itemClickHandler(itemId: number) {
    dispatch({ type: ActionKind.CLICK_AN_ITEM, payload: { itemId } });
    dispatch({
      type: ActionKind.FETCH_RELATIVE_ITEM_LIST,
      payload: { itemId },
    });
  }

  //TODO: infinite scroll에서 호출하면 실행될 함수 => fetch data
  function fetchAdditionalData(nextPage: number) {
    dispatch({
      type: ActionKind.FETCH_ADDITIONAL_DATA_LIST,
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

  if (error) navigate("/404");

  return (
    <Layout
      // type="survey"
      title="웹툰 취향 분석 테스트"
      hasPrevious
    >
      <StyledHeader level={3}>웹툰 취향 분석 테스트</StyledHeader>
      <Text>지금까지 재미있게 봤던 웹툰들을 선택해주세요.</Text>
      <SearchBar searchData={fetchSearchedData} />
      <Survey
        dataList={formData.dataList}
        onClickNext={nextHandler}
        onClickItem={itemClickHandler}
        fetchAdditionalData={fetchAdditionalData}
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
