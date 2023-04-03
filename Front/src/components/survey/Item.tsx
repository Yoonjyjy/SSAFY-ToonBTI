import { Col } from "antd";
import QueueAnim from "rc-queue-anim";
import React from "react";
import styled from "styled-components";
import Text from "../common/Text";

/**
 * 웹툰 선택 설문조사에서 웹툰 리스트 안의 각 아이템을 나타내는 컴포넌트
 * @item : 각 웹툰 아이템 객체
 * @onClickItem : 각 아이템을 선택했을 때 실행될 함수 ( clickedList에 포함 혹은 제외시킴 )
 */
interface ItemProps {
  item: SurveyItemType;
  onClickItem: (itemId: string) => void;
}

export default function Item({ item, onClickItem }: ItemProps) {
  return (
    <QueueAnim type={["left", "right"]} duration={900}>
      <ItemBox
        key={item.webtoonId}
        selected={item.clicked}
        onClick={() => onClickItem(item.webtoonId)}
        url={item.image}
      >
        {/* <Text>{item.title}</Text> */}
      </ItemBox>
    </QueueAnim>
  );
}

const ItemBox = styled.div<{ selected: boolean; url: string }>`
  border: ${(props) => (props.selected ? "3px solid" : "1px solid")};
  border-color: ${(props) =>
    props.selected ? ({ theme }) => theme.colors.orange : "white"};
  height: 36vw;
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: cover;
  margin: 0.25rem;
  border-radius: 4px;
  grid: 1fr 1fr;
  max-width: none;
`;
