import { gql } from "@apollo/client";

const GET_QUESTIONS = gql`
  query GetQuestions {
    getQuestions {
      questionNo
      question
      image
      answersList
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($input: UserAnswerInput) {
    addUserResponse(input: $input) {
      myType {
        userType
      }
      bestType {
        userType
      }
      worstType {
        userType
      }
      firstType {
        userType
      }
      secondType {
        userType
      }
    }
  }
`;

const GET_MBTI = gql`
  query MbtiById($id: ID!) {
    mbtiById(id: $id)
  }
`;

const GET_WEBTOON_LIST = gql`
  query GetWebtoonList($id: ID!) {
    webtoonsByMbti(id: $id)
  }
`;

export { GET_QUESTIONS, ADD_USER, GET_MBTI, GET_WEBTOON_LIST };
