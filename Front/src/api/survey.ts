import { graphql } from "../../src/gql";

const NBTI_WEBTOON = graphql(`
  query NBTI_Webtoon($nbtiPk: Int, $offset: Int) {
    nbtiWebtoon(nbtiPk: $nbtiPk, offset: $offset) {
      webtoonId
      genreId
      title
      image
      platform
      endFlag
      rate
      view
    }
  }
`);

const SEARCH_WEBTOON = graphql(`
  query SearchWebtoon($searchName: String!) {
    searchWebtoon(searchName: $searchName) {
      webtoonId
      genreId
      title
      image
      platform
      endFlag
      rate
      view
    }
  }
`);

const SELECT_WEBTOON = graphql(`
  query Select_Webtoon($nbtiPk: Int!, $userPk: Int!, $webtoonIds: [Int]!) {
    selectWebtoon(nbtiPk: $nbtiPk, userPk: $userPk)
  }
`);

const GET_ADDITIONAL_3_WEBTOONS = graphql(`
  query GetAdditional3Webtoons($webtoonPk: Int!, $genrePk: Int!) {
    additionalWebtoon(webtoonPk: $webtoonPk, genrePk: $genrePk) {
      webtoonId
      genreId
      title
      image
      platform
      endFlag
      rate
      view
    }
  }
`);

export {
  NBTI_WEBTOON,
  SEARCH_WEBTOON,
  SELECT_WEBTOON,
  GET_ADDITIONAL_3_WEBTOONS,
};
