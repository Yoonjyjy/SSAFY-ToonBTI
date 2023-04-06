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

const SAVE_WEBTOON = graphql(`
  mutation SAVEWEBTOON($webtoonPk: [Int!]!, $userPk: Int!) {
    saveWebtoon(webtoonPk: $webtoonPk, userPk: $userPk) {
      success
    }
  }
`);

const GET_SURVEY_RESULT_1 = graphql(`
  query RESULT1($nbtiPk: Int!, $userPk: Int!, $webtoonPk: [Int!]) {
    resultNbtiWebtoon(nbtiPk: $nbtiPk, userPk: $userPk) {
      webtoonId
      genreId
      title
      image
      platform
      endFlag
      rate
      view
      likeRate
    }
    myKeyword(webtoonPk: $webtoonPk) {
      myKeywordName
      myKeywordId
    }
    getFromSpring(userPk: $userPk) {
      myType {
        userType
        image
        count
        thumbnailTitle
        thumbnailCharacter
      }
      webtoonCounts
      platformRatio
      doneRatio
      genreRatio
    }
    getFromSpring2(userPk: $userPk) {
      myRank
      allUser
    }
    myGenre(webtoonPk: $webtoonPk) {
      genreId
      genreName
    }
  }
`);

const GET_SURVEY_RESULT_2 = graphql(`
  query RESULT2(
    $keywords: [Int!]!
    $topN: Int!
    $genrePk: Int!
    $webtoonPk: [Int!]!
  ) {
    keywordSimilarWebtoon(keywords: $keywords, topN: $topN) {
      webtoonId
      genreId
      title
      image
      platform
      endFlag
      rate
      view
    }
    authorWebtoon(genrePk: $genrePk, webtoonPk: $webtoonPk) {
      webtoonId
      genreId
      image
      title
      platform
      rate
      endFlag
      searchTitle
      view
      authorName
    }
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

const SAVE_RESULT_JSON_FILE = graphql(`
  mutation SaveResultJSONFile($data: String, $uuid: String) {
    saveResultJsonFile(data: $data, uuid: $uuid)
  }
`);

export {
  NBTI_WEBTOON,
  SEARCH_WEBTOON,
  GET_ADDITIONAL_3_WEBTOONS,
  SAVE_WEBTOON,
  GET_SURVEY_RESULT_1,
  GET_SURVEY_RESULT_2,
  SAVE_RESULT_JSON_FILE,
};
