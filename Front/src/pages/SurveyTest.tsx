import React, { useReducer, useState } from "react";
import { Layout } from "../components/common";
import { Survey, KeywordSurvey } from "../components/survey";

const mockdata = [
  { id: 1, name: "호랑이행님1", imgUrl: "imgUrl" },
  { id: 2, name: "호랑이행님2", imgUrl: "imgUrl" },
  { id: 3, name: "호랑이행님3", imgUrl: "imgUrl" },
  { id: 4, name: "호랑이행님4", imgUrl: "imgUrl" },
  { id: 5, name: "호랑이행님5", imgUrl: "imgUrl" },
  { id: 6, name: "호랑이행님5", imgUrl: "imgUrl" },
];

const addedMockData = [
  { id: 7, name: "호랑이행님7", imgUrl: "imgUrl" },
  { id: 8, name: "호랑이행님8", imgUrl: "imgUrl" },
  { id: 9, name: "호랑이행님9", imgUrl: "imgUrl" },
];

enum ActionKind {
  FETCH_DATA_LIST = "fetchdatalist",
  ADD_KEYWORD_LIST = "addkeywordlist",
  REMOVE_KEYWORD_LIST = "removekeywordlist",
  CLICK_AN_ITEM = "clickanitem",
  FETCH_RELATIVE_ITEM_LIST = "fetchrelativeitemlist",
}

interface FormDataType {
  dataList: SurveyItemType[];
  keywordList: KeywordType[];
  valid: {
    dataList: boolean;
    keywordList: true;
  };
  confirmed: boolean;
}

interface ActionType {
  type: ActionKind;
  payload: {
    dataList?: SurveyItemType[];
    keywordList?: KeywordType[];
    itemId?: number;
    keyword?: KeywordType;
  };
}

function reducer(state: FormDataType, action: ActionType): FormDataType {
  const { type, payload } = action;
  switch (type) {
    case ActionKind.FETCH_DATA_LIST: {
      if (!payload.dataList) return state;
      // TODO: fetch data list
      const isValidated = payload.dataList.length >= 10;
      const isConfirmed = state.confirmed && isValidated;
      return {
        ...state,
        dataList: { ...payload.dataList },
        valid: { ...state.valid, dataList: isValidated },
        confirmed: isConfirmed,
      };
    }
    //TODO: add keyword func
    case ActionKind.ADD_KEYWORD_LIST: {
      if (!payload?.keyword) return state;
      if (state.keywordList.includes(payload.keyword)) {
        return state;
      }
      return {
        ...state,
        keywordList: [...state.keywordList, payload.keyword],
      };
    }
    //TODO: remove keyword func
    case ActionKind.REMOVE_KEYWORD_LIST: {
      if (!payload?.keywordList) return state;
      return {
        ...state,
        keywordList: { ...payload.keywordList },
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
      newDataList.splice(
        clickedIndex + 1,
        0,
        ...addedMockData.map((e) => ({
          ...e,
          id: Math.random(),
          clicked: false,
        }))
      );
      return { ...state, dataList: newDataList };
    }
    default:
      return state;
  }
}

const initialFormData: FormDataType = {
  dataList: mockdata.map((e) => ({ ...e, clicked: false })),
  keywordList: [],
  valid: { dataList: false, keywordList: true },
  confirmed: false,
};

export default function SurveyTest() {
  const [step, setStep] = useState<number>(0);
  const [formData, dispatch] = useReducer(reducer, { ...initialFormData });

  function nextHandler() {
    setStep((prev) => prev + 1);
  }

  function itemClickHandler(itemId: number) {
    dispatch({ type: ActionKind.CLICK_AN_ITEM, payload: { itemId } });
    dispatch({
      type: ActionKind.FETCH_RELATIVE_ITEM_LIST,
      payload: { itemId },
    });
  }

  function addKeywordHandler(keyword: KeywordType) {
    dispatch({ type: ActionKind.ADD_KEYWORD_LIST, payload: { keyword } });
  }

  switch (step) {
    case 0:
      return (
        <Layout type="survey" title="웹툰 취향 분석 테스트" hasPrevious>
          <Survey
            dataList={formData.dataList}
            onClickNext={nextHandler}
            onClickItem={itemClickHandler}
          />
        </Layout>
      );
    // case 1:
    //   return (
    //     <Layout type="keywordSurvey" title="웹툰 취향 분석 테스트" hasPrevious>
    //       <KeywordSurvey
    //         keywordList={formData.keywordList}
    //         addKeyword={addKeywordHandler}
    //       />
    //     </Layout>
    //   );

    default:
      return <></>;
  }
}
