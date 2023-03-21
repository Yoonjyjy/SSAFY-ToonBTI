import { gql } from '@apollo/client'

export const GET_WEBTOON_LIST = gql`
  query GET_WEBTOON_LIST {
    webtoonlist {
      id
      name
      imgUrl
      checked
    }
  }
`

export const GET_QUIZ_LIST = gql`
  query GET_QUIZ_LIST {
    quizlist {
      id
      content
      answer
    }
  }
`
