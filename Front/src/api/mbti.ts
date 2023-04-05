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

const COUNT_ALL_USERS = graphql(`
  query CountAllUser {
    countAllUsers
  }
`);

const GET_ALL_TYPES = graphql(`
  query GetAllTypes {
    getAllTypes {
      count
      description
      image
      userType
    }
  }
`);

const GET_TYPE = graphql(`
  query GetType($userType: String) {
    getType(userType: $userType) {
      myType {
        userType
        description
        image
        count
      }
      bestType {
        userType
        description
        image
        count
      }
      worstType {
        userType
        description
        image
        count
      }
      firstType {
        userType
        description
        image
        count
      }
      secondType {
        userType
        description
        image
        count
      }
    }
  }
`);

const ADD_USER_RESPONSE = graphql(`
  mutation AddUserResponse($input: UserAnswerInput) {
    addUserResponse(input: $input) {
      userId
      uuid
      myType {
        nbtiId
        userType
        description
        image
        count
      }
      bestType {
        nbtiId
        userType
        description
        image
        count
      }
      worstType {
        nbtiId
        userType
        description
        image
        count
      }
      firstType {
        nbtiId
        userType
        description
        image
        count
      }
      secondType {
        nbtiId
        userType
        description
        image
        count
      }
    }
  }
  query CountAllUser {
    countAllUsers
  }
`);

const CREATE_RESULT = graphql(`
  mutation CreateResult($userId: Long) {
    createResult(userId: $userId) {
      doneRatio
      genreRatio
      myType {
        count
        description
        image
        userType
      }
      platformRatio
      webtoonCounts
    }
  }
`);

export {
  GET_QUESTIONS,
  ADD_USER_RESPONSE,
  COUNT_ALL_USERS,
  GET_ALL_TYPES,
  GET_TYPE,
  CREATE_RESULT,
};
