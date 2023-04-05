import React, { useEffect, useRef, useState } from "react";
import Item from "./Item";
import styled from "styled-components";
import { Row } from "antd";
import { Webtoon } from "../../gql/graphql";

interface ItemListProps {
  dataList: Webtoon[];
  result: Map<number, boolean>;
  onClickItem: (itemId: number, genreId: number) => void;
  onScroll: (offset: number) => void;
}

export default function ItemList(props: ItemListProps) {
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [lastElement, setLastElement] = useState<HTMLDivElement | null>();

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setOffset((no) => no + 1);
      }
    })
  );

  useEffect(() => {
    // console.log("offset: ", offset);
    setLoading(true);
    if (offset <= 20) {
      props.onScroll(offset);
    }
    setLoading(false);
  }, [offset]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <ItemListOuterDiv>
      <ItemListBox>
        {props.dataList.map((item, i) => {
          return i === props.dataList.length - 1 && !loading ? (
            <div ref={setLastElement} key={item.webtoonId}>
              <Item
                isClicked={!!props.result.get(item.webtoonId as number)}
                item={item}
                onClickItem={props.onClickItem}
              />
            </div>
          ) : (
            <Item
              key={item.webtoonId}
              isClicked={!!props.result.get(item.webtoonId as number)}
              item={item}
              onClickItem={props.onClickItem}
            />
          );
        })}
      </ItemListBox>
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
