import { Input, InputRef } from "antd";
import React, { useRef } from "react";
import _ from "lodash"; // throttle

interface PropType {
  searchData: (keyword: string) => void;
}
export default function SearchBar({ searchData }: PropType) {
  const inputRef = useRef<InputRef>(null);
  const throttleHandler = _.throttle((e) => {
    searchData(e.target.value);
  }, 1000);

  return (
    <Input
      ref={inputRef}
      className="searchInput"
      type="text"
      placeholder="작품명과 작가명으로 검색해보세요."
      onChange={throttleHandler}
    />
  );
}
