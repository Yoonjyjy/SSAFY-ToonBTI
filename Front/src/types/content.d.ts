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
  keyword: string;
}

interface QuestionType {
  questionNo: number;
  question: string;
  answerList: string[];
}
