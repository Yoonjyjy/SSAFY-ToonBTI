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
