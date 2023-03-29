import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PropType {
  children: JSX.Element;
}
/**
 * @children : 컴포넌트를 감쌌기 때문에 그 안의 컴포넌트를 화면에 보여주기 위해 children을 props로 받습니다.
 * 현재 url 주소가 바뀔 때마다 윈도우 참의 scroll을 Top으로 옮겨줍니다.
 */

export default function ScrollControl({ children }: PropType) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
}
