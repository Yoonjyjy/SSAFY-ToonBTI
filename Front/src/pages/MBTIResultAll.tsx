import React from "react";
import { Space, Row, Col, Typography } from "antd";
import styled from "styled-components";
import { Layout, MBTILayout } from "../components/common";
import ShareButton from "../components/common/ShareButton";
import { useQuery } from "@apollo/client";
import { GET_ALL_TYPES } from "../api/mbti";
import { MBTITypeButton, MBTITypeDesc } from "../components/mbti";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function MBTIResultAll() {
  const navigate = useNavigate();
  const { data, error } = useQuery(GET_ALL_TYPES); // TODO: handle while loading
  // const { data, error } = useQuery(COUNT_ALL_USERS); // TODO: handle while loading

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
                  />
                </StyledCol>
              )
          )}
        </Row>
      </StyledDiv>
      <MBTITypeDesc />
      <MBTITypeButton />
      <ShareButton
        text="웹툰 독자 유형 공유하기"
        src={`${import.meta.env.VITE_TEST_URL}`}
        param="mbti/result"
      />
    </Layout>
  );
}

const TextContainer = styled(Space)`
  line-height: 1rem;
  width: 100%;
  color: black;
  // padding: 20px 10px 0px 10px;
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

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function percent(part: number, total: number): number {
  return Math.round((part / total) * 100);
}
