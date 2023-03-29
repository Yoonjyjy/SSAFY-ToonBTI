interface ItemType {
  name: string;
  id: number;
  imgUrl: string;
}

interface SurveyItemType extends ItemType {
  clicked: boolean;
}

interface RecommListItemType extends ItemType {
  per: number;
}

interface KeywordType {
  id: number;
  keyword: string;
}

interface QuestionType {
  questionNo: number;
  question: string;
  image: string;
  answerList: [AnswerType];
}

interface AnswerType {
  answerId: number;
  question: number;
  answer: string;
}

interface AnswerSendType {
  answerId: number;
  questionNo: number;
}