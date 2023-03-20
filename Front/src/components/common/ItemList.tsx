import React from 'react'
import Item from './Item'

interface ItemListProps {
  itemList: ItemType[]

  setClickedItem: (ItemType: ItemType) => void
}
const ItemList = ({ itemList, setClickedItem }: ItemListProps) => {
  return (
    <>
      {itemList?.map((item: ItemType) => {
        return (
          <Item key={item.id} item={item} setClickedItem={setClickedItem} />
        )
      })}
    </>
  )
}

export default ItemList
