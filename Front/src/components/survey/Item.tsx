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
  onClickItem: (itemId: number) => void;
}

export default function Item({ item, onClickItem }: ItemProps) {
  return (
    <QueueAnim type={["left", "right"]} duration={900}>
      <ItemBox
        key={item.id}
        selected={item.clicked}
        onClick={() => onClickItem(item.id)}
      >
        <Text>{item.name}</Text>
      </ItemBox>
    </QueueAnim>
  );
}

const ItemBox = styled.div<{ selected: boolean }>`
  border: ${(props) => (props.selected ? "3px solid" : "1px solid")};
  border-color: ${(props) =>
    props.selected ? ({ theme }) => theme.colors.orange : "darkgrey"};
  width: calc(height * 0.7);
  height: 8rem;
  margin: 0.25rem;
  border-radius: 4px;
  grid: 1fr 1fr;
  max-width: none;
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    width: calc(height * 0.7);
    height: 8rem;
  }
`;
