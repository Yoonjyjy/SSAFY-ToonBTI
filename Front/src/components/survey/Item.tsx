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
        span={6}
        selected={item.clicked}
        onClick={() => onClickItem(item.id)}
      >
        <Text>{item.name}</Text>
        {/* <img src={item.imgUrl} alt={item.name} /> */}
      </ItemBox>
    </QueueAnim>
  );
}

const ItemBox = styled(Col)<{ selected: boolean }>`
  border: ${(props) =>
    props.selected ? "1px solid #1890ff" : "1px solid darkgrey"};
  width: calc(height * 0.7);
  height: 8rem;
  margin: 0.25rem;
  border-radius: 4px;
  grid: 1fr 1fr;
  max-width: none;
`;
// FIXME: 추가되면 애니메이션 슬라이드 인
// clickedIndex%3 === 0 : 2개 오른쪽 추가 아래 한 개 추가
// clickedIndex%3 === 1 : 1개 오른쪽 추가 아래 두 개 추가
// clickedIndex%3 === 2 : 아래 3개 추가