import React from "react";
import styled from "styled-components";

/**
 * 웹툰 선택 설문조사에서 웹툰 리스트 안의 각 아이템을 나타내는 컴포넌트
 * @item : 각 웹툰 아이템 객체
 * @onClickItem : 각 아이템을 선택했을 때 실행될 함수 ( clickedList에 포함 혹은 제외시킴 )
 */
interface ItemProps {
  item: SurveyItemType;
  onClickItem: (item: SurveyItemType) => void;
}

const Item = ({ item, onClickItem }: ItemProps) => {
  return (
    <Selected isClicked={item.clicked} onClick={() => onClickItem(item)}>
      <div>
        <p>{item.name}</p>
        <img src={item.imgUrl} alt={item.name} />
      </div>
    </Selected>
  );
};

const Selected = styled.div<{ isClicked: boolean }>`
  border: ${(props) =>
    props.isClicked ? "1px solid pink" : "1px solid black"};
`;
export default Item;
