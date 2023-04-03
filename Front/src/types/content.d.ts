interface ItemType {
  webtoonId: string;
  image: string;
  endFlag: number;
  platform: string;
  rate: number;
  title: string;
  view: number;
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
