import React, { useRef, useState } from "react";
import Item from "./Item";
import styled from "styled-components";
import { Row } from "antd";
import { InfiniteScroll } from "../common";

interface ItemListProps {
  dataList: SurveyItemType[];
  onClickItem: (itemId: number) => void;
  fetchAdditionalData: (nextPage: number) => void;
}

export default function ItemList({
  dataList,
  onClickItem,
  fetchAdditionalData,
}: ItemListProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [curPage, setCurPage] = useState<number>(1);
  const totalPage = 10;
  const isLastPage = false;

  function callback(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        //fetch data
        fetchAdditionalData(curPage + 1);
      }
    });
  }

  return (
    <InfiniteScroll
      isLoading={isLoading}
      callback={callback}
      page={curPage}
      totalPage={totalPage}
      isLastPage={isLastPage}
    >
      <ItemListBox>
        {dataList.map((item) => {
          return <Item key={item.id} item={item} onClickItem={onClickItem} />;
        })}
      </ItemListBox>
    </InfiniteScroll>
  );
}

const ItemListBox = styled(Row)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 0 30px 0;
  height: 100%;
`;
