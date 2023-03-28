import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);
const originData = {
  type: "doughnut",
  labels: [] as string[],
  datasets: [
    {
      label: "My Genre Chart",
      data: [] as number[],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "#1ec997",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(237, 204, 255)",
        "rgb(248, 202, 255)",
        "rgb(255, 204, 207)",
      ],
      hoverOffset: 4,
    },
  ],
};

interface PropType {
  dataList: {
    id: number;
    name: string;
    count: number;
  }[];
}
export default function DoughnutChart({ dataList }: PropType) {
  const rankList = dataList.slice().sort((a, b) => b.count - a.count);
  originData.labels = rankList.map((row) => row.name);
  originData.datasets[0].data = rankList.map((row) => row.count);
  return (
    <DoughnutDiv>
      <Doughnut data={originData} />
    </DoughnutDiv>
  );
}

const DoughnutDiv = styled.div`
  margin: auto auto 1.5rem auto;
`;
