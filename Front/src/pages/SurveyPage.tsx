import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Survey } from "../components/analysis";
import KeywordSurvey from "../components/analysis/KeywordSurvey";

export default function SurveyPage() {
  const [comp, setComp] = useState<number>(0);

  return (
    <>
      {comp === 0 && (
        <>
          <Survey setComp={setComp} />
        </>
      )}
      {comp === 1 && (
        <>
          <KeywordSurvey />
        </>
      )}
    </>
  );
}
