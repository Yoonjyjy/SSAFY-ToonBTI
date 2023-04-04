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
}

export default function CommonLayout(props: PropType) {
  const { data: typeInfo, error } = useQuery(GET_TYPE, {
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

  function getTypeName(type: string): string {
    switch (type) {
      case "LSRA":
        return "이태원 클라스 - 조이서";
      case "LSRT":
        return "유미의 세포들 - 응큼이";
      case "LSEA":
        return "신과 함께 - 변호사";
      case "LSET":
        return "천리마마트 - 문석구";
      case "LWRA":
        return "연애 혁명 - 왕자림";
      case "LWRT":
        return "연애 혁명 - 공주영";
      case "LWEA":
        return "신과 함께 - 김자홍";
      case "LWET":
        return "미생 - 과장님";
      case "HSRA":
        return "나 혼자만 레벨업 - 성진우";
      case "HSRT":
        return "유미의 세포들 - 사랑세포";
      case "HSEA":
        return "하이브 - 개장수";
      case "HSET":
        return "프리드로우 - 동까";
      case "HWRA":
        return "치즈인더트랩 - 백인호";
      case "HWRT":
        return "패션왕 - 우기명";
      case "HWEA":
        return "노블레스 - 라이제르";
      case "HWET":
        return "이태원 클라스 - 박새로이";
      default:
        return "";
    }
  }

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
          {getTypeName(props.mbti)}
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
              <center>{getTypeName(props.mbti)}</center>
            </StyledTypeName>

            <StyledContent>{props.desc}</StyledContent>
            <br />
          </TextContainer>
        </StyledDiv>

        <Row gutter={[16, 16]}>
          {[
            {
              text: "나와 잘 맞는 유형",
              mbti: typeInfo?.getType?.bestType?.userType,
              img: typeInfo?.getType?.bestType?.image,
            },
            {
              text: "나와 안 맞는 유형",
              mbti: typeInfo?.getType?.worstType?.userType,
              img: typeInfo?.getType?.worstType?.image,
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
                    {getTypeName(el.mbti)}
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
