import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

/**
 * Infinite Scroll 컴포넌트
 * @returns
 */

interface PropsType {
  children: React.ReactNode;
  callback: (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => void;
  isLoading: boolean;
  page: number;
  totalPage: number;
  isLastPage: boolean; // list 개수 27개 이하이면 lastPage
}

export default function InfiniteScroll({
  children,
  callback,
  isLoading,
  page,
  totalPage,
  isLastPage,
}: PropsType) {
  const target = useRef<HTMLDivElement>(null);
  const options = {
    root: null, // 타켓 요소가 "어디에" 들어왔을때 콜백함수를 실행할 것인지 결정합니다. null이면 viewport가 root로 지정됩니다.
    //root: document.querySelector('#scrollArea'), => 특정 요소를 선택할 수도 있습니다.
    rootMargin: "0px", // root에 마진값을 주어 범위를 확장 가능합니다.
    threshold: 1, // 타겟 요소가 얼마나 들어왔을때 백함수를 실행할 것인지 결정합니다. 1이면 타겟 요소 전체가 들어와야 합니다.
  };
  const observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    if (!target.current) return;
    observer.observe(target.current); // ✅ 타겟 요소 관측 시작

    return () => observer && observer.disconnect();
  }, [target, options, callback]);

  return (
    <div>
      {children}
      {!isLastPage ? <ObservedDiv></ObservedDiv> : null}
      {isLoading ? <Spinner /> : null}
    </div>
  );
}

const ObservedDiv = styled.div`
  width: 100%;
  height: 20px;
`;
