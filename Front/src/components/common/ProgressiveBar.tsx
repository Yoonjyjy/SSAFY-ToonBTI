import React from "react";
import { Progress } from "antd";

interface ProgressiveBarProps {
  progress?: number;
}

export default function ProgressiveBar({ progress }: ProgressiveBarProps) {
  return <Progress percent={progress} status="active" />;
}
