import { gql } from "@apollo/client";

const GET_QUESTIONS = gql`
  query GetQuestions {
    questions
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

export { GET_QUESTIONS, GET_MBTI, GET_WEBTOON_LIST };
