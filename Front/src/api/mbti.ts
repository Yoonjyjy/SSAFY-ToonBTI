import { graphql } from "../../src/gql";

const GET_QUESTIONS = graphql(`
  query GetQuestions {
    getQuestions {
      questionNo
      question
      answersList
    }
  }
`);

const ADD_USER = graphql(`
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
`);

const COUNT_ALL_USERS = graphql(`
  query CountAllUser {
    countAllUsers
  }
`);

export { GET_QUESTIONS, ADD_USER, COUNT_ALL_USERS };
