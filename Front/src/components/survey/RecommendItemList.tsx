import React from "react";
import RecommendItem from "./RecommendItem";
import styled from "styled-components";
import { Row, Typography } from "antd";
import { Webtoon } from "../../gql/graphql";

const { Title } = Typography;

interface PropType {
  text: string;
  dataList: RecommListItemType[];
}

interface RecommListItemType extends Webtoon {
  per: number;
}

export default function RecommendItemList({ text, dataList }: PropType) {
  return (
    <div>
      <StyledHeader level={5}>{text}</StyledHeader>
      <ItemListBox gutter={[16, 16]} key="1">
        {dataList.map((item) => {
          return <RecommendItem key={item.webtoonId} item={item} />;
        })}
      </ItemListBox>
    </div>
  );
}

const ItemListBox = styled(Row)`
  justify-content: left;
  margin: 0 0 30px 0;
  overflow: auto;
  flex-wrap: nowrap;
`;

const StyledHeader = styled(Title)`
  text-align: left;
  font-weight: bold;
  font-size: 1rem;
  margin: 0px;
`;
