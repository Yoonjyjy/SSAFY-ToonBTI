import React, { useReducer, useState } from "react";
import { Layout } from "../components/common";
import { Survey } from "../components/survey";

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
  ADD_KEYWORD_LIST = "addkeywordlist",
  REMOVE_KEYWORD_LIST = "removekeywordlist",
  CLICK_AN_ITEM = "clickanitem",
  FETCH_RELATIVE_ITEM_LIST = "fetchrelativeitemlist",
  FETCH_ADDITIONAL_DATA_LIST = "fetchqadditionaldatalist",
  SEARCH_DATA = "searchdata",
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

    case ActionKind.SEARCH_DATA: {
      if (!payload?.dataList) {
        return state;
      }
      const addedDataList = payload?.dataList.map((el) => ({
        ...el,
        clicked: false,
      }));
      const isValidated = payload?.dataList.length >= 10;
      const isConfirmed = state.confirmed && isValidated;
      return {
        ...state,
        dataList: { ...addedDataList },
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
      if (!payload?.dataList) {
        return state;
      }
      const new_data = addedMockData.map((el) => ({ ...el, clicked: false }));
      const newDataList = [...state.dataList, ...new_data];
      // TODO: fetch additional data list
      return { ...state, dataList: newDataList };
    }

    // case ActionKind.FETCH_QUESTION_DATA_LIST: {
    //   if (!payload?.questionList) return state;
    //   const newDataList = [...state.questionList];
    //   newDataList.push(...questionList);
    //   return { ...state, questionList: newDataList };
    // }

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

  //TODO: infinite scroll에서 호출하면 실행될 함수 => fetch data
  function fetchAdditionalData(nextPage: number) {
    dispatch({
      type: ActionKind.FETCH_ADDITIONAL_DATA_LIST,
    });
  }

  function fetchSearchedData(keyword: string) {
    // dispatch({ type: ActionKind.SEARCH_DATA });
    console.log(keyword);
  }

  switch (step) {
    case 0:
      return (
        <Layout
          // type="survey"
          title="웹툰 취향 분석 테스트"
          hasPrevious
        >
          <Survey
            dataList={formData.dataList}
            onClickNext={nextHandler}
            onClickItem={itemClickHandler}
            fetchAdditionalData={fetchAdditionalData}
            searchData={fetchSearchedData}
          />
        </Layout>
      );

    default:
      return <></>;
  }
}
