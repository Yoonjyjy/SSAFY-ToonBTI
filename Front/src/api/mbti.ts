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
      thumbnailTitle
      thumbnailCharacter
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
        thumbnailTitle
        thumbnailCharacter
      }
      bestType {
        userType
        description
        image
        count
        thumbnailTitle
        thumbnailCharacter
      }
      worstType {
        userType
        description
        image
        count
        thumbnailTitle
        thumbnailCharacter
      }
      firstType {
        userType
        description
        image
        count
        thumbnailTitle
        thumbnailCharacter
      }
      secondType {
        userType
        description
        image
        count
        thumbnailTitle
        thumbnailCharacter
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
        thumbnailTitle
        thumbnailCharacter
      }
      bestType {
        nbtiId
        userType
        description
        image
        count
        thumbnailTitle
        thumbnailCharacter
      }
      worstType {
        nbtiId
        userType
        description
        image
        count
        thumbnailTitle
        thumbnailCharacter
      }
      firstType {
        nbtiId
        userType
        description
        image
        count
        thumbnailTitle
        thumbnailCharacter
      }
      secondType {
        nbtiId
        userType
        description
        image
        count
        thumbnailTitle
        thumbnailCharacter
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
