import React, { useEffect } from "react";
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
  dataList: number[];
}

const Genre = [
  "판타지",
  "드라마",
  "로맨스",
  "로맨스판타지",
  "현대판타지",
  "액션/무협",
  "소년/감성",
  "일상/개그",
  "공포/추리",
  "스포츠",
];

export default function DoughnutChart({ dataList }: PropType) {
  const newDataList: { id: number; name: string; count: number }[] = [];
  useEffect(() => {
    if (newDataList.length < 10) {
      for (let i = 0; i < dataList?.length; i++) {
        newDataList.push({ id: i + 1, name: Genre[i], count: dataList[i] });
      }
    }
    const rankList = newDataList.slice().sort((a, b) => b.count - a.count);
    originData.labels = rankList.slice(0, 10).map((row) => row.name);
    originData.datasets[0].data = rankList.map((row) => row.count);
  }, []);

  return (
    <DoughnutDiv>
      <Doughnut data={originData} />
    </DoughnutDiv>
  );
}

const DoughnutDiv = styled.div`
  margin: auto auto 1.5rem auto;
`;
