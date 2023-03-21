import React, { useEffect, useState } from "react";
import * as _ from "lodash";

export default function InfiniteScroll() {
  // const [page, setPage] = useState(0)
  // const [data, setData] = useState([])
  //   const [userInfo, setUserInfo] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  function getInfo() {
    // graphQL data getter
    return;
  }
  useEffect(() => {
    const handleScroll = _.throttle(() => {
      // 여기서 첫 페칭 데이터 사이즈가 충분하지 않으면 스크롤바가 노출되지 않아 스크롤 이벤트가 발생할 수 없게 됨. 이때 충분한 데이터 사이즈를 페칭하거나 스크롤바가 노출될 때까지 연속 페칭하는 방법이 있음
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setIsLoading(true);
      }
    }, 300);
    setIsLoading(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isLoading && hasNextPage) getInfo();
    else if (!hasNextPage) setIsLoading(false);
  }, [isLoading]);

  return (
    <div>
      {/* {users.map((user) => (
        <div key={user.id}></div>
      ))} */}
      {isLoading && <div className="Loading spinner" />}
    </div>
  );
}
