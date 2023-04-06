import React from "react";
import { Layout } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
// import background from "../../assets/background.jpg";

const { Header, Content } = Layout;

interface PropType {
  title?: string;
  hasPrevious?: boolean;
  children: React.ReactNode;
  type?: "home" | "survey";
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
  type?: "home" | "survey";
  // type?: "survey" | "keywordSurvey" | "MbtiTest" | "home";
  children: React.ReactNode;
}) {
  switch (props.type) {
    case "survey":
      return <SurveyPageContent>{props.children}</SurveyPageContent>;
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
  /* max-width: 480px; */
  min-height: 100vh;
  display: flex;
  background-color: inherit;
  background-size: 80%;
  background-repeat: repeat;
`;

const StyledHeader = styled(Header)`
  text-align: center;
  height: 64;
  padding-inline: 50;
  line-height: 64px;
  background-color: white;
  /* background-color: ${({ theme }) => theme.colors.yellow}; */

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
  gap: 40px;
`;

const StyledHomeContent = styled(Content)`
  text-align: center;
  /* position: absolute; */
  /* bottom: 5%; */
  left: 0;
  right: 0;
  z-index: 300;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const SurveyPageContent = styled(StyledContent)`
  gap: 5px;
`;
