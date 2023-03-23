import React from "react";
import Item from "./Item";
import styled from "styled-components";

interface ItemListProps {
  dataList: SurveyItemType[];
  onClickItem: (itemId: number) => void;
}

export default function ItemList({ dataList, onClickItem }: ItemListProps) {
  return (
    <ItemListBox>
      {/* {dataList} */}
      {dataList.map((item) => {
        return <Item key={item.id} item={item} onClickItem={onClickItem} />;
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
