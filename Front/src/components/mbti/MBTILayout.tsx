import React from "react";
import { Layout } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MainImage } from "../common";
import tiger from "/tiger.jpg";

interface PropType {
  mbti: string;
  per: number;
}

export default function CommonLayout(props: PropType) {
  const navigate = useNavigate();

  return (
    <StyledLayout onClick={() => navigate("/mbti/result")}>
      <StyledAllMBTI>
        {props.per} %
        <MainImage src={tiger} size={40} />
        {props.mbti}
      </StyledAllMBTI>
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
  font-size: 1rem;
`;
