import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Space, Progress, Typography } from "antd";
import { Layout, MainImage } from "../components/common";
import tiger from "/tiger.jpg";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_QUESTIONS } from "../api/mbti";

const { Text } = Typography;

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
        questionNo: 6,
        answer:
          "나는 로맨스를 보려고 읽는 건데!\n로맨스가 안 나와서 재미없어 ㅠㅠ",
      },
      {
        answerId: 2,
        questionNo: 6,
        answer: "로맨스가 보고 싶긴 하지만…\n금방 나오겠지? 좀 더 기다려보자",
      },
      {
        answerId: 3,
        questionNo: 6,
        answer: "로맨스도 좋지만 사건 전개도 좋아!\n로맨스 없어도 흥미진진해!",
      },
      {
        answerId: 4,
        questionNo: 6,
        answer: "지금 사랑할 때가 아닌걸!\n계속 사건 전개로 이어지면 좋겠다",
      },
    ],
  },
  {
    questionNo: 7,
    question: "벌써 한 화를 다 봤네!",
    image: "https://lottiefiles.com/84152-chating-typing-bubble",
    answerList: [
      {
        answerId: 1,
        questionNo: 7,
        answer: "웹툰 보기도 바빠! 바로 다음 화로 넘어가자",
      },
      {
        answerId: 2,
        questionNo: 7,
        answer:
          "다른 사람은 어떻게 생각했을까?\n댓글 구경하다가 가끔 재밌으면 좋아요도 눌러야지",
      },
      {
        answerId: 3,
        questionNo: 7,
        answer: "좋은 작품엔 별점을 꼬박꼬박 남겨줘야 해!",
      },
      {
        answerId: 4,
        questionNo: 7,
        answer: "감상 댓글을 달면서 다른 독자들과 소통할 거야!",
      },
    ],
  },
  {
    questionNo: 8,
    question:
      "순식간에 좋아하는 웹툰의 최신 회차까지 읽었다…\n다음 화가 너무 궁금해! 어떡하지?",
    image: "https://lottiefiles.com/36413-cat-loading",
    answerList: [
      {
        answerId: 1,
        questionNo: 8,
        answer: "안 돼, 참자! 무료 회차까지만 볼래",
      },
      {
        answerId: 2,
        questionNo: 8,
        answer: "너무 궁금하니까 이번만 미리보기 회차를 봐볼까?",
      },
      {
        answerId: 3,
        questionNo: 8,
        answer: "이미 좋아하는 웹툰은\n유료회차까지 꼬박꼬박 보고 있어!",
      },
      {
        answerId: 4,
        questionNo: 8,
        answer: "매번 충전하기 귀찮아서\n달마다 주기적으로 쿠키를 굽는 중이야",
      },
    ],
  },
  {
    questionNo: 9,
    question: "너무 재미있는 이야기였어…!",
    image: "https://lottiefiles.com/64907-cheers-with-like",
    answerList: [
      {
        answerId: 1,
        questionNo: 9,
        answer: "정말 재밌었다! 이제 다른 일을 해야지",
      },
      {
        answerId: 2,
        questionNo: 9,
        answer: "이 장면은 이 복선이었어…! 어디에 정리해야겠다!",
      },
      {
        answerId: 3,
        questionNo: 9,
        answer: "다른 사람들은 어떻게 생각할까?\n댓글로 얘기해야지",
      },
      {
        answerId: 4,
        questionNo: 9,
        answer:
          "모두 이 명작을 알아야 해!ㅠㅠ\n같이 읽어 달라고 친구한테 추천해보자",
      },
    ],
  },
  {
    questionNo: 10,
    question: "친구와 이야기하다보니\n친구가 재밌다고 하는 웹툰들을 추천해준다",
    image: "https://lottiefiles.com/124303-colabrate-with-friends",
    answerList: [
      {
        answerId: 1,
        questionNo: 9,
        answer:
          "음… 몇 개는 내 취향이 아닌 것 같아.\n내 취향인 것만 골라서 봐볼까?",
      },
      {
        answerId: 2,
        questionNo: 9,
        answer:
          "추천은 필요 없어!\n내 까다로운 취향에 맞는 웹툰은 직접 고를 거야!",
      },
      {
        answerId: 3,
        questionNo: 9,
        answer: "오 고마워~ 추천해둔 건 전부 찜해둬야지",
      },
      {
        answerId: 4,
        questionNo: 9,
        answer: "난 가리지 않아!\n무슨 장르든 재밌으면 더 추천해줘!",
      },
    ],
  },
];

/**
 * 1, 3번은 보낼 필요 X
 */
// const sendData = [
//   {
//     questionNo: 2,
//     answerId: 0,
//   },
//   {
//     questionNo: 4,
//     answerId: 0,
//   },
//   {
//     questionNo: 5,
//     answerId: 0,
//   },
//   {
//     questionNo: 6,
//     answerId: 0,
//   },
//   {
//     questionNo: 7,
//     answerId: 0,
//   },
//   {
//     questionNo: 8,
//     answerId: 0,
//   },
//   {
//     questionNo: 9,
//     answerId: 0,
//   },
//   {
//     questionNo: 10,
//     answerId: 0,
//   },
// ];

// enum ActionKind {
//   CLICK_AN_ITEM = "clickanitem",
// }

// interface FormDataType {
//   dataList: AnswerSendType[];
//   valid: {
//     dataList: boolean;
//   };
//   confirmed: boolean;
// }

// interface ActionType {
//   type: ActionKind;
//   payload: {
//     dataList: AnswerSendType[];
//   };
// }

// function reducer(state: FormDataType, action: ActionType): FormDataType {
//   const { type, payload } = action;
//   switch (type) {
//     case ActionKind.CLICK_AN_ITEM: {
//       if (!payload?.dataList) return state;
//       const newDataList = [...state.dataList].map((el) => {
//         //   if (el.id === payload.itemId) {
//         //     el = { ...el };
//         //   }
//         return el;
//       });
//       return { ...state, dataList: newDataList };
//     }
//     default:
//       return state;
//   }
// }

// const initialFormData: FormDataType = {
//   dataList: sendData.map((e) => ({ ...e })),
//   valid: { dataList: false },
//   confirmed: false,
// };

export default function MBTITest() {
  const navigate = useNavigate();
  //FIXME: 데이터 관리
  // const { error, data } = useQuery(GET_QUESTIONS);
  // console.log("data", data);
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);

  useEffect(() => {
    console.log("answers: ", answers);
  }, [answers]);

  const handleSelect = (answerId: number) => {
    if (step == 9) {
      setAnswers([...answers, answerId]);
      // console.log(answers)
      clickHandler();
    } else if (step == 0 || step == 2) {
      setStep(step + 1);
    } else {
      setAnswers([...answers, answerId]);
      setStep(step + 1);
      // console.log(answers);
    }
  };

  async function clickHandler() {
    /** TODO: */
    await console.log(answers);
    navigate("/mbti/result");
  }

  // if (error) {
  //   navigate("/404");
  // }

  return (
    <StyledLayout
      title="나의 웹툰 독자 유형 테스트"
      hasPrevious
      type="MbtiTest"
    >
      <StyledDiv>
        <StyledProgress>
          <StyleSpan>{data[step].questionNo} / 10</StyleSpan>
        </StyledProgress>
        <Progress
          percent={data[step].questionNo * 10}
          showInfo={false}
          strokeColor="#FFB202"
        />
      </StyledDiv>
      <StyleSpan>{data[step].question}</StyleSpan>
      <MainImage src={tiger} size={50} />
      <BtnContainer direction="vertical">
        {data[step].answerList.map((el) => (
          <StyledButton
            onClick={() => {
              handleSelect(el.answerId);
            }}
            key={el.answerId}
          >
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
