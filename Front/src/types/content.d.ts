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
