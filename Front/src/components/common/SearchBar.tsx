import React from 'react'

interface SearchBarProps {
  type: string
  keyword: string
  setKeyword: (keyword: string) => void
}
const SearchBar = ({ type, keyword, setKeyword }: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }
  if (type === 'keyword_search') {
    return (
      <>
        {type === 'keyword_search' && (
          <>
            <div>SearchBar</div>
            <input type="text" onChange={handleChange} />
          </>
        )}
      </>
    )
  }
  return (
    <>
      <input type="text" />
    </>
  )
}
export default SearchBar
