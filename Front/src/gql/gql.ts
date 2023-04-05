/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetQuestions {\n    getQuestions {\n      questionNo\n      question\n      answersList\n    }\n  }\n": types.GetQuestionsDocument,
    "\n  query CountAllUser {\n    countAllUsers\n  }\n": types.CountAllUserDocument,
    "\n  query GetAllTypes {\n    getAllTypes {\n      count\n      description\n      image\n      userType\n    }\n  }\n": types.GetAllTypesDocument,
    "\n  query GetType($userType: String) {\n    getType(userType: $userType) {\n      myType {\n        userType\n        description\n        image\n        count\n      }\n      bestType {\n        userType\n        description\n        image\n        count\n      }\n      worstType {\n        userType\n        description\n        image\n        count\n      }\n      firstType {\n        userType\n        description\n        image\n        count\n      }\n      secondType {\n        userType\n        description\n        image\n        count\n      }\n    }\n  }\n": types.GetTypeDocument,
    "\n  mutation AddUserResponse($input: UserAnswerInput) {\n    addUserResponse(input: $input) {\n      userId\n      uuid\n      myType {\n        nbtiId\n        userType\n        description\n        image\n        count\n      }\n      bestType {\n        nbtiId\n        userType\n        description\n        image\n        count\n      }\n      worstType {\n        nbtiId\n        userType\n        description\n        image\n        count\n      }\n      firstType {\n        nbtiId\n        userType\n        description\n        image\n        count\n      }\n      secondType {\n        nbtiId\n        userType\n        description\n        image\n        count\n      }\n    }\n  }\n  query CountAllUser {\n    countAllUsers\n  }\n": types.AddUserResponseDocument,
    "\n  mutation CreateResult($userId: Long) {\n    createResult(userId: $userId) {\n      doneRatio\n      genreRatio\n      myType {\n        count\n        description\n        image\n        userType\n      }\n      platformRatio\n      webtoonCounts\n    }\n  }\n": types.CreateResultDocument,
    "\n  query NBTI_Webtoon($nbtiPk: Int, $offset: Int) {\n    nbtiWebtoon(nbtiPk: $nbtiPk, offset: $offset) {\n      webtoonId\n      genreId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n  }\n": types.Nbti_WebtoonDocument,
    "\n  query SearchWebtoon($searchName: String!) {\n    searchWebtoon(searchName: $searchName) {\n      webtoonId\n      genreId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n  }\n": types.SearchWebtoonDocument,
    "\n  mutation SAVEWEBTOON($webtoonPk: [Int!]!, $userPk: Int!) {\n    saveWebtoon(webtoonPk: $webtoonPk, userPk: $userPk) {\n      success\n    }\n  }\n": types.SavewebtoonDocument,
    "\n  query RESULT1($nbtiPk: Int!, $userPk: Int!, $webtoonPk: [Int!]) {\n    resultNbtiWebtoon(nbtiPk: $nbtiPk, userPk: $userPk) {\n      webtoonId\n      genreId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n      likeRate\n    }\n    myKeyword(webtoonPk: $webtoonPk) {\n      myKeywordName\n      myKeywordId\n    }\n    getFromSpring(userPk: $userPk) {\n      myType {\n        userType\n        image\n        count\n      }\n      webtoonCounts\n      platformRatio\n      doneRatio\n      genreRatio\n    }\n    myGenre(webtoonPk: $webtoonPk) {\n      genreId\n    }\n  }\n": types.Result1Document,
    "\n  query RESULT2(\n    $keywords: [Int!]!\n    $topN: Int!\n    $genrePk: Int!\n    $webtoonPk: [Int!]!\n  ) {\n    keywordSimilarWebtoon(keywords: $keywords, topN: $topN) {\n      webtoonId\n      genreId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n    authorWebtoon(genrePk: $genrePk, webtoonPk: $webtoonPk) {\n      webtoonId\n      genreId\n      image\n      title\n      platform\n      rate\n      endFlag\n      searchTitle\n      view\n      authorName\n    }\n  }\n": types.Result2Document,
    "\n  query GetAdditional3Webtoons($webtoonPk: Int!, $genrePk: Int!) {\n    additionalWebtoon(webtoonPk: $webtoonPk, genrePk: $genrePk) {\n      webtoonId\n      genreId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n  }\n": types.GetAdditional3WebtoonsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetQuestions {\n    getQuestions {\n      questionNo\n      question\n      answersList\n    }\n  }\n"): (typeof documents)["\n  query GetQuestions {\n    getQuestions {\n      questionNo\n      question\n      answersList\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CountAllUser {\n    countAllUsers\n  }\n"): (typeof documents)["\n  query CountAllUser {\n    countAllUsers\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllTypes {\n    getAllTypes {\n      count\n      description\n      image\n      userType\n    }\n  }\n"): (typeof documents)["\n  query GetAllTypes {\n    getAllTypes {\n      count\n      description\n      image\n      userType\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetType($userType: String) {\n    getType(userType: $userType) {\n      myType {\n        userType\n        description\n        image\n        count\n      }\n      bestType {\n        userType\n        description\n        image\n        count\n      }\n      worstType {\n        userType\n        description\n        image\n        count\n      }\n      firstType {\n        userType\n        description\n        image\n        count\n      }\n      secondType {\n        userType\n        description\n        image\n        count\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetType($userType: String) {\n    getType(userType: $userType) {\n      myType {\n        userType\n        description\n        image\n        count\n      }\n      bestType {\n        userType\n        description\n        image\n        count\n      }\n      worstType {\n        userType\n        description\n        image\n        count\n      }\n      firstType {\n        userType\n        description\n        image\n        count\n      }\n      secondType {\n        userType\n        description\n        image\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddUserResponse($input: UserAnswerInput) {\n    addUserResponse(input: $input) {\n      userId\n      uuid\n      myType {\n        nbtiId\n        userType\n        description\n        image\n        count\n      }\n      bestType {\n        nbtiId\n        userType\n        description\n        image\n        count\n      }\n      worstType {\n        nbtiId\n        userType\n        description\n        image\n        count\n      }\n      firstType {\n        nbtiId\n        userType\n        description\n        image\n        count\n      }\n      secondType {\n        nbtiId\n        userType\n        description\n        image\n        count\n      }\n    }\n  }\n  query CountAllUser {\n    countAllUsers\n  }\n"): (typeof documents)["\n  mutation AddUserResponse($input: UserAnswerInput) {\n    addUserResponse(input: $input) {\n      userId\n      uuid\n      myType {\n        nbtiId\n        userType\n        description\n        image\n        count\n      }\n      bestType {\n        nbtiId\n        userType\n        description\n        image\n        count\n      }\n      worstType {\n        nbtiId\n        userType\n        description\n        image\n        count\n      }\n      firstType {\n        nbtiId\n        userType\n        description\n        image\n        count\n      }\n      secondType {\n        nbtiId\n        userType\n        description\n        image\n        count\n      }\n    }\n  }\n  query CountAllUser {\n    countAllUsers\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateResult($userId: Long) {\n    createResult(userId: $userId) {\n      doneRatio\n      genreRatio\n      myType {\n        count\n        description\n        image\n        userType\n      }\n      platformRatio\n      webtoonCounts\n    }\n  }\n"): (typeof documents)["\n  mutation CreateResult($userId: Long) {\n    createResult(userId: $userId) {\n      doneRatio\n      genreRatio\n      myType {\n        count\n        description\n        image\n        userType\n      }\n      platformRatio\n      webtoonCounts\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query NBTI_Webtoon($nbtiPk: Int, $offset: Int) {\n    nbtiWebtoon(nbtiPk: $nbtiPk, offset: $offset) {\n      webtoonId\n      genreId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n  }\n"): (typeof documents)["\n  query NBTI_Webtoon($nbtiPk: Int, $offset: Int) {\n    nbtiWebtoon(nbtiPk: $nbtiPk, offset: $offset) {\n      webtoonId\n      genreId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchWebtoon($searchName: String!) {\n    searchWebtoon(searchName: $searchName) {\n      webtoonId\n      genreId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n  }\n"): (typeof documents)["\n  query SearchWebtoon($searchName: String!) {\n    searchWebtoon(searchName: $searchName) {\n      webtoonId\n      genreId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SAVEWEBTOON($webtoonPk: [Int!]!, $userPk: Int!) {\n    saveWebtoon(webtoonPk: $webtoonPk, userPk: $userPk) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation SAVEWEBTOON($webtoonPk: [Int!]!, $userPk: Int!) {\n    saveWebtoon(webtoonPk: $webtoonPk, userPk: $userPk) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RESULT1($nbtiPk: Int!, $userPk: Int!, $webtoonPk: [Int!]) {\n    resultNbtiWebtoon(nbtiPk: $nbtiPk, userPk: $userPk) {\n      webtoonId\n      genreId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n      likeRate\n    }\n    myKeyword(webtoonPk: $webtoonPk) {\n      myKeywordName\n      myKeywordId\n    }\n    getFromSpring(userPk: $userPk) {\n      myType {\n        userType\n        image\n        count\n      }\n      webtoonCounts\n      platformRatio\n      doneRatio\n      genreRatio\n    }\n    myGenre(webtoonPk: $webtoonPk) {\n      genreId\n    }\n  }\n"): (typeof documents)["\n  query RESULT1($nbtiPk: Int!, $userPk: Int!, $webtoonPk: [Int!]) {\n    resultNbtiWebtoon(nbtiPk: $nbtiPk, userPk: $userPk) {\n      webtoonId\n      genreId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n      likeRate\n    }\n    myKeyword(webtoonPk: $webtoonPk) {\n      myKeywordName\n      myKeywordId\n    }\n    getFromSpring(userPk: $userPk) {\n      myType {\n        userType\n        image\n        count\n      }\n      webtoonCounts\n      platformRatio\n      doneRatio\n      genreRatio\n    }\n    myGenre(webtoonPk: $webtoonPk) {\n      genreId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RESULT2(\n    $keywords: [Int!]!\n    $topN: Int!\n    $genrePk: Int!\n    $webtoonPk: [Int!]!\n  ) {\n    keywordSimilarWebtoon(keywords: $keywords, topN: $topN) {\n      webtoonId\n      genreId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n    authorWebtoon(genrePk: $genrePk, webtoonPk: $webtoonPk) {\n      webtoonId\n      genreId\n      image\n      title\n      platform\n      rate\n      endFlag\n      searchTitle\n      view\n      authorName\n    }\n  }\n"): (typeof documents)["\n  query RESULT2(\n    $keywords: [Int!]!\n    $topN: Int!\n    $genrePk: Int!\n    $webtoonPk: [Int!]!\n  ) {\n    keywordSimilarWebtoon(keywords: $keywords, topN: $topN) {\n      webtoonId\n      genreId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n    authorWebtoon(genrePk: $genrePk, webtoonPk: $webtoonPk) {\n      webtoonId\n      genreId\n      image\n      title\n      platform\n      rate\n      endFlag\n      searchTitle\n      view\n      authorName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAdditional3Webtoons($webtoonPk: Int!, $genrePk: Int!) {\n    additionalWebtoon(webtoonPk: $webtoonPk, genrePk: $genrePk) {\n      webtoonId\n      genreId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n  }\n"): (typeof documents)["\n  query GetAdditional3Webtoons($webtoonPk: Int!, $genrePk: Int!) {\n    additionalWebtoon(webtoonPk: $webtoonPk, genrePk: $genrePk) {\n      webtoonId\n      genreId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;