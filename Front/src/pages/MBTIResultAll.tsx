import React from "react";
import { Space, Row, Col, Typography } from "antd";
import styled from "styled-components";
import { Layout, MBTILayout } from "../components/common";
import { useQuery } from "@apollo/client";
import { GET_ALL_TYPES } from "../api/mbti";
import { MBTITypeDesc } from "../components/mbti";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export default function MBTIResultAll() {
  const navigate = useNavigate();
  const { data, error } = useQuery(GET_ALL_TYPES); // TODO: handle while loading

  const total = data?.getAllTypes
    ?.map((el) => el?.count)
    .reduce((a, b) => a + b);
  const sortedData = data?.getAllTypes
    ? [...data.getAllTypes].sort((a, b) => b?.count - a?.count)
    : [];

  if (error) navigate("/404");

  return (
    <Layout title="웹툰 독자 유형 결과" hasPrevious>
      <StyledDiv>
        <TextContainer direction="vertical" size={5}>
          <StyledHeader level={3}>전체 독자 유형</StyledHeader>
          <StyledContent>각 유형을 눌러 확인해보세요!</StyledContent>
        </TextContainer>
        <Row gutter={[16, 16]}>
          {sortedData.map(
            (el) =>
              el && (
                <StyledCol key={el.userType} span={12}>
                  <MBTILayout
                    mbti={el.userType}
                    desc={el.description as string}
                    img={el.image as string}
                    per={percent(el.count, total)}
                    title={el.thumbnailTitle as string}
                    character={el.thumbnailCharacter as string}
                  />
                </StyledCol>
              )
          )}
        </Row>
      </StyledDiv>
      <MBTITypeDesc />
    </Layout>
  );
}

const TextContainer = styled(Space)`
  line-height: 1rem;
  width: 100%;
  color: black;
`;

const StyledCol = styled(Col)`
  text-align: center;
`;

const StyledHeader = styled(Title)`
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  margin: 0px;
`;

const StyledContent = styled(Text)`
  text-align: center;
  line-height: 1.5rem;
  word-break: keep-all;
  white-space: pre-line;
  display: block;

  span {
    font-weight: 600;
    line-height: 2rem;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function percent(part: number, total: number): number {
  return Math.round((part / total) * 100);
}
