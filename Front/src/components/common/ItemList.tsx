import React from "react";
import Item from "./Item";

interface ItemListProps {
  itemList: SurveyItemType[];
  setList: React.Dispatch<React.SetStateAction<SurveyItemType[]>>;
}
const ItemList = ({ itemList, setList }: ItemListProps) => {
  const clickHandle = (item: SurveyItemType) => {
    setList((prev) =>
      prev.map((el) => {
        if (el.id === item.id) {
          el = { ...el, clicked: !el.clicked };
        }
        return el;
      })
    );
  };

  return (
    <>
      {itemList.map((item) => {
        return <Item key={item.id} item={item} onClickItem={clickHandle} />;
      })}
    </>
  );
};

export default ItemList;
