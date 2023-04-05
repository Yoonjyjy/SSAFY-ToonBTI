/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A 64-bit signed integer */
  Long: any;
};

export type Answer = {
  __typename?: 'Answer';
  answer?: Maybe<Scalars['String']>;
  answerId: Scalars['ID'];
  question?: Maybe<Question>;
};

export type GetFromSpring = {
  __typename?: 'GetFromSpring';
  doneRatio?: Maybe<Array<Maybe<Scalars['Int']>>>;
  genreRatio?: Maybe<Array<Maybe<Scalars['Int']>>>;
  myType?: Maybe<MyType>;
  platformRatio?: Maybe<Array<Maybe<Scalars['Int']>>>;
  webtoonCounts?: Maybe<Scalars['Int']>;
};

export enum Mbti {
  Hsea = 'HSEA',
  Hset = 'HSET',
  Hsra = 'HSRA',
  Hsrt = 'HSRT',
  Hwea = 'HWEA',
  Hwet = 'HWET',
  Hwra = 'HWRA',
  Hwrt = 'HWRT',
  Lsea = 'LSEA',
  Lset = 'LSET',
  Lsra = 'LSRA',
  Lsrt = 'LSRT',
  Lwea = 'LWEA',
  Lwet = 'LWET',
  Lwra = 'LWRA',
  Lwrt = 'LWRT'
}

export type Mutation = {
  __typename?: 'Mutation';
  /**  유형 결과 페이지 반환 */
  addUserResponse?: Maybe<UserResult>;
  /**  웹툰 결과 페이지 반환 */
  createResult?: Maybe<WebtoonResult>;
  saveWebtoon?: Maybe<SaveWebtoonMutation>;
};


export type MutationAddUserResponseArgs = {
  input?: InputMaybe<UserAnswerInput>;
};


export type MutationCreateResultArgs = {
  userId?: InputMaybe<Scalars['Long']>;
};


export type MutationSaveWebtoonArgs = {
  userPk?: InputMaybe<Scalars['Int']>;
  webtoonPk: Array<InputMaybe<Scalars['Int']>>;
};

export type MyGenre = {
  __typename?: 'MyGenre';
  genreId?: Maybe<Scalars['Int']>;
  genreName?: Maybe<Scalars['String']>;
};

export type MyKeyword = {
  __typename?: 'MyKeyword';
  myKeywordId?: Maybe<Array<Maybe<Scalars['Int']>>>;
  myKeywordName?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type MyType = {
  __typename?: 'MyType';
  count?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  userType?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  additionalWebtoon?: Maybe<Array<Maybe<Webtoon>>>;
  authorWebtoon?: Maybe<Array<Maybe<Webtoon>>>;
  /**  시작할 때 나오는 참여 인원 수 */
  countAllUsers?: Maybe<Scalars['Long']>;
  /**  전체 유형 순위 보기 */
  getAllTypes?: Maybe<Array<Maybe<User>>>;
  getFromSpring?: Maybe<Array<Maybe<GetFromSpring>>>;
  /**  질문, 보기 리스트 */
  getQuestions?: Maybe<Array<Question>>;
  /**  내 웹툰 랭킹 정보 */
  getRanking?: Maybe<WebtoonUser>;
  /**  한가지 유형 보기 */
  getType?: Maybe<TypeResult>;
  keywordSimilarWebtoon?: Maybe<Array<Maybe<Webtoon>>>;
  myGenre?: Maybe<Array<Maybe<MyGenre>>>;
  myKeyword?: Maybe<Array<Maybe<MyKeyword>>>;
  nbtiWebtoon?: Maybe<Array<Maybe<Webtoon>>>;
  resultNbtiWebtoon?: Maybe<Array<Maybe<Webtoon>>>;
  searchWebtoon?: Maybe<Array<Maybe<Webtoon>>>;
};


export type QueryAdditionalWebtoonArgs = {
  genrePk?: InputMaybe<Scalars['Int']>;
  webtoonPk?: InputMaybe<Scalars['Int']>;
};


export type QueryAuthorWebtoonArgs = {
  genrePk?: InputMaybe<Scalars['Int']>;
  webtoonPk?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};


export type QueryGetFromSpringArgs = {
  userPk?: InputMaybe<Scalars['Int']>;
};


export type QueryGetRankingArgs = {
  userId?: InputMaybe<Scalars['Long']>;
};


export type QueryGetTypeArgs = {
  userType?: InputMaybe<Scalars['String']>;
};


export type QueryKeywordSimilarWebtoonArgs = {
  keywords?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  topN?: InputMaybe<Scalars['Int']>;
};


export type QueryMyGenreArgs = {
  webtoonPk?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};


export type QueryMyKeywordArgs = {
  webtoonPk?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};


export type QueryNbtiWebtoonArgs = {
  nbtiPk?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryResultNbtiWebtoonArgs = {
  nbtiPk?: InputMaybe<Scalars['Int']>;
  userPk?: InputMaybe<Scalars['Int']>;
};


export type QuerySearchWebtoonArgs = {
  searchName?: InputMaybe<Scalars['String']>;
};

export type Question = {
  __typename?: 'Question';
  answersList?: Maybe<Array<Maybe<Scalars['String']>>>;
  image?: Maybe<Scalars['String']>;
  question?: Maybe<Scalars['String']>;
  questionNo: Scalars['Long'];
};

export type SaveWebtoonMutation = {
  __typename?: 'SaveWebtoonMutation';
  success: Scalars['Boolean'];
};

export type TypeResult = {
  __typename?: 'TypeResult';
  bestType?: Maybe<User>;
  firstType?: Maybe<User>;
  myType?: Maybe<User>;
  secondType?: Maybe<User>;
  worstType?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  count?: Maybe<Scalars['Long']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  nbtiId?: Maybe<Scalars['Long']>;
  userType: Mbti;
};

export type UserAnswer = {
  __typename?: 'UserAnswer';
  answers?: Maybe<Array<Scalars['String']>>;
  uuid?: Maybe<Scalars['String']>;
};

export type UserAnswerInput = {
  answers?: InputMaybe<Array<Scalars['String']>>;
};

export type UserResult = {
  __typename?: 'UserResult';
  bestType?: Maybe<User>;
  firstType?: Maybe<User>;
  myType?: Maybe<User>;
  secondType?: Maybe<User>;
  userId?: Maybe<Scalars['Long']>;
  uuid?: Maybe<Scalars['String']>;
  worstType?: Maybe<User>;
};

export type Webtoon = {
  __typename?: 'Webtoon';
  authorName?: Maybe<Scalars['String']>;
  endFlag?: Maybe<Scalars['Int']>;
  genreId?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  likeRate?: Maybe<Scalars['Float']>;
  platform?: Maybe<Scalars['String']>;
  rate?: Maybe<Scalars['Float']>;
  searchTitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  view?: Maybe<Scalars['Int']>;
  webtoonId?: Maybe<Scalars['Int']>;
};

export type WebtoonResult = {
  __typename?: 'WebtoonResult';
  doneRatio?: Maybe<Array<Maybe<Scalars['Int']>>>;
  genreRatio?: Maybe<Array<Maybe<Scalars['Int']>>>;
  myType?: Maybe<User>;
  platformRatio?: Maybe<Array<Maybe<Scalars['Int']>>>;
  webtoonCounts?: Maybe<Scalars['Long']>;
};

export type WebtoonUser = {
  __typename?: 'WebtoonUser';
  allUser?: Maybe<Scalars['Int']>;
  myRank?: Maybe<Scalars['Int']>;
};

export type GetQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetQuestionsQuery = { __typename?: 'Query', getQuestions?: Array<{ __typename?: 'Question', questionNo: any, question?: string | null, answersList?: Array<string | null> | null }> | null };

export type CountAllUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CountAllUserQuery = { __typename?: 'Query', countAllUsers?: any | null };

export type GetAllTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTypesQuery = { __typename?: 'Query', getAllTypes?: Array<{ __typename?: 'User', count?: any | null, description?: string | null, image?: string | null, userType: Mbti } | null> | null };

export type GetTypeQueryVariables = Exact<{
  userType?: InputMaybe<Scalars['String']>;
}>;


export type GetTypeQuery = { __typename?: 'Query', getType?: { __typename?: 'TypeResult', myType?: { __typename?: 'User', userType: Mbti, description?: string | null, image?: string | null, count?: any | null } | null, bestType?: { __typename?: 'User', userType: Mbti, description?: string | null, image?: string | null, count?: any | null } | null, worstType?: { __typename?: 'User', userType: Mbti, description?: string | null, image?: string | null, count?: any | null } | null, firstType?: { __typename?: 'User', userType: Mbti, description?: string | null, image?: string | null, count?: any | null } | null, secondType?: { __typename?: 'User', userType: Mbti, description?: string | null, image?: string | null, count?: any | null } | null } | null };

export type AddUserResponseMutationVariables = Exact<{
  input?: InputMaybe<UserAnswerInput>;
}>;


export type AddUserResponseMutation = { __typename?: 'Mutation', addUserResponse?: { __typename?: 'UserResult', userId?: any | null, uuid?: string | null, myType?: { __typename?: 'User', nbtiId?: any | null, userType: Mbti, description?: string | null, image?: string | null, count?: any | null } | null, bestType?: { __typename?: 'User', nbtiId?: any | null, userType: Mbti, description?: string | null, image?: string | null, count?: any | null } | null, worstType?: { __typename?: 'User', nbtiId?: any | null, userType: Mbti, description?: string | null, image?: string | null, count?: any | null } | null, firstType?: { __typename?: 'User', nbtiId?: any | null, userType: Mbti, description?: string | null, image?: string | null, count?: any | null } | null, secondType?: { __typename?: 'User', nbtiId?: any | null, userType: Mbti, description?: string | null, image?: string | null, count?: any | null } | null } | null };

export type CreateResultMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['Long']>;
}>;


export type CreateResultMutation = { __typename?: 'Mutation', createResult?: { __typename?: 'WebtoonResult', doneRatio?: Array<number | null> | null, genreRatio?: Array<number | null> | null, platformRatio?: Array<number | null> | null, webtoonCounts?: any | null, myType?: { __typename?: 'User', count?: any | null, description?: string | null, image?: string | null, userType: Mbti } | null } | null };

export type Nbti_WebtoonQueryVariables = Exact<{
  nbtiPk?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type Nbti_WebtoonQuery = { __typename?: 'Query', nbtiWebtoon?: Array<{ __typename?: 'Webtoon', webtoonId?: number | null, genreId?: number | null, title?: string | null, image?: string | null, platform?: string | null, endFlag?: number | null, rate?: number | null, view?: number | null } | null> | null };

export type SearchWebtoonQueryVariables = Exact<{
  searchName: Scalars['String'];
}>;


export type SearchWebtoonQuery = { __typename?: 'Query', searchWebtoon?: Array<{ __typename?: 'Webtoon', webtoonId?: number | null, genreId?: number | null, title?: string | null, image?: string | null, platform?: string | null, endFlag?: number | null, rate?: number | null, view?: number | null } | null> | null };

export type SavewebtoonMutationVariables = Exact<{
  webtoonPk: Array<Scalars['Int']> | Scalars['Int'];
  userPk: Scalars['Int'];
}>;


export type SavewebtoonMutation = { __typename?: 'Mutation', saveWebtoon?: { __typename?: 'SaveWebtoonMutation', success: boolean } | null };

export type Result1QueryVariables = Exact<{
  nbtiPk: Scalars['Int'];
  userPk: Scalars['Int'];
  webtoonPk?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type Result1Query = { __typename?: 'Query', resultNbtiWebtoon?: Array<{ __typename?: 'Webtoon', webtoonId?: number | null, genreId?: number | null, title?: string | null, image?: string | null, platform?: string | null, endFlag?: number | null, rate?: number | null, view?: number | null, likeRate?: number | null } | null> | null, myKeyword?: Array<{ __typename?: 'MyKeyword', myKeywordName?: Array<string | null> | null, myKeywordId?: Array<number | null> | null } | null> | null, getFromSpring?: Array<{ __typename?: 'GetFromSpring', webtoonCounts?: number | null, platformRatio?: Array<number | null> | null, doneRatio?: Array<number | null> | null, genreRatio?: Array<number | null> | null, myType?: { __typename?: 'MyType', userType?: string | null, image?: string | null, count?: number | null } | null } | null> | null, myGenre?: Array<{ __typename?: 'MyGenre', genreId?: number | null } | null> | null };

export type Result2QueryVariables = Exact<{
  keywords: Array<Scalars['Int']> | Scalars['Int'];
  topN: Scalars['Int'];
  genrePk: Scalars['Int'];
  webtoonPk: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type Result2Query = { __typename?: 'Query', keywordSimilarWebtoon?: Array<{ __typename?: 'Webtoon', webtoonId?: number | null, genreId?: number | null, title?: string | null, image?: string | null, platform?: string | null, endFlag?: number | null, rate?: number | null, view?: number | null } | null> | null, authorWebtoon?: Array<{ __typename?: 'Webtoon', webtoonId?: number | null, genreId?: number | null, image?: string | null, title?: string | null, platform?: string | null, rate?: number | null, endFlag?: number | null, searchTitle?: string | null, view?: number | null, authorName?: string | null } | null> | null };

export type GetAdditional3WebtoonsQueryVariables = Exact<{
  webtoonPk: Scalars['Int'];
  genrePk: Scalars['Int'];
}>;


export type GetAdditional3WebtoonsQuery = { __typename?: 'Query', additionalWebtoon?: Array<{ __typename?: 'Webtoon', webtoonId?: number | null, genreId?: number | null, title?: string | null, image?: string | null, platform?: string | null, endFlag?: number | null, rate?: number | null, view?: number | null } | null> | null };


export const GetQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questionNo"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answersList"}}]}}]}}]} as unknown as DocumentNode<GetQuestionsQuery, GetQuestionsQueryVariables>;
export const CountAllUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountAllUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countAllUsers"}}]}}]} as unknown as DocumentNode<CountAllUserQuery, CountAllUserQueryVariables>;
export const GetAllTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}}]}}]}}]} as unknown as DocumentNode<GetAllTypesQuery, GetAllTypesQueryVariables>;
export const GetTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bestType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"worstType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"firstType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"secondType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<GetTypeQuery, GetTypeQueryVariables>;
export const AddUserResponseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUserResponse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserAnswerInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUserResponse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"myType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nbtiId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bestType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nbtiId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"worstType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nbtiId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"firstType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nbtiId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"secondType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nbtiId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<AddUserResponseMutation, AddUserResponseMutationVariables>;
export const CreateResultDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateResult"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Long"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createResult"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"doneRatio"}},{"kind":"Field","name":{"kind":"Name","value":"genreRatio"}},{"kind":"Field","name":{"kind":"Name","value":"myType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"platformRatio"}},{"kind":"Field","name":{"kind":"Name","value":"webtoonCounts"}}]}}]}}]} as unknown as DocumentNode<CreateResultMutation, CreateResultMutationVariables>;
export const Nbti_WebtoonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NBTI_Webtoon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nbtiPk"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nbtiWebtoon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nbtiPk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nbtiPk"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"webtoonId"}},{"kind":"Field","name":{"kind":"Name","value":"genreId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"endFlag"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"view"}}]}}]}}]} as unknown as DocumentNode<Nbti_WebtoonQuery, Nbti_WebtoonQueryVariables>;
export const SearchWebtoonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchWebtoon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchWebtoon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"webtoonId"}},{"kind":"Field","name":{"kind":"Name","value":"genreId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"endFlag"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"view"}}]}}]}}]} as unknown as DocumentNode<SearchWebtoonQuery, SearchWebtoonQueryVariables>;
export const SavewebtoonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SAVEWEBTOON"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"webtoonPk"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userPk"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveWebtoon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"webtoonPk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"webtoonPk"}}},{"kind":"Argument","name":{"kind":"Name","value":"userPk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userPk"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SavewebtoonMutation, SavewebtoonMutationVariables>;
export const Result1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RESULT1"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nbtiPk"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userPk"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"webtoonPk"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resultNbtiWebtoon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nbtiPk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nbtiPk"}}},{"kind":"Argument","name":{"kind":"Name","value":"userPk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userPk"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"webtoonId"}},{"kind":"Field","name":{"kind":"Name","value":"genreId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"endFlag"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"view"}},{"kind":"Field","name":{"kind":"Name","value":"likeRate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myKeyword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"webtoonPk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"webtoonPk"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myKeywordName"}},{"kind":"Field","name":{"kind":"Name","value":"myKeywordId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"getFromSpring"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userPk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userPk"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"webtoonCounts"}},{"kind":"Field","name":{"kind":"Name","value":"platformRatio"}},{"kind":"Field","name":{"kind":"Name","value":"doneRatio"}},{"kind":"Field","name":{"kind":"Name","value":"genreRatio"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myGenre"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"webtoonPk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"webtoonPk"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genreId"}}]}}]}}]} as unknown as DocumentNode<Result1Query, Result1QueryVariables>;
export const Result2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RESULT2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keywords"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topN"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"genrePk"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"webtoonPk"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"keywordSimilarWebtoon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"keywords"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keywords"}}},{"kind":"Argument","name":{"kind":"Name","value":"topN"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topN"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"webtoonId"}},{"kind":"Field","name":{"kind":"Name","value":"genreId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"endFlag"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"view"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorWebtoon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"genrePk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"genrePk"}}},{"kind":"Argument","name":{"kind":"Name","value":"webtoonPk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"webtoonPk"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"webtoonId"}},{"kind":"Field","name":{"kind":"Name","value":"genreId"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"endFlag"}},{"kind":"Field","name":{"kind":"Name","value":"searchTitle"}},{"kind":"Field","name":{"kind":"Name","value":"view"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}}]}}]}}]} as unknown as DocumentNode<Result2Query, Result2QueryVariables>;
export const GetAdditional3WebtoonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAdditional3Webtoons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"webtoonPk"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"genrePk"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"additionalWebtoon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"webtoonPk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"webtoonPk"}}},{"kind":"Argument","name":{"kind":"Name","value":"genrePk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"genrePk"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"webtoonId"}},{"kind":"Field","name":{"kind":"Name","value":"genreId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"endFlag"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"view"}}]}}]}}]} as unknown as DocumentNode<GetAdditional3WebtoonsQuery, GetAdditional3WebtoonsQueryVariables>;