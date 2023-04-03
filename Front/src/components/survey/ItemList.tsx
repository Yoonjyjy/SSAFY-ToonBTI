import React, { useRef, useState } from "react";
import Item from "./Item";
import styled from "styled-components";
import { Row } from "antd";
import { InfiniteScroll } from "../common";
import { useQuery } from "@apollo/client";
import { NBTI_WEBTOON } from "../../api/survey";

interface ItemListProps {
  dataList: SurveyItemType[];
  onClickItem: (itemId: string) => void;
  fetchAdditionalData: (nextPage: number) => void;
  offsetRef: React.MutableRefObject<number>;
}

export default function ItemList({
  dataList,
  onClickItem,
  fetchAdditionalData,
  offsetRef,
}: ItemListProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [curPage, setCurPage] = useState<number>(offsetRef.current);
  const isLastPage = false;

  function callback(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isLoading) {
        //fetch data
        offsetRef.current += 1;
        fetchAdditionalData(offsetRef.current + 1);
      }
    });
  }

  return (
    <ItemListOuterDiv>
      <InfiniteScroll
        isLoading={false}
        callback={callback}
        page={curPage}
        isLastPage={isLastPage}
      >
        <ItemListBox>
          {dataList.map((item) => {
            return (
              <Item
                key={item.webtoonId}
                item={item}
                onClickItem={onClickItem}
              />
            );
          })}
        </ItemListBox>
      </InfiniteScroll>
    </ItemListOuterDiv>
  );
}
const ItemListOuterDiv = styled.div`
  overflow-y: scroll;
  height: 54vh;
  @media (min-width: 320px) and (max-width: 380px) {
    height: 40vh;
  }
  @media (min-width: 380px) and (max-width: 400px) {
    height: 53vh;
  }
  @media (min-width: 400px) and (max-width: 500px) {
    height: 54vh;
  }
`;
const ItemListBox = styled(Row)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 0 30px 0;
  height: 100%;
`;
