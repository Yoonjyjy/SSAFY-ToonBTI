import React from "react";
import { Layout } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import background from "../../assets/background.jpg";

const { Header, Content } = Layout;

interface PropType {
  title?: string;
  hasPrevious?: boolean;
  children: React.ReactNode;
  type?: "home";
  // type?: "survey" | "keywordSurvey" | "MbtiTest" | "home";
}

export default function CommonLayout(props: PropType) {
  const navigate = useNavigate();

  return (
    <StyledLayout>
      {props.title && (
        <StyledHeader>
          {props.hasPrevious && <LeftButton onClick={() => navigate(-1)} />}
          {props.title}
        </StyledHeader>
      )}
      <CustomContent type={props.type}>{props.children}</CustomContent>
    </StyledLayout>
  );
}

function CustomContent(props: {
  type?: "home";
  // type?: "survey" | "keywordSurvey" | "MbtiTest" | "home";
  children: React.ReactNode;
}) {
  switch (props.type) {
    // case "survey":
    //   return <SurveyPageContent>{props.children}</SurveyPageContent>;
    // case "keywordSurvey":
    //   return <KeywordPageContent>{props.children}</KeywordPageContent>;
    // case "MbtiTest":
    //   return <StyledTestContent>{props.children}</StyledTestContent>;
    case "home":
      return <StyledHomeContent>{props.children}</StyledHomeContent>;
    default:
      return <StyledContent>{props.children}</StyledContent>;
  }
}

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  display: flex;
  background-color: inherit;
  background-size: 80%;
  background-repeat: repeat;
  background-image: linear-gradient(
      rgba(256, 256, 256, 0.9),
      rgba(256, 256, 256, 0.9)
    ),
    url(${background});
`;

const StyledHeader = styled(Header)`
  text-align: center;
  height: 64;
  padding-inline: 50;
  line-height: 64px;
  background-color: ${({ theme }) => theme.colors.yellow};

  font-weight: bold;
  font-size: 1rem;

  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
`;

const LeftButton = styled(LeftOutlined)`
  position: absolute;
  top: 0.5rem;
  // top: 0.5rem;
  left: 0.5rem;
  font-size: 1rem;
  padding: 1rem;
`;

const StyledContent = styled(Content)`
  text-align: center;
  padding: 2rem;
  padding-top: 90px;

  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  gap: 20px;
`;

const StyledHomeContent = styled(Content)`
  text-align: center;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

// const StyledTestContent = styled(Content)`
//   height: auto;
//   text-align: center;
//   padding: 2rem;
//   padding-top: 5rem;

//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

// const SurveyPageContent = styled(Content)`
//   text-align: center;
//   min-height: 120;
//   padding: 2rem;
//   padding-top: 6rem;
// `;
// const KeywordPageContent = styled(Content)`
//   text-align: center;
//   min-height: 120;
//   padding: 2rem;
//   padding-top: 8rem;
// `;
