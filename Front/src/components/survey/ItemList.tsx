import React from "react";
import Item from "./Item";
import styled from "styled-components";
import { Row } from "antd";

interface ItemListProps {
  dataList: SurveyItemType[];
  onClickItem: (itemId: number) => void;
}

export default function ItemList({ dataList, onClickItem }: ItemListProps) {
  return (
    <ItemListBox>
      {dataList.map((item) => {
        return <Item key={item.id} item={item} onClickItem={onClickItem} />;
      })}
    </ItemListBox>
  );
}

const ItemListBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 0 30px 0;
`;
