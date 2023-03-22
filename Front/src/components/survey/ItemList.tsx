import React from "react";
import Item from "./Item";
import styled from "styled-components";

interface ItemListProps {
  dataList: SurveyItemType[];
  setDataList: React.Dispatch<React.SetStateAction<SurveyItemType[]>>;
}

const addedMockData = [
  {
    id: 7,
    name: "호랑이행님7",
    imgUrl: "imgUrl",
  },
  {
    id: 8,
    name: "호랑이행님8",
    imgUrl: "imgUrl",
  },
  {
    id: 9,
    name: "호랑이행님9",
    imgUrl: "imgUrl",
  },
];

export default function ItemList({ dataList, setDataList }: ItemListProps) {
  const clickHandle = (item: SurveyItemType) => {
    setDataList((prev) =>
      prev.map((el) => {
        if (el.id === item.id) {
          el = { ...el, clicked: !el.clicked };
        }
        return el;
      })
    );
    setDataList((prev) => {
      const newPrev = [...prev];
      const clickedIndex = newPrev.findIndex((el) => el.id === item.id);
      newPrev.splice(
        clickedIndex + 1,
        0,
        ...addedMockData.map((e) => ({
          ...e,
          id: Math.random(),
          clicked: false,
        }))
      );
      return newPrev;
    });
  };

  return (
    <ItemListBox>
      {dataList.map((item) => {
        return <Item key={item.id} item={item} onClickItem={clickHandle} />;
      })}
    </ItemListBox>
  );
}

const ItemListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: true;
  justify-content: center;
`;
