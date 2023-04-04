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
    "\n  query GetType($userType:String) {\n    getType(userType:$userType){\n      myType{\n        userType\n        description\n        image\n        count\n      }\n      bestType{\n        userType\n        description\n        image\n        count\n      }\n      worstType{\n        userType\n        description\n        image\n        count\n      }\n      firstType{\n        userType\n        description\n        image\n        count\n      }\n      secondType{\n      userType\n      description\n      image\n      count\n      }\n    }\n  }\n": types.GetTypeDocument,
    "\n  mutation AddUserResponse($input: UserAnswerInput) {\n    addUserResponse(input: $input) {\n      myType {\n        userType\n        description\n        image\n      }\n      bestType {\n        userType\n        description\n        image\n      }\n      worstType {\n        userType\n        description\n        image\n      }\n      firstType {\n        userType\n        description\n        image\n      }\n      secondType {\n        userType\n        description\n        image\n      }\n    }\n  }\n  query CountAllUser {\n    countAllUsers\n  }\n": types.AddUserResponseDocument,
    "\n  mutation CreateResult($userId: Long) {\n    createResult(userId: $userId) {\n      doneRatio\n      genreRatio\n      myType {\n        count\n        description\n        image\n        userType\n      }\n      platformRatio\n      webtoonCounts\n    }\n  }\n": types.CreateResultDocument,
    "\n  query NBTI_Webtoon($nbtiPk: Int, $offset: Int) {\n    nbtiWebtoon(nbtiPk: $nbtiPk, offset: $offset) {\n      webtoonId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n  }\n": types.Nbti_WebtoonDocument,
    "\n  query SearchWebtoon($searchName: String!) {\n    searchWebtoon(searchName: $searchName) {\n      webtoonId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n  }\n": types.SearchWebtoonDocument,
    "\n  query Select_Webtoon($nbtiPk: Int!, $userPk: Int!, $webtoonIds: [Int]!) {\n    selectWebtoon(nbtiPk: $nbtiPk, userPk: $userPk)\n  }\n": types.Select_WebtoonDocument,
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
export function graphql(source: "\n  query GetType($userType:String) {\n    getType(userType:$userType){\n      myType{\n        userType\n        description\n        image\n        count\n      }\n      bestType{\n        userType\n        description\n        image\n        count\n      }\n      worstType{\n        userType\n        description\n        image\n        count\n      }\n      firstType{\n        userType\n        description\n        image\n        count\n      }\n      secondType{\n      userType\n      description\n      image\n      count\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetType($userType:String) {\n    getType(userType:$userType){\n      myType{\n        userType\n        description\n        image\n        count\n      }\n      bestType{\n        userType\n        description\n        image\n        count\n      }\n      worstType{\n        userType\n        description\n        image\n        count\n      }\n      firstType{\n        userType\n        description\n        image\n        count\n      }\n      secondType{\n      userType\n      description\n      image\n      count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddUserResponse($input: UserAnswerInput) {\n    addUserResponse(input: $input) {\n      myType {\n        userType\n        description\n        image\n      }\n      bestType {\n        userType\n        description\n        image\n      }\n      worstType {\n        userType\n        description\n        image\n      }\n      firstType {\n        userType\n        description\n        image\n      }\n      secondType {\n        userType\n        description\n        image\n      }\n    }\n  }\n  query CountAllUser {\n    countAllUsers\n  }\n"): (typeof documents)["\n  mutation AddUserResponse($input: UserAnswerInput) {\n    addUserResponse(input: $input) {\n      myType {\n        userType\n        description\n        image\n      }\n      bestType {\n        userType\n        description\n        image\n      }\n      worstType {\n        userType\n        description\n        image\n      }\n      firstType {\n        userType\n        description\n        image\n      }\n      secondType {\n        userType\n        description\n        image\n      }\n    }\n  }\n  query CountAllUser {\n    countAllUsers\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateResult($userId: Long) {\n    createResult(userId: $userId) {\n      doneRatio\n      genreRatio\n      myType {\n        count\n        description\n        image\n        userType\n      }\n      platformRatio\n      webtoonCounts\n    }\n  }\n"): (typeof documents)["\n  mutation CreateResult($userId: Long) {\n    createResult(userId: $userId) {\n      doneRatio\n      genreRatio\n      myType {\n        count\n        description\n        image\n        userType\n      }\n      platformRatio\n      webtoonCounts\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query NBTI_Webtoon($nbtiPk: Int, $offset: Int) {\n    nbtiWebtoon(nbtiPk: $nbtiPk, offset: $offset) {\n      webtoonId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n  }\n"): (typeof documents)["\n  query NBTI_Webtoon($nbtiPk: Int, $offset: Int) {\n    nbtiWebtoon(nbtiPk: $nbtiPk, offset: $offset) {\n      webtoonId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchWebtoon($searchName: String!) {\n    searchWebtoon(searchName: $searchName) {\n      webtoonId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n  }\n"): (typeof documents)["\n  query SearchWebtoon($searchName: String!) {\n    searchWebtoon(searchName: $searchName) {\n      webtoonId\n      title\n      image\n      platform\n      endFlag\n      rate\n      view\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Select_Webtoon($nbtiPk: Int!, $userPk: Int!, $webtoonIds: [Int]!) {\n    selectWebtoon(nbtiPk: $nbtiPk, userPk: $userPk)\n  }\n"): (typeof documents)["\n  query Select_Webtoon($nbtiPk: Int!, $userPk: Int!, $webtoonIds: [Int]!) {\n    selectWebtoon(nbtiPk: $nbtiPk, userPk: $userPk)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;