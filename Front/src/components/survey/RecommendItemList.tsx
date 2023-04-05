import React from "react";
import RecommendItem from "./RecommendItem";
import styled from "styled-components";
import { Row, Typography } from "antd";
import { Webtoon } from "../../gql/graphql";
import { RecomWebtoonType } from "../../pages/SurveyResult";

const { Title } = Typography;

interface PropType {
  type?: string;
  keyword?: string;
  text: string;
  dataList: RecomWebtoonType[];
}

export default function RecommendItemList({
  type,
  keyword,
  text,
  dataList,
}: PropType) {
  if (dataList) {
    if (type === "keyword") {
      return (
        <div>
          <StyledHeader>
            {/* <StyledSpan>#{keyword}</StyledSpan> 키워드와 유사한 키워드의 작품 */}
            내가 선호하는 키워드의 작품
          </StyledHeader>
          <ItemListBox gutter={[16, 16]} key="1">
            {dataList.map((item) => {
              return (
                <RecommendItem type={type} key={item.webtoonId} item={item} />
              );
            })}
          </ItemListBox>
        </div>
      );
    }
    return (
      <div>
        <StyledHeader>{text}</StyledHeader>
        <ItemListBox gutter={[16, 16]} key="1">
          {dataList.map((item) => {
            return <RecommendItem key={item.webtoonId} item={item} />;
          })}
        </ItemListBox>
      </div>
    );
  }
  return null;
}

const ItemListBox = styled(Row)`
  justify-content: left;
  margin: 0 0 30px 0;
  overflow: auto;
  flex-wrap: nowrap;
`;

const StyledSpan = styled.span`
  color: ${({ theme }) => theme.colors.orange};
`;

const StyledHeader = styled.h5`
  text-align: left;
  font-weight: bold;
  font-size: 1rem;
  margin: 0px;
`;
