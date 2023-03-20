import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import ItemList from '../common/ItemList'
import SearchBar from '../common/SearchBar'

const getResults = gql`
  query getResults {
    results {
      id
    }
  }
`
/**
 * 독자 유형 테스트 페이지
 * @returns
 */
const Survey = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [list, setList] = useState<ItemType[]>([])
  const [clickedList, setClickedList] = useState<ItemType[]>([])
  const [clickedItem, setClickedItem] = useState<ItemType | null>(null)

  return (
    <>
      <SearchBar
        type="keyword_search"
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <ItemList itemList={list} setClickedItem={setClickedItem} />
    </>
  )
}

export default Survey
