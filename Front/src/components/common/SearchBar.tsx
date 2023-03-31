import { Input } from "antd";
import React, { useRef } from "react";
import _ from "lodash"; // throttle

interface PropType {
  searchData: (keyword: string) => void;
}
export default function SearchBar({ searchData }: PropType) {
  const inputRef = useRef<HTMLInputElement>(null);

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    // console.log(e.target.value);
  }

  return (
    <Input
      className="searchInput"
      type="text"
      placeholder="작품명과 작가명으로 검색해보세요."
      onChange={inputHandler}
      ref={inputRef}
    />
  );
}
