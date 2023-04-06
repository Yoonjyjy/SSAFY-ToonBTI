import React from "react";
import { Progress } from "antd";

interface ProgressiveBarProps {
  progress: number;
  type: string;
}

export default function ProgressiveBar({
  progress,
  type,
}: ProgressiveBarProps) {
  if (type === "top") {
    return (
      <Progress
        strokeColor={{ "0%": "#FF7B7B", "100%": "#FFD7D7" }}
        percent={progress}
        showInfo={false}
        status="active"
      />
    );
  }
  if (type === "platform") {
    return (
      <Progress
        strokeColor="#FFBC00"
        trailColor="#2DB400"
        percent={progress}
        showInfo={false}
        status="active"
      />
    );
  }
  if (type === "endedOrOngoin") {
    return (
      <Progress
        strokeColor="#FF6C6C"
        trailColor="#1E9EFF"
        percent={progress}
        showInfo={false}
        status="active"
        // size={[100, 10]}
      />
    );
  }
  return <Progress percent={progress} showInfo={false} status="active" />;
}
