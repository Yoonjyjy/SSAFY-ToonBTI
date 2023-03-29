import React from "react";
import { Layout } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

interface PropType {
  title: string;
  hasPrevious?: boolean;
  children: React.ReactNode;
  type?: string;
}

export default function CommonLayout(props: PropType) {
  const navigate = useNavigate();

  if (props?.type === "survey") {
    return (
      <StyledLayout>
        <StyledHeader>
          {props.hasPrevious && <LeftButton onClick={() => navigate(-1)} />}
          {props.title}
        </StyledHeader>
        <SurveyPageContent>{props.children}</SurveyPageContent>
      </StyledLayout>
    );
  }

  if (props?.type === "keywordSurvey") {
    return (
      <StyledLayout>
        <StyledHeader>
          {props.hasPrevious && <LeftButton onClick={() => navigate(-1)} />}
          {props.title}
        </StyledHeader>
        <KeywordPageContent>{props.children}</KeywordPageContent>
      </StyledLayout>
    );
  }
  return (
    <StyledLayout>
      <StyledHeader>
        {props.hasPrevious && <LeftButton onClick={() => navigate(-1)} />}
        {props.title}
      </StyledHeader>
      <StyledContent>{props.children}</StyledContent>
    </StyledLayout>
  );
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
  min-height: 120;
  line-height: 120px;
  padding: 2rem;
  margin-top: 4rem;
`;

const SurveyPageContent = styled(Content)`
  text-align: center;
  min-height: 120;
  padding: 2rem;
`;
const KeywordPageContent = styled(Content)`
  text-align: center;
  min-height: 120;
  padding: 2rem;
`;
