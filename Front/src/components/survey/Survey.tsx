import React from "react";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ItemList from "./ItemList";
import { Webtoon } from "../../gql/graphql";

/**

독자 유형 테스트 페이지 (작품 선택 페이지)
@setComp : 컴포넌트 변경을 위한 setter 함수
@dataList : 선택한 작품 리스트
@setDataList : 작품 리스트 아이템 추가 및 삭제 */
interface PropType {
  cnt: number;
  surveyList: SurveyItemType[];
  onClickItem: (itemId: number, genreId: number) => void;
  fetchAdditionalData: (offset: number) => void;
  offsetRef: React.MutableRefObject<number>;
}

interface SurveyItemType extends Webtoon {
  clicked: boolean;
}

export default function Survey(props: PropType) {
  const navigate = useNavigate();

  return (
    <OuterBox>
      <RightDiv>
        <SelectedNumDiv>
          <b>
            선택한 웹툰 <CountSpan>{props.cnt}</CountSpan>개
          </b>
        </SelectedNumDiv>
      </RightDiv>
      <ItemList
        dataList={props.surveyList}
        onClickItem={props.onClickItem}
        fetchAdditionalData={props.fetchAdditionalData}
        offsetRef={props.offsetRef}
      />
      <BtnContainer direction="vertical">
        <StyledButton
          color="yellow"
          height={3}
          onClick={(e) => {
            e.preventDefault();
            //TODO: graphQL 데이터 서버로 보내기
            navigate("/survey/result", { state: { data: props.surveyList } });
          }}
        >
          <b>나의 취향 분석하기</b>
        </StyledButton>
      </BtnContainer>
    </OuterBox>
  );
}

/**

아이템을 누르면 해당 아이템과 관련된 아이템들 가져오기
이미 선택한 아이템들은 가져오면 안된다? 중복 안돼
몇개의 아이템을 가져올 것인가? 3개
부드러운 애니메이션 필요(추가되는 부분에 대한 슬라이드 animation)
연관 아이템이란 무엇인가? 장르인가 상세 태그인가
 */
const OuterBox = styled.div`
  height: 100%;
`;
const RightDiv = styled.div`
  display: flex;
  justify-content: end;
  margin: 0;
`;
const SelectedNumDiv = styled.div`
  display: flex;
  width: fit-content;
  margin: 0.2rem;
  margin-left: 1rem;
`;

const CountSpan = styled.span`
  color: ${({ theme }) => theme.colors.orange};
  font-weight: 700;
`;
const BtnContainer = styled(Space)`
  line-height: 4rem;
  width: 100%;
  position: relative;
  transform: translateY(-20%);
  margin-top: 2rem;
`;

const StyledButton = styled(Button)<{ color?: string; height?: number }>`
  width: 100%;
  height: ${(props) => (props.height ? props.height + "rem" : "3rem")};
  background-color: ${(props) =>
    props.color ? ({ theme }) => theme.colors.yellow : null};
  border-color: ${(props) =>
    props.color ? ({ theme }) => theme.colors.yellow : null};
  border-radius: 10px;
`;
