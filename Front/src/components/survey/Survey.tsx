import { Button, Space, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Text from "../common/Text";
import ItemList from "./ItemList";

const { Title } = Typography;

/**

독자 유형 테스트 페이지 (작품 선택 페이지)
@setComp : 컴포넌트 변경을 위한 setter 함수
@dataList : 선택한 작품 리스트
@setDataList : 작품 리스트 아이템 추가 및 삭제 */
interface SurveyProps {
  onClickNext: () => void;
  onClickItem: (itemId: number) => void;
  dataList: SurveyItemType[];
  fetchAdditionalData: (nextPage: number) => void;
}

export default function Survey(props: SurveyProps) {
  const navigate = useNavigate();
  const cnt: number = props.dataList
    .map((el) => (el.clicked ? 1 : 0))
    .reduce((a: number, b) => a + b, 0);

  return (
    <OuterBox>
      <StyledHeader level={3}>웹툰 취향 분석 테스트</StyledHeader>
      <Text>지금까지 재미있게 봤던 웹툰들을 선택해주세요.</Text>
      <RightDiv>
        <SelectedNumDiv>
          <b>
            선택한 웹툰 <CountSpan>{cnt}</CountSpan>개
          </b>
        </SelectedNumDiv>
      </RightDiv>
      <ItemList
        dataList={props.dataList}
        onClickItem={props.onClickItem}
        fetchAdditionalData={props.fetchAdditionalData}
      />
      <BtnContainer direction="vertical">
        <StyledButton
          color="yellow"
          height={3}
          onClick={(e) => {
            e.preventDefault();
            //TODO: graphQL 데이터 서버로 보내기
            navigate("/survey/result");
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

const StyledHeader = styled(Title)`
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  margin: 0px;
`;
