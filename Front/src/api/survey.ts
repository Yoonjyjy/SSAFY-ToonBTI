import { gql } from "@apollo/client";

// TODO: how to use graphql
const GET_WEBTOON_LIST = gql`
  query GET_WEBTOON_LIST {
    webtoonlist {
      id
      name
      imgUrl
      checked
    }
  }
`;

export { GET_WEBTOON_LIST };
