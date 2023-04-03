import React, { useState } from "react";
import { Layout, Modal, Typography, Space, Row, Col } from "antd";
import styled from "styled-components";
import { MainImage } from "../common";
import tiger from "/tiger.jpg";
const { Title, Text } = Typography;

interface PropType {
  mbti: string;
  desc: string;
  img: string;
  per: number;
}

export default function CommonLayout(props: PropType) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <StyledLayout>
      <StyledAllMBTI onClick={showModal}>
        {props.per} %
        <MainImage src={tiger} size={40} />
        {props.mbti}
      </StyledAllMBTI>

      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <StyledDiv>
          <StyledHeader level={3}>다른 유형은?</StyledHeader>
          <MainImage src={tiger} size={80} />
          <TextContainer direction="vertical" size={5}>
            <StyledHeader level={4}>
              {props.mbti}({props.per}%)
            </StyledHeader>

            <StyledContent>{props.desc}</StyledContent>
            <br />
          </TextContainer>
        </StyledDiv>

        <Row gutter={[16, 16]}>
          {[
            {
              text: "나와 잘 맞는 유형",
              mbti: "맞는 유형",
              per: 40.6,
            },
            {
              text: "나와 안 맞는 유형",
              mbti: "안 맞는 유형",
              per: 11.0,
            },
          ].map(
            (el) =>
              el.mbti && (
                <StyledCol key={el.mbti + "me"} span={12}>
                  <b>{el.text}</b>
                  <MainImage src={tiger} size={40} />
                  <strong>{el.mbti}</strong>
                </StyledCol>
              )
          )}
        </Row>
      </Modal>
    </StyledLayout>
  );
}

const StyledLayout = styled(Layout)`
  // width: 45%;
  display: flex;
  background-color: inherit;
  color: black;
`;

const StyledAllMBTI = styled(Layout)`
  text-align: center;
  height: fit-content;
  padding-inline: 0px;
  line-height: 32px;
  // background-color: #f8f8f8;
  background-color: #ffffff;
  font-weight: bold;
  font-size: 0.8rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const StyledHeader = styled(Title)`
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  margin: 10px;
`;

const StyledContent = styled(Text)`
  text-align: center;
  line-height: 1.5rem;
  word-break: keep-all;

  span {
    font-weight: 600;
    line-height: 2rem;
  }
`;

const TextContainer = styled(Space)`
  line-height: 1rem;
  width: 100%;
  color: black;
  padding-bottom: 0px;
`;

const StyledCol = styled(Col)`
  text-align: center;
  line-height: 3rem;
  margin: 10px 0px;
`;
