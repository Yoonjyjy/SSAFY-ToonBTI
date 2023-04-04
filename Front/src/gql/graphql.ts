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
  /**
   * Allows use of a JSON String for input / output from the GraphQL schema.
   *
   * Use of this type is *not recommended* as you lose the benefits of having a defined, static
   * schema (one of the key benefits of GraphQL).
   */
  JSONString: any;
  /** A 64-bit signed integer */
  Long: any;
};

export type Answer = {
  __typename?: 'Answer';
  answer?: Maybe<Scalars['String']>;
  answerId: Scalars['ID'];
  question?: Maybe<Question>;
};

export type AuthorWebtoon = {
  __typename?: 'AuthorWebtoon';
  authorName?: Maybe<Scalars['String']>;
  endFlag?: Maybe<Scalars['Int']>;
  genreId?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  rate?: Maybe<Scalars['Float']>;
  searchTitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  view?: Maybe<Scalars['Int']>;
  webtoonId?: Maybe<Scalars['Int']>;
};

export type GetFromSpring = {
  __typename?: 'GetFromSpring';
  doneRatio?: Maybe<Array<Maybe<Scalars['Int']>>>;
  genreRatio?: Maybe<Array<Maybe<Scalars['Int']>>>;
  myType?: Maybe<Scalars['JSONString']>;
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
  addUserResponse?: Maybe<TypeResult>;
  /**  웹툰 결과 페이지 반환 */
  createResult?: Maybe<WebtoonResult>;
};


export type MutationAddUserResponseArgs = {
  input?: InputMaybe<UserAnswerInput>;
};


export type MutationCreateResultArgs = {
  userId?: InputMaybe<Scalars['Long']>;
};

export type MyGenre = {
  __typename?: 'MyGenre';
  genreId?: Maybe<Scalars['Int']>;
};

export type MyKeyword = {
  __typename?: 'MyKeyword';
  myKeyword?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type NbtiWebtoon = {
  __typename?: 'NbtiWebtoon';
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

export type Query = {
  __typename?: 'Query';
  additionalWebtoon?: Maybe<Array<Maybe<Webtoon>>>;
  authorWebtoon?: Maybe<Array<Maybe<AuthorWebtoon>>>;
  /**  시작할 때 나오는 참여 인원 수 */
  countAllUsers?: Maybe<Scalars['Long']>;
  /**  전체 유형 순위 보기 */
  getAllTypes?: Maybe<Array<Maybe<User>>>;
  getFromSpring?: Maybe<Array<Maybe<GetFromSpring>>>;
  /**  질문, 보기 리스트 */
  getQuestions?: Maybe<Array<Question>>;
  /**  한가지 유형 보기 */
  getType?: Maybe<TypeResult>;
  keywordSimilarWebtoon?: Maybe<Array<Maybe<Webtoon>>>;
  myGenre?: Maybe<Array<Maybe<MyGenre>>>;
  myKeyword?: Maybe<Array<Maybe<MyKeyword>>>;
  nbtiWebtoon?: Maybe<Array<Maybe<Webtoon>>>;
  resultNbtiWebtoon?: Maybe<Array<Maybe<NbtiWebtoon>>>;
  searchWebtoon?: Maybe<Array<Maybe<Webtoon>>>;
  selectWebtoon?: Maybe<Scalars['JSONString']>;
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


export type QuerySelectWebtoonArgs = {
  nbtiPk?: InputMaybe<Scalars['Int']>;
  userPk?: InputMaybe<Scalars['Int']>;
  webtoonIds?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type Question = {
  __typename?: 'Question';
  answersList?: Maybe<Array<Maybe<Scalars['String']>>>;
  image?: Maybe<Scalars['String']>;
  question?: Maybe<Scalars['String']>;
  questionNo: Scalars['Long'];
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

export type Webtoon = {
  __typename?: 'Webtoon';
  endFlag?: Maybe<Scalars['Int']>;
  genreId?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
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

export type GetQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetQuestionsQuery = { __typename?: 'Query', getQuestions?: Array<{ __typename?: 'Question', questionNo: any, question?: string | null, answersList?: Array<string | null> | null }> | null };

export type CountAllUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CountAllUserQuery = { __typename?: 'Query', countAllUsers?: any | null };

export type GetAllTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTypesQuery = { __typename?: 'Query', getAllTypes?: Array<{ __typename?: 'User', count?: any | null, description?: string | null, image?: string | null, userType: Mbti } | null> | null };

export type AddUserResponseMutationVariables = Exact<{
  input?: InputMaybe<UserAnswerInput>;
}>;


export type AddUserResponseMutation = { __typename?: 'Mutation', addUserResponse?: { __typename?: 'TypeResult', myType?: { __typename?: 'User', nbtiId?: any | null, userType: Mbti, description?: string | null, image?: string | null, count?: any | null } | null, bestType?: { __typename?: 'User', nbtiId?: any | null, userType: Mbti, description?: string | null, image?: string | null, count?: any | null } | null, worstType?: { __typename?: 'User', nbtiId?: any | null, userType: Mbti, description?: string | null, image?: string | null, count?: any | null } | null, firstType?: { __typename?: 'User', nbtiId?: any | null, userType: Mbti, description?: string | null, image?: string | null, count?: any | null } | null, secondType?: { __typename?: 'User', nbtiId?: any | null, userType: Mbti, description?: string | null, image?: string | null, count?: any | null } | null } | null };

export type CreateResultMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['Long']>;
}>;


export type CreateResultMutation = { __typename?: 'Mutation', createResult?: { __typename?: 'WebtoonResult', doneRatio?: Array<number | null> | null, genreRatio?: Array<number | null> | null, platformRatio?: Array<number | null> | null, webtoonCounts?: any | null, myType?: { __typename?: 'User', count?: any | null, description?: string | null, image?: string | null, userType: Mbti } | null } | null };

export type Nbti_WebtoonQueryVariables = Exact<{
  nbtiPk?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type Nbti_WebtoonQuery = { __typename?: 'Query', nbtiWebtoon?: Array<{ __typename?: 'Webtoon', webtoonId?: number | null, title?: string | null, image?: string | null, platform?: string | null, endFlag?: number | null, rate?: number | null, view?: number | null } | null> | null };

export type SearchWebtoonQueryVariables = Exact<{
  searchName: Scalars['String'];
}>;


export type SearchWebtoonQuery = { __typename?: 'Query', searchWebtoon?: Array<{ __typename?: 'Webtoon', webtoonId?: number | null, title?: string | null, image?: string | null, platform?: string | null, endFlag?: number | null, rate?: number | null, view?: number | null } | null> | null };

export type Select_WebtoonQueryVariables = Exact<{
  nbtiPk: Scalars['Int'];
  userPk: Scalars['Int'];
  webtoonIds: Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>;
}>;


export type Select_WebtoonQuery = { __typename?: 'Query', selectWebtoon?: any | null };


export const GetQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questionNo"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answersList"}}]}}]}}]} as unknown as DocumentNode<GetQuestionsQuery, GetQuestionsQueryVariables>;
export const CountAllUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountAllUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countAllUsers"}}]}}]} as unknown as DocumentNode<CountAllUserQuery, CountAllUserQueryVariables>;
export const GetAllTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}}]}}]}}]} as unknown as DocumentNode<GetAllTypesQuery, GetAllTypesQueryVariables>;
export const AddUserResponseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUserResponse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserAnswerInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUserResponse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nbtiId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bestType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nbtiId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"worstType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nbtiId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"firstType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nbtiId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"secondType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nbtiId"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<AddUserResponseMutation, AddUserResponseMutationVariables>;
export const CreateResultDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateResult"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Long"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createResult"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"doneRatio"}},{"kind":"Field","name":{"kind":"Name","value":"genreRatio"}},{"kind":"Field","name":{"kind":"Name","value":"myType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"platformRatio"}},{"kind":"Field","name":{"kind":"Name","value":"webtoonCounts"}}]}}]}}]} as unknown as DocumentNode<CreateResultMutation, CreateResultMutationVariables>;
export const Nbti_WebtoonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NBTI_Webtoon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nbtiPk"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nbtiWebtoon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nbtiPk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nbtiPk"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"webtoonId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"endFlag"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"view"}}]}}]}}]} as unknown as DocumentNode<Nbti_WebtoonQuery, Nbti_WebtoonQueryVariables>;
export const SearchWebtoonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchWebtoon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchWebtoon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"webtoonId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"endFlag"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"view"}}]}}]}}]} as unknown as DocumentNode<SearchWebtoonQuery, SearchWebtoonQueryVariables>;
export const Select_WebtoonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Select_Webtoon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nbtiPk"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userPk"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"webtoonIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"selectWebtoon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nbtiPk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nbtiPk"}}},{"kind":"Argument","name":{"kind":"Name","value":"userPk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userPk"}}}]}]}}]} as unknown as DocumentNode<Select_WebtoonQuery, Select_WebtoonQueryVariables>;