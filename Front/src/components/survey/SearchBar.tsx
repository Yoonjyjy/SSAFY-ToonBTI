import React from "react";
import { Input, InputRef } from "antd";
import _ from "lodash"; // throttle

interface PropType {
  searchData: (keyword: string) => void;
}
export default React.forwardRef(function Btn(
  props: PropType,
  ref: React.Ref<InputRef>
) {
  const throttleHandler = _.throttle((e) => {
    props.searchData(e.target.value);
  }, 1000);

  return (
    <Input
      ref={ref}
      className="searchInput"
      type="text"
      placeholder="작품명과 작가명으로 검색해보세요."
      onChange={throttleHandler}
    />
  );
});
