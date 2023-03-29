import React from "react";
import styled from "styled-components";
import { Button, Space, Progress, Typography } from "antd";
import { Layout, MainImage } from "../components/common";
import tiger from "/tiger.jpg";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_QUESTIONS } from "../api/mbti";

const { Title, Text } = Typography;

const data = [
  {
    questionNo: 1,
    question: "힘든 하루를 끝내고 집에 와서\n드디어 쉴 수 있게 됐다.",
    image: "https://lottiefiles.com/66915-sunday-evening-at-home",
    answerList: [
      {
        answerId: 1,
        questionNo: 1,
        answer: "자주 보는 웹툰 앱을 켜볼까?",
      },
    ],
  },
  {
    questionNo: 2,
    question:
      "웹툰 앱이 켜지고 내가 보는 웹툰 목록이 나왔다.\n이때 내가 보는 웹툰 목록의 길이는?",
    image: "https://lottiefiles.com/47788-scrolling-phone-loop",
    answerList: [
      {
        answerId: 1,
        questionNo: 2,
        answer: "한 두 개? 많이 보지는 않아!",
      },
      {
        answerId: 2,
        questionNo: 2,
        answer: "주로 보는 몇 개만 있어.",
      },
      {
        answerId: 3,
        questionNo: 2,
        answer: "대충 10개 정도?",
      },
      {
        answerId: 4,
        questionNo: 2,
        answer: "세어보기 힘든데… 15개는 넘을걸?",
      },
    ],
  },
  {
    questionNo: 3,
    question: "이 중에 하나를 골라서 보자.",
    image: "https://lottiefiles.com/134516-select",
    answerList: [
      {
        answerId: 1,
        questionNo: 3,
        answer: "웹툰을 재밌게 본다",
      },
    ],
  },
  {
    questionNo: 4,
    question: "정말 이 웹툰은 이런 점이 너무 재밌어! ㅠㅠ",
    image: "https://lottiefiles.com/46472-lurking-cat",
    answerList: [
      {
        answerId: 1,
        questionNo: 4,
        answer: "로맨스나 로맨스판타지에서 나오는\n인물 간의 사랑이 재밌어!",
      },
      {
        answerId: 2,
        questionNo: 4,
        answer: "판타지, 액션의 볼 맛 나는 화려함이 최고야",
      },
      {
        answerId: 3,
        questionNo: 4,
        answer: "일상, 개그같이\n소소한 이야기 속의 재미가 좋아",
      },
      {
        answerId: 4,
        questionNo: 4,
        answer: "드라마의 탄탄한 스토리와 감정선이 재밌어",
      },
      {
        answerId: 5,
        questionNo: 4,
        answer: " 스릴러/추리의 쫀득한 긴장감과\n두뇌 싸움을 좋아해",
      },
    ],
  },
  {
    questionNo: 5,
    question: "보던 웹툰을 완결까지 다 봤네…\n새로 볼만한 웹툰을 골라볼까?",
    image: "https://lottiefiles.com/82726-cute-cat",
    answerList: [
      {
        answerId: 1,
        questionNo: 5,
        answer: "내 마음에 쏙 드는 그림체 위주로 골라보자",
      },
      {
        answerId: 2,
        questionNo: 5,
        answer: "멋진 세계관과 개성적인 인물들이\n만들어가는 스토리가 최고지",
      },
      {
        answerId: 3,
        questionNo: 5,
        answer: "랭킹에 있는 거면 재미있겠지?\n인기작 위주로 찾아볼까?",
      },
      {
        answerId: 4,
        questionNo: 5,
        answer: "난 몰아서 보는 게 좋아! 일단 완결작을 보자",
      },
    ],
  },
  {
    questionNo: 6,
    question: "근데 자꾸 주인공의 로맨스보다는\n사건 전개가 계속 나온다…",
    image: "https://lottiefiles.com/52831-rotation-cats",
    answerList: [
      {
        answerId: 1,
        questionNo: 5,
        answer:
          "나는 로맨스를 보려고 읽는 건데!\n로맨스가 안 나와서 재미없어 ㅠㅠ",
      },
      {
        answerId: 2,
        questionNo: 5,
        answer: "로맨스가 보고 싶긴 하지만…\n금방 나오겠지? 좀 더 기다려보자",
      },
      {
        answerId: 3,
        questionNo: 5,
        answer: "로맨스도 좋지만 사건 전개도 좋아!\n로맨스 없어도 흥미진진해!",
      },
      {
        answerId: 4,
        questionNo: 5,
        answer: "지금 사랑할 때가 아닌걸!\n계속 사건 전개로 이어지면 좋겠다",
      },
    ],
  },
];

/**
 * 1, 3번은 보낼 필요 X
 */
const sendData = [
  {
    questionNo: 2,
    answerId: 0,
  },
  {
    questionNo: 4,
    answerId: 0,
  },
  {
    questionNo: 5,
    answerId: 0,
  },
  {
    questionNo: 6,
    answerId: 0,
  },
  {
    questionNo: 7,
    answerId: 0,
  },
  {
    questionNo: 8,
    answerId: 0,
  },
  {
    questionNo: 9,
    answerId: 0,
  },
  {
    questionNo: 10,
    answerId: 0,
  },
];

enum ActionKind {
  CLICK_AN_ITEM = "clickanitem",
}

interface FormDataType {
  dataList: AnswerSendType[];
  valid: {
    dataList: boolean;
  };
  confirmed: boolean;
}

interface ActionType {
  type: ActionKind;
  payload: {
    dataList: AnswerSendType[];
  };
}

function reducer(state: FormDataType, action: ActionType): FormDataType {
  const { type, payload } = action;
  switch (type) {
    case ActionKind.CLICK_AN_ITEM: {
      if (!payload?.dataList) return state;
      const newDataList = [...state.dataList].map((el) => {
        //   if (el.id === payload.itemId) {
        //     el = { ...el };
        //   }
        return el;
      });
      return { ...state, dataList: newDataList };
    }
    default:
      return state;
  }
}

const initialFormData: FormDataType = {
  dataList: sendData.map((e) => ({ ...e })),
  valid: { dataList: false },
  confirmed: false,
};

export default function MBTITest() {
  const navigate = useNavigate();
  //FIXME: 데이터 관리
  // const { error, data } = useQuery(GET_QUESTIONS);
  // console.log("data", data);

  function clickHandler() {
    /** TODO: */
    navigate("/mbti/result");
  }

  // if (error) {
  //   navigate("/404");
  // }
  const state = 5;

  return (
    <StyledLayout
      title="나의 웹툰 독자 유형 테스트"
      hasPrevious
      type="MbtiTest"
    >
      <StyledDiv>
        <StyledProgress>
          <StyleSpan>{data[state].questionNo} / 10</StyleSpan>
        </StyledProgress>
        <Progress
          percent={data[state].questionNo * 10}
          showInfo={false}
          strokeColor="#FFB202"
        />
      </StyledDiv>
      <StyleSpan>{data[state].question}</StyleSpan>
      <MainImage src={tiger} size={50} />
      <BtnContainer direction="vertical">
        {data[state].answerList.map((el) => (
          <StyledButton onClick={clickHandler} key={el.answerId}>
            {el.answer}
          </StyledButton>
        ))}
      </BtnContainer>
    </StyledLayout>
  );
}

const BtnContainer = styled(Space)`
  // line-height: 3rem;
  height: 100%
  width: 100%;

  padding-bottom: 2rem;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 3.5rem;
  white-space: pre-wrap;
`;

const StyledProgress = styled(Text)`
  text-align: right;
  word-break: keep-all;

  span {
    font-weight: 600;
  }
`;

// const StyledContent = styled(Text)`
//   text-align: center;
//   line-height: 1rem;
//   word-break: keep-all;

//   span {
//     font-weight: 600;
//     line-height: 2rem;
//   }
// `;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  // gap: 0.5rem;
`;

const StyleSpan = styled.span`
  white-space: pre-wrap;
`;

const StyledLayout = styled(Layout)`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
