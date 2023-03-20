import React from 'react'

/**
 * 웹툰 선택 설문조사에서 웹툰 리스트 안의 각 아이템을 나타내는 컴포넌트
 * @item : 각 웹툰 아이템 객체
 */
interface ItemProps {
  item: ItemType
  setClickedItem: (item: ItemType) => void
}

const Item = ({ item, setClickedItem }: ItemProps) => {
  const clickHandle = (item: ItemType) => {
    if (setClickedItem) {
      setClickedItem(item)
    }
  }
  return (
    <>
      <div onClick={() => clickHandle(item)}>
        <p>{item.name}</p>
        <img src={item.imgUrl} alt={item.name} />
      </div>
    </>
  )
}

export default Item
