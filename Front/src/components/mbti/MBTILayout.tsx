import React, { useState } from "react";
import { Layout, Modal, Typography, Space, Row, Col } from "antd";
import styled from "styled-components";
import { MainImage } from "../common";
const { Title, Text } = Typography;
import { useQuery } from "@apollo/client";
import { GET_TYPE } from "../../api/mbti";
import { Player } from "@lottiefiles/react-lottie-player";

interface PropType {
  mbti: string;
  desc: string;
  img: string;
  per: number;
  title: string;
  character: string;
}

export default function CommonLayout(props: PropType) {
  const { data: typeInfo } = useQuery(GET_TYPE, {
    variables: {
      userType: props.mbti,
    },
  }); // TODO: handle while loading

  // const best = typeInfo?.getType?.bestType?.userType;
  // const worst = typeInfo?.getType?.worstType?.userType;

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
        {/* {props.per} % */}
        {props.img ? (
          <MainImage
            src={`${import.meta.env.VITE_IMAGE_URL}${props.img}`}
            size={40}
          />
        ) : (
          <StyledPlayer
            autoplay
            loop
            src={`/simple-spinner.json`}
          ></StyledPlayer>
        )}
        <StyledTypeName>
          <StyledHeader level={5}>
            {props.mbti} ({props.per}%)
          </StyledHeader>
          {props.title} <br></br> {props.character}
        </StyledTypeName>
      </StyledAllMBTI>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <StyledDiv>
          {/* <StyledHeader level={3}>다른 유형은?</StyledHeader> */}

          {props.img ? (
            <MainImage
              src={`${import.meta.env.VITE_IMAGE_URL}${props.img}`}
              size={70}
            />
          ) : (
            <StyledPlayer
              autoplay
              loop
              src={`/simple-spinner.json`}
            ></StyledPlayer>
          )}
          <TextContainer direction="vertical" size={5}>
            <StyledTypeName>
              <StyledHeader level={4}>
                {props.mbti} ({props.per}%)
              </StyledHeader>
              <center>
                {props.title} - {props.character}
              </center>
            </StyledTypeName>

            <StyledList>
              {props.desc?.split("\\n").map((line: string) => {
                return <StyledLi key={line}>{line}</StyledLi>;
              })}
            </StyledList>
            <br />
          </TextContainer>
        </StyledDiv>

        <Row gutter={[16, 16]}>
          {[
            {
              text: "나와 잘 맞는 유형",
              mbti: typeInfo?.getType?.bestType?.userType,
              img: typeInfo?.getType?.bestType?.image,
              title: typeInfo?.getType?.bestType?.thumbnailTitle,
              character: typeInfo?.getType?.bestType?.thumbnailCharacter,
            },
            {
              text: "나와 안 맞는 유형",
              mbti: typeInfo?.getType?.worstType?.userType,
              img: typeInfo?.getType?.worstType?.image,
              title: typeInfo?.getType?.worstType?.thumbnailTitle,
              character: typeInfo?.getType?.worstType?.thumbnailCharacter,
            },
          ].map(
            (el) =>
              el.mbti && (
                <StyledCol key={el.mbti + "me"} span={12}>
                  <b>{el.text}</b>

                  {props.img ? (
                    <MainImage
                      src={`${import.meta.env.VITE_IMAGE_URL}${el.img}`}
                      size={40}
                    />
                  ) : (
                    <StyledPlayer
                      autoplay
                      loop
                      src={`/simple-spinner.json`}
                    ></StyledPlayer>
                  )}
                  <StyledTypeName>
                    <StyledStrong>{el.mbti}</StyledStrong>
                    {el.title} <br></br>
                    {el.character}
                  </StyledTypeName>
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
  margin: 50px 10px 0px 10px;
  /* margin-top: 50px; */
`;

const StyledHeader = styled(Title)`
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  margin: 0px;
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

const StyledTypeName = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1rem;
  margin: 10px 0px;
  gap: 10px;
`;

const StyledStrong = styled.strong`
  font-size: 1rem;
`;

const StyledPlayer = styled(Player)`
  width: 75vw;
  height: 40vw;
  max-width: 800px;
  max-height: 800px;
`;

const StyledList = styled(Text)`
  text-align: left;
  line-height: 1.5rem;
  word-break: keep-all;
  white-space: pre-line;
  display: block;

  span {
    font-weight: 600;
    line-height: 2rem;
  }
`;

const StyledLi = styled.li`
  /* list-style-position: inside; */

  /* padding-left: 30px; */
  /* text-indent: -20px; */
`;
