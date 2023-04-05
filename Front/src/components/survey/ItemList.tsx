import React from "react";
import Item from "./Item";
import styled from "styled-components";
import { Row } from "antd";
import { InfiniteScroll } from "../common";
// import { NBTI_WEBTOON } from "../../api/survey";
import { Webtoon } from "../../gql/graphql";

interface ItemListProps {
  dataList: Webtoon[];
  result: Map<number, boolean>;
  onClickItem: (itemId: number, genreId: number) => void;
  fetchAdditionalData: (nextPage: number) => void;
  offsetRef: React.MutableRefObject<number>;
}

export default function ItemList(props: ItemListProps) {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const curPage = props.offsetRef.current;
  const isLastPage = false;

  // FIXME: replace this with getAdditionalData on SurveyTest.tsx
  // function callback(
  //   entries: IntersectionObserverEntry[],
  //   observer: IntersectionObserver
  // ) {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting && !isLoading) {
  //       //fetch data
  //       props.offsetRef.current += 1;
  //       props.fetchAdditionalData(props.offsetRef.current + 1);
  //     }
  //   });
  // }
  function callback() {
    /** */
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
          {props.dataList.map((item) => {
            return (
              <Item
                key={item.webtoonId}
                isClicked={!!props.result.get(item.webtoonId as number)}
                item={item}
                onClickItem={props.onClickItem}
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
