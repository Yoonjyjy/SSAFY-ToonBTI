import React from "react";
import { Layout } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

interface PropType {
  title?: string;
  hasPrevious?: boolean;
  children: React.ReactNode;
  type?: "survey" | "keywordSurvey";
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
  type?: "survey" | "keywordSurvey";
  children: React.ReactNode;
}) {
  switch (props.type) {
    case "survey":
      return <SurveyPageContent>{props.children}</SurveyPageContent>;
    case "keywordSurvey":
      return <KeywordPageContent>{props.children}</KeywordPageContent>;
    default:
      return <StyledContent>{props.children}</StyledContent>;
  }
}

const StyledLayout = styled(Layout)`
  height: 100%;
  display: flex;
  background-color: inherit;
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
  top: 1rem;
  left: 0.5rem;
  font-size: 2rem;
`;

const StyledContent = styled(Content)`
  text-align: center;
  // min-height: 120;
  // line-height: 120px;
  padding: 2rem;
  padding-top: 8rem;

  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const SurveyPageContent = styled(Content)`
  text-align: center;
  min-height: 120;
  padding: 2rem;
  padding-top: 8rem;
`;
const KeywordPageContent = styled(Content)`
  text-align: center;
  min-height: 120;
  padding: 2rem;
  padding-top: 8rem;
`;
