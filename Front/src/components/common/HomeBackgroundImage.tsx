import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_IMAGES } from "../../api/mbti";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function HomeBackgroundImage() {
  const navigate = useNavigate();
  const { data, error } = useQuery(GET_IMAGES);
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    setImages(data?.getRanImgSet as string[]);
  }, [data]);
  if (error) navigate("/404");
  if (data) {
    return (
      <>
        <StyledBlackDiv></StyledBlackDiv>
        <StyledGrid>
          {images?.map((i, idx) => (
            <StyledDiv key={i} url={i} idx={idx}></StyledDiv>
          ))}
        </StyledGrid>
      </>
    );
  }
  return null;
}

const StyledBlackDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.75);
  z-index: 200;
  position: absolute;
`;

const StyledDiv = styled.div<{ url: string; idx: number }>`
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  overflow: hidden;
  position: fixed;
  top: -60px;
  left: -30px;
  width: 120vw;
  height: 120vh;
  gap: 8px;
`;
