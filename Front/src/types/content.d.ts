interface ItemType {
  name: string;
  id: number;
  imgUrl: string;
}

interface SurveyItemType extends ItemType {
  clicked: boolean;
}

interface KeywordType {
  keyword: string;
  id: number;
}
