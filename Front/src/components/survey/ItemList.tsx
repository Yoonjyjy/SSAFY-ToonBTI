import React from "react";
import Item from "./Item";
import styled from "styled-components";
import { Row } from "antd";
import QueueAnim from "rc-queue-anim";

interface ItemListProps {
  dataList: SurveyItemType[];
  onClickItem: (itemId: number) => void;
}

export default function ItemList({ dataList, onClickItem }: ItemListProps) {
  return (
    <ItemListBox gutter={[16, 16]} key="1">
      {dataList.map((item) => {
        return <Item key={item.id} item={item} onClickItem={onClickItem} />;
      })}
    </ItemListBox>
  );
}

const ItemListBox = styled(Row)`
  justify-content: center;
  margin: 0 0 30px 0;
`;
