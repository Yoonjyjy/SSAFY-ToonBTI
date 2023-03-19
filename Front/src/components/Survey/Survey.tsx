import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import SearchBar from '../common/SearchBar'

const getResults = gql`
  query getResults {
    results {
      id
    }
  }
`
const Survey = () => {
  const [keyword, setKeyword] = useState<string>('')
  const getSurveyList = () => {
    const [list, setList] = useState([])

    const { loading, error, data } = useQuery(getResults)
    if (loading) {
      return <p>spinner</p>
    }
    if (error) {
      return <p>{error.message}</p>
    }
    return <div>{data}</div>
  }
  return (
    <>
      <SearchBar
        type="keyword_search"
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <div>{getSurveyList()}</div>
    </>
  )
}

export default Survey
